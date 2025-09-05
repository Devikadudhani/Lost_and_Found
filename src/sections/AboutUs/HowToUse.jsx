import React from "react";

function HowToUse() {
  return (
    <div className="flex flex-col items-center mt-8 ">
      <div className="flex flex-col items-center mb-10">
        <h4 className="mb-2 text-themeGreen text-md font-medium">
          Navigate with ease
        </h4>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 text-center md:text-left">
          How It Works
        </h2>
        {/* Single Image Below Headings */}
        <img
          src="/flow.jpg"
          alt="Key Features Illustration"
          className="w-full max-w-md object-contain"
        />
        <img
          src="/flow.jpg"
          alt="Key Features Illustration"
          className="w-full max-w-md object-contain"
        />
      </div>
    </div>
  );
}

export default HowToUse;
