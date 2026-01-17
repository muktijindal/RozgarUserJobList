"use client";

import React, { useEffect, useState } from "react";

const years = Array.from({ length: 40 }, (_, i) => 2025 - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

const noticePeriods = [
  "15 Days or Less",
  "1 Month",
  "2 Months",
  "3 Months",
  "More than 3 Months",
];

export default function EmploymentModal({ open, setOpen, onSave }) {
  const [isCurrent, setIsCurrent] = useState(true);
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [expYears, setExpYears] = useState("");
  const [expMonths, setExpMonths] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [joinYear, setJoinYear] = useState("");
  const [joinMonth, setJoinMonth] = useState("");
  const [salary, setSalary] = useState("");
  const [skills, setSkills] = useState("");
  const [profile, setProfile] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Lock background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setIsCurrent(true);
      setEmploymentType("Full-time");
      setExpYears("");
      setExpMonths("");
      setCompany("");
      setJobTitle("");
      setJoinYear("");
      setJoinMonth("");
      setSalary("");
      setSkills("");
      setProfile("");
      setNotice("");
      setError("");
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSave = async () => {
    setError("");

    if (!company || !jobTitle || !joinYear || !joinMonth || !notice) {
      setError("Please fill all required fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please login again.");
      return;
    }

    // Build dates
    const startDate = `${joinYear}-${String(joinMonth).padStart(2, "0")}-01`;

    // If currently working → no end date
    const endDate = isCurrent ? null : new Date().toISOString().split("T")[0];

    try {
      setLoading(true);

      const res = await fetch("http://147.93.72.227:5000/api/users/experiences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company_name: company,
          job_title: jobTitle,
          start_date: startDate,
          end_date: endDate,
          currently_working: isCurrent,
          description: profile || "",
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Failed to save employment details.");
        return;
      }

      // optional callback
      onSave?.(data);

      setOpen(false);
    } catch (err) {
      console.error("Experience save error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-3xl h-[85vh] rounded-2xl shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-6 border-b relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>

          <h2 className="text-xl font-semibold mb-1">Employment</h2>
          <p className="text-sm text-gray-500">
            Details like job title, company name, etc, help employers understand
            your work
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Current Employment */}
          <div>
            <p className="text-sm font-medium mb-2">
              Is this your current employment?
            </p>
            <div className="flex gap-6 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={isCurrent}
                  onChange={() => setIsCurrent(true)}
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!isCurrent}
                  onChange={() => setIsCurrent(false)}
                />
                No
              </label>
            </div>
          </div>

          {/* Employment Type */}
          <div>
            <p className="text-sm font-medium mb-2">Employment type</p>
            <div className="flex gap-6 text-sm">
              {["Full-time", "Internship"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={employmentType === type}
                    onChange={() => setEmploymentType(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Total Experience */}
          <div>
            <label className="text-sm font-medium">
              Total experience <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 mt-1">
              <select
                value={expYears}
                onChange={(e) => setExpYears(e.target.value)}
                className="w-1/2 rounded-lg border px-3 py-2"
              >
                <option value="">Years</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
              <select
                value={expMonths}
                onChange={(e) => setExpMonths(e.target.value)}
                className="w-1/2 rounded-lg border px-3 py-2"
              >
                <option value="">Months</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="text-sm font-medium">
              Current company name <span className="text-red-500">*</span>
            </label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Type your organization"
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="text-sm font-medium">
              Current job title <span className="text-red-500">*</span>
            </label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Type your designation"
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="text-sm font-medium">
              Joining date <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 mt-1">
              <select
                value={joinYear}
                onChange={(e) => setJoinYear(e.target.value)}
                className="w-1/2 rounded-lg border px-3 py-2"
              >
                <option value="">Select Year</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
              <select
                value={joinMonth}
                onChange={(e) => setJoinMonth(e.target.value)}
                className="w-1/2 rounded-lg border px-3 py-2"
              >
                <option value="">Select Month</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Salary */}
          <div>
            <label className="text-sm font-medium">
              Current salary <span className="text-red-500">*</span>
            </label>
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="Eg. 4,50,000"
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-medium">
              Skills used <span className="text-red-500">*</span>
            </label>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Add skills"
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          {/* Job Profile */}
          <div>
            <label className="text-sm font-medium">Job profile</label>
            <textarea
              rows={4}
              value={profile}
              onChange={(e) => setProfile(e.target.value.slice(0, 4000))}
              placeholder="Type here..."
              className="mt-1 w-full rounded-lg border px-4 py-2 resize-none"
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {4000 - profile.length} character(s) left
            </p>
          </div>

          {/* Notice Period */}
          <div>
            <label className="text-sm font-medium">
              Notice period <span className="text-red-500">*</span>
            </label>
            <select
              value={notice}
              onChange={(e) => setNotice(e.target.value)}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            >
              <option value="">Select notice period</option>
              {noticePeriods.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 p-6 border-t">
          <button
            onClick={() => setOpen(false)}
            className="text-blue-600 text-sm"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
