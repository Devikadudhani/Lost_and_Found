import React from "react";
import { Link } from "react-router-dom";
import WeOffer from "../AboutUs/weOffer";

function Hero() {
  return (
     <section className="flex justify-center px-4 my-8 animate-fadeIn">
      <div className="flex flex-col items-center gap-8 w-full max-w-[1000px]">
        <div className="relative w-full ">
          {/* Image */}
          <img
            src="/image.png"
            alt="IGDTUW"
            className="w-full h-auto object-contain rounded-md shadow-md"
          />

          {/* Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-8  text-center px-4 sm:px-8">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-themeGreen">
                Find Your Lost Items
              </h1>
              <p className="text-sm sm:text-base md:text-lg max-w-2xl text-themeGreen">
                Search or report lost items on campus and get them back where
                they belong.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/Lost">
                <button className="px-6 py-2 rounded-md text-themeGreen font-semibold bg-themeCream">
                  Report Lost Item
                </button>
              </Link>
              <Link to="/Found">
                <button className="px-4 py-2 rounded-md text-themeGreen font-semibold bg-themeCream">
                  Report Found Item
                </button>
              </Link>
            </div>
          </div>
        </div>
        <WeOffer />
      </div>
    </section>
  );
}

export default Hero;
