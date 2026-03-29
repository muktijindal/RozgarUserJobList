"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import ResumeUploadModal from "./ResumeUploadModal";

export default function DisabilityResumeSection() {
  const [selected, setSelected] = useState(null);
  const [openResumeModal, setOpenResumeModal] = useState(false);

  const [resumeData, setResumeData] = useState(null);
  const [loadingResume, setLoadingResume] = useState(false);

  /* =======================
     FETCH RESUME
     ======================= */
  const fetchResume = async () => {
    try {
      setLoadingResume(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/resume/get",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        setResumeData(data?.resume || null);
      }
    } catch (err) {
      console.error("Failed to fetch resume", err);
    } finally {
      setLoadingResume(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  return (
    <div className="space-y-6">
      {/* Resume Upload Modal */}
      <ResumeUploadModal open={openResumeModal} setOpen={setOpenResumeModal} />

      {/* ================= DISABILITY SECTION ================= */}
      <Card className="bg-white p-6 rounded-2xl shadow-sm">
        <p className="text-lg font-medium">
          Companies want to build inclusive teams, help us identify your
          disability status for better jobs.
        </p>

        {/* Option Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setSelected("yes")}
            className={`px-5 py-2 border rounded-full text-sm transition ${
              selected === "yes"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            I have a disability
          </button>

          <button
            onClick={() => setSelected("no")}
            className={`px-5 py-2 border rounded-full text-sm transition ${
              selected === "no"
                ? "bg-blue-600 text-white border-blue-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            I don’t have a disability
          </button>
        </div>

        {/* Submit Button */}
        <button
          disabled={selected === null}
          className={`mt-6 px-6 py-2 rounded-full text-sm transition ${
            selected === null
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Submit
        </button>
      </Card>

      {/* ================= RESUME SECTION ================= */}
      <Card className="rounded-2xl shadow-sm bg-white p-0 overflow-hidden">
        <CardContent className="px-6 py-5">
          <p className="text-sm text-gray-600 mt-1">
            70% of recruiters discover candidates through their resume
          </p>

          {/* Resume State */}
          <div className="mt-6 border rounded-xl p-4 text-center">
            {loadingResume ? (
              <p className="text-sm text-gray-500">Checking resume...</p>
            ) : resumeData?.resume_url ? (
              <>
                <div className="flex items-center justify-between bg-gray-50 border rounded-xl p-4 hover:shadow-sm transition">
                  {/* LEFT SIDE */}
                  <div className="flex items-center gap-3">
                    {/* File Icon */}
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg text-lg">
                      📄
                    </div>

                    {/* Resume Info */}
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-800">
                        {resumeData?.resume_title || "Resume uploaded"}
                      </p>

                      <p className="text-xs text-gray-500 mt-0.5">
                        PDF • Ready to share with recruiters
                      </p>

                      <a
                        href={resumeData.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 mt-1 inline-block hover:underline"
                      >
                        View / Download
                      </a>
                    </div>
                  </div>

                  {/* RIGHT SIDE ACTION */}
                  <button
                    onClick={() => setOpenResumeModal(true)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
                  >
                    Replace
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm">
                  Already have a resume?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={() => setOpenResumeModal(true)}
                  >
                    Upload Updated resume
                  </span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: doc, docx, rtf, pdf (max 2MB)
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
