"use client";

import React, { useEffect, useState } from "react";
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
  const [experiences, setExperiences] = useState([]);
  const [loadingExp, setLoadingExp] = useState(false);
  const [educations, setEducations] = useState([]);
  const [loadingEdu, setLoadingEdu] = useState(false);
  const [skills, setSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [editEducation, setEditEducation] = useState(null);
  const [editEmployment, setEditEmployment] = useState(null);

  const [editProject, setEditProject] = useState(null);

  const [editSkills, setEditSkills] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://147.93.72.227:5000/api/users/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await res.json();
      setProjects(data?.data || data || []);
    } catch (err) {
      console.error("Fetch projects error:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
    fetchEducations();
    fetchSkills();
    fetchProjects(); // ✅ ADD THIS
  }, []);

  const fetchEducations = async () => {
    try {
      setLoadingEdu(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://147.93.72.227:5000/api/users/educations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      // API may return array directly or wrapped
      setEducations(data?.data || data || []);
    } catch (err) {
      console.error("Fetch educations error:", err);
    } finally {
      setLoadingEdu(false);
    }
  };

  // ✅ Fetch experiences
  const fetchExperiences = async () => {
    try {
      setLoadingExp(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://147.93.72.227:5000/api/users/experiences",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      // API usually returns array directly OR wrapped
      setExperiences(data?.data || data || []);
    } catch (err) {
      console.error("Fetch experiences error:", err);
    } finally {
      setLoadingExp(false);
    }
  };
  const fetchSkills = async () => {
    try {
      setLoadingSkills(true);
      const token = localStorage.getItem("token");

      const res = await fetch("http://147.93.72.227:5000/api/users/skills", {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });

      const data = await res.json();
      setSkills(data?.data || data || []);
    } catch (err) {
      console.error("Fetch skills error:", err);
    } finally {
      setLoadingSkills(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
    fetchEducations(); // ✅ ADD THIS
    fetchSkills();
  }, []);

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
              onClick={() => {
                setEditEmployment(null); // ✅ ADD mode
                setOpenEmployment(true);
              }}
              className="text-blue-600 text-sm"
            >
              Add employment
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Your employment details will help recruiters understand your
            experience
          </p>

          {/* EXPERIENCE LIST */}
          <div className="mt-4 space-y-4">
            {loadingExp && (
              <p className="text-sm text-gray-400">
                Loading employment details...
              </p>
            )}

            {!loadingExp && experiences.length === 0 && (
              <p className="text-sm text-gray-400">No employment added yet.</p>
            )}

            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="border rounded-xl p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-medium">{exp.job_title}</h3>
                  <p className="text-sm text-gray-600">{exp.company_name}</p>

                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.currently_working
                      ? "Present"
                      : formatDate(exp.end_date)}
                  </p>
                </div>

                <button
                  className="text-blue-600 text-sm"
                  onClick={() => {
                    setEditEmployment(exp); // ✅ EDIT mode
                    setOpenEmployment(true);
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Education</h2>

            <button
              onClick={() => {
                setEditEducation(null); // add mode
                setOpenEducation(true);
              }}
              className="text-blue-600 text-sm"
            >
              Add education
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Your qualifications help employers know your educational background
          </p>

          {/* EDUCATION LIST */}
          <div className="mt-4 space-y-4">
            {loadingEdu && (
              <p className="text-sm text-gray-400">
                Loading education details...
              </p>
            )}

            {!loadingEdu && educations.length === 0 && (
              <p className="text-sm text-gray-400">No education added yet.</p>
            )}

            {educations.map((edu) => (
              <div
                key={edu.id}
                className="border rounded-xl p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-medium">
                    {edu.degree}{" "}
                    {edu.specialization && `(${edu.specialization})`}
                  </h3>

                  <p className="text-sm text-gray-600">{edu.institute_name}</p>

                  <p className="text-xs text-gray-500 mt-1">
                    {edu.start_year} – {edu.end_year || "Present"}
                  </p>

                  {edu.percentage && (
                    <p className="text-xs text-gray-500">
                      Score: {edu.percentage}
                    </p>
                  )}
                </div>

                <button
                  className="text-blue-600 text-sm"
                  onClick={() => {
                    setEditEducation(edu);
                    setOpenEducation(true);
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* IT Skills */}
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">IT skills</h2>

            <button
              onClick={() => setopenITSkills(true)}
              className="text-blue-600 text-sm"
            >
              Add details
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Show your technical expertise by mentioning softwares and skills you
            know
          </p>

          {/* SKILLS LIST */}
          <div className="mt-4 space-y-3">
            {loadingSkills && (
              <p className="text-sm text-gray-400">Loading skills...</p>
            )}

            {!loadingSkills && skills.length === 0 && (
              <p className="text-sm text-gray-400">No skills added yet.</p>
            )}

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 border rounded-full text-sm bg-gray-50 flex items-center gap-1"
                >
                  {skill.skill_name}
                  <span className="text-gray-500 ml-1">
                    ({skill.proficiency_level})
                  </span>

                  {/* EDIT (no UI change visually, same text style) */}
                  <button
                    className="text-blue-600 text-xs ml-1"
                    onClick={() => {
                      setEditSkills(skills);
                      setopenITSkills(true);
                    }}
                  >
                    Edit
                  </button>
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Projects</h2>

            <button
              onClick={() => setopenProjects(true)}
              className="text-blue-600 text-sm"
            >
              Add project
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Stand out to employers by adding details about projects you have
            done so far
          </p>

          {/* PROJECT LIST */}
          <div className="mt-4 space-y-4">
            {loadingProjects && (
              <p className="text-sm text-gray-400">Loading projects...</p>
            )}

            {!loadingProjects && projects.length === 0 && (
              <p className="text-sm text-gray-400">No projects added yet.</p>
            )}

            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-xl p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="font-medium">{project.project_title}</h3>

                  <p className="text-sm text-gray-600">
                    {project.client} • {project.project_status}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {project.work_from_month} {project.work_from_year}
                    {project.work_to_year &&
                      ` – ${project.work_to_month} ${project.work_to_year}`}
                  </p>

                  {project.project_details && (
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                      {project.project_details}
                    </p>
                  )}
                </div>

                <button
                  className="text-blue-600 text-sm"
                  onClick={() => {
                    setEditProject(project);
                    setopenProjects(true);
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
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
            Highlight your key career achievements to help employers know your
            potential
          </p>
        </CardContent>
      </Card>

      <Accomplisment />

      <UserProjectsModal
        open={openProjects}
        setOpen={setopenProjects}
        project={editProject} // ✅ added for edit
        onSave={(data) => {
          fetchProjects(); // 🔥 refresh list
          console.log("Project saved:", data);
        }}
        onClose={() => setEditProject(null)} // ✅ reset edit state
      />

      <ProfileSummaryModal open={openSummary} setOpen={setopenSummary} />

      <ITSkillsModal
        open={openITSkills}
        setOpen={setopenITSkills}
        skillsData={editSkills} // ✅ added
        onSave={() => {
          fetchSkills();
          setEditSkills(null);
        }}
      />

      {/* Resume Headline */}
      <HeadlineModal open={openHeadline} setOpen={setOpenHeadline} />

      {/* Key Skills */}
      <KeySkillsModal open={openKeySkills} setOpen={setOpenKeySkills} />

      {/* Employment */}
      <EmploymentModal
        open={openEmployment}
        setOpen={setOpenEmployment}
        employment={editEmployment} // ✅ pass data for edit
        onSave={() => {
          fetchExperiences(); // 🔥 refresh list
          setEditEmployment(null);
        }}
      />

      <EducationUserDetailsModal
        open={openEducation}
        setOpen={setOpenEducation}
        education={editEducation} // ✅ for edit
        onSave={() => {
          fetchEducations();
          setEditEducation(null);
        }}
      />
    </div>
  );
}

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });
};
