"use client";

import React from "react";
import { AfterUserLoginNavbar } from "../global/AfterUserLoginNavbar";
import { UserDetails } from "./UserDetails";
import { QuickLinksUserProfile } from "./QuickLinksUserProfile";
import DisabilityResumeSection from "./DisabilityResumeSection";
import ProfileSections from "./ProfileSections";

export default function ProfileDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* HEADER */}
      <AfterUserLoginNavbar />

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto  px-6 py-8 ">
      <UserDetails />
     
        <div className="flex gap-20">
        <QuickLinksUserProfile />
      <div>
   <DisabilityResumeSection />
        <ProfileSections />
      </div>
        <div>
     
        </div>
        </div>
     
  
      </main>
    </div>
  );
}
