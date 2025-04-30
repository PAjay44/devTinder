const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./utils/cronjob"); // load scheduled jobs

// Check if CORS is loaded
console.log("CORS loaded:", typeof cors);

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173", // Update if frontend is hosted elsewhere
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const staticPagesRouter = require("./routes/staticPages");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", staticPagesRouter);

// Connect to DB and start server
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is listening on port ${process.env.PORT || 3000}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });
