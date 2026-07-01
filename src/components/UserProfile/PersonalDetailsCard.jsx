"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PersonalDetailsModal from "./PersonalDetailsModal"; // ✅ added

export default function PersonalDetailsCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // ✅ added

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* ================= API CALL ================= */
  const fetchPersonalDetails = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("User not authenticated");
        return;
      }

      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/personal-details",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch data");
      }

      setData(result?.data || result);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD ================= */
  useEffect(() => {
    fetchPersonalDetails();
  }, []);

  /* ================= MODAL HANDLERS ================= */
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleAfterSave = () => {
    fetchPersonalDetails(); // ✅ refresh after update
  };

  /* ================= UI ================= */
  return (
    <>
      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Personal details
          </h2>
        </div>

        {loading ? (
          <p className="mt-6 text-gray-500">Loading...</p>
        ) : (
          <>
            {/* TOP GRID */}
            <div className="grid grid-cols-2 gap-y-6 mt-6 text-sm">

              {/* LEFT */}
              <div>
                <p className="text-gray-500">Personal</p>
                <p className="font-medium text-gray-800 mt-1">
                  {data?.gender?.toLowerCase() || "-"},{" "}
                  {data?.marital_status || "-"}{" "}
                  <span
                    onClick={handleOpenModal}
                    className="text-blue-600 cursor-pointer"
                  >
                    Add more info
                  </span>
                </p>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-gray-500">Work permit</p>
                <p
                  onClick={handleOpenModal}
                  className="text-blue-600 cursor-pointer font-medium mt-1"
                >
                  {data?.work_permit_for_usa || "Add Work permit"}
                </p>
              </div>

              {/* DOB */}
              <div>
                <p className="text-gray-500">Date of birth</p>
                <p className="font-medium text-gray-800 mt-1">
                  {formatDate(data?.dob)}
                </p>
              </div>

              {/* ADDRESS */}
              <div className="text-right">
                <p className="text-gray-500">Address</p>
                <p
                  onClick={handleOpenModal}
                  className="text-blue-600 cursor-pointer font-medium mt-1"
                >
                  {data?.permanent_address || "Add Address"}
                </p>
              </div>

              {/* CATEGORY */}
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium text-gray-800 mt-1">
                  {data?.category || "-"}
                </p>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t my-6"></div>

            {/* LANGUAGES HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Languages</h3>
              <p
                onClick={handleOpenModal}
                className="text-blue-600 cursor-pointer font-medium"
              >
                Add languages
              </p>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-5 text-sm text-gray-500 mt-4 pb-2 border-b">
              <p>Languages</p>
              <p>Proficiency</p>
              <p>Read</p>
              <p>Write</p>
              <p>Speak</p>
            </div>

            {/* LANGUAGE LIST */}
            <div className="space-y-4 mt-4">
              {data?.languages?.length > 0 ? (
                data.languages.map((lang, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 items-center text-sm"
                  >
                    <p className="font-medium text-gray-800">
                      {lang.name}
                    </p>

                    <p className="text-gray-700">
                      {lang.proficiency}
                    </p>

                    {["read", "write", "speak"].map((type) => (
                      <div key={type}>
                        {lang[type] ? (
                          <div className="w-5 h-5 border rounded-full flex items-center justify-center">
                            ✓
                          </div>
                        ) : (
                          "-"
                        )}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 mt-3">
                  No languages added
                </p>
              )}
            </div>
          </>
        )}
      </div>

      <PersonalDetailsModal
        open={openModal}
        setOpen={setOpenModal}
        data={data}
        onSave={handleAfterSave}
      />
    </>
  );
}