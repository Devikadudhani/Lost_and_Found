import React from "react";
import Team from "../sections/AboutUs/Team";
import WeOffer from "../sections/AboutUs/weOffer";
import Vision from "../sections/AboutUs/Vision";
import HowToUse from "../sections/AboutUs/HowToUse";

function About() {
  return (
    <div className="bg-themeCream m-0 p-0">
      <div
        className="relative w-full h-64 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/igdtuw.jpg')" }} // replace with your image path
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/65"></div>

        {/* Heading text */}
        <h1 className="relative text-3xl md:text-4xl font-bold text-white font-poppins drop-shadow-lg">
          About Us
        </h1>
      </div>
      <div className="flex flex-col gap-6">
        <Vision />
        <WeOffer />
        <HowToUse />
        <Team />
      </div>
    </div>
  );
}

export default About;
