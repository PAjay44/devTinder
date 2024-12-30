const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$777", {
    expiresIn: "1d",
  }); // when creating token hide some data inside it like user id, second pass some secret key and this will know only server.
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password

  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}



const User = mongoose.model("User", userSchema);
// creating mongoose model
// first one is name of the model and second one is schema you passed.
module.exports = User;
