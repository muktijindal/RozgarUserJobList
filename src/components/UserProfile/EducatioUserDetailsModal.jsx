"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EducationUserDetailsModal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-8xl h-190 overflow-scroll rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Education{" "}
            <span className="text-green-600 font-medium text-sm">Add 10%</span>
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 -mt-2">
          Details like course, university, and more, help recruiters identify your
          educational background
        </p>

        {/* FORM FIELDS */}
        <div className="space-y-6">

          {/* Education */}
          <div>
            <label className="text-sm font-medium">Education *</label>
            <select className="w-full mt-2 border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300">
              <option>Select education</option>
            </select>
          </div>

          {/* University/Institute */}
          <div>
            <label className="text-sm font-medium">University/Institute *</label>
            <input
              className="w-full mt-2 border rounded-xl p-3 text-sm outline-none"
              placeholder="Select university/institute"
            />
          </div>

          {/* Course */}
          <div>
            <label className="text-sm font-medium">Course *</label>
            <select className="w-full mt-2 border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300">
              <option>Select course</option>
            </select>
          </div>

          {/* Specialization */}
          <div>
            <label className="text-sm font-medium">Specialization *</label>
            <select className="w-full mt-2 border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300">
              <option>Select specialization</option>
            </select>
          </div>

          {/* Course Type */}
          <div>
            <label className="text-sm font-medium">Course type *</label>

            <div className="flex items-center gap-10 mt-3 text-sm">
              <label className="flex items-center gap-2">
                <input type="radio" name="courseType" defaultChecked />
                Full time
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="courseType" />
                Part time
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="courseType" />
                Correspondence/Distance learning
              </label>
            </div>
          </div>

          {/* Course Duration */}
          <div>
            <label className="text-sm font-medium">Course duration *</label>

            <div className="flex items-center gap-4 mt-2">
              <select className="w-full border rounded-xl p-3 text-sm outline-none">
                <option>Starting year</option>
              </select>

              <span className="text-gray-500">To</span>

              <select className="w-full border rounded-xl p-3 text-sm outline-none">
                <option>Ending year</option>
              </select>
            </div>
          </div>

          {/* Grading System */}
          <div>
            <label className="text-sm font-medium">Grading system</label>
            <select className="w-full mt-2 border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-300">
              <option>Select grading system</option>
            </select>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <DialogFooter className="mt-8">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="px-6"
          >
            Cancel
          </Button>

          <Button className="px-8 bg-blue-600 text-white">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
