const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.status(201).json({
    token: "fake-jwt-token"
  });
});

module.exports = router;