const about_index = (req, res) => {
  res.render("about", { title: "Hakkımızda " });
};

const about_us = (req, res) => {
  res.redirect("/about");
};

module.exports = {
  about_index,
  about_us,
};
