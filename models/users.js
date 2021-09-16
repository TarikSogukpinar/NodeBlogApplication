const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");

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
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrpyt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error("Parolanız hatalı");
    }
  } else {
    throw Error("Kullanici Yok!");
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
