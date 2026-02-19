import React from "react";

function HowToUse() {
  return (
    <div className="flex flex-col items-center mt-8 px-4">
      <div className="flex flex-col items-center mb-10 text-center">
        <h4 className="mb-2 text-themeGreen text-sm sm:text-md font-medium">
          Navigate with ease
        </h4>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
          How It Works
        </h2>

        <img
          src="/flow.png"
          alt="How it works flow"
          className="w-full max-w-[320px] sm:max-w-[500px] md:max-w-[700px] lg:max-w-[900px] object-contain"
        />
      </div>
    </div>
  );
}

export default HowToUse;
