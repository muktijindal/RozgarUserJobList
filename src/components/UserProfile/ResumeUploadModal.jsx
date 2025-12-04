"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";

export default function ResumeUploadModal({ open, setOpen }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return alert("Please select a file");

    // TODO: API Call for Resume Upload
    console.log("Uploading resume:", file);

    setOpen(false);
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
            <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
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
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Upload
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
