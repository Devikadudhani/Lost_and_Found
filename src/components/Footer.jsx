import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-themeGreen text-themeCream mt-16">
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/logo.png"
              alt="IGDTUW Lost & Found Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-lg">Lost & Found</h2>
              <p className="text-sm opacity-80">
                IGDTUW
              </p>
            </div>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            A platform to report and recover lost and found items within the university community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-base mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/lost-items" className="hover:underline">Lost Items</Link>
            <Link to="/found-items" className="hover:underline">Found Items</Link>
            <Link to="/about" className="hover:underline">About Us</Link>
          </div>
        </div>

        {/* Report Section */}
        <div>
          <h4 className="font-semibold text-base mb-4">Report</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/lost" className="hover:underline">Report Lost Item</Link>
            <Link to="/found" className="hover:underline">Report Found Item</Link>
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h4 className="font-semibold text-base mb-4">Contact</h4>
          <p className="text-sm opacity-80 leading-relaxed">
            Indira Gandhi Delhi Technical University for Women<br />
            Madrasa Road, Kashmere Gate<br />
            Delhi - 110006
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-themeCream/30">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm opacity-80">
          <p>© 2025 IGDTUW Lost & Found. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
