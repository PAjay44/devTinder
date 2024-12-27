const express = require("express");

const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

app.use(express.json());

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

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;

  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE failed:" + err.message);
  }
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body); // creating a new instance user from req body data  ;

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
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
