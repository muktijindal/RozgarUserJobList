"use client";

import { useState } from "react";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    console.log("Forgot Password Request:", identifier);

    // ✅ Trigger forgot-password API here
    // await fetch("/api/forgot-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ emailOrPhone: identifier }),
    // });

    setMessage("If this account exists, reset instructions were sent.");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email or Phone */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Email or Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your email or phone"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="text-green-600 text-center text-sm mt-3">{message}</p>
        )}

        <p className="text-center text-sm mt-6 text-gray-600">
          Remembered your password?{" "}
          <a href="/login" className="text-indigo-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
