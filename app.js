const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Mongo DB Connection is OK!");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.listen(process.env.PORT, () => {
  console.log("Port Listening...");
});

//ADDİNG CSS
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("*", checkUser);

app.get("/", (req, res) => {
  res.redirect("/blog");
});

app.use("/", authRoutes);
app.use("/blog", adminRoutes);
app.use("/admin", requireAuth, blogRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "Hakkımızda " });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.render("404", { title: "Sayfa Bulunamadı !" });
  res.status(404);
});
