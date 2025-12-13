// const Product = require("../models/Product");

// /**
//  * CREATE PRODUCT
//  */
// exports.createProduct = async (req, res) => {
//   try {
//     const { name, price, stock, category } = req.body;

//     if (!name || !price) {
//       return res.status(400).json({
//         message: "Name and price required",
//       });
//     }

//     const product = await Product.create({
//       name,
//       price,
//       stock,
//       category,
//     });

//     res.status(201).json({
//       message: "Product created",
//       product,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to create product",
//     });
//   }
// };

// /**
//  * GET ALL PRODUCTS
//  */
// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to fetch products",
//     });
//   }
// };

// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);


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

module.exports = {
  createProduct,
  getProducts,
};