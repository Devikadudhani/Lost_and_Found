import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email });

      if (res.data.message) {
        alert("OTP sent to email!");
        setOtpSent(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Error sending OTP");
    }
  };

  const handleVerifyOtpAndLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    try {
      const res = await api.post("/auth/verify-otp", { email, otp });
      if (res.data.message) {
        alert("OTP verified! Login successful.");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    }
  };
  const handleSubmit = otpSent ? handleVerifyOtpAndLogin : handleSendOtp;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const res = await api.post("/auth/login", { email });

  //     if (res.data.message) {
  //       alert("OTP sent to email!");
  //       // Navigate to OTP verification page with email and type
  //       navigate("/verify-otp", { state: { email, type: "login" } });
  //     }
  //   } catch (err) {
  //     setError(err.response?.data?.error || "Login failed");
  //   }
  // };

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="flex w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md">
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-center text-themeGreen mb-6">
            Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="IGDTUW Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={otpSent}
              className="w-full rounded-lg border px-3 py-2"
            />
            {otpSent && (
              <input
                type="text"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2"
              />
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-themeGreen text-themeCream font-semibold py-[10px] rounded-lg shadow-md"
            >
              {otpSent ? "Verify OTP & Login" : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
