import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function Signup() {
  const [formData, setFormData] = useState({ name: "", enrollment: "", email: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", formData);
      if (res.data.message) {
        alert("OTP sent to email!");
        navigate("/verify-otp", { state: { email: formData.email, type: "signup" } });
      }
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="flex w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md">
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-center text-themeGreen mb-6">Sign Up</h1>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2"
            />
            <input
              type="text"
              name="enrollment"
              placeholder="Enrollment Number"
              value={formData.enrollment}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="IGDTUW Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border px-3 py-2"
            />
            <button
              type="submit"
              className="w-full bg-themeGreen text-themeCream font-semibold py-[10px] rounded-lg shadow-md"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
