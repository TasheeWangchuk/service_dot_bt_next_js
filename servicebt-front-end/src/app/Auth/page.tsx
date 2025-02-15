"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Role: React.FC = () => {
  const router = useRouter();

  const handleRoleSelection = (role: string) => {
    router.push(`/Auth/SignUp?role=${role}`);
  };

  const handleLoginRedirect = () => {
    router.push("/Auth/SignIn"); // Navigate to login page
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex items-center justify-center space-x-8 bg-white/30 backdrop-blur-sm  rounded-lg p-8 shadow-lg text-center max-w-md w-full">
        <div className="space-y-9 mt-7 flex-1">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Welcome to Service.bt
          </h1>
          <p className="text-gray-600 mb-4">
            Choose your role to get started or log in if you already have an
            account.
          </p>
          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelection("Client")}
              className="w-full bg-orange-500 text-white py-3 px-6 rounded-full font-medium hover:bg-orange-600 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Sign up as Client
            </button>
            <button
              onClick={() => handleRoleSelection("Freelancer")}
              className="w-full bg-pink-500 text-white py-3 px-6 rounded-full font-medium hover:bg-pink-600 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Sign up as Service Provider
            </button>
            <div className="mt-6">
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  onClick={handleLoginRedirect}
                  className="text-orange-500 hover:underline font-medium"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Role;