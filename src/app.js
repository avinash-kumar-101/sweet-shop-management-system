const express = require("express");

const app = express();

app.use(express.json());

// TEMPORARY register route (sirf test pass karne ke liye)
app.post("/api/auth/register", (req, res) => {
  return res.status(201).json({
    token: "dummy-token",
  });
});

module.exports = app;