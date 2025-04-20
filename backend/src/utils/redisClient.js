const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
  password: "",
});

redisClient.on("error", err => {
  console.error("Redis error:", err);
});

redisClient.connect().then(() => {
  console.log("Redis connected!");
});

module.exports = redisClient;
