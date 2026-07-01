"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ---------------- VALIDATION ----------------
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
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // ---------------- HANDLE CHANGE ----------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };


  // ---------------- LOGIN ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix errors");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            email: formData.emailOrPhone,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          data?.message || "Login failed"
        );
        return;
      }

      // save auth
      const token = data?.data?.token;

      if (token) {
        localStorage.setItem(
          "token",
          token
        );
      }

      if (data?.data?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.data.user)
        );
      }

      toast.success("Login Successful 🎉");

      setShowModal(true);

      setTimeout(() => {
        window.location.href =
          "/userwebsite/recommendedjobs";
      },1500);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  // ---------------- GOOGLE SSO ----------------
  const handleGoogleLogin = () => {
    setGoogleLoading(true);

    // replace if prod url differs
    window.location.href =
      "https://qa.api.rozgardwar.cloud/api/google/auth/google?type=employer";
  };


  return (
    <>
      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">

            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">
                ✓
              </span>
            </div>

            <h2 className="text-xl font-bold mb-2">
              Login Successful
            </h2>

            <p className="text-gray-600 mb-5">
              Redirecting...
            </p>

            <button
              onClick={() =>
                setShowModal(false)
              }
              className="px-5 py-2 rounded-lg bg-blue-600 text-white"
            >
              OK
            </button>

          </div>
        </div>
      )}



      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-3xl font-bold text-center mb-8">
            Login
          </h2>


          {/* Google SSO */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full border border-gray-300 flex items-center justify-center gap-3 py-3 rounded-xl hover:bg-gray-50 mb-6"
          >
            <FcGoogle size={24}/>
            {googleLoading
              ? "Redirecting..."
              : "Continue with Google"}
          </button>


          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-gray-300"/>
            <span className="px-3 text-sm text-gray-500">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300"/>
          </div>



          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* email/phone */}
            <div>
              <label className="block font-medium mb-1">
                Email or Phone Number
              </label>

              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-3 ${
                  errors.emailOrPhone
                    ? "border-red-500"
                    : ""
                }`}
              />

              {errors.emailOrPhone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.emailOrPhone}
                </p>
              )}
            </div>



            {/* password */}
            <div>
              <label className="block font-medium mb-1">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword
                    ? "text"
                    : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-3 ${
                    errors.password
                      ? "border-red-500"
                      : ""
                  }`}
                />

                <span
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-4 cursor-pointer text-gray-500"
                >
                  {showPassword
                    ? <FaEyeSlash/>
                    : <FaEye/>
                  }
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}

              <p className="text-right mt-2">
                <a
                  href="/forgotpassword"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </p>
            </div>



            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>


          <p className="text-center text-sm mt-6">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-blue-600 font-semibold"
            >
              Signup
            </a>
          </p>

        </div>
      </div>
    </>
  );
};

export default Login;