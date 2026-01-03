"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../../ui/card";
import OnlineProfileModal from "./OnlinePortfolioModal";
import WorkSampleModal from "./Worksample";
import CertificationModal from "./CertificationModal";


export const Accomplisment = () => {
  const [openOnlineProfile, setOpenOnlineProfile] = useState(false);
  const [openWorkSample, setOpenWorkSample] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);

  return (
    <>
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <h2 className="text-lg font-semibold">Accomplishments</h2>

          <p className="text-sm text-gray-600 mt-2">
            Showcase your credentials by adding relevant certifications, work
            samples, online profiles, etc.
          </p>

          {/* Sub Fields */}
          <div className="flex flex-col gap-4 mt-6">

            {/* Online Profile */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Online profile</p>
                <p className="text-sm text-gray-600">
                  Add link to online professional profiles (e.g. LinkedIn, etc.)
                </p>
              </div>
              <button
                onClick={() => setOpenOnlineProfile(true)}
                className="text-blue-600 text-sm"
              >
                Add
              </button>
            </div>

            <div className="flex justify-between items-center">
  <div>
    <p className="font-medium">Work sample</p>
    <p className="text-sm text-gray-600">
      Link relevant work samples (e.g. Github, Behance)
    </p>
  </div>
  <button
    onClick={() => setOpenWorkSample(true)}
    className="text-blue-600 text-sm"
  >
    Add
  </button>
</div>

            {/* Research / Publication */}
            {/* <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  White paper / Research publication / Journal entry
                </p>
                <p className="text-sm text-gray-600">
                  Add links to your online publications
                </p>
              </div>
              <button className="text-blue-600 text-sm">Add</button>
            </div> */}

            {/* Presentation */}
            {/* <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Presentation</p>
                <p className="text-sm text-gray-600">
                  Add links to your presentations
                </p>
              </div>
              <button className="text-blue-600 text-sm">Add</button>
            </div> */}

            <div className="flex justify-between items-center">
  <div>
    <p className="font-medium">Certification</p>
    <p className="text-sm text-gray-600">
      Add details of certifications you have achieved
    </p>
  </div>
  <button
    onClick={() => setOpenCertification(true)}
    className="text-blue-600 text-sm"
  >
    Add
  </button>
</div>

          </div>
        </CardContent>
      </Card>

      {/* Online Profile Modal */}
      <OnlineProfileModal
        open={openOnlineProfile}
        onClose={() => setOpenOnlineProfile(false)}
        onSave={(data) => {
          console.log("Online profile saved:", data);
          // 🔹 call API here later
        }}
      />

<WorkSampleModal
  open={openWorkSample}
  onClose={() => setOpenWorkSample(false)}
  onSave={(data) => {
    console.log("Work sample saved:", data);
  }}
/>


<CertificationModal
  open={openCertification}
  onClose={() => setOpenCertification(false)}
  onSave={(data) => {
    console.log("Certification saved:", data);
  }}
/>
    </>
  );
};
