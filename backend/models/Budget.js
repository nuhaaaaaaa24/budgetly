import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    enum: ["Food & Dining", "Transport", "Shopping", "Entertainment", "Health", "Rent & Utilities", "Education", "Salary", "Freelance", "Other"],
    required: true
  },
  limit: { type: Number, required: true },
  month: { type: String, required: true } // format: "Jun 2026"
}, { timestamps: true });

export default mongoose.model("Budget", budgetSchema);