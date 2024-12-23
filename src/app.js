const express = require("express");

const app = express();

const { adminAuth } = require("./middlewares/auth");

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

app.post("/user/login", (req, res) => {
  res.send("user logged in successfully");
});

app.get((req, res) => {
  res.send("user data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send(" Data deleted");
});

app.listen(3000); // listening the req on port 3000
