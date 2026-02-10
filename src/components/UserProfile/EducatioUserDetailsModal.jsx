"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function EducationUserDetailsModal({
  open,
  setOpen,
  education, // ✅ for edit + delete
  onSave, // ✅ refresh list after delete/save
}) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    degree: "",
    specialization: "",
    university: "",
    start_year: "",
    end_year: "",
    percentage: "",
    courseType: "Full time",
  });

  /* ================= PREFILL FOR EDIT ================= */
  useEffect(() => {
    if (open && education) {
      setFormData({
        degree: education.degree || "",
        specialization: education.specialization || "",
        university: education.university || education.institute_name || "",
        start_year: education.start_year || "",
        end_year: education.end_year || "",
        percentage: education.percentage || "",
        courseType: education.courseType || "Full time",
      });
    }
  }, [open, education]);

  /* ================= RESET ON CLOSE ================= */
  useEffect(() => {
    if (!open) {
      setFormData({
        degree: "",
        specialization: "",
        university: "",
        start_year: "",
        end_year: "",
        percentage: "",
        courseType: "Full time",
      });
      setMessage("");
      setLoading(false);
      setDeleting(false);
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SAVE (ADD / EDIT) ================= */
  const handleSubmit = async () => {
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("User not authenticated. Please login again.");
      return;
    }

    if (
      !formData.degree ||
      !formData.specialization ||
      !formData.university ||
      !formData.start_year ||
      !formData.end_year
    ) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const isEdit = Boolean(education?.id);

      const res = await fetch(
        isEdit
          ? `https://qa.api.rozgardwar.cloud/api/users/educations/${education.id}`
          : "https://qa.api.rozgardwar.cloud/api/users/educations",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            degree: formData.degree,
            specialization: formData.specialization,
            university: formData.university,
            start_year: Number(formData.start_year),
            end_year: Number(formData.end_year),
            percentage: formData.percentage,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data?.message || "Failed to save education details.");
        return;
      }

      setMessage(
        isEdit
          ? "Education details updated successfully ✅"
          : "Education details saved successfully ✅"
      );

      onSave?.();

      setTimeout(() => {
        setOpen(false);
        setMessage("");
      }, 1200);
    } catch (error) {
      console.error("Education save error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE EDUCATION ================= */
  const handleDelete = async () => {
    if (!education?.id) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setDeleting(true);

      const res = await fetch(
        `https://qa.api.rozgardwar.cloud/api/users/educations/delete/${education.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete education");
      }

      onSave?.();
      setOpen(false);
    } catch (error) {
      console.error("Delete education error:", error);
      setMessage("Failed to delete education.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            Education
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 text-sm mb-6 -mt-2">
          Details like course, university, and more, help recruiters identify your
          educational background
        </p>

        {/* FORM */}
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Education *</label>
            <input
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 text-sm outline-none"
              placeholder="e.g. BCA, B.Tech, MCA"
            />
          </div>

          <div>
            <label className="text-sm font-medium">University/Institute *</label>
            <input
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 text-sm outline-none"
              placeholder="e.g. Delhi Technological University"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Specialization *</label>
            <input
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 text-sm outline-none"
              placeholder="e.g. Computer Applications"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Course duration *</label>
            <div className="flex items-center gap-4 mt-2">
              <input
                type="number"
                name="start_year"
                value={formData.start_year}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 text-sm outline-none"
                placeholder="Start year"
              />
              <span className="text-gray-500">To</span>
              <input
                type="number"
                name="end_year"
                value={formData.end_year}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 text-sm outline-none"
                placeholder="End year"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Percentage / CGPA</label>
            <input
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3 text-sm outline-none"
              placeholder="e.g. 80.7"
            />
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* FOOTER */}
        <DialogFooter className="mt-8 flex justify-between">
          {education && (
            <Button
              variant="outline"
              onClick={handleDelete}
              disabled={deleting}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          )}

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Saving..." : education ? "Update" : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
