"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t pt-10 text-[#2c2c2c]">
      <div className="max-w-7xl mx-auto px-4">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Logo + Social */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full" />
              <h2 className="text-3xl font-semibold text-blue-600">naukri</h2>
            </div>

            <h3 className="mt-6 font-medium">Connect with us</h3>
            <div className="flex gap-4 mt-3 text-xl">
              <FaFacebookF className="cursor-pointer" />
              <FaInstagram className="cursor-pointer" />
              <FaXTwitter className="cursor-pointer" />
              <FaLinkedinIn className="cursor-pointer" />
            </div>
          </div>

          {/* Column: About */}
          <div className="space-y-2">
            <h3 className="font-medium">About us</h3>
            <p className="cursor-pointer">Careers</p>
            <p className="cursor-pointer">Employer home</p>
            <p className="cursor-pointer">Sitemap</p>
            <p className="cursor-pointer">Credits</p>
          </div>

          {/* Column: Help */}
          <div className="space-y-2">
            <h3 className="font-medium">Help center</h3>
            <p className="cursor-pointer">Summons/Notices</p>
            <p className="cursor-pointer">Grievances</p>
            <p className="cursor-pointer">Report issue</p>
          </div>

          {/* Column: T&C */}
          <div className="space-y-2">
            <h3 className="font-medium">Privacy policy</h3>
            <p className="cursor-pointer">Terms & conditions</p>
            <p className="cursor-pointer">Fraud alert</p>
            <p className="cursor-pointer">Trust & safety</p>
          </div>

          {/* Right Apply Container */}
          <div className="lg:col-span-4 mt-4">
            <div className="border rounded-lg p-6 flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h3 className="font-medium text-lg">Apply on the go</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get real-time job updates on our App
                </p>
              </div>

              <div className="flex gap-4">
                <img
                  src="/google-play.png"
                  alt="Google Play"
                  className="h-12 cursor-pointer"
                />
                <img
                  src="/app-store.png"
                  alt="App Store"
                  className="h-12 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t"></div>

        {/* Bottom strip */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/infoedge.png" className="h-8" alt="" />
            <p className="text-sm text-gray-600">
              All trademarks are the property of their respective owners
            </p>
          </div>

          <p className="text-sm text-gray-600">
            All rights reserved © 2025 Info Edge (India) Ltd.
          </p>

          <div className="flex gap-4">
            <img src="/jobhai.png" className="h-8" alt="" />
            <img src="/deselect.png" className="h-8" alt="" />
            <img src="/minis.png" className="h-8" alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
