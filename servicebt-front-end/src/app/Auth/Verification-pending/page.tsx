"use client";

import Link from "next/link";
import { MailCheck } from "lucide-react";

const VerificationPending = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <MailCheck size={48} className="text-orange-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800">
          Verification Email Sent!
        </h1>
        <p className="text-gray-600 mt-2">
          We've sent a verification link to your registered email address.
          Please check your inbox and follow the instructions to activate your account.
        </p>
        <p className="text-gray-500 mt-2 text-sm">
          If you don’t see the email, check your spam folder
        </p>
        <Link href="SignIn">
          <button className="mt-6 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerificationPending;
