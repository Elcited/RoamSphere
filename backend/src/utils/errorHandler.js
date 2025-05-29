const AppError = require("./appError");

/**
 * 发送开发环境的详细错误（开发时调试用）
 */
const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * 发送生产环境的简洁错误信息（避免泄露内部信息）
 */
const sendErrorProd = (err, req, res) => {
  // 是“可预期的业务错误”（由 AppError 创建）
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // 编程错误、未知错误（比如 MongoDB 错误等）
    console.error("💥 ERROR:", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong.",
    });
  }
};

/**
 * Express 全局错误处理中间件（注册在所有路由之后）
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // 默认服务器错误
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err, message: err.message };
    sendErrorProd(error, req, res);
  }
};
