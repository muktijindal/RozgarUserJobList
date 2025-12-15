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

const suggestedSkills = [
  "Java",
  "SQL",
  "Angular",
  "Javascript",
  "Python",
  "AWS",
  "React.Js",
  "HTML",
  "Rest",
  "CSS",
];

export default function KeySkillsModal({ open, setOpen }) {
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState("");

  const handleAddSkill = () => {
    if (input.trim() !== "") {
      setSkills([...skills, input.trim()]);
      setInput("");
    }
  };

  const handleSuggestedClick = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl rounded-xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Key skills
            {/* <span className="text-green-600 font-medium text-sm">Add 8%</span> */}
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-2">
          Add skills that best define your expertise, for e.g., Direct Marketing,
          Oracle, Java, etc. <span className="font-medium">(Minimum 1)</span>
        </p>

        {/* Skills Input */}
        <div className="mt-4">
          <label className="font-medium text-sm">Skills</label>
          <div className="flex gap-2 mt-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border p-3 rounded-xl outline-none"
              placeholder="Add skills"
            />

            <Button
              className="bg-blue-500 text-white"
              onClick={handleAddSkill}
            >
              Add
            </Button>
          </div>
        </div>

        {/* Display Added Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Suggested Skills */}
        <p className="mt-6 mb-2 text-sm text-gray-600">
          Or you can select from the suggested set of skills
        </p>

        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => handleSuggestedClick(skill)}
              className="px-3 py-1 border text-sm rounded-full hover:bg-gray-100"
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            className="bg-blue-600 text-white"
            disabled={skills.length < 1}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
