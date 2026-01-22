"use client";

import React, { useEffect, useState } from "react";

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const years = Array.from({ length: 40 }, (_, i) => 2026 - i);

export default function CertificationModal({
  open,
  onClose,
  onSave,
  certification = null, // 👈 NEW (null = add, object = edit)
}) {
  const isEdit = Boolean(certification);

  const [name, setName] = useState("");
  const [completionId, setCompletionId] = useState("");
  const [url, setUrl] = useState("");
  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");
  const [noExpiry, setNoExpiry] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= PREFILL (EDIT MODE) ================= */
  useEffect(() => {
    if (open && certification) {
      setName(certification.certification_name || "");
      setCompletionId(certification.certification_completion_id || "");
      setUrl(certification.certification_url || "");
      setFromMonth(certification.validity_from_month || "");
      setFromYear(certification.validity_from_year || "");
      setToMonth(certification.validity_to_month || "");
      setToYear(certification.validity_to_year || "");
      setNoExpiry(certification.certificate_does_not_expire || false);
    }

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
      setLoading(false);
    }
  }, [open, certification]);

  if (!open) return null;

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!name.trim()) {
      setError("Certification name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const payload = {
        certification_name: name,
        certification_completion_id: completionId || null,
        certification_url: url || null,
        validity_from_month: fromMonth || null,
        validity_from_year: fromYear || null,
        validity_to_month: noExpiry ? null : toMonth,
        validity_to_year: noExpiry ? null : toYear,
        certificate_does_not_expire: noExpiry,
      };

      const apiUrl = isEdit
        ? `http://147.93.72.227:5000/api/users/certifications/${certification.id}`
        : "http://147.93.72.227:5000/api/users/certifications";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save certification");

      onSave?.();
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI (UNCHANGED) ================= */
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

        <h2 className="text-xl font-semibold mb-1">Certifications</h2>
        <p className="text-sm text-gray-500 mb-6">
          Add details of Certifications you have achieved/completed
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Certification name <span className="text-red-500">*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Certification completion ID
            </label>
            <input
              value={completionId}
              onChange={(e) => setCompletionId(e.target.value)}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Certification URL</label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Certification validity
            </label>

            <div className="flex gap-3 mt-2">
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

              <span className="text-sm text-gray-500 self-center">To</span>

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

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={noExpiry}
              onChange={(e) => setNoExpiry(e.target.checked)}
            />
            This certification does not expire
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* replace only button handler */}
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="text-blue-600 text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
