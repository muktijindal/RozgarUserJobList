"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function EditBasicDetailsModal({ open, setOpen }) {
  const nameRef = useRef();
  const locationRef = useRef();
  const fileRef = useRef();

  const [workStatus, setWorkStatus] = useState("fresher");
  const [locationCountry, setLocationCountry] = useState("india");
  const [availability, setAvailability] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ PREFILL EXISTING DATA (NO UI CHANGE)
  useEffect(() => {
    if (!open) return;

    const prefillData = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://qa.api.rozgardwar.cloud/api/users/basic",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) return;

        const data = await res.json();
        const user = data?.data || data;

        // Text inputs
        if (nameRef.current)
          nameRef.current.value = user.full_name || "";

        if (locationRef.current)
          locationRef.current.value = user.current_location || "";

        // State (used during save)
        if (user.work_status) setWorkStatus(user.work_status);
        if (user.current_location_country)
          setLocationCountry(user.current_location_country);
        if (user.availability_to_join)
          setAvailability(user.availability_to_join);

        // 🔥 RADIO BUTTONS (DOM-level, no JSX change)
        const workRadios = document.getElementsByName("work");
        workRadios.forEach((radio) => {
          radio.checked =
            radio.nextSibling?.textContent
              ?.toLowerCase()
              .includes(user.work_status);
        });

        const locationRadios = document.getElementsByName("location");
        locationRadios.forEach((radio) => {
          radio.checked =
            radio.nextSibling?.textContent
              ?.toLowerCase()
              .includes(user.current_location_country === "india"
                ? "india"
                : "outside");
        });
      } catch (err) {
        console.error(err);
      }
    };

    prefillData();
  }, [open]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("full_name", nameRef.current.value);
      formData.append("work_status", workStatus);
      formData.append("current_location_country", locationCountry);
      formData.append("current_location", locationRef.current.value);
      formData.append("availability_to_join", availability);

      // Static values
      formData.append("total_experience_years", "3");
      formData.append("total_experience_months", "6");
      formData.append("current_salary_currency", "INR");
      formData.append("current_salary", "1000000");
      formData.append("salary_breakdown", "7800");
      formData.append("Expected_last_working_day", "2026-01-18");

      if (fileRef.current?.files[0]) {
        formData.append("profileImage", fileRef.current.files[0]);
      }

      await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/profile/update/basic",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl h-200 overflow-scroll rounded-xl px-8 p-10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Basic Details</DialogTitle>
        </DialogHeader>

        {/* 🔒 UI BELOW IS 100% UNCHANGED */}
        <div className="space-y-6 mt-4">
          <div>
            <label className="text-sm font-medium">Name *</label>
            <input
              ref={nameRef}
              className="w-full mt-2 p-3 rounded-xl border"
              placeholder="Rishab"
            />
          </div>

          <input ref={fileRef} type="file" hidden />

          <div>
            <label className="text-sm font-medium">Work status</label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="work"
                  defaultChecked
                  onChange={() => setWorkStatus("fresher")}
                />
                Fresher
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="work"
                  onChange={() => setWorkStatus("experienced")}
                />
                Experienced
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Current Location *</label>
            <div className="flex items-center gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="location"
                  defaultChecked
                  onChange={() => setLocationCountry("india")}
                />
                India
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="location"
                  onChange={() => setLocationCountry("outside_india")}
                />
                Outside India
              </label>
            </div>

            <input
              ref={locationRef}
              className="w-full mt-3 p-3 rounded-xl border"
              placeholder="New Delhi"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Mobile Number *</label>
            <input
              className="w-full mt-2 p-3 rounded-xl border"
              placeholder="9355839665"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email Address *</label>
            <input
              className="w-full mt-2 p-3 rounded-xl border"
              placeholder="jindalmukti51@gmail.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Availability to Join</label>
            <div className="flex flex-wrap gap-3 mt-3">
              {[
                "15 Days or less",
                "1 Month",
                "2 Months",
                "3 Months",
                "More than 3 Months",
                "Immediate Joiner",
                "Serving Notice Period",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setAvailability(item)}
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
          <Button
            className="bg-blue-600 text-white"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
