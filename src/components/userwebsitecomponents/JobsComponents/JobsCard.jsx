"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaBriefcase,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaBookmark,
  FaStar,
} from "react-icons/fa";

const slugify = (text) =>
  (text ?? "job")
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const JobCard = ({
  jobId,
  title,
  company,
  rating,
  reviews,
  experience,
  salary,
  location,
  description,
  skills = [],
  posted,
  logo,

  // 🔥 NEW PROPS
  isSaved = false,
  onUnsaveSuccess,
}) => {
  const router = useRouter();
  const slug = `${slugify(title)}-${jobId}`;

  const [loading, setLoading] = useState(false);

  // 🔹 SAVE JOB
  const handleSave = async (e) => {
    e.stopPropagation();
    if (loading) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://147.93.72.227:5000/api/savejob/${jobId}/save?type=HotVacancy`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);

      alert("Job saved successfully");
    } catch (err) {
      alert(err.message || "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

// 🔹 UNSAVE JOB (Saved Jobs page)
const handleUnsave = async (e) => {
  e.stopPropagation();
  if (loading) return;

  try {
    setLoading(true);
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://147.93.72.227:5000/api/savejob/${jobId}/save?type=HotVacancy`,
      {
        method: "DELETE", // ✅ IMPORTANT
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to unsave job");
    }

    console.log("✅ Job unsaved successfully:", data);
    alert("Job removed from saved");

    // 🔥 remove from UI immediately
    onUnsaveSuccess?.(jobId);
  } catch (err) {
    console.error("❌ Unsave error:", err);
    alert(err.message || "Failed to unsave job");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      onClick={() => router.push(`/userwebsite/recommendedjobs/${slug}`)}
      className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex justify-between items-start hover:shadow-md transition-all duration-200 w-full max-w-5xl mx-auto mt-5 cursor-pointer"
    >
      {/* LEFT */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">
          {title || "Not Disclosed"}
        </h2>

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <span className="font-medium text-gray-700">
            {company || "Not Disclosed"}
          </span>
          <FaStar className="text-yellow-500 text-xs" />
          <span>{rating}</span>
          <span className="text-gray-400">|</span>
          <span>{reviews} Reviews</span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-gray-700 text-sm mt-4">
          <div className="flex items-center gap-2">
            <FaBriefcase /> {experience || "Not Disclosed"}
          </div>
          <div className="flex items-center gap-2">
            <FaRupeeSign /> {salary || "Not Disclosed"}
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt /> {location || "Not Disclosed"}
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-3">
          {description || "Not Disclosed"}
        </p>

        <div className="flex flex-wrap gap-2 mt-3 text-sm text-indigo-700">
          {skills.map((skill, i) => (
            <span key={i}>{skill}</span>
          ))}
        </div>

        <p className="text-gray-400 text-xs mt-3">
          {posted || "Not Disclosed"}
        </p>
      </div>

      {/* RIGHT */}
      <div
        className="flex flex-col items-center justify-between h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={logo}
          alt="Company Logo"
          className="w-12 h-12 rounded-xl object-cover border"
        />

        {/* 🔥 SAVE / UNSAVE BUTTON */}
        <button
          onClick={isSaved ? handleUnsave : handleSave}
          disabled={loading}
          className={`flex items-center gap-2 mt-6 text-sm ${
            loading ? "text-gray-400" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <FaBookmark className={isSaved ? "text-red-500" : ""} />
          {loading ? "Please wait..." : isSaved ? "Unsave" : "Save"}
        </button>
      </div>
    </div>
  );
};
