class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // 设置错误信息

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // 标记为“可预期的错误”

    // 创建堆栈跟踪，但不包括 constructor 本身
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
