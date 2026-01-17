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

const proficiencyOptions = ["beginner", "intermediate", "advanced", "expert"];

export default function ITSkillsModal({ open, setOpen }) {
  const [skills, setSkills] = useState([
    { skill_name: "", proficiency_level: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const addSkillRow = () => {
    setSkills([...skills, { skill_name: "", proficiency_level: "" }]);
  };

  const removeSkillRow = (index) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
  };

  const handleSave = async () => {
    setError("");

    // Validation
    for (let skill of skills) {
      if (!skill.skill_name || !skill.proficiency_level) {
        setError("Please fill all skill name and proficiency fields.");
        return;
      }
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please login again.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://147.93.72.227:5000/api/users/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(skills),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Failed to save skills.");
        return;
      }

      // Success → close modal & reset
      setOpen(false);
      setSkills([{ skill_name: "", proficiency_level: "" }]);
    } catch (err) {
      console.error("Skills save error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl rounded-2xl p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            IT skills
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 text-sm leading-relaxed -mt-2">
          Mention skills like programming languages (Java, Python), softwares
          (Microsoft Word, Excel) and more, to show your technical expertise.
        </p>

        {/* SKILLS LIST */}
        <div className="space-y-6 mt-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 space-y-4 relative"
            >
              {/* Remove */}
              {skills.length > 1 && (
                <button
                  onClick={() => removeSkillRow(index)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              )}

              {/* Skill Name */}
              <div>
                <label className="text-sm font-medium">Skill / Software name</label>
                <input
                  type="text"
                  placeholder="e.g. ReactJS, Node.js"
                  value={skill.skill_name}
                  onChange={(e) =>
                    handleChange(index, "skill_name", e.target.value)
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none text-sm"
                />
              </div>

              {/* Proficiency */}
              <div>
                <label className="text-sm font-medium">Proficiency level</label>
                <select
                  value={skill.proficiency_level}
                  onChange={(e) =>
                    handleChange(index, "proficiency_level", e.target.value)
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none text-sm"
                >
                  <option value="">Select proficiency</option>
                  {proficiencyOptions.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Add More */}
        <button
          onClick={addSkillRow}
          className="mt-4 text-blue-600 text-sm font-medium"
        >
          + Add another skill
        </button>

        {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

        {/* FOOTER */}
        <DialogFooter className="mt-8">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="px-6"
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={loading}
            className="px-8 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
