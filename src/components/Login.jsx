"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

        // ✅ SUCCESS TOAST
        toast.success("Login Successful 🎉");

        // OPTIONAL MODAL
        setShowModal(true);

        // redirect after short delay
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
            <h2 className="text-xl font-bold mb-2">Login Successful 🎉</h2>
            <p className="text-gray-600 mb-4">Redirecting to homepage...</p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* LOGIN FORM */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Email or Phone Number
              </label>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
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
    </>
  );
};

export default Login;
