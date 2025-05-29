const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

/**
 * 获取当前登录用户的信息
 */
exports.getMe = (req, res) => {
  const user = req.user;
  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        gender: user.gender,
        birthday: user.birthday,
        phone: user.phone,
      },
    },
  });
};

/**
 * 更新当前用户的基本信息（不包括密码）
 */
exports.updateMe = catchAsync(async (req, res, next) => {
  // 你允许用户修改的字段，根据实际需求可以继续加
  const allowedFields = [
    "name",
    "email",
    "avatar",
    "birthday",
    "gender",
    "phone",
  ];

  const updates = {};
  Object.keys(req.body).forEach(key => {
    if (allowedFields.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  // 如果没有更新字段就不进行数据库操作
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "没有提供任何有效的可更新字段",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        gender: updatedUser.gender,
        birthday: updatedUser.birthday,
        phone: updatedUser.phone,
      },
    },
  });
});

/**
 * 删除当前用户（逻辑删除）
 */
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
