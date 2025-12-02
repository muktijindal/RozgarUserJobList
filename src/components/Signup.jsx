"use client";

import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // OTP states
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ▶ Signup API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://147.93.72.227:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      const data = await res.json();
      console.log("Signup Response:", data);

      if (!res.ok) {
        setError(data?.message || "Signup failed!");
      } else {
        setSuccessMsg("Account created! Enter OTP sent to your email.");
        setShowOtp(true);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ▶ OTP VERIFY API
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setError("");
  
    try {
      const res = await fetch("http://147.93.72.227:5000/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
  
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
          role: "user", 
        }),
      });
  
      const data = await res.json();
      console.log("OTP Verify Response:", data);
  
      if (!res.ok) {
        setError(data?.message || "Invalid OTP!");
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setOtpLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 border border-gray-200">

        {/* SIGNUP FORM */}
        {!showOtp ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 border px-4 py-2 rounded-lg"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 border px-4 py-2 rounded-lg"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-gray-700 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 border px-4 py-2 rounded-lg"
                />
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-700 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 border px-4 py-2 rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full mt-2 border px-4 py-2 rounded-lg"
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {successMsg && (
                <p className="text-green-600 text-sm text-center">{successMsg}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-gray-700 mt-4 text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 font-semibold">
                Login
              </a>
            </p>
          </>
        ) : (
          // ⭐ OTP SCREEN
          <>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Verify OTP
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Enter the OTP sent to <strong>{formData.email}</strong>
            </p>

            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-full border px-4 py-3 text-lg text-center rounded-lg tracking-widest"
              />

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                disabled={otpLoading}
                className="w-full bg-green-600 text-white py-3 font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                {otpLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signup;
