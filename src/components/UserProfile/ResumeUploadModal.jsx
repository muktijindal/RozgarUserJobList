"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ResumeUploadModal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md rounded-xl p-6">
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 text-white">Upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
