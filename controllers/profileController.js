const User = require("../models/users");
const CustomError = require("../helpers/error/CustomError");

const profile_index = (req, res) => {
  User.find()
    .sort({ createdAt: 1 })
    .then((result) => {
      res.render("profile", { title: "User Profile", blogs: result });
    })
    .catch((err) => {
      return new CustomError(err);
    });
};

const update_add_profile = (req, res) => {
  res.render("update", { title: "Bilgilerini Güncelle" });
};

const update_post = async (req, res, next) => {
  const user = new User(req.body);

  user
    .save()
    .then((result) => {
      res.redirect("/");
      next();
    })
    .catch((err) => {
      return new CustomError(err);
    });
};

module.exports = {
  profile_index,
  update_post,
  update_add_profile,
};
