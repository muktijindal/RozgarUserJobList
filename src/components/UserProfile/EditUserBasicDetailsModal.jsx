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

export default function EditBasicDetailsModal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl h-200 overflow-scroll rounded-xl px-8 p-10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Basic Details</DialogTitle>
        </DialogHeader>

        {/* Modal Body */}
        <div className="space-y-6 mt-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Name *</label>
            <input
              className="w-full mt-2 p-3 rounded-xl border"
              placeholder="Rishab"
            />
          </div>

          {/* Work Status */}
          <div>
            <label className="text-sm font-medium">Work status</label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="work" defaultChecked />
                Fresher
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="work" />
                Experienced
              </label>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium">Current Location *</label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="location" defaultChecked />
                India
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="location" />
                Outside India
              </label>
            </div>

            <input
              className="w-full mt-3 p-3 rounded-xl border"
              placeholder="New Delhi"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="text-sm font-medium">Mobile Number *</label>
            <input
              className="w-full mt-2 p-3 rounded-xl border"
              placeholder="9355839665"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email Address *</label>
            <input
              className="w-full mt-2 p-3 rounded-xl border"
              placeholder="jindalmukti51@gmail.com"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="text-sm font-medium">Availability to Join</label>
            <div className="flex flex-wrap gap-3 mt-3">
              {[
                "15 Days or less",
                "1 Month",
                "2 Months",
                "3 Months",
                "More than 3 Months",
              ].map((item) => (
                <button
                  key={item}
                  className="px-4 py-2 border rounded-full hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 text-white">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
