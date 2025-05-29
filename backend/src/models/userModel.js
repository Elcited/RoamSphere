const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have a name"],
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [30, "Name cannot exceed 30 characters"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["男", "女", "unknown"],
      default: "unknown",
    },
    birthday: {
      type: String,
      default: "unknown",
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          // 简单中国手机号验证，可根据项目需求换更严格的
          return /^1[3-9]\d{9}$/.test(v);
        },
        message: "Please provide a valid Chinese phone number",
      },
    },
    avatar: {
      type: String,
      default: "default.jpg",
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot exceed 200 characters"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please input your password"],
      minlength: [8, "A password should be at least 8 characters"],
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // 只在 .save() 或 .create() 时生效
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same.",
      },
    },

    preferences: {
      favorite_cities: [String],
      travel_style: {
        type: String,
        enum: ["budget", "luxury", "adventure", "relax", "culture"],
      },
    },

    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 保存前加密密码
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// 自动更新时间戳
userSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

userSchema.method({
  correctPassword: async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
  },

  changedPasswordAfter: function (JWTTimestamp) {
    if (this.passwordChangeAt) {
      const changedTimestamp = Number.parseInt(
        this.passwordChangeAt.getTime() / 1000,
        10
      );

      return JWTTimestamp < changedTimestamp;
    }
    return false;
  },

  createPasswordResetToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetExpired = Date.now() + 10 * 60 * 1000;
    return resetToken;
  },
});

const User = model("User", userSchema);

module.exports = User;
