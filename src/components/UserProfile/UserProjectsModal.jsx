"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const emptyProject = {
  project_title: "",
  client: "",
  project_status: "",
  work_from_year: "",
  work_from_month: "",
  work_to_year: "",
  work_to_month: "",
  project_details: "",
};

export default function UserProjectsModal({ open, setOpen }) {
  const maxChars = 1000;

  const [projects, setProjects] = useState([emptyProject]);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...projects];
    updated[index][name] = value;
    setProjects(updated);
  };

  const addMoreProject = () => {
    setProjects((prev) => [...prev, emptyProject]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      for (const project of projects) {
        if (!project.project_title || !project.project_status) continue;

        const res = await fetch("http://147.93.72.227:5000/api/users/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(project),
        });

        if (!res.ok) {
          throw new Error("Failed to save project");
        }
      }

      toast.success("Projects added successfully");
      setOpen(false);
      setProjects([emptyProject]);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl">Projects</DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 text-sm mb-4">
          Add projects from college, internships, or work experience.
        </p>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 space-y-6 bg-gray-50"
            >
              <h3 className="text-sm font-semibold text-gray-700">
                Project {index + 1}
              </h3>

              {/* Project title */}
              <div>
                <label className="text-sm font-medium">Project title</label>
                <input
                  name="project_title"
                  value={project.project_title}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border rounded-xl p-3 mt-2 text-sm"
                  placeholder="Enter project title"
                />
              </div>

              {/* Client */}
              <div>
                <label className="text-sm font-medium">Client</label>
                <input
                  name="client"
                  value={project.client}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border rounded-xl p-3 mt-2 text-sm"
                  placeholder="Enter client name"
                />
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium">Project status</label>
                <select
                  name="project_status"
                  value={project.project_status}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full border rounded-xl p-3 mt-2 text-sm"
                >
                  <option value="">Select status</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>On Hold</option>
                </select>
              </div>

              {/* Worked From */}
              <div>
                <label className="text-sm font-medium">Worked from</label>
                <div className="flex gap-4 mt-2">
                  <select
                    name="work_from_year"
                    value={project.work_from_year}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border rounded-xl p-3 text-sm"
                  >
                    <option value="">Year</option>
                    {[...Array(25)].map((_, i) => (
                      <option key={i}>{2024 - i}</option>
                    ))}
                  </select>

                  <select
                    name="work_from_month"
                    value={project.work_from_month}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full border rounded-xl p-3 text-sm"
                  >
                    <option value="">Month</option>
                    {[
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Details */}
              <div>
                <label className="text-sm font-medium">
                  Details of project
                </label>
                <textarea
                  name="project_details"
                  value={project.project_details}
                  maxLength={maxChars}
                  onChange={(e) => handleChange(index, e)}
                  rows={4}
                  className="w-full border rounded-xl p-4 mt-2 text-sm resize-none"
                  placeholder="Describe your project..."
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {maxChars - project.project_details.length} characters left
                </div>
              </div>
            </div>
          ))}

          {/* Add More */}
          <button
            onClick={addMoreProject}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            + Add more details
          </button>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="px-8 bg-blue-600 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
