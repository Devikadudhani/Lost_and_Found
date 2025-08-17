import React from "react";

function Login() {
  return (
    <div className="my-20 flex items-center justify-center">
      {/* Common Card */}
      <div className="flex w-[900px] bg-themeCream rounded-3xl overflow-hidden shadow-md">
        {/* Left: Login Form */}
        <div className="flex-1 p-10">
          <h1 className="text-2xl font-bold text-center text-themeGreen mb-6">
            Login
          </h1>

          <form className="space-y-5">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-themeGreen text-themeCream font-semibold py-[10px] rounded-lg shadow-md"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-5">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-themeGreen font-medium hover:underline"
            >
              Sign up
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

export default Login;
