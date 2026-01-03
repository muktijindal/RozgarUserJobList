"use client";

import React, { useEffect, useState } from "react";

const MAX_DESC = 500;

const years = Array.from({ length: 30 }, (_, i) => 2025 - i);
const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

export default function WorkSampleModal({ open, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

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
    }
  }, [open]);

  if (!open) return null;

  const handleSave = () => {
    if (!title.trim() || !url.trim()) {
      setError("Work title and URL are required.");
      return;
    }

    onSave?.({
      title,
      url,
      from: { year: fromYear, month: fromMonth },
      to: current ? "Present" : { year: toYear, month: toMonth },
      description,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-lg p-6">
        {/* Close */}
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
          {/* Work title */}
          <div>
            <label className="text-sm font-medium">
              Work title <span className="text-red-500">*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter work title"
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-sm font-medium">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL here"
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Duration from */}
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

          {/* Duration to */}
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

          {/* Current */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={current}
              onChange={(e) => setCurrent(e.target.checked)}
            />
            I am currently working on this
          </label>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value.slice(0, MAX_DESC))
              }
              placeholder="Type here..."
              className="mt-1 w-full rounded-lg border px-4 py-2 resize-none"
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {MAX_DESC - description.length} Character(s) Left
            </p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="text-blue-600 text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
