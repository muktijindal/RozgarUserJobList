"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { DiversityUserProfile } from "./DiversityUserProfile";

export default function ProfilePendingActions() {
  const router = useRouter();

  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [step, setStep] = useState("send"); // ✅ send | verify

  const actions = [
    {
      title: "Verify email",
      add: "+5%",
      description:
        "Recruiters are more likely to contact candidates with verified emails",
      value: "jindalmukti51@gmail.com",
      actionText: "Verify",
    },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-16 px-10 py-16">
      {/* LEFT */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-2xl font-semibold mb-5">Pending action(s)</h2>

        <div className="space-y-4">
          {actions.map((item, idx) => (
            <div key={idx} className="bg-white shadow-sm border rounded-xl p-5">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold">{item.title}</p>
                <span className="text-green-600 font-semibold">{item.add}</span>
              </div>

              <p className="text-gray-600 mt-1">{item.description}</p>

              <div className="mt-2 flex items-center gap-4">
                <span>{item.value}</span>

                <button
                  onClick={() => {
                    setSelectedEmail(item.value);
                    setOpenVerifyModal(true);
                    setStep("send"); // ✅ start from send step
                  }}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Verify
                </button>
              </div>
            </div>
          ))}
        </div>

        <DiversityUserProfile />
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white border shadow-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold">Profile completeness</h3>
          <div className="mt-3">
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
              <div className="bg-black h-2 rounded-full w-[18%]" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {openVerifyModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[400px] rounded-2xl p-6 shadow-lg">
            {/* ===== STEP 1: SEND OTP ===== */}
            {step === "send" && (
              <>
                <h2 className="text-xl font-semibold text-center">
                  Verify your Email
                </h2>

                <p className="text-sm text-gray-600 text-center mt-3">
                  Click below to receive OTP on your email
                </p>

                <p className="text-center text-blue-600 font-medium mt-2">
                  {selectedEmail}
                </p>

                <button
                  onClick={() => {
                    console.log("Sending OTP...");
                    // 👉 call send OTP API here

                    setStep("verify"); // move to next step
                  }}
                  className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg"
                >
                  Send OTP
                </button>

                <button
                  onClick={() => setOpenVerifyModal(false)}
                  className="w-full mt-3 border py-2 rounded-lg"
                >
                  Cancel
                </button>
              </>
            )}

            {/* ===== STEP 2: VERIFY OTP ===== */}
            {step === "verify" && (
              <>
                <h2 className="text-xl font-semibold text-center">Enter OTP</h2>

                <p className="text-sm text-gray-600 text-center mt-2">
                  OTP sent to your email
                </p>

                <p className="text-center text-blue-600 font-medium mt-2">
                  {selectedEmail}
                </p>

                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full mt-4 p-3 border rounded-lg text-center tracking-widest text-lg"
                />

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => setOpenVerifyModal(false)}
                    className="w-1/2 border rounded-lg py-2"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      console.log("Verify OTP:", otp);
                      // 👉 call verify API here
                      setOpenVerifyModal(false);
                    }}
                    className="w-1/2 bg-blue-600 text-white rounded-lg py-2"
                  >
                    Verify
                  </button>
                </div>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Didn’t receive OTP?{" "}
                  <span
                    onClick={() => console.log("Resend OTP")}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Resend
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
