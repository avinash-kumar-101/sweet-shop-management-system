

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

/**
 * REGISTER
 */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  // JWT generate
  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // NOTE: abhi DB nahi hai, isliye hashedPassword store nahi kar rahe
  // real project me yahi DB save hota

  return res.status(201).json({
    token,
  });
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // NOTE: DB nahi hai, isliye bcrypt.compare skip
  // real world me yahin compare hota

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    token,
  });
});


const authMiddleware = require("../middleware/auth.middleware");

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;