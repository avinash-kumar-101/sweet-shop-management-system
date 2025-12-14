const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  createProduct,
  getProducts,
} = require("../controllers/product.controller");

router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);

module.exports = router;