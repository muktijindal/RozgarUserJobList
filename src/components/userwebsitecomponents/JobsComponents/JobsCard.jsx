"use client";
import { useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import {
  FaBriefcase,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaBookmark,
  FaStar,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  skills,
  posted,
  logo,

  // 🔥 NEW PROPS
  isSaved = false,
  onUnsaveSuccess,
  appliedBadge = false,
}) => {
  const router = useRouter();
  const slug = `${slugify(title)}-${jobId}`;

  const [loading, setLoading] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);

  // ============================
  // 🔹 NORMALIZE SKILLS (SAFE)
  // ============================
  const normalizedSkills = useMemo(() => {
    if (Array.isArray(skills)) return skills;

    if (typeof skills === "string") {
      // try JSON parse first
      try {
        const parsed = JSON.parse(skills);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        // fallback to comma split
        return skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    return [];
  }, [skills]);

  // ============================
  // 🔹 SAVE JOB
  // ============================
  const handleSave = async (e) => {
    e.stopPropagation();
    if (loading) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://qa.api.rozgardwar.cloud/api/savejob/${jobId}/save?type=HotVacancy`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to save job");

      setShowSavedModal(true); // ✅ OPEN MODAL
    } catch (err) {
      console.error("❌ Save job error:", err);
      alert(err.message || "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // 🔹 UNSAVE JOB
  // ============================
  const handleUnsave = async (e) => {
    e.stopPropagation();
    if (loading) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://qa.api.rozgardwar.cloud/api/savejob/${jobId}/save?type=HotVacancy`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to unsave job");
      }

      setShowSavedModal(false);

      // 🔥 remove from UI immediately
      onUnsaveSuccess?.(jobId);
    } catch (err) {
      console.error("❌ Unsave error:", err);
      alert(err.message || "Failed to unsave job");
    } finally {
      setLoading(false);
    }
  };

  const normalizedLocation = useMemo(() => {
    if (!location) return "";

    // already an object
    if (typeof location === "object") {
      return `${location.city || ""}, ${location.state || ""}, ${
        location.country || ""
      }`;
    }

    // string JSON
    if (typeof location === "string") {
      try {
        const parsed = JSON.parse(location);
        return `${parsed.city || ""}, ${parsed.state || ""}, ${
          parsed.country || ""
        }`;
      } catch {
        // normal string fallback
        return location;
      }
    }

    return "";
  }, [location]);

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

          {rating && (
            <>
              <FaStar className="text-yellow-500 text-xs" />
              <span>{rating}</span>
            </>
          )}

          {reviews && (
            <>
              <span className="text-gray-400">|</span>
              <span>{reviews} Reviews</span>
            </>
          )}

          {appliedBadge && (
            <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
              Applied
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-5 text-gray-700 text-sm mt-4">
          <div className="flex items-center gap-2">
            <FaBriefcase /> {experience || "Not Disclosed"}
          </div>
          <div className="flex items-center gap-2">
            <FaRupeeSign /> {salary ? `${salary} LPA` : "Not Disclosed"}
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt /> {normalizedLocation || "Not Disclosed"}
          </div>
        </div>

        {/* <p className="text-gray-600 text-sm mt-3 line-clamp-2">
          {description || "Not Disclosed"}
        </p> */}

        {/* 🔹 SKILLS */}
        {normalizedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 text-sm">
            {normalizedSkills.map((skill, i) => (
              <span
                key={i}
                className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

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
          src={logo || "/default-logo.png"}
          alt="Company Logo"
          className="w-12 h-12 rounded-xl object-cover border"
        />

        {/* 🔥 SAVE / UNSAVE BUTTON */}
        <button
          onClick={isSaved ? handleUnsave : handleSave}
          disabled={loading}
          className={`flex items-center gap-2 mt-6 text-sm ${
            loading
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-600 hover:text-gray-800"
          }`}
        >
          <FaBookmark className={isSaved ? "text-red-500" : ""} />
          {loading ? "Please wait..." : isSaved ? "Unsave" : "Save"}
        </button>
      </div>

      <Dialog open={showSavedModal} onOpenChange={setShowSavedModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Job Saved 🎉</DialogTitle>
            <DialogDescription>
              This job has been successfully added to your saved jobs.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <Button onClick={() => setShowSavedModal(false)}>Okay</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
