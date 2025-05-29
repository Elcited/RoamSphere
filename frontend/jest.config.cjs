module.exports = {
  // 模拟浏览器环境（用于 React、DOM 测试）
  testEnvironment: "jsdom",

  // 处理 JSX 和 ES6+ 语法（使用 Babel 转换）
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  // 指定测试文件匹配规则
  testMatch: [
    "**/src/test/**/*.(spec|test).[jt]sx?",
    "**/?(*.)+(spec|test).[jt]sx?",
  ],

  // 支持 jsx/js/ts/tsx 等模块后缀
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // jest-dom 扩展
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
