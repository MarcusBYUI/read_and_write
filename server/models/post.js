const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  excerpt: { type: String },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Post", postSchema);
