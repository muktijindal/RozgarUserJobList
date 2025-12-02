"use client";

import React from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { AfterUserLoginNavbar } from "../global/AfterUserLoginNavbar";
import { UserDetails } from "./UserDetails";
import { QuickLinksUserProfile } from "./QuickLinksUserProfile";

export default function ProfileDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      {/* HEADER */}
      <AfterUserLoginNavbar />

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-6 py-8 ">
        <UserDetails />
        <QuickLinksUserProfile />
      </main>
    </div>
  );
}
