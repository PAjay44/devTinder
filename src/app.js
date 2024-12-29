const express = require("express");

const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  // creating a new instance user from req body data  ;

  try {
    // validation of user data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

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

    const isPasswordValid = await bcrypt.compare(password, user.password); // plain text,hash password
    if (isPasswordValid) {
      res.send("login successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmail }); // returning promise and assigning to a user variable
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId; // req.params comes from :userId
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ]; // except these you cannot update or add any of the fields

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    // It loop through each key in object and make sure every key present in allowed updates
    // If any of these keys not present in Allowed Updates isUpdates should be false
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE failed:" + err.message);
  }
});

connectDB()
  .then(() => {
    // Here we calling database connection function and connectDB will connect to the database
    // whenever it connected to DB ,it return a promise with then()

    console.log("Database connection established successfully");

    app.listen(3000, () => {
      console.log("server is successfully listening");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
