"use client";

import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext"; // Adjust the path as needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn: React.FC = () => {
  const { login, isLoading } = useAuth(); // Access login function and loading state from AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (!login) {
      toast.error("Login function is not available.");
      return;
    }

    try {
      await login(email, password); // Use login from AuthContext
    } catch (error: any) {
      if (error.message.includes("invalid email")) {
      toast.error("Invalid email address.");
      } else if (error.message.includes("invalid password")) {
      toast.error("Invalid password.");
      } else if (error.message.includes("user does not exist")) {
      toast.error("User does not exist.");
      } else {
      toast.error(error.message || "An unexpected error occurred.");
      }
    }
    };

  return (
    <div className="min-h-screen p-3 md:p-6">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="container mx-auto flex justify-center items-center max-w-5xl gap-6 py-6">
        <div className="w-full lg:w-1/2 bg-white/30 backdrop-blur-sm  rounded-2xl shadow-2xl p-5 md:p-6 border border-white/20 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">
            Welcome Back!
          </h1>
          <p className="text-gray-900 mb-4 text-sm md:text-base">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                aria-label="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  aria-label="Password"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                >
                  {isPasswordVisible ? (
                    <EyeOffIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2.5 rounded-lg text-white text-base font-semibold transform transition-all duration-200 ${
                  isLoading
                    ? "bg-gray-400/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 hover:scale-105 active:scale-95"
                } shadow-lg mt-2`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="text-center mt-6">
            <a
              href="/forgot-password"
              className="text- gray-700 text-sm hover:underline hover:text-orange-700"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mt-6 text-center text-sm text-gray-700">
            Don't have an account?{" "}
            <a href="/Auth" className="text-orange-700 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
