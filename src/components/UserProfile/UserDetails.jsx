"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { Badge } from "lucide-react";
import EditBasicDetailsModal from "./EditUserBasicDetailsModal";
import Link from "next/link";

export const UserDetails = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUserBasic();
  }, []);

  const fetchUserBasic = async () => {
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

      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data?.data || data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("profileImage", file);

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

      fetchUserBasic();
    } catch (err) {
      console.error(err);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  if (loading) return null;

  const profileImg = user?.profile_image_url || "";

  const initials =
    user?.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) || "U";

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "—";

  return (
    <>
      <EditBasicDetailsModal open={open} setOpen={setOpen} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onFileChange}
      />

      <div className="lg:col-span-12 pb-5">
        <Card className="rounded-2xl p-6 shadow-md">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* LEFT */}
            <div className="flex gap-6 w-full">
              <div
                className="cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                <Avatar>
                  <AvatarImage
                    src={profileImg}
                    alt="avatar"
                    className="w-28 h-28"
                  />
                  <AvatarFallback className="text-xl font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-semibold">
                    {user?.full_name}
                  </h3>
                  <button
                    className="text-lg text-gray-400"
                    onClick={() => setOpen(true)}
                  >
                    <FaEdit />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>📧 Email: {user?.email || "—"}</div>
                  <div>📱 Phone: {user?.phone || "—"}</div>
                  <div>
                    📍 Location: {user?.current_location},{" "}
                    {user?.current_location_country}
                  </div>
                  <div>
                    👤 Work Status:{" "}
                    {user?.work_status === "fresher"
                      ? "Fresher"
                      : "Experienced"}
                  </div>
                  <div>
                    🧠 Experience: {user?.total_experience_years} yrs{" "}
                    {user?.total_experience_months} mos
                  </div>
                  <div>
                    📅 Availability:{" "}
                    {user?.availability_to_join || "—"}
                  </div>
                  <div>
                    🛑 Last Working Day:{" "}
                    {formatDate(user?.Expected_last_working_day)}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="ml-auto w-full sm:w-80">
              <div className="bg-amber-50 p-5 rounded-xl">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span>Verify mobile number</span>
                    <Badge className="bg-green-100 text-green-700">
                      +10%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Verify email</span>
                    <Badge className="bg-green-100 text-green-700">
                      +5%
                    </Badge>
                  </div>

                  <Button
                    asChild
                    className="mt-4 w-full bg-rose-500 text-white"
                  >
                    <Link href="/pending-action">
                      Complete your profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
