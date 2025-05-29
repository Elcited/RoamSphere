const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

/**
 * 创建 JWT token，载荷中只放用户 id
 * 第三个参数是签名配置，指定 token 有效期
 */
const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

/**
 * 注册新用户（POST /api/users/signup）
 * 从请求体中获取 name、email、password，存入数据库
 * 创建成功后，返回 token 和用户数据
 */
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

/**
 * 登录用户（POST /api/users/login）
 * 检查邮箱和密码是否匹配
 * 匹配成功则生成 token 返回给前端
 */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  createSendToken(user, 200, res);
});

/**
 * 登出（POST /api/users/logout）
 * 这里其实前端只需要把本地 token 清除即可
 * 该接口主要是留给前端判断用途（比如切换登录状态）
 */
exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000), // 立刻过期
    httpOnly: true,
  });

  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

/**
 * 保护路由中间件（只允许已登录用户访问）
 * 会尝试从请求头或 cookie 中提取 JWT
 * 验证 token，查找用户，检查密码是否被修改过
 */
exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // 从 Authorization header 中提取 Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 如果 header 没token，再从 cookie 取
  else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError("You are not logged in!", 401));

  // 验证 token 合法性
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 查找当前用户
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) return next(new AppError("User no longer exists.", 401));

  // 判断用户是否在 token 签发后修改过密码
  if (currentUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError("Password recently changed. Please login again.", 401)
    );

  // 向下传递用户信息
  req.user = currentUser;
  next();
});

/**
 * 选择性保护中间件，用于使用地图功能时放宽使用条件，允许在未登录的情况下使用地图各种功能
 * 从 cookie 中提取 JWT
 * 在 JWT 存在的情况下验证 token， 查找用户，并在 req 上挂载 user 对象，方便后续的信息绑定
 * 没有 JWT 存在也直接放行，不处理 token 错误
 */
exports.optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (token) {
      // 验证 token 合法性
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );

      // 查找当前用户
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) return next();

      // 判断用户是否在 token 签发后修改过密码
      if (currentUser.changedPasswordAfter(decoded.iat))
        return next(
          new AppError("Password recently changed. Please login again.", 401)
        );

      if (currentUser) {
        req.user = currentUser; // 挂载用户信息，但不强制要求
      }
    }
  } catch (err) {
    // 忽略 token 错误，不返回 401
  }

  next(); // 继续执行，不管有没有用户
};

/**
 * 限制访问权限（基于用户角色）
 * 用法示例：router.get('/admin', protect, restrictTo('admin'), handler)
 */
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action!", 403)
      );
    }
    next();
  };

/**
 * 忘记密码（POST /api/auth/forgotPassword）
 * 根据 email 查找用户，生成重置 token，设置过期时间
 * 实际项目中应通过邮件将 resetToken 发送给用户
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("No user found with that email", 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 实际生产中应将 resetToken 构造成重置链接发送到用户邮箱
  console.log(`Reset URL: /api/v1/auth/resetPassword/${resetToken}`);

  res.status(200).json({
    status: "success",
    message: "Reset token generated (check console for now)",
  });
});

/**
 * 重置密码（PATCH /api/users/resetPassword/:token）
 * 根据重置 token 查找用户，校验时间是否过期
 * 设置新密码，清空重置字段，保存后自动登录
 */
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpired: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Token is invalid or has expired", 400));

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpired = undefined;
  await user.save();

  createSendToken(user, 200, res);
});

/**
 * 修改密码（PATCH /api/users/updateMyPassword）
 * 已登录用户修改密码前，需要提供旧密码进行校验
 */
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.currentPassword, user.password)))
    return next(new AppError("Your current password is incorrect.", 401));

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newConfirmPassword;
  await user.save();

  createSendToken(user, 200, res);
});
