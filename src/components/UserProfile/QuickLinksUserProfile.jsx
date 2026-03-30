"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import ResumeUploadModal from "./ResumeUploadModal";
import HeadlineModal from "./HeadlineModal";
import KeySkillsModal from "./KeySkillsDetailsModal";
import EducationUserDetailsModal from "./EducatioUserDetailsModal";
import ITSkillsModal from "./ITSkillsModal";
import ProfileSummaryModal from "./ProfileSummaryModal";
import UserProjectsModal from "./UserProjectsModal";
import PersonalDetailsModal from "./PersonalDetailsModal";


export const QuickLinksUserProfile = () => {
  const [openResume, setOpenResume] = useState(false);
  const [openHeadline, setOpenHeadline] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const [openEducation, setopenEducation] = useState(false);
  const [openITSkills, setopenITSkills] = useState(false);
  const [openProjects, setopenProjects] = useState(false);
  const [openSummary, setopenSummary] = useState(false);

  // ✅ NEW STATE
  const [openPersonalDetails, setOpenPersonalDetails] = useState(false);

  const handleClick = (item) => {
    if (item === "Resume") setOpenResume(true);
    if (item === "Resume headline") setOpenHeadline(true);
    if (item === "Key skills") setOpenSkills(true);
    if (item === "Education") setopenEducation(true);
    if (item === "IT skills") setopenITSkills(true);
    if (item === "Projects") setopenProjects(true);
    if (item === "Profile summary") setopenSummary(true);

    // ✅ HANDLE PERSONAL DETAILS
    if (item === "Personal Details") setOpenPersonalDetails(true);
  };

  const listItems = [
    "Resume",
    "Resume headline",
    "Key skills",
    "Education",
    "IT skills",
    "Projects",
    "Profile summary",
    "Accomplishments",
    "Career Profile",
    "Personal Details",
  ];


  const noAddButtonItems = [
    "Accomplishments",
    "Career Profile",
  ];

  return (
    <>

      <ResumeUploadModal open={openResume} setOpen={setOpenResume} />
      <HeadlineModal open={openHeadline} setOpen={setOpenHeadline} />
      <KeySkillsModal open={openSkills} setOpen={setOpenSkills} />
      <EducationUserDetailsModal open={openEducation} setOpen={setopenEducation} />
      <ITSkillsModal open={openITSkills} setOpen={setopenITSkills} />
      <UserProjectsModal open={openProjects} setOpen={setopenProjects} />
      <ProfileSummaryModal open={openSummary} setOpen={setopenSummary} />


      <PersonalDetailsModal
        open={openPersonalDetails}
        setOpen={setOpenPersonalDetails}
      />

      <div className="lg:col-span-4">
        <Card className="rounded-xl px-2">
          <CardHeader>
            <CardTitle className="text-lg">Quick links</CardTitle>
          </CardHeader>

          <CardContent className="px-6 mt-1">
            <ul className="space-y-4 text-sm">
              {listItems.map((item) => (
                <li key={item} className="flex items-center justify-between">
                  <span>{item}</span>

                  {/* ✅ NOW PERSONAL DETAILS WILL ALSO SHOW BUTTON */}
                  {!noAddButtonItems.includes(item) && (
                    <button
                      onClick={() => handleClick(item)}
                      className="text-blue-600 text-sm cursor-pointer hover:underline"
                    >
                      {item === "Resume" ? "Upload" : "Add"}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
};