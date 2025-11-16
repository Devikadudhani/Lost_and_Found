import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/signup", { email, password });
      if (res.data.message) {
        alert("Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="flex w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md">
        {/* Left: Signup Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center text-themeGreen mb-6">
            Sign Up
          </h1>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full bg-themeGreen text-themeCream font-semibold py-[10px] rounded-lg shadow-md"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-5">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-themeGreen font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>

        {/* Right: Logo */}
        <div className="flex-1 flex items-center justify-center p-10">
          <img
            src="/logoWithname.png"
            alt="Logo"
            className="max-w-[250px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
