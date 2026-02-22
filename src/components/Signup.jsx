"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const Signup = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const isPasswordMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const isPhoneValid = /^(\+91)?[6-9]\d{9}$/.test(formData.phone);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPhoneValid) {
      toast.error("Enter valid Indian phone number (+91 optional)");
      return;
    }

    if (!isPasswordMatch) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Signup failed");
      } else {
        toast.success("Account created successfully!");
        router.push(`/verify?email=${formData.email}`);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full border p-2.5 rounded-lg focus:outline-none transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center">
          Create Account
        </h2>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter you name"
            value={formData.fullName}
            onChange={handleChange}
            className={`${inputBase} border-gray-300 focus:ring-2 focus:ring-indigo-500`}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter you email"
            value={formData.email}
            onChange={handleChange}
            className={`${inputBase} border-gray-300 focus:ring-2 focus:ring-indigo-500`}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number (+91)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter you number"
            className={`${inputBase} ${
              formData.phone
                ? isPhoneValid
                  ? "border-green-500"
                  : "border-red-500"
                : "border-gray-300"
            }`}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
            placeholder="Enter you password"
              value={formData.password}
              onChange={handleChange}
              className={`${inputBase} border-gray-300`}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
            placeholder="Enter you confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`${inputBase} ${
                formData.confirmPassword
                  ? isPasswordMatch
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-300"
              }`}
              required
            />
            <span
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {formData.confirmPassword && (
            <p
              className={`text-xs mt-1 ${
                isPasswordMatch
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {isPasswordMatch
                ? "Passwords match ✓"
                : "Passwords do not match"}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;