"use client";

import { useRouter } from "next/navigation";
import { DiversityUserProfile } from "./DiversityUserProfile";

export default function ProfilePendingActions() {
  const router = useRouter();

  // FIRST SET OF ACTIONS
  const actions = [
    {
      title: "Verify mobile",
      add: "+10%",
      description:
        "Verify your mobile number to increase your chances of getting contacted by recruiters",
      value: "9355839665",
      actionText: "Verify",
      editText: "Edit",
    },
    {
      title: "Verify email",
      add: "+5%",
      description:
        "Recruiters are more likely to contact candidates with verified emails",
      value: "jindalmukti51@gmail.com",
      actionText: "Verify",
    },
    {
      title: "Desired job location",
      add: "+2%",
      description:
        "This will help us personalize your job recommendations",
      actionText: "Add location",
    },
  ];

  // SECOND SET
  const moreActions = [
    {
      title: "Department",
      add: "+10%",
      description:
        "Tell us more about what department you work in or have previously worked in",
      actionText: "Add department",
    },
    {
      title: "Industry type",
      add: "+2%",
      description:
        "Tell us about your industry preferences. This will help us personalize your job recommendations.",
      actionText: "Add industry",
    },
    {
      title: "Upload photo",
      add: "+5%",
      description:
        "Profile with photo has 40% higher chances of getting noticed by recruiters",
      actionText: "Upload photo",
    },
    {
      title: "Projects",
      add: "+8%",
      description:
        "Add details about the projects you have done in college, internship or at work.",
      actionText: "Add project",
    },
    {
      title: "Resume headline",
      add: "+8%",
      description:
        "Add a summary of your resume to introduce yourself to recruiters",
      actionText: "Add resume headline",
    },
    {
      title: "Personal details",
      add: "+2%",
      description:
        "This information is important for employers to know you better",
      actionText: "Add personal details",
    },
    {
      title: "Language proficiency",
      add: "+2%",
      description:
        "Strengthen your resume by letting recruiters know you can communicate in multiple languages",
      actionText: "Add languages",
    },
    {
      title: "Education",
      add: "+2%",
      description:
        "Your qualifications help employers know your educational background",
      actionText: "Add education",
    },
    {
      title: "Key skills",
      add: "+2%",
      description:
        "Recruiters look for candidates with specific key skills. We will send you job recommendations based on these skills.",
      actionText: "Add skills",
    },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-16 px-10 py-16">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-2xl font-semibold mb-5">13 Pending action(s)</h2>

        {/* FIRST ACTION BLOCK */}
        <div className="space-y-4">
          {actions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-sm border rounded-xl p-5"
            >
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{item.title}</p>
                <span className="text-green-600 font-semibold">{item.add}</span>
              </div>

              <p className="text-gray-600 mt-1">{item.description}</p>

              <div className="mt-2 flex items-center gap-4">
                {item.value && (
                  <span className="text-black">{item.value}</span>
                )}

                <button
                  onClick={() => router.push("/profile")}
                  className="text-blue-600 font-medium hover:underline"
                >
                  {item.actionText}
                </button>

                {item.editText && (
                  <button
                    onClick={() => router.push("/profile")}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {item.editText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SECOND ACTION BLOCK */}
        <div className="space-y-4 mt-6">
          {moreActions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white shadow-sm border rounded-xl p-5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <span className="text-green-600 font-semibold">
                      {item.add}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>

                <button
                  onClick={() => router.push("/profile")}
                  className="text-blue-600 font-medium hover:underline whitespace-nowrap"
                >
                  {item.actionText}
                </button>
              </div>
            </div>
          ))}
        </div>

        <DiversityUserProfile />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white border shadow-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold">Profile completeness</h3>

          <div className="mt-3">
            <p className="text-gray-700">Profile completed</p>

            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-black h-2 rounded-full w-[18%]" />
            </div>

            <p className="text-right mt-2 font-medium text-gray-800">
              18%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
