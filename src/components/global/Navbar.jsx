"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 🚫 Hide navbar on auth pages
  const hideNavbarRoutes = ["/login", "/signup", "/forgotpassword"];
  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔑 clear auth token
    setIsDropdownOpen(false);
    router.push("/login"); // redirect after logout
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        } md:hidden`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={() => setIsMenuOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="px-4">
          <ul className="flex flex-col items-center space-y-6 mt-4">
            <li><Link href="/userwebsite">Home</Link></li>
            <li><Link href="/userwebsite/recommendedjobs">Jobs</Link></li>
            <li><Link href="/profile">Profile</Link></li>

            <li>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 shadow-md bg-white">
        {/* Left */}
        <div className="flex items-center">
          <button
            className="mr-4 md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <FaBars size={24} />
          </button>

          <Link href="/userwebsite" className="text-xl font-bold">
            LOGO
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-sm">
            <li>
              <Link href="/userwebsite" className="hover:text-[#A270FF]">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/userwebsite/recommendedjobs"
                className="hover:text-[#A270FF]"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-[#A270FF]">
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-[#A270FF1A] rounded-xl"
          >
            <FaUserCircle size={22} />
            <span className="text-sm">Account</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-xl border z-50">
              <Link
                href="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 text-sm"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};
