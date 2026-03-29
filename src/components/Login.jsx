"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ ADD

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false); // ✅ NEW

  // ✅ VALIDATION
  const validate = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (
      !emailRegex.test(formData.emailOrPhone) &&
      !phoneRegex.test(formData.emailOrPhone)
    ) {
      newErrors.emailOrPhone =
        "Enter valid email or 10-digit phone number";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.emailOrPhone,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Login failed");
      } else {
        const token = data?.data?.token;

        if (token) {
          localStorage.setItem("token", token);
        }

        if (data?.data?.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
        }

        toast.success("Login Successful 🎉");
        setShowModal(true);

        setTimeout(() => {
          window.location.href = "/userwebsite/recommendedjobs";
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
            <h2 className="text-xl font-bold mb-2">
              Login Successful 🎉
            </h2>
            <p className="text-gray-600 mb-4">
              Redirecting to homepage...
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* FORM */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email / Phone */}
            <div>
              <label className="block font-medium mb-1">
                Email or Phone Number
              </label>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded ${
                  errors.emailOrPhone ? "border-red-500" : ""
                }`}
              />
              {errors.emailOrPhone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.emailOrPhone}
                </p>
              )}
            </div>

            {/* ✅ PASSWORD WITH EYE */}
            <div>
              <label className="block font-medium mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // ✅ toggle
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />

                <span
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}

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
    </>
  );
};

export default Login;