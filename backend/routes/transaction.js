import express from "express";
import Transaction from "../models/Transaction.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all transactions for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new transaction
router.post("/", auth, async (req, res) => {
  try {
    const { title, amount, type, category } = req.body;
    const transaction = await Transaction.create({
      user: req.userId,
      title,
      amount,
      type,
      category: category || undefined
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId  // makes sure users can only delete their own transactions
    });

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// EDIT transaction
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, amount, type, category } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, amount, type, category },
      { new: true }
    );

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;