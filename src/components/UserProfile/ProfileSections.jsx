"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";

export default function ProfileSections() {
  return (
    <div className="space-y-6">

      {/* Resume Headline */}
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Resume headline <span className="text-green-600 text-sm font-medium">Add 8%</span>
            </h2>

            <button className="text-blue-600 text-sm">Add resume headline</button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Add a summary of your resume to introduce yourself to recruiters
          </p>
        </CardContent>
      </Card>

      {/* Key Skills */}
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Key skills <span className="text-green-600 text-sm font-medium">Add 8%</span>
            </h2>

            <button className="text-blue-600 text-sm">Add key skills</button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Recruiters look for candidates with specific key skills
          </p>
        </CardContent>
      </Card>

      {/* Employment */}
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Employment</h2>

            <button className="text-blue-600 text-sm">Add employment</button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Your employment details will help recruiters understand your experience
          </p>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Education <span className="text-green-600 text-sm font-medium">Add 10%</span>
            </h2>

            <button className="text-blue-600 text-sm">Add education</button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Your qualifications help employers know your educational background
          </p>

          {/* EDUCATION LEVEL LINKS */}
          <div className="flex flex-col gap-2 mt-4">
            <button className="text-blue-600 text-sm text-left">Add doctorate/PhD</button>
            <button className="text-blue-600 text-sm text-left">Add masters/post-graduation</button>
            <button className="text-blue-600 text-sm text-left">Add graduation/diploma</button>
            <button className="text-blue-600 text-sm text-left">Add class XII</button>
            <button className="text-blue-600 text-sm text-left">Add class X</button>
            <button className="text-blue-600 text-sm text-left">Add below 10th</button>
          </div>
        </CardContent>
      </Card>

      {/* IT Skills */}
<Card className="rounded-2xl shadow-sm bg-white p-0">
  <CardContent className="px-6 py-5">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        IT skills <span className="text-green-600 text-sm font-medium">Add 10%</span>
      </h2>

      <button className="text-blue-600 text-sm">Add details</button>
    </div>

    <p className="text-sm text-gray-600 mt-2">
      Show your technical expertise by mentioning softwares and skills you know
    </p>
  </CardContent>
</Card>

{/* Projects */}
<Card className="rounded-2xl shadow-sm bg-white p-0">
  <CardContent className="px-6 py-5">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        Projects <span className="text-green-600 text-sm font-medium">Add 8%</span>
      </h2>

      <button className="text-blue-600 text-sm">Add project</button>
    </div>

    <p className="text-sm text-gray-600 mt-2">
      Stand out to employers by adding details about projects that you have done so far
    </p>
  </CardContent>
</Card>

{/* Profile Summary */}
<Card className="rounded-2xl shadow-sm bg-white p-0">
  <CardContent className="px-6 py-5">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold">Profile summary</h2>

      <button className="text-blue-600 text-sm">Add profile summary</button>
    </div>

    <p className="text-sm text-gray-600 mt-2">
      Highlight your key career achievements to help employers know your potential
    </p>
  </CardContent>
</Card>

{/* Accomplishments */}
<Card className="rounded-2xl shadow-sm bg-white p-0">
  <CardContent className="px-6 py-5">
    <h2 className="text-lg font-semibold">Accomplishments</h2>

    <p className="text-sm text-gray-600 mt-2">
      Showcase your credentials by adding relevant certifications, work samples, online profiles, etc.
    </p>

    {/* Sub Fields */}
    <div className="flex flex-col gap-4 mt-6">

      {/* Online Profile */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Online profile</p>
          <p className="text-sm text-gray-600">Add link to online professional profiles (e.g. LinkedIn, etc.)</p>
        </div>
        <button className="text-blue-600 text-sm">Add</button>
      </div>

      {/* Work Sample */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Work sample</p>
          <p className="text-sm text-gray-600">Link relevant work samples (e.g. Github, Behance)</p>
        </div>
        <button className="text-blue-600 text-sm">Add</button>
      </div>

      {/* Research / Publication */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">White paper / Research publication / Journal entry</p>
          <p className="text-sm text-gray-600">Add links to your online publications</p>
        </div>
        <button className="text-blue-600 text-sm">Add</button>
      </div>

      {/* Presentation */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Presentation</p>
          <p className="text-sm text-gray-600">Add links to your presentations</p>
        </div>
        <button className="text-blue-600 text-sm">Add</button>
      </div>

    </div>
  </CardContent>
</Card>

    </div>
  );
}
