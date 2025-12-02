"use client";
import { useState } from "react";
import { MdEmail } from "react-icons/md";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    concern: "",
    feedback: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#1e3448] flex justify-center items-center py-10 px-4">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-12">
        {/* LEFT INFO */}
        <div className="text-white w-full md:w-1/2 space-y-6">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <MdEmail size={32} />
            <span>Naukri FastForward Services</span>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Toll Free Number:</p>
            <p>1800-102-5557 , 1800-572-5557</p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Work Timings:</p>
            <p>9.30 AM to 6.30 PM</p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Working Days:</p>
            <p>(Monday to Saturday)</p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">Email Id:</p>
            <p>service@naukri.com</p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold">International Clients:</p>
            <p>+91 120 4021100 (9.30 AM to 6.00 PM IST)</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Report a Problem/Need Assistance
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full border rounded-lg px-4 py-2"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Naukri Registered Email ID"
              className="w-full border rounded-lg px-4 py-2"
            />

            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter Your Contact Number"
              className="w-full border rounded-lg px-4 py-2"
            />

            <select
              name="concern"
              value={formData.concern}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Area of Concern</option>
              <option value="job">Job Issue</option>
              <option value="payment">Payment Related</option>
              <option value="account">Account Issue</option>
            </select>

            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Enter Your Feedback"
              rows="5"
              className="w-full border rounded-lg px-4 py-2"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
