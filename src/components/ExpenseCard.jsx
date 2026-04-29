export default function ExpenseCard({ title, amount, type = "default" }) {
  const colors = {
    income: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    expense: "bg-red-500/10 border-red-500/20 text-red-400",
    balance: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
    default: "bg-[#1e1e2e] border-white/5 text-white",
  };

  const icons = {
    income: "↑",
    expense: "↓",
    balance: "◈",
    default: "$",
  };

  return (
    <div className={`border rounded-2xl p-5 flex flex-col gap-2 ${colors[type]}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">
          {title}
        </span>
        <span className="text-xl">{icons[type]}</span>
      </div>
      <p className="text-3xl font-bold tracking-tight">
        ${amount.toLocaleString()}
      </p>
    </div>
  );
}