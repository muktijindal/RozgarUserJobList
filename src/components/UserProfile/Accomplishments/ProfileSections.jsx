"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import { Accomplisment } from "./Accomplisment";
import ProfileSummaryModal from "../ProfileSummaryModal";
import UserProjectsModal from "../UserProjectsModal";
import ITSkillsModal from "../ITSkillsModal";
import EducationUserDetailsModal from "../EducatioUserDetailsModal";
import KeySkillsModal from "../KeySkillsDetailsModal";
import HeadlineModal from "../HeadlineModal";
import EmploymentModal from "../EmploymentModal";

export default function ProfileSections() {

   const [openSummary, setopenSummary] = useState(false);
    const [openProjects, setopenProjects] = useState(false);
     const [openITSkills, setopenITSkills] = useState(false);
     const [openHeadline, setOpenHeadline] = useState(false);
const [openKeySkills, setOpenKeySkills] = useState(false);
const [openEducation, setOpenEducation] = useState(false);
const [openEmployment, setOpenEmployment] = useState(false);

 
  return (
    <div className="space-y-6">

      {/* Resume Headline */}
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Resume headline 
              {/* <span className="text-green-600 text-sm font-medium">Add 8%</span> */}
            </h2>

            <button
  onClick={() => setOpenHeadline(true)}
  className="text-blue-600 text-sm"
>
  Add resume headline
</button>

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
              Key skills
               {/* <span className="text-green-600 text-sm font-medium">Add 8%</span> */}
            </h2>

            <button
  onClick={() => setOpenKeySkills(true)}
  className="text-blue-600 text-sm"
>
  Add key skills
</button>

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

            <button
  onClick={() => setOpenEmployment(true)}
  className="text-blue-600 text-sm"
>
  Add employment
</button>

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
              Education 
              {/* <span className="text-green-600 text-sm font-medium">Add 10%</span> */}
            </h2>

            <button
  onClick={() => setOpenEducation(true)}
  className="text-blue-600 text-sm"
>
  Add education
</button>

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
{/* IT Skills */}
<Card className="rounded-2xl shadow-sm bg-white p-0">
  <CardContent className="px-6 py-5">
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        IT skills
      </h2>

      <button
        onClick={() => setopenITSkills(true)}
        className="text-blue-600 text-sm"
      >
        Add details
      </button>
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
        Projects
      </h2>

      <button
        onClick={() => setopenProjects(true)}
        className="text-blue-600 text-sm"
      >
        Add project
      </button>
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

            <button
              onClick={() => setopenSummary(true)}
              className="text-blue-600 text-sm"
            >
              Add profile summary
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Highlight your key career achievements to help employers know your potential
          </p>
        </CardContent>
      </Card>

<Accomplisment />



<UserProjectsModal
open={openProjects} 
setOpen={setopenProjects}
  onSave={(data) => {
    console.log("Project saved:", data);
    // 🔹 API integration here
  }}
/>

    <ProfileSummaryModal open={openSummary} setOpen={setopenSummary} />

<ITSkillsModal open={openITSkills} setOpen={setopenITSkills} />

{/* Resume Headline */}
<HeadlineModal
  open={openHeadline}
  setOpen={setOpenHeadline}
/>

{/* Key Skills */}
<KeySkillsModal
  open={openKeySkills}
  setOpen={setOpenKeySkills}
/>

{/* Employment */}
<EmploymentModal
  open={openEmployment}
  setOpen={setOpenEmployment}
/>

{/* Education */}
<EducationUserDetailsModal
  open={openEducation}
  setOpen={setOpenEducation}
/>



    </div>
  );
}
