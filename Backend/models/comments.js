const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
  blogId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Blog",
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "Comments",
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comments = mongoose.model("Comments", commentsSchema);
module.exports = Comments;
