import React from "react";

export default function Vision() {
  return (
    <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4 sm:px-8 md:px-16 lg:px-32 py-10 md:py-16">
      <div className="flex-shrink-0">
        <img
          src="/vision2.jpg"
          alt="Vision Logo"
          className="w-56 sm:w-64 md:w-80 h-auto object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col items-center md:items-start max-w-2xl text-center md:text-left">
        <h4 className="text-themeGreen text-sm sm:text-md font-medium">
          Our Vision
        </h4>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
          What We Stand For
        </h2>
        <p className="text-sm sm:text-md text-gray-700 leading-relaxed">
          Our vision is to bridge the gap between lost and found items by
          creating a seamless platform that connects people with their
          belongings. We aim to foster a community where individuals can easily
          report lost items and claim those that have been found, ensuring no
          item goes unclaimed and no person feels the loss of their possessions
          for long.
        </p>
      </div>
    </div>
  );
}
