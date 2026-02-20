import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
const location = useLocation();
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const errorParam = params.get("error");

  if (errorParam === "unauthorized") {
    setError("Only IGDTUW email accounts are allowed to login.");
    window.history.replaceState({}, document.title, "/login");
  }

}, [location]);
  return (
    <div className="my-10 sm:my-20 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row w-full max-w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md">
        
        {/* Left Section */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center">
          <h1 className="text-xl sm:text-2xl font-bold text-center text-themeGreen mb-6">
            Login
          </h1>

          <div className="space-y-5">
            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "https://lost-and-found1-9n5a.onrender.com/api/auth/google";
              }}
              className="w-full border border-gray-300 py-2 rounded-lg mb-4 bg-white hover:bg-gray-100"
            >
              Continue with Google
            </button>

{error && (
  <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center">
    {error}
  </div>
)}          </div>

          <p className="text-sm text-center mt-5">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-themeGreen font-medium hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>

        {/* Right Logo */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <img
            src="/logoWithname.png"
            alt="Logo"
            className="max-w-[180px] sm:max-w-[250px] object-contain"
          />
        </div>

      </div>
    </div>
  );
}

export default Login;