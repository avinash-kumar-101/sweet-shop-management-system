
const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/", authMiddleware, createProduct);
router.get("/", authMiddleware, getProducts);

// 🔥 UPDATE ROUTE
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;