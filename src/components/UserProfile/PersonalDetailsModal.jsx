"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const initialState = {
  gender: "",
  marital_status: "",
  dob: "",
  category: "",
  work_permit_for_usa: "",
  work_permit_for_other_countries: "", // ✅ fixed
  permanent_address: "",
  hometown: "",
  pincode: "",

  profile_title: "",
  resume_headline: "",
  profile_summary: "",
  profile_completion: 0,
  disability_status: "",
  key_skills: [],
  preferred_location: "",
  willingToRelocate: false,

  notice_period: "",
  expected_salary: "",
};

export default function PersonalDetailsModal({
  open,
  setOpen,
  data,
  onSave,
}) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (open && data) {
      setForm({
        ...initialState,
        ...data,
        work_permit_for_other_countries:
          data.work_permit_for_other_countries || "",
      });
    }
  }, [open, data]);

  /* ================= RESET ================= */
  useEffect(() => {
    if (!open) {
      setForm(initialState);
    }
  }, [open]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const chipClass = (value, key) =>
    `px-4 py-2 border rounded-full cursor-pointer text-sm ${
      form[key] === value
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-100"
    }`;

  /* ================= SAVE ================= */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      const payload = {
        gender: form.gender,
        marital_status: form.marital_status,
        dob: form.dob,
        category: form.category,

        work_permit_for_usa: form.work_permit_for_usa?.trim(),
        work_permit_for_other_countries:
          form.work_permit_for_other_countries?.trim(),

        permanent_address: form.permanent_address?.trim(),
        hometown: form.hometown?.trim(),
        pincode: form.pincode?.trim(),

        profile_title: form.profile_title?.trim(),
        resume_headline: form.resume_headline?.trim(),
        profile_summary: form.profile_summary?.trim(),

        disability_status: form.disability_status,

        key_skills: Array.isArray(form.key_skills)
          ? form.key_skills
          : form.key_skills?.split(",").map((s) => s.trim()) || [],

        preferred_location: form.preferred_location?.trim(),
        willingToRelocate: !!form.willingToRelocate,

        notice_period: Number(form.notice_period) || 0,
        expected_salary: Number(form.expected_salary) || 0,

        profile_completion: 0,
      };

      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/profile/personal-details/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to save");
      }

      toast.success("Personal details updated ✅");
      onSave?.();
      setOpen(false);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Personal details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* GENDER */}
          <div>
            <p className="font-medium">Gender</p>
            <div className="flex gap-3 mt-2">
              {["Male", "Female", "Transgender"].map((g) => (
                <div
                  key={g}
                  onClick={() => handleChange("gender", g)}
                  className={chipClass(g, "gender")}
                >
                  {g}
                </div>
              ))}
            </div>
          </div>

          {/* MARITAL STATUS */}
          <div>
            <p className="font-medium">Marital status</p>
            <div className="flex gap-3 flex-wrap mt-2">
              {["Single", "Married", "Widowed", "Divorced", "Separated"].map(
                (m) => (
                  <div
                    key={m}
                    onClick={() => handleChange("marital_status", m)}
                    className={chipClass(m, "marital_status")}
                  >
                    {m}
                  </div>
                )
              )}
            </div>
          </div>

          {/* DOB */}
          <div>
            <p className="font-medium">Date of birth</p>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <p className="font-medium">Category</p>
            <div className="flex gap-3 flex-wrap mt-2">
              {["General", "SC", "ST", "OBC"].map((c) => (
                <div
                  key={c}
                  onClick={() => handleChange("category", c)}
                  className={chipClass(c, "category")}
                >
                  {c}
                </div>
              ))}
            </div>
          </div>

          {/* WORK PERMIT */}
          <div>
            <p className="font-medium">Work permit for USA</p>
            <input
              value={form.work_permit_for_usa}
              onChange={(e) =>
                handleChange("work_permit_for_usa", e.target.value)
              }
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>

          <div>
            <p className="font-medium">
              Work permit for other countries
            </p>
            <input
              value={form.work_permit_for_other_countries}
              onChange={(e) =>
                handleChange(
                  "work_permit_for_other_countries",
                  e.target.value
                )
              }
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>

          {/* ADDRESS */}
          <div>
            <p className="font-medium">Permanent address</p>
            <input
              value={form.permanent_address}
              onChange={(e) =>
                handleChange("permanent_address", e.target.value)
              }
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>

          <div>
            <p className="font-medium">Hometown</p>
            <input
              value={form.hometown}
              onChange={(e) =>
                handleChange("hometown", e.target.value)
              }
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>

          <div>
            <p className="font-medium">Pincode</p>
            <input
              value={form.pincode}
              onChange={(e) =>
                handleChange("pincode", e.target.value)
              }
              className="w-full mt-2 p-3 border rounded-xl"
            />
          </div>
        </div>

        {/* FOOTER */}
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-6"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}