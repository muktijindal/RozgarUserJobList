"use client";

import { useState } from "react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // ✅ Call backend API here
    // const res = await fetch("/api/reset-password", {...})

    console.log("New Password Data:", formData);

    setSuccess("Password updated successfully!");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* New Password */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Success Message */}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            Update Password
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Back to{" "}
          <a href="/login" className="text-indigo-600 font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
