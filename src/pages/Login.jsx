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
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.user)
          localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("OTP verified! Login successful.");
        navigate("/dashboard");
      } else if (res.data.message) {
        alert(res.data.message);
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "OTP verification failed");
    }
  };
  const handleSubmit = otpSent ? handleVerifyOtpAndLogin : handleSendOtp;

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="flex w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md">
        {/* Left: Login Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center text-themeGreen mb-6">
            Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                disabled={otpSent}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            {otpSent && (
              <div className="flex flex-col">
                <label htmlFor="otp" className="text-sm font-medium mb-1">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            )}

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              className="w-full bg-themeGreen text-themeCream font-semibold py-[10px] rounded-lg shadow-md"
            >
              {otpSent ? "Verify OTP & Login" : "Send OTP"}
            </button>
          </form>

          {!otpSent && (
            <p className="text-sm text-center mt-5">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-themeGreen font-medium hover:underline"
              >
                Sign up
              </a>
            </p>
          )}
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

export default Login;
