// import User from "../models/User.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// /**
//  * @desc Register new user
//  * @route POST /api/auth/register
//  */
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // 1. Validation
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // 2. Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // 3. Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 4. Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // 5. Create JWT
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.status(201).json({
//       message: "User registered",
//       token,
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };



// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// /**
//  * REGISTER
//  */
// const register = async (req, res) => {
//   try {
//     if (!req.body) {
//       return res.status(400).json({ message: "Request body missing" });
//     }

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const token = jwt.sign(
//       { email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

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
// };

// /**
//  * LOGIN
//  */
// const login = async (req, res) => {
//   try {
//     if (!req.body) {
//       return res.status(400).json({ message: "Request body missing" });
//     }

//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }

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
// };

// /**
//  * PROFILE
//  */
// const profile = (req, res) => {
//   res.status(200).json({
//     message: "Protected route accessed",
//     user: req.user,
//   });
// };

// module.exports = {
//   register,
//   login,
//   profile,
// };



const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * REGISTER
 */
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Registration failed",
      error: err.message,
    });
  }
};

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};

/**
 * PROFILE
 */
exports.profile = (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
};