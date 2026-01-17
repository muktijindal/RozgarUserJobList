"use client";
"use client";
import React, { useEffect, useState } from "react";

import { RecommendedHeader } from "./RecoomendedHeader";
import { JobCard } from "./JobsCard";

import { getAllJobs } from "@/components/services/getAllJobs";
import { getAllSavedJobs } from "@/components/services/getAllSavedJobs";
import { getAllAppliedJobs } from "@/components/services/getAllAppliedJobs";

export const RecommendedJobsSection = () => {
  const [activeTab, setActiveTab] = useState("All Jobs");

  const [allJobs, setAllJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  // ✅ FETCH EVERYTHING ONCE
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        setLoading(true);

        const [all, saved, applied] = await Promise.all([
          getAllJobs(),
          getAllSavedJobs(),
          getAllAppliedJobs(),
        ]);

        console.log("✅ All Jobs:", all);
        console.log("✅ Saved Jobs:", saved);
        console.log("✅ Applied Jobs:", applied);

        setAllJobs(all || []);
        setSavedJobs(saved || []);
        setAppliedJobs(applied || []);
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, []);


  const tabs = [
    { name: "All Jobs", count: allJobs.length },
    { name: "Applied Jobs", count: appliedJobs.length },
    { name: "Saved Jobs", count: savedJobs.length },
  ];

  return (
    <div className="bg-white border-b border-gray-100 px-8 py-4 w-full">
      <RecommendedHeader
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* ---------------- ALL JOBS ---------------- */}
      {activeTab === "All Jobs" && (
        <AllJobList jobs={allJobs} loading={loading} />
      )}

      {/* ---------------- SAVED JOBS ---------------- */}
      {activeTab === "Saved Jobs" && (
  <SavedJobList
    jobs={savedJobs}
    loading={loading}
    setSavedJobs={setSavedJobs}
  />
)}


      {/* ---------------- APPLIED JOBS ---------------- */}
      {activeTab === "Applied Jobs" && (
        <AppliedJobList jobs={appliedJobs} loading={loading} />
      )}
    </div>
  );
};


const AllJobList = ({ jobs, loading }) => {
  if (loading) return <p className="mt-6 text-sm text-gray-500">Loading...</p>;

  if (!jobs.length)
    return <p className="mt-6 text-sm text-gray-500">No jobs found</p>;

  return (
    <div className="mt-6 space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.job_id}
          jobId={job.job_id}
          title={job.jobTitle || "NA"}
          company={job.postedBy || "Company"}
          experience={`${job.experinceFrom} - ${job.experinceTo} yrs`}
          salary={
            job.salaryRangeFrom && job.salaryRangeTo
              ? `${job.salaryRangeFrom} - ${job.salaryRangeTo}`
              : "Not disclosed"
          }
          location={job.jobLocation}
          description={job.jobDescription || "No description available"}
          skills={job?.skills || []}
          posted={`Posted on ${new Date(job.created_at).toDateString()}`}
          logo="/default-logo.png"
        />
      ))}
    </div>
  );
};


const AppliedJobList = ({ jobs, loading }) => {
  if (loading) return <p className="mt-6 text-sm text-gray-500">Loading...</p>;

  if (!jobs.length)
    return (
      <p className="mt-6 text-sm text-gray-500">
        You haven’t applied to any jobs yet
      </p>
    );

  return (
    <div className="mt-6 space-y-4">
      {jobs.map((item) => {
        const job = item.jobDetails; // ✅ IMPORTANT

        return (
          <JobCard
            key={item.application_id}
            jobId={job.job_id}
            title={job.jobTitle || "NA"}
            company={ item.name || "NA"}
            experience={`${job.experinceFrom} - ${job.experinceTo} yrs`}
            salary={
              job.salaryRangeFrom && job.salaryRangeTo
                ? `${job.salaryRangeFrom} - ${job.salaryRangeTo}`
                : "Not disclosed"
            }
            location={job.jobLocation}
            description={job.jobDescription || "No description available"}
            skills={job?.skills || []}
            posted={`Applied on ${new Date(
              item.applied_at
            ).toDateString()}`}
            logo="/default-logo.png"
            appliedBadge
          />
        );
      })}
    </div>
  );
};


const SavedJobList = ({ jobs, loading, setSavedJobs }) => {
  if (loading) return <p className="mt-6 text-sm text-gray-500">Loading...</p>;

  if (!jobs.length)
    return <p className="mt-6 text-sm text-gray-500">No saved jobs found</p>;

  return (
    <div className="mt-6 space-y-4">
      {jobs.map((job) => (
        <JobCard
          key={job.job_id}
          jobId={job.job_id}
          title={job.jobTitle || "NA"}
          company={job.postedBy || "Company"}
          experience={`${job.experinceFrom} - ${job.experinceTo} yrs`}
          salary={
            job.salaryRangeFrom && job.salaryRangeTo
              ? `${job.salaryRangeFrom} - ${job.salaryRangeTo}`
              : "Not disclosed"
          }
          location={job.jobLocation}
          description={job.jobDescription || "No description available"}
          skills={job?.skills || []}
          posted={`Saved on ${new Date(job.created_at).toDateString()}`}
          logo="/default-logo.png"

          /* 🔥 IMPORTANT */
          isSaved={true}
          onUnsaveSuccess={(id) =>
            setSavedJobs((prev) => prev.filter((j) => j.job_id !== id))
          }
        />
      ))}
    </div>
  );
};

