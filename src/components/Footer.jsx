import React from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-themeGreen text-themeCream px-4 sm:px-8 md:px-12 py-8 flex flex-col items-center gap-8 w-full">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
        
        <div className="flex flex-col items-center sm:items-start gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="IGDTUW Lost & Found Logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-lg md:text-xl">Lost and Found</h2>
              <p className="text-xs md:text-sm leading-snug">
                Indira Gandhi Delhi Technical University for Women
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="font-bold mb-1">Report</h5>
          <Link to="/Lost" className="hover:underline">
            Lost
          </Link>
          <Link to="/Lost" className="hover:underline">
            Found
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h5 className="font-bold mb-1">Contact Us</h5>
          <p className="text-sm leading-relaxed">
            Madrasa Road Opposite,<br />
            St. James Church,<br />
            Kashmere Gate,<br />
            Delhi-110006
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link to="/About">
            <h5 className="font-bold">About Us</h5>
          </Link>
          <h5 className="font-bold">FAQs</h5>
          <h5 className="font-bold">Help</h5>
        </div>
      </div>

      <div className="w-full border-t border-themeCream/30 pt-4 text-center">
        <p className="text-xs sm:text-sm">
          © 2025 IGDTUW. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
