import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-themeGreen text-themeCream shadow-md">
      <div className="max-w-7xl py-2 px-4 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to={"/"}>
              <img
                src="/logo.png"
                alt="IGDTUW Lost & Found Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
            </Link>
            <Link to="/">
              <span className="font-bold text-lg md:text-xl">
                Lost and Found
              </span>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-themeCream"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/">Home</Link>
            <Link to="/lost-items">Lost Items</Link>
            <Link to="/found-items">Found Items</Link>
            <Link to="/About">About Us</Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/profile">
                  <span className="px-6 py-2 rounded-full font-semibold text-themeGreen bg-themeCream">
                    Hey, {user.name?.split(" ")[0] || "User"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full font-semibold text-themeGreen bg-themeCream"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/Login">
                  <span className="px-6 py-2 rounded-full font-semibold text-themeGreen bg-themeCream">
                    Login
                  </span>
                </Link>
                <Link to="/Signup">
                  <span className="px-6 py-2 rounded-full font-semibold text-themeGreen bg-themeCream">
                    Sign Up
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-4 py-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/lost-items" onClick={() => setMenuOpen(false)}>
              Lost Items
            </Link>
            <Link to="/found-items" onClick={() => setMenuOpen(false)}>
              Found Items
            </Link>
            <Link to="/About" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>

            {user ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <span className="px-4 py-2 rounded-full font-semibold text-themeGreen bg-themeCream">
                    Hey, {user.name?.split(" ")[0] || "User"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full font-semibold text-themeGreen bg-themeCream"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/Login" onClick={() => setMenuOpen(false)}>
                  <span className="px-4 py-2 rounded-full font-semibold text-themeGreen bg-themeCream">
                    Login
                  </span>
                </Link>
                <Link to="/Signup" onClick={() => setMenuOpen(false)}>
                  <span className="px-4 py-2 rounded-full font-semibold text-themeGreen bg-themeCream">
                    Sign Up
                  </span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
