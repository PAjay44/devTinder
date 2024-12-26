const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ // creating userschema using mongoose schema
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
  },

  emailId: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
// creating mongoose model
// first one is name of the model and second one is schema you passed.
module.exports = User;

