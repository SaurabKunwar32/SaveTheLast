import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, TreePine } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/parks", label: "National Parks" },
    { to: "/rare-species", label: "Rare Species" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 shadow-xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all">
                <TreePine className="h-8 w-8 text-emerald-200" />
              </div>
              <div>
                <span className="text-white text-xl font-bold">
                  SaveTheLast
                </span>
                <div className="text-emerald-200 text-xs">
                  Conservation & Discovery
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-emerald-100 hover:text-white transition relative group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-300 group-hover:w-full transition-all"></span>
              </Link>
            ))}

            <Link
              to="/login"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-2 rounded-lg shadow-lg transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-emerald-100 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-emerald-900/95 rounded-lg mt-2 mb-4 shadow-xl">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-emerald-100 hover:text-white px-4 py-3 rounded-lg transition hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-lg text-center transition"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
