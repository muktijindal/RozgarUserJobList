"use client";
import React, { useEffect, useState } from "react";

import { RecommendedHeader } from "./RecoomendedHeader";
import { getAllJobs } from "@/components/services/getAllJobs";
import { JobCard } from "./JobsCard";

export const RecommendedJobsSection = () => {
  const [activeTab, setActiveTab] = useState("All Jobs");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAllJobs();
      console.log(data, "alljobs");
      setJobs(data);
    };

    fetchJobs();
  }, []);

  const tabs = [
    { name: "All Jobs", count: jobs.length },
    // { name: "Profile", count: 0 },
    // { name: "Preferences", count: jobs.length },
    // { name: "You might like", count: jobs.length },
  ];

  return (
    <div className="bg-white border-b border-gray-100 px-8 py-4 w-full">
      <RecommendedHeader
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {(activeTab === "All Jobs" || activeTab === "You might like") && (
        <div className="mt-6 space-y-4">
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.jobTitle}
              company={job.AboutCompany}
              experience={`${job.experinceFrom} - ${job.experinceTo} yrs`}
              salary={`${job.salaryRangeFrom} - ${job.salaryRangeTo}`}
              location={`${job.jobLocation?.city}, ${job.jobLocation?.state}, ${job.jobLocation?.country}`}
              description={job.jobDescription}
              skills={job.skills || []}
              posted={`Posted on ${new Date(job.created_at).toDateString()}`}
              logo="/default-logo.png" // if no logo in API
            />
          ))}
        </div>
      )}
    </div>
  );
};
