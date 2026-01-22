"use client";

import React, { useEffect, useState } from "react";

export default function OnlineProfileModal({ open, onClose, profile, onSave }) {
  const [socialProfile, setSocialProfile] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= PREFILL FOR EDIT ================= */
  useEffect(() => {
    if (open && profile) {
      setSocialProfile(profile.social_profile || "");
      setUrl(profile.social_profile_url || "");
      setDescription(profile.social_profile_description || "");
    }
  }, [open, profile]);

  /* ================= RESET ON CLOSE ================= */
  useEffect(() => {
    if (!open) {
      setSocialProfile("");
      setUrl("");
      setDescription("");
      setError("");
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSave = async () => {
    if (!socialProfile || !url) {
      setError("Social profile and URL are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const payload = {
        social_profile: socialProfile,
        social_profile_url: url,
        social_profile_description: description,
      };

      const isEdit = Boolean(profile?.id);

      const res = await fetch(
        isEdit
          ? `http://147.93.72.227:5000/api/users/social-profiles/${profile.id}`
          : "http://147.93.72.227:5000/api/users/social-profiles",
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
        throw new Error("Failed to save profile");
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
    if (!profile?.id) return;

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://147.93.72.227:5000/api/users/social-profiles/delete/${profile.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete profile");
      }

      onSave?.();
      onClose();
    } catch (err) {
      setError(err.message || "Failed to delete profile");
    } finally {
      setLoading(false);
    }
  };

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
          Add link to online professional profiles (e.g. LinkedIn, GitHub)
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">
              Social profile <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={socialProfile}
              onChange={(e) => setSocialProfile(e.target.value)}
              placeholder="GitHub, LinkedIn"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://github.com/username"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              rows={4}
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type here..."
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {500 - description.length} character(s) left
            </p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6">
          {profile && (
            <button
              onClick={handleDelete}
              disabled={loading}
              className="text-sm text-red-600 hover:underline disabled:opacity-60"
            >
              Delete
            </button>
          )}

          <div className="flex gap-4 ml-auto">
            <button
              onClick={onClose}
              className="text-blue-600 text-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : profile ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
