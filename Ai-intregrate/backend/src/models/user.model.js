const mongoose = require("mongoose");

const UserSchama = mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
  });

const userModel = new  mongoose.model('user' , UserSchama )

module.exports = userModel