"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const proficiencyOptions = ["beginner", "intermediate", "advanced", "expert"];

export default function ITSkillsModal({
  open,
  setOpen,
  skillsData,
  onSave,
}) {
  const [skills, setSkills] = useState([
    { id: null, skill_name: "", proficiency_level: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= PREFILL FOR EDIT ================= */
  useEffect(() => {
    if (open && skillsData && skillsData.length) {
      setSkills(
        skillsData.map((s) => ({
          id: s.id,
          skill_name: s.skill_name,
          proficiency_level: s.proficiency_level,
        }))
      );
    }
  }, [open, skillsData]);

  /* ================= RESET ================= */
  useEffect(() => {
    if (!open) {
      setSkills([{ id: null, skill_name: "", proficiency_level: "" }]);
      setError("");
      setLoading(false);
    }
  }, [open]);

  const handleChange = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  const addSkillRow = () => {
    setSkills([...skills, { id: null, skill_name: "", proficiency_level: "" }]);
  };

  /* ================= DELETE SKILL ================= */
  const removeSkillRow = async (index) => {
    const skill = skills[index];

    // 🟢 If skill is already saved → delete from backend
    if (skill.id) {
      try {
        const token = localStorage.getItem("token");

        await fetch(
          `https://qa.api.rozgardwar.cloud/api/users/skills/delete/${skill.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );
      } catch (err) {
        console.error("Delete skill failed", err);
        setError("Failed to delete skill. Please try again.");
        return;
      }
    }

    // 🟡 Remove from UI
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated.length ? updated : [{ id: null, skill_name: "", proficiency_level: "" }]);
  };

  const handleSave = async () => {
    setError("");

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

      for (const skill of skills) {
        const isEdit = Boolean(skill.id);

        const res = await fetch(
          isEdit
            ? `https://qa.api.rozgardwar.cloud/api/users/skills/update/${skill.id}`
            : "https://qa.api.rozgardwar.cloud/api/users/skills",
          {
            method: isEdit ? "PATCH" : "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              skill_name: skill.skill_name,
              proficiency_level: skill.proficiency_level,
            }),
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to save skills.");
        }
      }

      onSave?.();
      setOpen(false);
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

        <div className="space-y-6 mt-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 space-y-4 relative"
            >
              {skills.length > 1 && (
                <button
                  onClick={() => removeSkillRow(index)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                >
                  ✕
                </button>
              )}

              <div>
                <label className="text-sm font-medium">
                  Skill / Software name
                </label>
                <input
                  type="text"
                  value={skill.skill_name}
                  onChange={(e) =>
                    handleChange(index, "skill_name", e.target.value)
                  }
                  className="w-full border rounded-xl p-3 mt-2 outline-none text-sm"
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Proficiency level
                </label>
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

        <button
          onClick={addSkillRow}
          className="mt-4 text-blue-600 text-sm font-medium"
        >
          + Add another skill
        </button>

        {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

        <DialogFooter className="mt-8">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
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
