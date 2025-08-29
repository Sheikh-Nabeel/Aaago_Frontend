import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "./Images/logo.png";
import { HiMenu, HiX } from "react-icons/hi";
import {
  logoutUser,
  selectIsAuthenticated,
  selectUser,
} from "../../store/userSlice";
import { useTheme } from "../../ThemeContext";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => dispatch(logoutUser());
  const scrollToTop = () => window.scrollTo(0, 0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Team", path: "/team" },
    { name: "FAQs", path: "/faqs" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md fixed top-0 left-0 z-50 max-lg:px-4 transition-colors duration-300">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-12 h-12 sm:w-14 sm:h-14" />
        </div>

        {/* Desktop Menu */}
        <ul className="flex gap-6 text-base font-medium mr-4 max-lg:hidden">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                onClick={scrollToTop}
                className={`transition-colors ${
                  location.pathname === link.path
                    ? "text-[#FFB800] font-semibold"
                    : "text-gray-900 dark:text-white hover:text-[#FFB800] dark:hover:text-[#FFB800]"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-all shadow-sm hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-all shadow-sm hover:scale-105"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/profile"
                onClick={scrollToTop}
                className="px-3 py-1.5 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-all shadow-sm hover:scale-105"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition-all shadow-sm hover:scale-105"
              >
                Logout
              </button>
            </div>
          )}

          {/* Theme Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <div
              className="w-14 h-6 rounded-full peer duration-300 bg-gray-200 dark:bg-gray-600 relative 
              before:content-['☀️'] before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2 
              before:w-4 before:h-4 before:flex before:items-center before:justify-center 
              before:transition-all peer-checked:before:opacity-0 
              after:content-['🌑'] after:absolute after:right-1 after:top-1/2 after:-translate-y-1/2 
              after:w-4 after:h-4 after:flex after:items-center after:justify-center 
              after:opacity-0 peer-checked:after:opacity-100"
            ></div>
          </label>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-2xl text-gray-900 dark:text-white"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col px-4 py-3 items-start space-y-2 bg-white dark:bg-gray-800 w-full absolute left-0 top-full shadow-md transition-all duration-300 ease-in-out origin-top animate-slide-down mb-4 rounded-b-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => {
                setMobileOpen(false);
                scrollToTop();
              }}
              className={`w-full px-2 py-1.5 rounded-md text-sm font-medium text-center shadow-sm transition-all hover:scale-105 ${
                location.pathname === link.path
                  ? "bg-[#FFB800] text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-[#FFB800] hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {isAuthenticated && (
            <div className="flex flex-col gap-1.5 w-full">
              <Link
                to="/mlm"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToTop();
                }}
                className="w-full px-2 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm transition-all text-sm text-center hover:scale-105"
              >
                MLM
              </Link>
              <Link
                to="/tree"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToTop();
                }}
                className="w-full px-2 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm transition-all text-sm text-center hover:scale-105"
              >
                Tree
              </Link>
              <Link
                to="/profile"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToTop();
                }}
                className="w-full px-2 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm transition-all text-sm text-center hover:scale-105"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                  scrollToTop();
                }}
                className="w-full px-2 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 shadow-sm transition-all text-sm text-center hover:scale-105"
              >
                Logout
              </button>
              <div className="text-xs text-gray-600 dark:text-gray-300 text-center mt-1">
                Welcome, {user?.firstName || "User"}
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="flex flex-col gap-1.5 w-full">
              <Link
                to="/login"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToTop();
                }}
                className="w-full px-2 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm transition-all text-sm text-center hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => {
                  setMobileOpen(false);
                  scrollToTop();
                }}
                className="w-full px-2 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 shadow-sm transition-all text-sm text-center hover:scale-105"
              >
                Signup
              </Link>
            </div>
          )}

          {/* Mobile Theme Toggle */}
          <div className="py-2 w-full flex justify-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                className="sr-only peer"
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <div
                className="w-12 h-5 rounded-full peer duration-300 bg-gray-200 dark:bg-gray-600 relative 
                before:content-['☀️'] before:absolute before:left-1 before:top-1/2 before:-translate-y-1/2 
                before:w-4 before:h-4 before:flex before:items-center before:justify-center 
                before:transition-all peer-checked:before:opacity-0 
                after:content-['🌑'] after:absolute after:right-1 after:top-1/2 after:-translate-y-1/2 
                after:w-4 after:h-4 after:flex after:items-center after:justify-center 
                after:opacity-0 peer-checked:after:opacity-100"
              ></div>
            </label>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
