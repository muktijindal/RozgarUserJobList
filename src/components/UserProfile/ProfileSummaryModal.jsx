"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ProfileSummaryModal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg rounded-xl p-6">
        <DialogHeader>
          <DialogTitle>Resume Headline</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600 mt-2">
          It is the first thing recruiters notice in your profile. Write a
          concise headline introducing yourself to employers.
          <br />
          <span className="font-medium">Minimum 5 words</span>
        </p>

        <div className="mt-4">
          <input
            className="w-full border p-3 rounded-lg min-h-50"
            placeholder="e.g. Frontend Developer | React.js | Next.js"
          />
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
