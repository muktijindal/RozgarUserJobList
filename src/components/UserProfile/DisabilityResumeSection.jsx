"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import ResumeUploadModal from "./ResumeUploadModal";

export default function DisabilityResumeSection() {
  const [selected, setSelected] = useState(null);
  const [openResumeModal, setOpenResumeModal] = useState(false);
  const isDisabled = selected === null;


  return (
    <div className="space-y-6">

      {/* Resume Upload Modal */}
      <ResumeUploadModal open={openResumeModal} setOpen={setOpenResumeModal} />

      {/* Disability Section */}
      <Card className="bg-white p-6 rounded-2xl shadow-sm">
  <div className="flex justify-between items-start">
    <p className="text-lg font-medium">
      Companies want to build inclusive teams, help us identify your disability status for better jobs.
    </p>
    {/* <span className="text-xs text-purple-600 font-medium">Diversity & inclusion</span> */}
  </div>

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
        : "bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
    }`}
  >
    Submit
  </button>
</Card>


      {/* Resume Section */}
      <Card className="rounded-2xl shadow-sm bg-white p-0 mb-4 overflow-hidden">
        <CardContent className="px-6 py-5">
          {/* <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Resume <span className="text-green-600">Add 10%</span>
            </h2>
          </div> */}

          <p className="text-sm text-gray-600 mt-1">
            70% of recruiters discover candidates through their resume
          </p>

          {/* <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-24 h-28 bg-gray-100 rounded-lg"></div>

              <div>
                <p className="font-medium mb-1">Create your resume in 3 easy steps ✨</p>
                <ol className="text-sm text-gray-600 list-decimal ml-5 space-y-1">
                  <li>Add the missing details in your profile</li>
                  <li>Choose a template for your resume</li>
                  <li>Improve the content with AI</li>
                </ol>
              </div>
            </div>

            <button className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm">
              Create resume
            </button>
          </div> */}

          {/* Upload Resume */}
          <div className="mt-8 border rounded-xl p-4 text-center">
            <p className="text-sm">
              Already have a resume?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setOpenResumeModal(true)}
              >
                Upload resume
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supported Formats: doc, docx, rtf, pdf, upto 2 MB
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
