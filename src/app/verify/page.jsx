"use client";

import { useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Verify() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  // Handle OTP Change
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Submit OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter complete 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/otp/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            otp: enteredOtp,
            role: "user",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Invalid OTP");
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">

        <h2 className="text-2xl font-bold mb-2">
          Verify OTP
        </h2>

        <p className="text-gray-600 mb-6">
          Enter the 6-digit OTP sent to
          <br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify} className="space-y-6">

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 border rounded-lg text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <button
          onClick={() => router.push("/login")}
          className="mt-4 text-sm text-indigo-600"
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}