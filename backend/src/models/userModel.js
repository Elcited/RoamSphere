const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    //用户名
    type: String,
    require: [true, "A user must have a name"],
  },
  gender: {
    //性别
    type: String,
    enum: ["male", "female", "unknown"],
    default: "unknown",
  },
  email: {
    //邮箱
    type: String,
    require: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
  },
  phone: {
    //电话号码
    type: String,
  },
  avatar: {
    //头像
    type: String,
    default: "default.jpg",
  },
  description: {
    //个人简介
    type: String,
  },
  password: {
    //密码
    type: String,
    require: [true, "Please input your password"],
    minlength: [8, "A password should be greater than 8 characters"],
    select: false,
  },
  passwordConfirm: {
    //二次确认密码
    type: String,
    require: [true, "Please confirm your password"],
  },
  preferences: {
    //旅行喜好：偏好的城市和旅行方式
    favorite_cities: [String],
    travel_style: String,
  },
  favorites: [
    //景点收藏夹
    {
      type: String,
      item_id: ObjectId,
    },
  ],
  created_at: { type: Date, default: Date.now() },
  updated_at: Date,
});

const User = model("User", userSchema);

module.exports = User;
