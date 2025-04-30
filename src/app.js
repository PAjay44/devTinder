const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();

// ✅ Check if CORS is loaded correctly
console.log("CORS loaded:", typeof cors); // Should print: 'function'

// ✅ Register cron jobs (keep this after dotenv if using env vars)
require("./utils/cronjob");

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // Update if your frontend is hosted elsewhere
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// ✅ Routers - Ensure these files actually exist!
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/userRouter"); // ✅ Corrected filename!
const staticPagesRouter = require("./routes/staticPages");

// ✅ Routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", staticPagesRouter);

// ✅ Connect to DB and start server
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is listening on port ${process.env.PORT || 3000}...`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
