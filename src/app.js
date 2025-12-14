
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

const app = express(); // ✅ sabse pehle

connectDB();

app.use(cors());
app.use(express.json()); // 🔥 THIS IS CRITICAL

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;