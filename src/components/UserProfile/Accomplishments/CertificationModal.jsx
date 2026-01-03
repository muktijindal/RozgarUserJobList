"use client";

import React, { useEffect, useState } from "react";

const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const years = Array.from({ length: 40 }, (_, i) => 2025 - i);

export default function CertificationModal({ open, onClose, onSave }) {
  const [name, setName] = useState("");
  const [completionId, setCompletionId] = useState("");
  const [url, setUrl] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [noExpiry, setNoExpiry] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setCompletionId("");
      setUrl("");
      setFromMonth("");
      setFromYear("");
      setToMonth("");
      setToYear("");
      setNoExpiry(false);
      setError("");
    }
  }, [open]);

  if (!open) return null;

  const handleSave = () => {
    if (!name.trim()) {
      setError("Certification name is required.");
      return;
    }

    onSave?.({
      name,
      completionId,
      url,
      validity: noExpiry
        ? "Does not expire"
        : {
            from: { month: fromMonth, year: fromYear },
            to: { month: toMonth, year: toYear },
          },
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

        <h2 className="text-xl font-semibold mb-1">Certifications</h2>
        <p className="text-sm text-gray-500 mb-6">
          Add details of Certifications you have achieved/completed
        </p>

        <div className="space-y-4">
          {/* Certification name */}
          <div>
            <label className="text-sm font-medium">
              Certification name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Please enter your certification name"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Completion ID */}
          <div>
            <label className="text-sm font-medium">
              Certification completion ID
            </label>
            <input
              value={completionId}
              onChange={(e) => setCompletionId(e.target.value)}
              placeholder="Please mention your course completion ID"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none"
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-sm font-medium">Certification URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Please mention your completion URL"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none"
            />
          </div>

          {/* Validity */}
          <div>
            <label className="text-sm font-medium">Certification validity</label>
            <div className="flex items-center gap-3 mt-2">
              <select
                value={fromMonth}
                onChange={(e) => setFromMonth(e.target.value)}
                className="w-1/4 rounded-lg border px-3 py-2"
              >
                <option value="">MM</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

              <select
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
                className="w-1/4 rounded-lg border px-3 py-2"
              >
                <option value="">YYYY</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>

              <span className="text-sm text-gray-500">To</span>

              <select
                value={toMonth}
                onChange={(e) => setToMonth(e.target.value)}
                disabled={noExpiry}
                className="w-1/4 rounded-lg border px-3 py-2 disabled:bg-gray-100"
              >
                <option value="">MM</option>
                {months.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>

              <select
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
                disabled={noExpiry}
                className="w-1/4 rounded-lg border px-3 py-2 disabled:bg-gray-100"
              >
                <option value="">YYYY</option>
                {years.map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* No expiry */}
          <label className="flex items-center gap-2 text-sm mt-2">
            <input
              type="checkbox"
              checked={noExpiry}
              onChange={(e) => setNoExpiry(e.target.checked)}
            />
            This certification does not expire
          </label>

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
