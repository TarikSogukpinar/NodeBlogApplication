const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
