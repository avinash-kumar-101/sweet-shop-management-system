const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  return res.status(201).json({
    token: "fake-jwt-token"
  });
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // abhi simple fake login (tests ke liye enough)
  return res.status(200).json({
    token: "fake-jwt-token",
  });
});

module.exports = router;