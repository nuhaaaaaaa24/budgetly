import { useState, useEffect } from "react";

const CATEGORIES = ["Food & Dining", "Transport", "Shopping", "Entertainment", "Health", "Rent & Utilities", "Education", "Other"];

export default function Budgets({ expenses }) {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  const currentMonth = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/budgets", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setBudgets(data);
      } catch (err) {
        console.error("Failed to fetch budgets", err);
      }
    };
    fetchBudgets();
  }, []);

  const handleAddBudget = async (e) => {
    e.preventDefault();
    if (!category || !limit) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/budgets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ category, limit: Number(limit), month: currentMonth })
      });
      const data = await res.json();
      setBudgets((prev) => {
        const exists = prev.find((b) => b._id === data._id);
        if (exists) return prev.map((b) => b._id === data._id ? data : b);
        return [...prev, data];
      });
      setCategory("");
      setLimit("");
    } catch (err) {
      console.error("Failed to add budget", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/budgets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setBudgets((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Failed to delete budget", err);
    }
  };

  // calculate how much spent per category this month
  const spentByCategory = expenses
    .filter((e) => {
      const month = new Date(e.date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
      return e.type === "expense" && month === currentMonth;
    })
    .reduce((acc, e) => {
      const cat = e.category || "Other";
      acc[cat] = (acc[cat] || 0) + e.amount;
      return acc;
    }, {});

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-1">Budgets</h1>
      <p className="text-gray-400 mb-8">Set monthly spending limits per category</p>

      {/* Add Budget Form */}
      <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-6 mb-8">
        <h2 className="text-gray-200 font-semibold mb-4">Set a Budget</h2>
        <form onSubmit={handleAddBudget} className="flex gap-3 flex-wrap">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#2a2a3d] text-white p-2 px-4 rounded-lg outline-none border border-white/5"
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Monthly limit ($)"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="bg-[#2a2a3d] text-white p-2 px-4 rounded-lg outline-none border border-white/5 w-48"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-medium"
          >
            Save Budget
          </button>
        </form>
      </div>

      {/* Budget List */}
      <div className="space-y-4">
        {budgets.length === 0 && (
          <p className="text-gray-500 text-sm">No budgets set yet.</p>
        )}
        {budgets.map((budget) => {
          const spent = spentByCategory[budget.category] || 0;
          const percentage = Math.min((spent / budget.limit) * 100, 100);
          const isOver = spent > budget.limit;

          return (
            <div key={budget._id} className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-white font-medium">{budget.category}</p>
                  <p className={`text-sm ${isOver ? "text-red-400" : "text-gray-400"}`}>
                    {isOver
                      ? `⚠️ Overspent by $${(spent - budget.limit).toLocaleString()}`
                      : `$${spent.toLocaleString()} of $${budget.limit.toLocaleString()} spent`}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(budget._id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/5 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all ${isOver ? "bg-red-500" : percentage > 80 ? "bg-yellow-500" : "bg-indigo-500"}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-right text-xs text-gray-500 mt-1">{percentage.toFixed(0)}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}