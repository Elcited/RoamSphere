/**
 * 接收一个异步函数作为参数，返回一个新的函数。
 * 如果异步函数中出错，错误将自动传递给 next()，
 * 从而触发 Express 的全局错误处理中间件。
 */
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
