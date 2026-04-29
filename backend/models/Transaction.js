import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: String,
    amount: Number,
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    category: {
        type: String,
        enum: ["Food & Dining", "Transport", "Shopping", "Entertainment", "Health", "Rent & Utilities", "Education", "Salary", "Freelance", "Other"],
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);