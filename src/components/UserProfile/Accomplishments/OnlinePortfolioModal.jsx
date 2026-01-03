"use client";

import React from "react";

export default function OnlineProfileModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-lg p-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-1">Online profiles</h2>
        <p className="text-sm text-gray-500 mb-6">
          Add link to online professional profiles (e.g. LinkedIn, etc.)
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Social profile <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Social Profile Name"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              placeholder="Enter Social Profile URL"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={4}
              placeholder="Type here..."
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              500 character(s) left
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="text-blue-600 text-sm"
          >
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
