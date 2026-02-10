"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../ui/card";
import OnlineProfileModal from "./OnlinePortfolioModal";
import WorkSampleModal from "./Worksample";
import CertificationModal from "./CertificationModal";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

export const Accomplisment = () => {
  /* ================= MODAL STATES ================= */
  const [openOnlineProfile, setOpenOnlineProfile] = useState(false);
  const [openWorkSample, setOpenWorkSample] = useState(false);
  const [openCertification, setOpenCertification] = useState(false);

  const [editOnlineProfile, setEditOnlineProfile] = useState(null);
  const [editWorkSample, setEditWorkSample] = useState(null);
  const [editCertification, setEditCertification] = useState(null);

  /* ================= DATA STATES ================= */
  const [onlineProfiles, setOnlineProfiles] = useState([]);
  const [workSamples, setWorkSamples] = useState([]);
  const [certifications, setCertifications] = useState([]);

  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [loadingWork, setLoadingWork] = useState(false);
  const [loadingCertifications, setLoadingCertifications] = useState(false);

  /* ================= DELETE (CERT ONLY) ================= */
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* ================= FETCH ONLINE PROFILES ================= */
  const fetchOnlineProfiles = async () => {
    try {
      setLoadingProfiles(true);
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/social-profiles",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setOnlineProfiles(data?.data || []);
    } finally {
      setLoadingProfiles(false);
    }
  };

  /* ================= FETCH WORK SAMPLES ================= */
  const fetchWorkSamples = async () => {
    try {
      setLoadingWork(true);
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/work-samples",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setWorkSamples(data?.data || []);
    } finally {
      setLoadingWork(false);
    }
  };

  /* ================= FETCH CERTIFICATIONS ================= */
  const fetchCertifications = async () => {
    try {
      setLoadingCertifications(true);
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/certifications",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setCertifications(data?.data || []);
    } finally {
      setLoadingCertifications(false);
    }
  };

  useEffect(() => {
    fetchOnlineProfiles();
    fetchWorkSamples();
    fetchCertifications();
  }, []);

  /* ================= DELETE CERTIFICATION ================= */
  const handleDeleteCertification = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);
      const res = await fetch(
        `https://qa.api.rozgardwar.cloud/api/users/certifications/delete/${deleteId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Delete failed");

      fetchCertifications();
      setDeleteId(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Card className="rounded-2xl shadow-sm bg-white p-0">
        <CardContent className="px-6 py-5">
          <h2 className="text-lg font-semibold">Accomplishments</h2>

          <p className="text-sm text-gray-600 mt-2">
            Showcase your credentials by adding relevant certifications,
            work samples, online profiles, etc.
          </p>

          <div className="flex flex-col gap-8 mt-6">
            {/* ================= ONLINE PROFILES ================= */}
            <Section
              title="Online profile"
              description="Add link to online professional profiles"
              loading={loadingProfiles}
              emptyText="No online profiles added yet"
              data={onlineProfiles}
              onAdd={() => setOpenOnlineProfile(true)}
              onEdit={(item) => {
                setEditOnlineProfile(item);
                setOpenOnlineProfile(true);
              }}
              render={(item) => (
                <>
                  <p className="font-medium">{item.social_profile}</p>
                  <a
                    href={item.social_profile_url}
                    target="_blank"
                    className="text-sm text-blue-600 break-all"
                  >
                    {item.social_profile_url}
                  </a>
                </>
              )}
            />

            {/* ================= WORK SAMPLES ================= */}
            <Section
              title="Work sample"
              description="Link relevant work samples"
              loading={loadingWork}
              emptyText="No work samples added yet"
              data={workSamples}
              onAdd={() => setOpenWorkSample(true)}
              onEdit={(item) => {
                setEditWorkSample(item);
                setOpenWorkSample(true);
              }}
              render={(item) => (
                <>
                  <p className="font-medium">{item.work_sample_title}</p>
                  <a
                    href={item.work_sample_url}
                    target="_blank"
                    className="text-sm text-blue-600 break-all"
                  >
                    {item.work_sample_url}
                  </a>
                </>
              )}
            />

            {/* ================= CERTIFICATIONS ================= */}
            <Section
              title="Certification"
              description="Add details of certifications you have achieved"
              loading={loadingCertifications}
              emptyText="No certifications added yet"
              data={certifications}
              onAdd={() => setOpenCertification(true)}
              onEdit={(item) => {
                setEditCertification(item);
                setOpenCertification(true);
              }}
              onDelete={(item) => setDeleteId(item.id)}
              render={(item) => (
                <>
                  <p className="font-medium">{item.certification_name}</p>
                  <p className="text-xs text-gray-500">
                    {item.certificate_does_not_expire
                      ? "Does not expire"
                      : `${item.validity_from_month} ${item.validity_from_year} - ${item.validity_to_month} ${item.validity_to_year}`}
                  </p>
                </>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= MODALS ================= */}
      <OnlineProfileModal
        open={openOnlineProfile}
        profile={editOnlineProfile}
        onClose={() => {
          setOpenOnlineProfile(false);
          setEditOnlineProfile(null);
        }}
        onSave={fetchOnlineProfiles}
      />

      <WorkSampleModal
        open={openWorkSample}
        workSample={editWorkSample}
        onClose={() => {
          setOpenWorkSample(false);
          setEditWorkSample(null);
        }}
        onSave={fetchWorkSamples}
      />

      <CertificationModal
        open={openCertification}
        certification={editCertification}
        onClose={() => {
          setOpenCertification(false);
          setEditCertification(null);
        }}
        onSave={fetchCertifications}
      />

      {/* ================= DELETE DIALOG ================= */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete certification?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCertification}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

/* ================= REUSABLE SECTION ================= */
function Section({
  title,
  description,
  data,
  loading,
  emptyText,
  onAdd,
  onEdit,
  onDelete,
  render,
}) {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <button onClick={onAdd} className="text-blue-600 text-sm">
          Add
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {loading && <p className="text-sm text-gray-500">Loading...</p>}
        {!loading && data.length === 0 && (
          <p className="text-sm text-gray-400">{emptyText}</p>
        )}

        {data.map((item) => (
          <div key={item.id} className="border rounded-xl p-4">
            {render(item)}
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => onEdit(item)}
                className="text-sm text-blue-600"
              >
                Edit
              </button>
              {onDelete && (
                <button
                  onClick={() => onDelete(item)}
                  className="text-sm text-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
