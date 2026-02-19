import React from "react";

function Signup() {
  const handleGoogleSignup = () => {
    window.location.href =
      "https://lost-and-found1-9n5a.onrender.com/api/auth/google";
  };

  return (
    <div className="my-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-themeCream rounded-3xl shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-center text-themeGreen mb-6">
              Sign Up
            </h1>

            <button
              onClick={handleGoogleSignup}
              className="w-full bg-white border border-gray-300 py-3 rounded-lg shadow-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              <span className="font-medium">Sign up with Google</span>
            </button>

            <p className="text-center text-sm text-gray-500 mt-5">
              Only IGDTUW email accounts allowed
            </p>
          </div>

          {/* Right Logo Section */}
          <div className="flex-1 flex items-center justify-center p-8 md:p-10 bg-themeCream">
            <img
              src="/logoWithname.png"
              alt="Logo"
              className="w-40 md:w-60 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
