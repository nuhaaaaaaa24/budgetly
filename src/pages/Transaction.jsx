import { useState } from "react";
import AddExpense from "../components/AddExpense";

export default function Transactions({ expenses, addExpense, deleteExpense, editExpense }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [editingExp, setEditingExp] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", amount: "", type: "expense", category: "" });

  const handleEditClick = (exp) => {
    setEditingExp(exp._id);
    setEditForm({ title: exp.title, amount: exp.amount, type: exp.type, category: exp.category || "" });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editExpense(editingExp, { ...editForm, amount: Number(editForm.amount) });
    setEditingExp(null);
  };

  const filtered = expenses
    .filter((e) => filterType === "all" || e.type === filterType)
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-white mb-1">Transactions</h1>
        <p className="text-gray-400 mb-8">View and manage all your transactions</p>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#1e1e2e] text-white p-2 px-4 rounded-lg outline-none placeholder-gray-500 border border-white/5 w-64"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-[#1e1e2e] text-white p-2 px-4 rounded-lg outline-none border border-white/5"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1e1e2e] text-gray-400 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                    No transactions found.
                  </td>
                </tr>
              )}
              {filtered.map((exp) => (
                <tr key={exp._id} className="bg-[#1a1a2e] hover:bg-[#1e1e2e] transition-colors">
                  <td className="px-4 py-3 text-gray-200">{exp.title}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      exp.type === "income" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                    }`}>
                      {exp.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{exp.category || "—"}</td>
                  <td className={`px-4 py-3 font-semibold ${
                    exp.type === "income" ? "text-emerald-400" : "text-red-400"
                  }`}>
                    {exp.type === "income" ? "+ " : "- "}${exp.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(exp.date).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric"
                    })}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleEditClick(exp)}
                      className="px-3 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/40 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteExpense(exp._id)}
                      className="px-3 py-1 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingExp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1e1e2e] p-6 rounded-2xl shadow-xl w-96 flex flex-col gap-4">
            <h2 className="text-white text-xl font-semibold">Edit Transaction</h2>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="bg-[#2a2a3d] text-white p-2 rounded-lg outline-none placeholder-gray-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={editForm.amount}
                onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                className="bg-[#2a2a3d] text-white p-2 rounded-lg outline-none placeholder-gray-500"
              />
              <select
            value={editForm.category}
            onChange={(e) => setEditForm({...editForm, category: e.target.value})}
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
              <select
                value={editForm.type}
                onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                className="bg-[#2a2a3d] text-white p-2 rounded-lg outline-none"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              <div className="flex gap-2 justify-end mt-2">
                <button type="button" onClick={() => setEditingExp(null)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <AddExpense onAdd={addExpense} />
    </div>
  );
}