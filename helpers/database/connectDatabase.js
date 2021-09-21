const mongoose = require("mongoose");

const connectDatabase = () => {
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
};

module.exports = connectDatabase;
