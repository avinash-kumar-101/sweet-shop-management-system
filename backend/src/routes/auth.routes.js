

const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profile,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// PROFILE (Protected)
router.get("/profile", authMiddleware, profile);

module.exports = router;