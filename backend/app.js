const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");

const redisClient = require("./src/utils/redisClient");

const routeRoutes = require("./src/routes/routeRoutes");
const attractionRoutes = require("./src/routes/attractionRoutes");
const hotelRoutes = require("./src/routes/hotelRoutes");
const positionRoutes = require("./src/routes/positionRoutes");
const userRoutes = require("./src/routes/userRoutes");
const userActivityRoutes = require("./src/routes/userActivityRoutes");
const favoriteRoutes = require("./src/routes/favoriteRoutes");

const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/utils/errorHandler");

const app = express();

/* 处理跨域 */
//CORS 配置（开发阶段允许前端地址跨域访问）
app.use(
  cors({
    origin: "http://localhost:5173", // 允许访问的前端地址
    credentials: true, // 允许携带 cookie
  })
);

// 如果需要处理预检请求（特别是 PUT/PATCH/DELETE 等）
app.options("*", cors());

// -------------------- 安全性增强中间件 --------------------

// 设置各种 HTTP 安全头
app.use(helmet({ contentSecurityPolicy: false }));

// 限流中间件：防止接口被暴力请求攻击
const limiter = rateLimit({
  max: 2000, // 每小时最多请求 2000 次（可视情况调整）
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour.",
});
app.use("/api", limiter); // 应用于所有 API 路由

// 防止 MongoDB 注入攻击
app.use(mongoSanitize());

// 防止 XSS 脚本攻击
app.use(xss());

// 防止参数污染，白名单内的字段可以重复
app.use(
  hpp({
    whitelist: ["type", "category", "distance", "rating", "price"],
  })
);

// -------------------- 基础功能中间件 --------------------

// 请求体解析，限制 JSON 请求体最大为 10kb
app.use(express.json({ limit: "10kb" }));

// 表单数据解析
app.use(express.urlencoded({ extended: true }));

// 解析 cookie（可用于身份验证）
app.use(cookieParser());

// 静态文件（如地图资源、图标等）
app.use(express.static(path.join(__dirname, "public")));

// 开发环境日志
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 请求时间戳（可用于日志分析）
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// -------------------- 路由挂载 --------------------

app.use("/api/routes", routeRoutes);
app.use("/api/attractions", attractionRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/positions", positionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userActivity", userActivityRoutes);
app.use("/api/favorites", favoriteRoutes);

// 前端静态资源托管
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// 前端 SPA 的 fallback 路由（放在最后）
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// -------------------- 未匹配路由 & 错误处理 --------------------

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
