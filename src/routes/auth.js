const express = require("express");

const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");

const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  // creating a new instance user from req body data  ;

  try {
    // validation of user data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10); // password, number od salt rounds

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password); // plain text,hash password
    if (isPasswordValid) {
      // if password,email valid create a JWT token
      const token = await user.getJWT();

      res.cookie("token", token, {
        expies: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  // logout no need whether user login not login ,if you click on logout it just logout
  // Here we no need authentication

  res.cookie("token", null, { expires: new Date(Date.now()) }); // Set token to be null and expires by just now and logout
  res.send('Logout Successfully');
});

module.exports = authRouter;
