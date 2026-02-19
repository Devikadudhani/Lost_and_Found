import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/axios";

export default function CompleteProfile() {
  const [name, setName] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/auth/complete-profile",
        { name, enrollment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/login-success?token=" + token);
    } catch (err) {
      alert("Error completing profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-themeCream">
      <div className="bg-white rounded-3xl shadow-lg p-10 w-[420px]">
        <h2 className="text-2xl font-bold text-themeGreen text-center mb-6">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
          />

          <input
            type="text"
            placeholder="Enrollment Number"
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-themeGreen"
          />

          <button
            type="submit"
            className="w-full bg-themeGreen text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Complete Signup
          </button>
        </form>
      </div>
    </div>
  );
}
