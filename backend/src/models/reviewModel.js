const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  user: {
    //评论发布者
    type: ObjectId,
    ref: "User",
    require: true,
  },
  attraction: {
    //对应的景点
    type: ObjectId,
    ref: "attractions",
    require: true,
  },
  rating: {
    //评分
    type: Number,
    min: 1,
    max: 5,
    require: true,
  },
  content: {
    //评论内容
    type: String,
    require: true,
  },
  replies: [
    {
      user: { type: ObjectId, ref: "User" },
      content: String,
      created_at: { type: Date, default: Date.now() },
    },
  ],
  created_at: { type: Date, default: Date.now() },
  updated_at: Date,
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
