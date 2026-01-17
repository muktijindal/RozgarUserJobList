"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { getAllJobs } from "@/components/services/getAllJobs";
import { JobCard } from "@/components/userwebsitecomponents/JobsComponents/JobsCard";
import { Button } from "@/components/ui/button";
import { ApplyConfirmModal } from "./ApplyConfirmModal";
import { JobQuestionsModal } from "./JobQuestionsModal";
import { ApplySuccessModal } from "./ApplySuccessModal";

const extractIdFromSlug = (slug) => {
  const parts = slug.split("-");
  return Number(parts[parts.length - 1]);
};

export default function JobDetailPage() {
  const { slug } = useParams();

  const [allJobs, setAllJobs] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showQuestionsModal, setShowQuestionsModal] = useState(false);

  const [answersPayload, setAnswersPayload] = useState([]);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false); // ✅ NEW

  // =========================
  // 🔹 APPLY CLICK
  // =========================
  const handleApplyClick = () => {
    if (hasApplied) return;

    if (job?.questions?.length > 0) {
      setShowQuestionsModal(true);
    } else {
      setShowConfirmModal(true);
    }
  };

  // =========================
  // 🔹 FINAL APPLY API
  // =========================
  const handleFinalApply = async () => {
    try {
      setApplying(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://147.93.72.227:5000/api/jobs/applications/${job.category}/${job.job_id}/apply`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers: answersPayload,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Apply failed");
      }

      console.log("✅ Apply Success:", data);

      setHasApplied(true); // ✅ MARK AS APPLIED
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("❌ Apply failed:", error);
      alert(error.message || "Failed to apply. Please try again.");
    } finally {
      setApplying(false);
    }
  };

  const normalizedLocation = useMemo(() => {
    if (!job?.jobLocation) return null;
  
    if (typeof job.jobLocation === "object") return job.jobLocation;
  
    if (typeof job.jobLocation === "string") {
      try {
        return JSON.parse(job.jobLocation);
      } catch (e) {
        console.error("❌ Failed to parse jobLocation:", e);
        return null;
      }
    }
  
    return null;
  }, [job]);
  

  // =========================
  // 🔹 FETCH JOBS
  // =========================
  useEffect(() => {
    if (!slug) return;

    const fetchJobs = async () => {
      const data = await getAllJobs();
      setAllJobs(data || []);

      const jobId = extractIdFromSlug(slug);
      const selectedJob = data.find((item) => item.job_id === jobId);

      setJob(selectedJob || null);

      // OPTIONAL: if backend sends applied flag later
      if (selectedJob?.isApplied) {
        setHasApplied(true);
      }

      setLoading(false);
    };

    fetchJobs();
  }, [slug]);

  // =========================
  // 🔹 NORMALIZE SKILLS
  // =========================
  const normalizedSkills = useMemo(() => {
    if (!job?.skills) return [];

    if (Array.isArray(job.skills)) return job.skills;

    if (typeof job.skills === "string") {
      try {
        const parsed = JSON.parse(job.skills);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        return job.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    }

    return [];
  }, [job]);

  if (loading) {
    return <div className="p-10 text-gray-500">Loading...</div>;
  }

  if (!job) {
    return <div className="p-10 text-red-500">Job not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT – JOB DETAILS ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* HEADER CARD */}
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {job?.jobTitle || "Not Disclosed"}
                </h1>

                <p className="text-gray-600 mt-1">
                  {job?.postedBy || "Not Disclosed"}
                </p>

                <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-700">
                  <span>
                    👜 {job?.experinceFrom} - {job?.experinceTo} yrs
                  </span>
                  <span>
                    {job.salaryRangeFrom
                      ? `₹ ${job.salaryRangeFrom} - ${job.salaryRangeTo} LPA`
                      : "Not Disclosed"}
                  </span>

                  <span>🏢 {job.workMode || "Hybrid"}</span>
                </div>

                <div className="flex items-center gap-2 mt-3 text-sm text-gray-700">
  📍{" "}
  {normalizedLocation
    ? `${normalizedLocation.city}, ${normalizedLocation.state}, ${normalizedLocation.country}`
    : "Location not disclosed"}
</div>

              </div>

              <div className="w-16 h-16 border rounded-xl flex items-center justify-center">
                <img
                  src="/default-logo.png"
                  alt="logo"
                  className="object-contain"
                />
              </div>
            </div>

            <hr className="my-6" />

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Posted on <b>{new Date(job.created_at).toDateString()}</b>
              </div>

              <div className="flex gap-3">
                <Button variant="outline">Save</Button>

                <Button
                  onClick={handleApplyClick}
                  disabled={applying || hasApplied}
                  className={
                    hasApplied
                      ? "bg-green-600 hover:bg-green-600 cursor-not-allowed"
                      : ""
                  }
                >
                  {hasApplied ? "Applied" : applying ? "Applying..." : "Apply"}
                </Button>
              </div>
            </div>
          </div>

          {/* JOB HIGHLIGHTS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-3">Job highlights</h2>

            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                {job.experinceFrom} to {job.experinceTo} years experience
                required
              </li>
              <li>
                Skills:{" "}
                {normalizedSkills.length
                  ? normalizedSkills.join(", ")
                  : "Not disclosed"}
              </li>
              <li>Work mode: {job.workMode || "Not Disclosed"}</li>
            </ul>
          </div>

          {/* JOB DESCRIPTION */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-3">Job description</h2>
            <p className="text-gray-700 leading-relaxed">
              {job.jobDescription || "Not Disclosed"}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-3">About Company</h2>
            <p className="text-gray-700 leading-relaxed">
              {job.AboutCompany || "Not Disclosed"}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-3">Beware of Fraud</h2>
            <p className="text-gray-700 leading-relaxed">
            Naukri.com does not promise a job or an interview in exchange of money. Fraudsters may ask you to pay in the pretext of registration fee, Refundable Fee
            </p>
          </div>
        </div>



        {/* ================= RIGHT – OTHER JOBS ================= */}
        <div className="space-y-4 max-h-[85vh] overflow-y-auto">
          <h2 className="text-lg font-semibold sticky top-0 bg-white py-2">
            Other Jobs
          </h2>

          {allJobs
            .filter((item) => item.job_id !== job.job_id)
            .map((item) => (
              <JobCard
                key={item.job_id}
                jobId={item.job_id}
                title={item.jobTitle}
                company={item.AboutCompany}
                experience={`${item.experinceFrom} - ${item.experinceTo} yrs`}
                salary={
                  item.salaryRangeFrom
                    ? `${item.salaryRangeFrom} - ${item.salaryRangeTo}`
                    : "Not Disclosed"
                }
                location={`${item.jobLocation?.city}, ${item.jobLocation?.state}`}
                description={item.jobDescription}
                skills={item.skills}
                posted={`Posted on ${new Date(item.created_at).toDateString()}`}
                logo="/default-logo.png"
              />
            ))}
        </div>
      </div>

      {/* ================= MODALS ================= */}
      <ApplyConfirmModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleFinalApply}
      />

      <JobQuestionsModal
        open={showQuestionsModal}
        questions={job.questions}
        onClose={() => setShowQuestionsModal(false)}
        onSubmit={(answers) => {
          const formattedAnswers = Object.keys(answers).map((key) => ({
            question: job.questions[key].question,
            answer: answers[key],
          }));

          setAnswersPayload(formattedAnswers);
          setShowQuestionsModal(false);
          setShowConfirmModal(true);
        }}
      />

      <ApplySuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
