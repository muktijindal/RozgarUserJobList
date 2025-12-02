"use client";

import React, { useState } from "react";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { Badge } from "lucide-react";
import EditBasicDetailsModal from "./EditUserBasicDetailsModal";


export const UserDetails = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MODAL */}
      <EditBasicDetailsModal open={open} setOpen={setOpen} />

      {/* PROFILE CARD */}
      <section className="lg:col-span-12">
        <Card className="rounded-2xl p-6 shadow-md">
          <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
            {/* Left Profile */}
            <div className="flex items-center gap-6 w-full lg:w-auto">
              <div className="relative">
                <Avatar className="w-28 h-28">
                  <AvatarImage src="/avatar-placeholder.png" alt="avatar" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>

                <div className="absolute -right-2 bottom-0 w-14 h-14 rounded-full bg-white flex items-center justify-center shadow">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <div className="text-sm text-red-500 font-semibold">18%</div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-semibold">Rishab</h3>

                  {/* EDIT BUTTON */}
                  <button
                    className="text-lg text-gray-400"
                    onClick={() => setOpen(true)}
                  >
                    <FaEdit />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Profile last updated - <span className="font-medium">Today</span>
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <span>📍</span> New Delhi, INDIA
                  </div>
                  <div className="flex items-center gap-3">
                    <span>👤</span> Fresher
                  </div>
                  <div className="flex items-center gap-3">
                    <span>📅</span> Add availability to join
                  </div>
                </div>
              </div>
            </div>

            {/* Right side improvement card */}
            <div className="ml-auto w-full sm:w-80">
              <div className="bg-amber-50 p-5 rounded-xl">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Verify mobile number
                    </span>
                    <Badge className="bg-green-100 text-green-700">+10%</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Verify email</span>
                    <Badge className="bg-green-100 text-green-700">+5%</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Add preferred location
                    </span>
                    <Badge className="bg-green-100 text-green-700">+2%</Badge>
                  </div>

                  <Button className="mt-4 w-full bg-rose-500 text-white hover:bg-rose-600">
                    Add 13 missing details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};
