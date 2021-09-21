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

module.exports = {
  profile_index,
};
