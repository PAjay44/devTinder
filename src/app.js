const express = require("express");

const app = express();

// Error handling
app.get("/getUserData", (req, res) => {
//   try {
//     throw new Error("sshjhs");
    res.send("user data sent");
//   } catch (err) {
//     res.status(500).send("some Error contact support team");
//   }
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(3000); // listening the req on port 3000
