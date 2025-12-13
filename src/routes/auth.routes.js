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

module.exports = router;