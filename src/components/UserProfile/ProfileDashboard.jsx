"use client";

import React from "react";

import { UserDetails } from "./UserDetails";
import { QuickLinksUserProfile } from "./QuickLinksUserProfile";
import DisabilityResumeSection from "./DisabilityResumeSection";
import ProfileSections from "./Accomplishments/ProfileSections";

export default function ProfileDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <UserDetails />

        <div className="flex gap-8 p-5">
          {/* ⭐ Make QuickLinks sticky */}
          <div className="sticky top-24 h-fit min-w-[280px]">
            <QuickLinksUserProfile />
          </div>

          {/* Right Section */}
          <div className="">
            <DisabilityResumeSection />
            <ProfileSections />
          </div>

          <div></div>
        </div>
      </main>
    </div>
  );
}
