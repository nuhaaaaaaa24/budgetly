import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ firstName: "", lastName: "", userName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
      <div className="bg-[#1e1e2e] p-8 rounded-2xl w-full max-w-md shadow-xl flex flex-col gap-5">
        <h1 className="text-white text-3xl font-bold">Create Account</h1>
        <p className="text-gray-400 text-sm">Start tracking your finances today</p>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            value={form.firstName}
            onChange={handleChange}
            className="bg-[#2a2a3d] text-white p-3 rounded-lg outline-none placeholder-gray-500"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last name"
            value={form.lastName}
            onChange={handleChange}
            className="bg-[#2a2a3d] text-white p-3 rounded-lg outline-none placeholder-gray-500"
          />
          <input
            name="userName"
            type="text"
            placeholder="User name"
            value={form.userName}
            onChange={handleChange}
            className="bg-[#2a2a3d] text-white p-3 rounded-lg outline-none placeholder-gray-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="bg-[#2a2a3d] text-white p-3 rounded-lg outline-none placeholder-gray-500"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="bg-[#2a2a3d] text-white p-3 rounded-lg outline-none placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold mt-2"
          >
            Register
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}