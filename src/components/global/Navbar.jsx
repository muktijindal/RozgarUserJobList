'use client';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

// import logo from '../../../../public/images/logo.svg'

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } md:hidden`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="p-4 flex justify-end">
          <button onClick={() => setIsMenuOpen(false)} className="text-black">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Centered navigation items at top */}
        <nav className="px-4">
          <ul className="flex flex-col items-center space-y-8 mt-4">
            <li>
              <a
                href="/userwebsite"
                className="text-black hover:text-[#A270FF] transition-colors duration-200 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>
            
            
            {/* <li>
              <a
                href="/userwebsite/service"
                className="text-black hover:text-[#A270FF] transition-colors duration-200 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Service
              </a>
            </li> */}
            <li>
              <a href="/userwebsite/recommendedjobs" className="hover:text-[#A270FF] transition-colors duration-200">Jobs</a>

            </li>
            <li>
              <a
                href="/contactus"
                className="text-black hover:text-[#A270FF] transition-colors duration-200 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </li>
            
            <li>
              <a
                href="/profile"
                className="block px-4 py-2 bg-[#A270FF1A] rounded-xl text-black hover:bg-[#A270FF33] transition-colors duration-200 text-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </a>
            </li>
            <li>
              <a
                href="/contactus"
                className="block px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors duration-200 text-lg text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 text-black shadow-md">
        {/* Logo and Hamburger (mobile) */}
        <div className="flex items-center">
          <button 
            className="mr-4 text-black md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <FaBars size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold">
            {/* <Link href="/" className="block">
              <Image src={logo} width={192} height={28} alt='Logo' />
            </Link> */}
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 text-sm">
            <li>
              <a href="/userwebsite" className="hover:text-[#A270FF] transition-colors duration-200">Home</a>
            </li>
            {/* <li>
              <a href="/userwebsite/service" className="hover:text-[#A270FF] transition-colors duration-200">Service</a>
            </li> */}
            <li>
              <a href="/userwebsite/recommendedjobs" className="hover:text-[#A270FF] transition-colors duration-200">Jobs</a>
            </li>
            <li>
              <a href="/contact-us" className="hover:text-[#A270FF] transition-colors duration-200">Contact Us</a>
            </li>
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="/profile" className="px-4 py-2 bg-[#A270FF1A] rounded-xl text-sm hover:bg-[#A270FF33] transition-colors duration-200">
            Profile
          </a>
          <a href="/contact-us" className="px-4 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition-colors duration-200">
            Contact Us
          </a>
        </div>
      </header>
    </>
  );
};
