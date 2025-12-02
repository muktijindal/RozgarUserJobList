"use client";

import { useState } from "react";
import OtpVerification from "./VerfiyUser";


export default function UserProfileSignup() {
  const [workStatus, setWorkStatus] = useState("");
  const [step, setStep] = useState("signup");

  const handleRegister = (e) => {
    e.preventDefault();
    setStep("verify"); // go to OTP screen
  };

  if (step === "verify") {
    return <OtpVerification />;
  }

  // 📌 STEP 1 → SIGNUP SCREEN (Your Original UI)
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* Top Right Login */}
      <div className="flex justify-end px-8 py-4 text-sm">
        <span className="text-gray-600">
          Already Registered?{" "}
          <a href="/login" className="text-blue-600 font-medium">
            Login
          </a>{" "}
          here
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT CARD */}
        <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center">
          <div className="w-40 h-40 bg-gray-100 rounded-full mb-6 flex items-center justify-center">
            <span className="text-6xl">👨🏻‍💼</span>
          </div>

          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            On registering, you can
          </h2>

          <ul className="space-y-4 text-gray-700 text-sm">
            <li className="flex gap-3">
              <span className="text-green-600">✔</span> Build your profile and let recruiters find you
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✔</span> Get job postings delivered right to your email
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✔</span> Find a job and grow your career
            </li>
          </ul>
        </div>

        {/* RIGHT FORM */}
        <div className="col-span-2 bg-white shadow-md rounded-xl p-10">
          <h2 className="text-2xl font-semibold">Create your Naukri profile</h2>
          <p className="text-sm text-gray-500 mt-1">Search & apply to jobs from India’s No.1 Job Site</p>

          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full name*</label>
              <input
                type="text"
                placeholder="What is your name?"
                className="mt-1 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email ID*</label>
              <input
                type="email"
                placeholder="Tell us your Email ID"
                className="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:ring-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send relevant jobs and updates to this email
              </p>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password*</label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                className="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:ring-2"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm font-medium">Mobile number*</label>
              <div className="flex">
                <span className="px-4 flex items-center bg-gray-100 border border-r-0 rounded-l-lg">
                  +91
                </span>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  className="w-full p-3 border rounded-r-lg focus:ring-blue-500 focus:ring-2"
                />
              </div>
            </div>

            {/* Work Status */}
            <div>
              <label className="text-sm font-medium">Work status*</label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
                <div
                  onClick={() => setWorkStatus("experienced")}
                  className={`p-5 border rounded-xl cursor-pointer transition 
                    ${workStatus === "experienced" ? "border-blue-600 bg-blue-50" : "hover:border-blue-600"}`}
                >
                  <p className="font-semibold">I'm experienced</p>
                  <p className="text-sm text-gray-500">
                    I have work experience (excluding internships)
                  </p>
                </div>

                <div
                  onClick={() => setWorkStatus("fresher")}
                  className={`p-5 border rounded-xl cursor-pointer transition
                    ${workStatus === "fresher" ? "border-blue-600 bg-blue-50" : "hover:border-blue-600"}`}
                >
                  <p className="font-semibold">I'm a fresher</p>
                  <p className="text-sm text-gray-500">
                    I am a student / haven’t worked after graduation
                  </p>
                </div>
              </div>
            </div>

            {/* Conditional Field */}
            {workStatus === "experienced" && (
              <div>
                <label className="text-sm font-medium">Upload your CV*</label>
                <input type="file" className="mt-1 w-full p-3 border rounded-lg" />
              </div>
            )}

            {workStatus === "fresher" && (
              <div>
                <label className="text-sm font-medium">Select your city*</label>
                <select className="mt-1 w-full p-3 border rounded-lg">
                  <option value="">Choose city</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Pune</option>
                  <option>Chandigarh</option>
                </select>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Register Now
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-grow border-t"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-grow border-t"></div>
          </div>

          <button className="w-full border py-3 rounded-lg flex justify-center items-center gap-3 hover:bg-gray-50 transition">
            <img
              src="https://i.ibb.co/7WBNHh4/google.png"
              alt="Google"
              className="w-5"
            />
            <span className="font-medium">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
