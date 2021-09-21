const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const profileRoutes = require("./routes/profileRoutes");
const connectDatabase = require("./helpers/database/connectDatabase");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");

const app = express();
dotenv.config();

connectDatabase();

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
app.use("/blog", blogRoutes);
app.use("/admin", requireAuth, adminRoutes);
app.get("/about", aboutRoutes);
app.get("/about-us", aboutRoutes);
app.use("/profile", profileRoutes);

app.use((req, res) => {
  res.render("404", { title: "Sayfa Bulunamadı !" });
  res.status(404);
});
