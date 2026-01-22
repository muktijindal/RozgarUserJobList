"use client";

import React, { useEffect, useState } from "react";

const MAX_DESC = 500;

const years = Array.from({ length: 30 }, (_, i) => 2025 - i);
const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

export default function WorkSampleModal({
  open,
  onClose,
  onSave,
  workSample, // ✅ edit support
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= PREFILL FOR EDIT ================= */
  useEffect(() => {
    if (open && workSample) {
      setTitle(workSample.work_sample_title || "");
      setUrl(workSample.work_sample_url || "");
      setFromYear(workSample.work_from_year || "");
      setFromMonth(workSample.work_from_month || "");
      setToYear(workSample.work_to_year || "");
      setToMonth(workSample.work_to_month || "");
      setCurrent(workSample.currently_working || false);
      setDescription(workSample.work_sample_description || "");
    }
  }, [open, workSample]);

  /* ================= RESET ON CLOSE ================= */
  useEffect(() => {
    if (!open) {
      setTitle("");
      setUrl("");
      setFromYear("");
      setFromMonth("");
      setToYear("");
      setToMonth("");
      setCurrent(false);
      setDescription("");
      setError("");
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSave = async () => {
    if (!title.trim() || !url.trim()) {
      setError("Work title and URL are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const payload = {
        work_sample_title: title,
        work_sample_url: url,
        work_sample_description: description,
        work_from_year: fromYear,
        work_from_month: fromMonth,
        work_to_year: current ? null : toYear,
        work_to_month: current ? null : toMonth,
        currently_working: current,
      };

      const isEdit = Boolean(workSample?.id);

      const res = await fetch(
        isEdit
          ? `http://147.93.72.227:5000/api/users/work-samples/${workSample.id}`
          : "http://147.93.72.227:5000/api/users/work-samples",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save work sample");
      }

      onSave?.();
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!workSample?.id) return;

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://147.93.72.227:5000/api/users/work-samples/delete/${workSample.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete work sample");
      }

      onSave?.();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete work sample");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-lg p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-1">Work samples</h2>
        <p className="text-sm text-gray-500 mb-6">
          Link relevant work samples (e.g. Github, Behance)
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Work title <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Duration from</label>
            <div className="flex gap-3 mt-1">
              <select
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
                className="w-1/2 rounded-lg border px-3 py-2"
              >
                <option value="">Select year</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>

              <select
                value={fromMonth}
                onChange={(e) => setFromMonth(e.target.value)}
                className="w-1/2 rounded-lg border px-3 py-2"
              >
                <option value="">Select month</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {!current && (
            <div>
              <label className="text-sm font-medium">Duration to</label>
              <div className="flex gap-3 mt-1">
                <select
                  value={toYear}
                  onChange={(e) => setToYear(e.target.value)}
                  className="w-1/2 rounded-lg border px-3 py-2"
                >
                  <option value="">Select year</option>
                  {years.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>

                <select
                  value={toMonth}
                  onChange={(e) => setToMonth(e.target.value)}
                  className="w-1/2 rounded-lg border px-3 py-2"
                >
                  <option value="">Select month</option>
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={current}
              onChange={(e) => setCurrent(e.target.checked)}
            />
            I am currently working on this
          </label>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.slice(0, MAX_DESC))
              }
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {MAX_DESC - description.length} Character(s) Left
            </p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="flex justify-between items-center mt-6">
          {workSample && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-sm text-red-600 hover:underline disabled:opacity-60"
            >
              Delete
            </button>
          )}

          <div className="flex gap-4 ml-auto">
            <button onClick={onClose} className="text-blue-600 text-sm">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm disabled:opacity-60"
            >
              {loading ? "Saving..." : workSample ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
