"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function ResumeUploadModal({ open, setOpen }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [statusModal, setStatusModal] = useState({
    open: false,
    type: "", // "success" | "error"
    message: "",
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const openStatusModal = (type, message) => {
    setStatusModal({
      open: true,
      type,
      message,
    });
  };

  const closeStatusModal = () => {
    setStatusModal({
      open: false,
      type: "",
      message: "",
    });
  };

  const handleUpload = async () => {
    if (!file) {
      openStatusModal("error", "Please select a file before uploading.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      openStatusModal("error", "User not authenticated. Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const res = await fetch(
        "http://147.93.72.227:5000/api/users/upload-resume",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        openStatusModal("error", data?.message || "Resume upload failed.");
        return;
      }

      openStatusModal("success", "Resume uploaded successfully ✅");
      setFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Upload error:", error);
      openStatusModal(
        "error",
        "Something went wrong while uploading. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Upload Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Upload Resume
            </DialogTitle>
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
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              onClick={handleUpload}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Status Modal (Success / Error) */}
      <Dialog open={statusModal.open} onOpenChange={closeStatusModal}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle
              className={`text-lg font-semibold ${
                statusModal.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {statusModal.type === "success" ? "Success" : "Error"}
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-600 mt-2">{statusModal.message}</p>

          <div className="flex justify-center mt-5">
            <Button onClick={closeStatusModal}>Okay</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
