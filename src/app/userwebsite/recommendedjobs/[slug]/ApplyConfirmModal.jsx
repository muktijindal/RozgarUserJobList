"use client";
import { Button } from "@/components/ui/button";

export const ApplyConfirmModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-2">
          Confirm Application
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to apply for this job?
        </p>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
