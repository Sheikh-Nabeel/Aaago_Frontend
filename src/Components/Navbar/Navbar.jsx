import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from './Images/logo.png';
import { HiMenu, HiX } from 'react-icons/hi';
import { logoutUser, selectIsAuthenticated, selectUser } from '../../store/userSlice';

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  
  const [darkMode, setDarkMode] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Team', path: '/team' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="w-full px-6 py-3 bg-black text-white shadow-md relative z-50 max-lg:px-2">
      {/* Header Row */}
      <div className="flex justify-between items-center md:justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>

        {/* Mobile Auth Buttons */}
        <div className="hidden gap-2 max-lg:flex">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm px-4 py-1 rounded-md bg-[#387B55] text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm px-4 py-1 rounded-md bg-[#387B55] text-white"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Light/Dark Toggle (Mobile Centered) */}
        <div className="md:hidden mt-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              onChange={toggleTheme}
              checked={!darkMode}
            />
            <div
              className="w-16 h-7 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden 
              before:flex before:items-center before:justify-center 
              before:content-['☀️'] before:absolute before:h-5 before:w-5 before:top-1/2 before:bg-white before:rounded-full 
              before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 
              peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full 
              shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 
              peer-checked:bg-[#383838] 
              after:content-['🌑'] after:absolute  after:rounded-full 
              after:top-[7.5px] after:right-1 after:translate-y-full after:w-5 after:h-5 after:opacity-0 
              after:transition-all after:duration-700 peer-checked:after:opacity-100 
              peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
            ></div>
          </label>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="flex gap-6 text-lg font-medium mr-4 max-lg:hidden ">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={` transition-colors ${
                  location.pathname === link.path
                    ? "text-[#FFB800]"
                    : "text-white hover:text-[#FFB800] "
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/mlm"
            className="text-lg px-4 py-1.5 rounded-md border bg-[#387B55] text-white"
          >
            MLM
          </Link>
          <Link
            to="/tree"
            className="text-lg px-4 py-1.5 border rounded-md bg-[#387B55] text-white"
          >
            Tree
          </Link>

          {/* Auth Buttons */}
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-lg px-4 py-1.5 rounded-md border bg-[#387B55] text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-lg px-4 py-1.5 border rounded-md bg-[#387B55] text-white"
              >
                Signup
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-lg px-4 py-1.5 border rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          {/* Desktop Light/Dark Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              onChange={toggleTheme}
              checked={!darkMode}
            />
            <div
              className="w-20 h-9 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden 
              before:flex before:items-center before:justify-center 
              before:content-['☀️'] before:absolute before:h-7 before:w-7 before:top-1/2  before:rounded-full 
              before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 
              peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full 
              shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 
              peer-checked:bg-[#383838] 
              after:content-['🌑'] after:absolute  after:rounded-full 
              after:top-[4px] after:right-1 after:translate-y-full after:w-7 after:h-7 after:opacity-0 
              after:transition-all after:duration-700 peer-checked:after:opacity-100 
              after:rotate-180 peer-checked:after:translate-y-0"
            ></div>
          </label>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button onClick={toggleMobileMenu} className="md:hidden text-3xl">
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`md:hidden flex flex-col px-3 items-start space-y-4 overflow-hidden transition-all duration-500 ease-in-out origin-top animate-slide-down`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`text-lg w-full py-2 border-b ${
                location.pathname === link.path
                  ? "text-[#FFB800]"
                  : "text-white hover:text-[#FFB800]"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile MLM/Tree Links - Always show for authenticated users */}
          {isAuthenticated && (
            <div className="flex gap-2 w-full mb-4">
              <Link
                to="/mlm"
                onClick={() => setMobileOpen(false)}
                className="text-sm px-4 py-2 rounded-md bg-[#387B55] text-white hover:bg-[#2d6a47] transition-colors"
              >
                MLM
              </Link>
              <Link
                to="/tree"
                onClick={() => setMobileOpen(false)}
                className="text-sm px-4 py-2 rounded-md bg-[#387B55] text-white hover:bg-[#2d6a47] transition-colors"
              >
                Tree
              </Link>
            </div>
          )}

          {/* Mobile Auth Buttons */}
          <div className="flex gap-5">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm px-4 py-2 rounded-md bg-[#387B55] text-white hover:bg-[#2d6a47] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm px-4 py-2 rounded-md bg-[#387B55] text-white hover:bg-[#2d6a47] transition-colors"
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <div className="text-sm text-gray-300 py-2">
                  Welcome, {user?.firstName || "User"}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="text-sm px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors w-fit"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
