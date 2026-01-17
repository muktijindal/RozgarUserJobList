"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EducationUserDetailsModal({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    degree: "",
    specialization: "",
    university: "",
    start_year: "",
    end_year: "",
    percentage: "",
    courseType: "Full time",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not authenticated. Please login again.");
      return;
    }

    if (
      !formData.degree ||
      !formData.specialization ||
      !formData.university ||
      !formData.start_year ||
      !formData.end_year
    ) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://147.93.72.227:5000/api/users/educations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          degree: formData.degree,
          specialization: formData.specialization,
          university: formData.university,
          start_year: Number(formData.start_year),
          end_year: Number(formData.end_year),
          percentage: formData.percentage,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.message || "Failed to save education details.");
        return;
      }

      setMessage("Education details saved successfully ✅");
      setFormData({
        degree: "",
        specialization: "",
        university: "",
        start_year: "",
        end_year: "",
        percentage: "",
        courseType: "Full time",
      });

      setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 1200);
    } catch (error) {
      console.error("Education save error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Education
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 text-sm mb-6 -mt-2">
          Details like course, university, and more, help recruiters identify your
          educational background
        </p>

        {/* FORM */}
        <div className="space-y-6">
          {/* Degree */}
          <div>
            <label className="text-sm font-medium">Education *</label>
            <input
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 text-sm outline-none"
              placeholder="e.g. BCA, B.Tech, MCA"
            />
          </div>

          {/* University */}
          <div>
            <label className="text-sm font-medium">University/Institute *</label>
            <input
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 text-sm outline-none"
              placeholder="e.g. Delhi Technological University"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="text-sm font-medium">Specialization *</label>
            <input
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 text-sm outline-none"
              placeholder="e.g. Computer Applications"
            />
          </div>

          {/* Course Type */}
          <div>
            <label className="text-sm font-medium">Course type *</label>
            <div className="flex items-center gap-10 mt-3 text-sm">
              {["Full time", "Part time", "Distance"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="courseType"
                    value={type}
                    checked={formData.courseType === type}
                    onChange={handleChange}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium">Course duration *</label>
            <div className="flex items-center gap-4 mt-2">
              <input
                type="number"
                name="start_year"
                value={formData.start_year}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 text-sm outline-none"
                placeholder="Start year"
              />

              <span className="text-gray-500">To</span>

              <input
                type="number"
                name="end_year"
                value={formData.end_year}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 text-sm outline-none"
                placeholder="End year"
              />
            </div>
          </div>

          {/* Percentage */}
          <div>
            <label className="text-sm font-medium">Percentage / CGPA</label>
            <input
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 text-sm outline-none"
              placeholder="e.g. 80.7"
            />
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-sm ${
                message.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* FOOTER */}
        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={() => setOpen(false)} className="px-6">
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 bg-blue-600 text-white hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
