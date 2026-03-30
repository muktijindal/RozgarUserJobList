"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t pt-12 text-gray-700">
      <div className="max-w-7xl mx-auto px-4">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                R
              </div>
              <h2 className="text-2xl font-semibold text-blue-600">
                RozgarDwar
              </h2>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              Connecting talent with opportunities. Find jobs, grow your career,
              and build your future with RozgarDwar.
            </p>

            <h3 className="mt-6 font-medium">Connect with us</h3>
            <div className="flex gap-4 mt-3 text-lg">
              <FaFacebookF className="cursor-pointer hover:text-blue-600" />
              <FaInstagram className="cursor-pointer hover:text-pink-500" />
              <FaXTwitter className="cursor-pointer hover:text-black" />
              <FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
            </div>
          </div>

          {/* JOB SEEKERS */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">For Job Seekers</h3>
            <p className="cursor-pointer hover:text-blue-600">Browse Jobs</p>
            <p className="cursor-pointer hover:text-blue-600">Create Profile</p>
            <p className="cursor-pointer hover:text-blue-600">Job Alerts</p>
            <p className="cursor-pointer hover:text-blue-600">Career Advice</p>
          </div>

          {/* EMPLOYERS */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">For Employers</h3>
            <p className="cursor-pointer hover:text-blue-600">Post a Job</p>
            <p className="cursor-pointer hover:text-blue-600">Search Candidates</p>
            <p className="cursor-pointer hover:text-blue-600">Employer Dashboard</p>
            <p className="cursor-pointer hover:text-blue-600">Pricing Plans</p>
          </div>

          {/* SUPPORT */}
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-900">Support</h3>
            <p className="cursor-pointer hover:text-blue-600">Help Center</p>
            <p className="cursor-pointer hover:text-blue-600">Contact Us</p>
            <p className="cursor-pointer hover:text-blue-600">Privacy Policy</p>
            <p className="cursor-pointer hover:text-blue-600">Terms & Conditions</p>
          </div>
        </div>

        {/* APP CTA */}
        <div className="mt-12 border rounded-xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-50">
          <div>
            <h3 className="font-semibold text-lg">Apply on the go 🚀</h3>
            <p className="text-sm text-gray-600 mt-1">
              Get instant job alerts and apply anytime, anywhere
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

        {/* DIVIDER */}
        <div className="my-8 border-t"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} RozgarDwar. All rights reserved.
          </p>

          <p>
            Built with ❤️ for job seekers & recruiters in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;