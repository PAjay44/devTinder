const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    // creating userschema using mongoose schema
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },

    lastName: {
      type: String,
    },

    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address:" + value);
        }
      },
    },

    password: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      min: 18,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error(" gender data is not valid");
        }
      },
    },

    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL: " + value);
        }
      },
    },

    about: {
      type: String,
      default: "This is default about the user!",
    },
    skills: {
      type: [String],
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
// creating mongoose model
// first one is name of the model and second one is schema you passed.
module.exports = User;
