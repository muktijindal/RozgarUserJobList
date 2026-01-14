"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";

export default function ResumeUploadModal({ open, setOpen }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const token = localStorage.getItem("token"); // or from cookies if you store there

    if (!token) {
      alert("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const res = await fetch("http://147.93.72.227:5000/api/users/upload-resume", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ DO NOT set Content-Type here
        },
        body: formData,
        credentials: "include", // needed if backend uses cookies
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Resume upload failed");
        return;
      }

      alert("Resume uploaded successfully ✅");
      setOpen(false);
      setFile(null);

    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong while uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Upload Resume</DialogTitle>
        </DialogHeader>

        {/* Upload Box */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-sm text-gray-500 mb-3">
            Click below to upload your resume (pdf, doc, docx, max 2MB)
          </p>

          <label className="cursor-pointer">
            <div className="px-4 py-2 bg-blue-600 text-white rounded-md inline-block">
              Choose File
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <p className="mt-3 text-sm text-gray-700">
              Selected: <span className="font-medium">{file.name}</span>
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border rounded-md text-sm"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm disabled:bg-gray-400"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
