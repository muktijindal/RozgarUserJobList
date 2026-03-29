"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔗 Replace with real API
      // const res = await fetch("/api/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ emailOrPhone: identifier }),
      // });

      // const data = await res.json();

      // if (!res.ok) {
      //   toast.error(data?.message || "Something went wrong");
      //   return;
      // }

      // ✅ SUCCESS
      toast.success("Reset link sent successfully 📩");

      // show modal
      setShowModal(true);

      // optional redirect
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
            <h2 className="text-xl font-bold mb-2">
              Reset Link Sent 📩
            </h2>
            <p className="text-gray-600 mb-4">
              Check your email or phone for instructions.
            </p>
            <button
              onClick={() => {
                setShowModal(false);
                router.push("/login");
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}

      {/* FORM */}
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-5">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Email or Phone Number
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 font-semibold rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            Remembered your password?{" "}
            <a href="/login" className="text-indigo-600 font-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;