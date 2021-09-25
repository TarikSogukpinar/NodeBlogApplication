const Blog = require("../models/blogs");
const CustomError = require("../helpers/error/CustomError");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("index", { title: "Anasayfa ", blogs: result });
    })
    .catch((err) => {
      return new CustomError(err);
    });
};

const blog_content = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)

    .then((result) => {
      res.render("blog", { blog: result, title: "Detay" });
    })
    .catch((err) => {
      res.render("404", { title: "Sayfa Bulunamadı !" });
      return new CustomError(err);
    });
};

module.exports = {
  blog_index,
  blog_content,
};
