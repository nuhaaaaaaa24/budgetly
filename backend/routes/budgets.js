import express from "express";
import Budget from "../models/Budget.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all budgets for current month
router.get("/", auth, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.userId });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST new budget
router.post("/", auth, async (req, res) => {
  try {
    const { category, limit, month } = req.body;

    // update if already exists for that category and month
    const existing = await Budget.findOneAndUpdate(
      { user: req.userId, category, month },
      { limit },
      { new: true, upsert: true }
    );

    res.status(201).json(existing);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE budget
router.delete("/:id", auth, async (req, res) => {
  try {
    await Budget.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: "Budget deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;