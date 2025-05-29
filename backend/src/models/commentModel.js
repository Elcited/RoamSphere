const { Schema, model, Types } = require("mongoose");

const commentSchema = new Schema({
  user: {
    // 评论发布者
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 被评论的对象（支持多类型引用）
  refType: {
    type: String,
    enum: ["Attraction", "Hotel", "、Position"],
    required: true,
  },
  refId: {
    type: Types.ObjectId,
    required: true,
  },

  rating: {
    // 评分（可选，只有评论景点/酒店时用）
    type: Number,
    min: 1,
    max: 5,
  },

  content: {
    type: String,
    required: true,
  },

  // 回复（评论的子级）
  replies: [
    {
      user: { type: Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      created_at: { type: Date, default: Date.now },
    },
  ],

  // 被点赞的用户
  likedBy: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
