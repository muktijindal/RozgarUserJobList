"use client";

import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const router = useRouter();

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (otp.length === 4) {
      router.push("/"); // 👈 redirect to homepage
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col">
      {/* TOP NAV */}
      <div className="flex justify-end px-10 py-6 text-sm text-gray-700">
        Welcome, <span className="font-semibold ml-1">Rishab</span>
      </div>

      <div className="flex justify-center items-start gap-10 px-6">
        {/* LEFT CARD */}
        <div className="bg-white rounded-xl shadow p-8 w-[350px]">
          <div className="w-32 mx-auto">
            <Image
              src="/illustration.png"
              alt="Illustration"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>

          <h2 className="text-lg font-semibold text-center mt-4">
            Great, now you can
          </h2>

          <ul className="mt-6 space-y-4 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg leading-none">✔</span>
              Build your profile and let recruiters find you
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg leading-none">✔</span>
              Get job postings delivered right to your email
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg leading-none">✔</span>
              Find a job and grow your career
            </li>
          </ul>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white rounded-xl shadow p-10 w-[650px]">
          <h2 className="text-2xl font-semibold">Verify mobile number</h2>
          <p className="text-gray-600 mt-2 text-sm">
            Naukri just sent a text message with verification code to{" "}
            <span className="font-medium">+91 9355839665</span>
          </p>

          {/* OTP INPUT */}
          <div className="mt-8">
            <InputOTP
              maxLength={4}
              value={otp}
              onChange={(value) => setOtp(value)}
              className="mx-auto"
            >
              <InputOTPGroup className="gap-4">
                <InputOTPSlot index={0} className="border-2 border-blue-400 w-14 h-14 text-xl" />
                <InputOTPSlot index={1} className="border-2 border-blue-400 w-14 h-14 text-xl" />
                <InputOTPSlot index={2} className="border-2 border-blue-400 w-14 h-14 text-xl" />
                <InputOTPSlot index={3} className="border-2 border-blue-400 w-14 h-14 text-xl" />
              </InputOTPGroup>
            </InputOTP>

            <p className="text-xs text-gray-500 text-center mt-2">
              Your OTP should arrive in {timer} seconds
            </p>
          </div>

          {/* VERIFY BUTTON */}
          <button
            onClick={handleVerify}
            disabled={otp.length !== 4}
            className={`mt-6 w-full py-3 rounded-lg font-medium transition ${
              otp.length === 4
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-blue-200 text-white"
            }`}
          >
            Verify
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-auto py-8 text-center text-sm text-blue-500 flex justify-center gap-6">
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
        <a href="#">FAQs</a>
        <a href="#">Terms and Conditions</a>
        <a href="#">Report a Problem</a>
        <a href="#">Privacy Policy</a>
      </div>

      <p className="text-center text-xs text-gray-500 pb-4">
        All rights reserved © 2025 Info Edge India Ltd.
      </p>
    </div>
  );
}
