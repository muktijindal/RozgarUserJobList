"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ITSkillsModal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            IT skills
            {/* <span className="text-green-600 font-medium text-sm">Add 10%</span> */}
          </DialogTitle>
        </DialogHeader>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed -mt-2">
          Mention skills like programming languages (Java, Python), softwares
          (Microsoft Word, Excel) and more, to show your technical expertise.
        </p>

        {/* FORM SECTION */}
        <div className="space-y-6 mt-6">

          {/* Skill name */}
          <div>
            <label className="text-sm font-medium">Skill / Software name</label>
            <input
              type="text"
              placeholder="Skill / Software name"
              className="w-full border rounded-xl p-3 mt-2 outline-none text-sm"
            />
          </div>

          {/* Software version */}
          <div>
            <label className="text-sm font-medium">Software version</label>
            <input
              type="text"
              placeholder="Software version"
              className="w-full border rounded-xl p-3 mt-2 outline-none text-sm"
            />
          </div>

          {/* Last used */}
          <div>
            <label className="text-sm font-medium">Last used</label>
            <select className="w-full border rounded-xl p-3 mt-2 outline-none text-sm">
              <option>Select last used</option>
              <option>Currently using</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium">Experience</label>

            <div className="flex gap-4 mt-2">
              {/* Years */}
              <select className="w-full border rounded-xl p-3 outline-none text-sm">
                <option>Years</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i}>{i} Years</option>
                ))}
              </select>

              {/* Months */}
              <select className="w-full border rounded-xl p-3 outline-none text-sm">
                <option>Months</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i}>{i} Months</option>
                ))}
              </select>
            </div>
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

          <Button className="px-8 bg-blue-600 text-white">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
