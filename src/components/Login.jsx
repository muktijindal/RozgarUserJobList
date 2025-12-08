"use client";

import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://147.93.72.227:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: formData.emailOrPhone,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("FULL API RESPONSE:", data);

      if (!res.ok) {
        alert(data?.message || "Login failed");
      } else {
        alert("Login Successful!");

        const token = data?.data?.token;

        if (token) {
          // ✅ Save token in cookie (NOT localStorage)
          document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax;`;

          console.log("Token saved in cookie:", token);
        } else {
          console.log("❌ Token missing from response");
        }

        // Save user info in cookie too (optional)
        if (data?.data?.user) {
          document.cookie = `user=${encodeURIComponent(
            JSON.stringify(data.data.user)
          )}; path=/; max-age=604800; SameSite=Lax;`;
        }

        // Redirect
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email or Phone */}
          <div>
            <label className="block font-medium mb-1">
              Email or Phone Number
            </label>
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Enter email or phone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />

            <p className="text-right text-sm mt-1">
              <a
                href="/forgotpassword"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 font-semibold rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-semibold">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
