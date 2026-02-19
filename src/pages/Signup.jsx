import React from "react";

function Signup() {
  const handleGoogleSignup = () => {
    window.location.href = "https://lost-and-found1-9n5a.onrender.com/api/auth/google";
  };

  return (
    <div className="my-20 flex items-center justify-center">
      <div className="flex w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md">
        
        {/* Left Section */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center text-themeGreen mb-6">
            Sign Up
          </h1>

          <button
            onClick={handleGoogleSignup}
            className="w-full bg-white border border-gray-300 py-3 rounded-lg shadow-sm flex items-center justify-center gap-3 hover:bg-gray-50"
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

export default Signup;
