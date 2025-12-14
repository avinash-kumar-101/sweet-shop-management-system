
const Product = require("../models/Product");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

    const product = await Product.create({ name, price });

    res.status(201).json({
      message: "Product created",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: "Products fetched", products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        message: "Name and price required",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated",
      product: updatedProduct,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};