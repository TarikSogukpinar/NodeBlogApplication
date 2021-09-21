const Blog = require("../models/blogs");
const User = require("../models/users");
const CustomError = require("../helpers/error/CustomError");

const admin_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("admin", { title: "Admin", blogs: result });
    })
    .catch((err) => {
      return new CustomError(err);
    });
};

const admin_add = (req, res) => {
  res.render("add", { title: "Yeni Yazi" });
};

const admin_add_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      return new CustomError(err);
    });
};

const admin_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ link: "/admin" });
    })
    .catch((err) => {
      return new CustomError(err);
    });
};

module.exports = {
  admin_index,
  admin_add,
  admin_add_post,
  admin_delete,
};
