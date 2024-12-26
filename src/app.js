const express = require("express");

const connectDB = require("./config/database");

const app = express();

const User = require('./models/user')

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "ajay",
    lastName: "panidapu",
    emailId: " ajay@gmail.com",
    password: "ajay@220",
  });

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

    console.log('Database connection established successfully');

    app.listen(3000, () => {
        console.log("server is successfully listening");
      });
    
  })
  .catch((err) => {
    console.log('Database cannot be connected!!')
  })

  
