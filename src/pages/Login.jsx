import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="flex w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md">
        
        {/* Left Section */}
        <div className="flex-1 p-10 flex flex-col justify-center min-h-full">
          <h1 className="text-2xl font-bold text-center text-themeGreen mb-6">
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

            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>

          {/* Keep this */}
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
