const express = require("express");

const connectDB = require("./config/database");

const app = express();

const { validateSignUpData } = require("./utils/validation");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  // creating a new instance user from req body data  ;

  try {
    // validation of user data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);// password, number od salt rounds

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

app.post("/login", async (req, res) => {
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
      
      res.cookie("token", token,{ expies:new Date(Date.now() + 8 * 3600000)});
      res.send("login successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  // user who authenticated only make this api call

  const user = req.user;

  res.send(user.firstName + " sent you connection request");
});

connectDB()
  .then(() => {
    // Here we are calling database connection function, and connectDB will connect to the database
    // whenever it connected to DB ,it return a promise with then()

    console.log("Database connection established successfully");

    app.listen(3000, () => {
      console.log("server is successfully listening");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
