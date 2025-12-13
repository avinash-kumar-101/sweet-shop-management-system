
// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const authMiddleware = require("../middleware/auth.middleware");

// const router = express.Router();

// /**
//  * REGISTER
//  * POST /api/auth/register
//  */
// router.post("/register", async (req, res) => {
//   try {
//     // safety check
//     if (!req.body) {
//       return res.status(400).json({
//         message: "Request body missing",
//       });
//     }

//     const { email, password } = req.body;

//     // validation
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // generate token
//     const token = jwt.sign(
//       { email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     // abhi DB nahi hai (later add karenge)

//     return res.status(201).json({
//       message: "User registered",
//       token,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       message: "Something went wrong",
//       error: err.message,
//     });
//   }
// });

// /**
//  * LOGIN
//  * POST /api/auth/login
//  */
// router.post("/login", async (req, res) => {
//   try {
//     if (!req.body) {
//       return res.status(400).json({
//         message: "Request body missing",
//       });
//     }

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     // DB nahi hai → direct token (tests ke liye ok)
//     const token = jwt.sign(
//       { email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({
//       message: "Login successful",
//       token,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       message: "Something went wrong",
//       error: err.message,
//     });
//   }
// });

// /**
//  * PROFILE (Protected)
//  * GET /api/auth/profile
//  */
// router.get("/profile", authMiddleware, (req, res) => {
//   res.status(200).json({
//     message: "Protected route accessed",
//     user: req.user,
//   });
// });

// module.exports = router;


// const express = require("express");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const User = require("../models/User");
// const authMiddleware = require("../middleware/auth.middleware");

// const router = express.Router();

// /**
//  * REGISTER
//  * POST /api/auth/register
//  */
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // validation
//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     // check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // save user in DB
//     const user = await User.create({
//       email,
//       password: hashedPassword,
//     });

//     // generate token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return res.status(201).json({
//       message: "User registered successfully",
//       token,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       message: "Registration failed",
//       error: err.message,
//     });
//   }
// });

// /**
//  * LOGIN
//  * POST /api/auth/login
//  */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     // find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid email or password",
//       });
//     }

//     // compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Invalid email or password",
//       });
//     }

//     // generate token
//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({
//       message: "Login successful",
//       token,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       message: "Login failed",
//       error: err.message,
//     });
//   }
// });

// /**
//  * PROFILE (Protected)
//  * GET /api/auth/profile
//  */
// router.get("/profile", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");

//     return res.status(200).json({
//       message: "Protected route accessed",
//       user,
//     });

//   } catch (err) {
//     return res.status(500).json({
//       message: "Failed to fetch profile",
//     });
//   }
// });

// module.exports = router;



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