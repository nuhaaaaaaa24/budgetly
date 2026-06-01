import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#84cc16"];

export default function Analytics({ expenses }) {

  // Pie chart - expense breakdown by category
  const categoryData = expenses
    .filter((e) => e.type === "expense")
    .reduce((acc, e) => {
      const cat = e.category || "Other";
      acc[cat] = (acc[cat] || 0) + e.amount;
      return acc;
    }, {});

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData),
      backgroundColor: COLORS,
      borderWidth: 0,
    }]
  };

  // Bar chart - monthly income vs expenses
  const monthlyData = expenses.reduce((acc, e) => {
    const month = new Date(e.date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (!acc[month]) acc[month] = { month, income: 0, expenses: 0 };
    if (e.type === "income") acc[month].income += e.amount;
    else acc[month].expenses += e.amount;
    return acc;
  }, {});

  const barData = {
    labels: Object.values(monthlyData).map((d) => d.month),
    datasets: [
      {
        label: "Income",
        data: Object.values(monthlyData).map((d) => d.income),
        backgroundColor: "#10b981",
        borderRadius: 4,
      },
      {
        label: "Expenses",
        data: Object.values(monthlyData).map((d) => d.expenses),
        backgroundColor: "#ef4444",
        borderRadius: 4,
      }
    ]
  };

  const chartOptions = {
    plugins: {
      legend: { labels: { color: "#9ca3af" } }
    },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.05)" } },
      y: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(255,255,255,0.05)" } }
    }
  };

  // Summary stats
  const totalIncome = expenses.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0);
  const biggestCategory = Object.entries(categoryData).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-1">Analytics</h1>
      <p className="text-gray-400 mb-8">Visual breakdown of your finances</p>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-5">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Total Income</p>
          <p className="text-emerald-400 text-3xl font-bold">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-5">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Total Expenses</p>
          <p className="text-red-400 text-3xl font-bold">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-5">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Top Spending Category</p>
          <p className="text-indigo-400 text-3xl font-bold">{biggestCategory}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-6">
          <h2 className="text-gray-200 font-semibold mb-4">Expenses by Category</h2>
          {Object.keys(categoryData).length === 0 ? (
            <p className="text-gray-500 text-sm">No expense data yet.</p>
          ) : (
            <Pie data={pieData} options={{ plugins: { legend: { labels: { color: "#9ca3af" } } } }} />
          )}
        </div>

        <div className="bg-[#1e1e2e] border border-white/5 rounded-2xl p-6">
          <h2 className="text-gray-200 font-semibold mb-4">Monthly Income vs Expenses</h2>
          {Object.keys(monthlyData).length === 0 ? (
            <p className="text-gray-500 text-sm">No data yet.</p>
          ) : (
            <Bar data={barData} options={chartOptions} />
          )}
        </div>
      </div>
    </div>
  );
}