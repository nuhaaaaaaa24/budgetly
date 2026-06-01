import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ExpenseCard from "./components/ExpenseCard";
import Navbar from "./components/navbar";
import AddExpense from "./components/AddExpense";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Transactions from "./pages/Transaction";
import Analytics from "./pages/Analytics";
import Budgets from "./pages/Budgets";


function DashboardLayout({ expenses, addExpense }) {
  const totalExpenses = expenses.reduce((sum, e) => e.type === "expense" ? sum + e.amount : sum, 0);
  const totalIncome = expenses.reduce((sum, e) => e.type === "income" ? sum + e.amount : sum, 0);

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-white mb-1">Dashboard</h1>
        <p className="text-gray-400 mb-8">Track your spending at a glance</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <ExpenseCard title="Income" amount={totalIncome} type="income" />
          <ExpenseCard title="Expenses" amount={totalExpenses} type="expense" />
          <ExpenseCard title="Balance" amount={totalIncome - totalExpenses} type="balance" />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-200">Recent Transactions</h2>
        <div className="space-y-3">
          {expenses.length === 0 && (
            <p className="text-gray-500 text-sm">No transactions yet. Hit + to add one.</p>
          )}
          {expenses.slice(0, 5).map((exp) => (
            <div key={exp._id} className="bg-[#1e1e2e] p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-gray-200">{exp.title}</p>
                <p className="text-gray-500 text-xs">{exp.category || "No category"}</p>
              </div>
              <span className={exp.type === "income" ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                {exp.type === "income" ? "+ " : "- "}${exp.amount.toLocaleString()}
              </span>
            </div>
          ))}
          {expenses.length > 0 && (
            <div className="mt-4 text-center">
              <a
                href="/transactions"
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
              >
                View all transactions →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/transactions", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };

    fetchTransactions();
  }, []);

  const addExpense = (expense) => {
      setExpenses((prev) => [expense, ...prev]);
    };

  const deleteExpense = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Failed to delete transaction", err);
    }
  };

  const editExpense = async (id, updated) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updated)
      });
      const data = await res.json();
      setExpenses((prev) => prev.map((e) => e._id === id ? data : e));
    } catch (err) {
      console.error("Failed to edit transaction", err);
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<DashboardLayout expenses={expenses} addExpense={addExpense} />} />
      <Route path="/analytics" element={
        <div className="min-h-screen bg-[#0f0f1a] text-white">
          <Navbar />
          <Analytics expenses={expenses} />
        </div>
      } />
      <Route path="/transactions" element={
        <div className="min-h-screen bg-[#0f0f1a] text-white">
          <Navbar />
          <Transactions expenses={expenses} deleteExpense={deleteExpense} editExpense={editExpense} addExpense={addExpense} />
        </div>
      } />
      <Route path="/budgets" element={
        <div className="min-h-screen bg-[#0f0f1a] text-white">
          <Navbar />
          <Budgets expenses={expenses} />
        </div>
      } />
    </Routes>
  );
}

export default App;