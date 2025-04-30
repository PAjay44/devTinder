const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

require("./utils/cronjob");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const staticPagesRouter = require("./routes/staticPages")

app.use("/", authRouter);// '/' means it will match all the routes ,it will check the route if matches send the response
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", staticPagesRouter);


connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT, () => {
      console.log("Server is successfully listening on port 3000...");
    });
    // Here we are calling database connection function, and connectDB will connect to the database
    // whenever it connected to DB ,it return a promise with then()
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });