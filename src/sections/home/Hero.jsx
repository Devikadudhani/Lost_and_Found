import React from "react";

function Hero() {
  return (
    <div className="my-6 flex justify-center px-4">
      <div className="relative w-full max-w-[1000px]">
        {/* Image */}
        <img
          src="/image.png"
          alt="IGDTUW"
          className="w-full h-auto object-contain rounded-md"
        />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-between py-8  text-center px-4 sm:px-8">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-themeGreen">
              Find Your Lost Items
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-w-2xl text-themeGreen">
              Search or report lost items on campus and get them back where they
              belong.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-2 rounded-md text-themeGreen font-semibold bg-themeCream">
              Report Lost Item
            </button>
            <button className="px-4 py-2 rounded-md text-themeGreen font-semibold bg-themeCream">
              Report Found Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
