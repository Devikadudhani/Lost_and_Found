import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-themeGreen text-themeCream shadow-md">
      <div className="max-w-7xl py-2 px-2 mx-auto ">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="IGDTUW Lost & Found Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="font-bold text-xl">Lost and Found</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 ">
            <Link to={"/"}>
              <span className="font-bold">Home</span>
            </Link>
            <span className="font-bold">Lost Items</span>
            <span className="font-bold">Found Items</span>
            <span className="font-bold">Contact Us</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to={"/Login"}>
              <span className="px-6 py-2 rounded-full text-themeGreen bg-themeCream  ">
                Login
              </span>
            </Link>
            <Link to={"/Signup"}>
              <span className="px-4 py-2 rounded-full text-themeGreen bg-themeCream">
                Sign Up
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
