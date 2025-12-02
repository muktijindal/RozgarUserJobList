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

export default function UserProjectsModal({ open, setOpen }) {
  const [details, setDetails] = useState("");
  const maxChars = 1000;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl h-190 overflow-scroll rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl">Project</DialogTitle>
        </DialogHeader>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed -mt-2 mb-4">
          Stand out for employers by adding details about projects you have done
          in college, internships, or at work
        </p>

        {/* FORM FIELDS */}
        <div className="space-y-6">
          {/* Project title */}
          <div>
            <label className="text-sm font-medium">Project title</label>
            <input
              type="text"
              placeholder="Enter project title"
              className="w-full border rounded-xl p-3 mt-2 outline-none text-sm"
            />
          </div>

          {/* Client */}
          <div>
            <label className="text-sm font-medium">Client</label>
            <input
              type="text"
              placeholder="Enter client name"
              className="w-full border rounded-xl p-3 mt-2 outline-none text-sm"
            />
          </div>

          {/* Project Status */}
          <div>
            <label className="text-sm font-medium">Project status</label>
            <select className="w-full border rounded-xl p-3 mt-2 outline-none text-sm">
              <option>Select status</option>
              <option>Completed</option>
              <option>In Progress</option>
              <option>On Hold</option>
            </select>
          </div>

          {/* Worked From */}
          <div>
            <label className="text-sm font-medium">Worked from</label>

            <div className="flex gap-4 mt-2">
              {/* Year */}
              <select className="w-full border rounded-xl p-3 outline-none text-sm">
                <option>Select year</option>
                {[...Array(25)].map((_, i) => (
                  <option key={i}>{2024 - i}</option>
                ))}
              </select>

              {/* Month */}
              <select className="w-full border rounded-xl p-3 outline-none text-sm">
                <option>Select month</option>
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
            <label className="text-sm font-medium">Details of project</label>

            <textarea
              rows={5}
              value={details}
              maxLength={maxChars}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Type here..."
              className="w-full border rounded-xl p-4 mt-2 outline-none text-sm resize-none"
            />

            <div className="text-right text-xs text-gray-500 mt-1">
              {maxChars - details.length} character(s) left
            </div>
          </div>

          {/* Add more details */}
          <button className="text-blue-600 text-sm font-medium hover:underline">
            Add more details
          </button>
        </div>

        {/* FOOTER BUTTONS */}
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button className="px-8 bg-blue-600 text-white">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
