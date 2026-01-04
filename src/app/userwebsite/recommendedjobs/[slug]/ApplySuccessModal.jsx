"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const ApplySuccessModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6 text-center">
        
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="text-green-600 w-14 h-14" />
        </div>

        <h2 className="text-xl font-semibold mb-2">
          Application Submitted
        </h2>

        <p className="text-gray-600 mb-6">
          Your application has been submitted successfully.  
          The recruiter will get back to you if shortlisted.
        </p>

        <Button onClick={onClose} className="w-full">
          Okay
        </Button>
      </div>
    </div>
  );
};
