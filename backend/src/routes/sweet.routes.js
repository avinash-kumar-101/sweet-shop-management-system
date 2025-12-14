const express = require("express");
const Sweet = require("../models/Sweet");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * UPDATE SWEET
 * PUT /api/sweets/:id
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity } = req.body;

    const updatedSweet = await Sweet.findByIdAndUpdate(
      id,
      { name, category, price, quantity },
      { new: true }
    );

    if (!updatedSweet) {
      return res.status(404).json({
        message: "Sweet not found",
      });
    }

    res.status(200).json({
      message: "Sweet updated successfully",
      sweet: updatedSweet,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to update sweet",
    });
  }
});


module.exports = router;