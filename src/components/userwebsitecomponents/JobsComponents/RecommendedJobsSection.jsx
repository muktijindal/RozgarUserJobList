"use client";
import React, { useEffect, useState } from "react";
import { JobCard } from "./JobsCard";
import { RecommendedHeader } from "./RecoomendedHeader";
import { getAllJobs } from "@/components/services/getAllJobs";


export const RecommendedJobsSection = () => {
  const [activeTab, setActiveTab] = useState("Applies");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs();
      console.log(data, 'alljobs')
      setJobs(data);
    };

    fetchJobs();
  }, []);

  const tabs = [
    { name: "Applies", count: jobs.length },
    { name: "Profile", count: 0 },
    { name: "Preferences", count: 0 },
    { name: "You might like", count: jobs.length },
  ];

  return (
    <div className="bg-white border-b border-gray-100 px-8 py-4 w-full">
      <RecommendedHeader
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {(activeTab === "Applies" || activeTab === "You might like") && (
        <div className="mt-6 space-y-4">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      )}
    </div>
  );
};
