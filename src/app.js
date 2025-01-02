const express = require("express");

const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter); // '/' means it will match all the routes ,it will check the route if matches send the response
app.use("/", profileRouter);
app.use("/", requestRouter);

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
