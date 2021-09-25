const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const CustomError = require("../helpers/error/CustomError");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email !"],
    unique: true,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide valid email",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  state: {
    type: String,
  },
  region: {
    type: String,
  },
  education: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrpyt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      return new CustomError("Parolanız hatalı");
    }
  } else {
    return new CustomError("Kullanici Yok!");
  }
};



//HASHİNG

userSchema.pre("save", async function (next) {
  const salt = await bcrpyt.genSalt();
  this.password = await bcrpyt.hash(this.password, salt);
  next();
});

const User = new mongoose.model("user", userSchema);

module.exports = User;
