import { useState } from "react";
import axios from "axios";

export default function AddExpense({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/transactions",
        { title, amount: Number(amount), type, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onAdd(res.data);
      setTitle("");
      setAmount("");
      setCategory("");
      setOpen(false);
    } catch (err) {
      console.error(err.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-500 text-white text-3xl w-14 h-14 rounded-full shadow-lg z-50"
      >
        +
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1e1e2e] p-6 rounded-2xl shadow-xl w-96 flex flex-col gap-4">
            <h2 className="text-white text-xl font-semibold">Add Transaction</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-[#2a2a3d] text-white p-2 rounded-lg outline-none placeholder-gray-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-[#2a2a3d] text-white p-2 rounded-lg outline-none placeholder-gray-500"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-[#2a2a3d] text-white p-2 rounded-lg outline-none"
              >
                <option value="">Select category (optional)</option>
                <option value="Food & Dining">Food & Dining</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Rent & Utilities">Rent & Utilities</option>
                <option value="Education">Education</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Other">Other</option>
              </select>
              {/* Income or Expense toggle */}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-[#2a2a3d] text-white p-2 rounded-lg outline-none"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <div className="flex gap-2 justify-end mt-2">
                <button type="button" onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}