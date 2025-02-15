"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cid: "",
    password: "",
    confirmPassword: "",
    role: "",
    termsCheck: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const role = searchParams.get("role");
    if (role) {
      setFormData((prevData) => ({ ...prevData, role }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      phone,
      cid,
      password,
      confirmPassword,
      role,
      termsCheck,
    } = formData;

    if (!firstName || !lastName || !email || !phone || !cid || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!termsCheck) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    setIsLoading(true);

    const payload = {
      username: email.split("@")[0],
      email,
      password,
      confirm_password: confirmPassword,
      cid,
      first_name: firstName,
      last_name: lastName,
      phone,
      role,
      terms_check: termsCheck,
    };
    

    // console.log("payload ", payload)

    try {
      const response = await axios.post(
        "https://service-bhutan-api-o2oc.onrender.com/api/v1/users/register/",
        // JSON.stringify(payload),
        payload,
        {
          headers: {
        "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration successful:", response.data);
      toast.success("Registration successful! Check your email to verify your account.");
      router.push("/Auth/Verification-pending");

      // const response = await axios.post(
      //   `https://service-bhutan-api-o2oc.onrender.com/api/v1/users/register/`,
      //   JSON.stringify(payload),
      //   { headers: { "Content-Type": "application/json" } }
      // ).then((response) => {
      //   console.log("reposnse data ", response)
      // }).catch((error) => {
      //   console.log("error ", error)
      // })

      // toast.success("Registration successful! Check your email to verify your account.");
      // router.push("/SignUp"); 
    } catch (error: any) {
      console.error("Full Error Response:", error.response?.data || "No response data");
      const errorMessage =
      error.response?.data?.message || "Failed to register. Please try again.";
      // console.log("error ", error)  
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-3 md:p-6">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />

      <div className="container mx-auto flex justify-center items-center max-w-5xl gap-6 py-6">
        {/* Form */}
        <div className="w-full lg:w-1/2 bg-white/30 backdrop-blur-sm  rounded-2xl shadow-2xl p-5 md:p-6 border border-white/20 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">
            Join as a {formData.role}
          </h1>
          <p className="text-gray-500 mb-4 text-sm md:text-base">
            Sign up and start exploring opportunities!
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-blue-50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:bg-white/80"
                />
              </div>
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-blue-50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:bg-white/80"
                />
              </div>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-blue-50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:bg-white/80"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-blue-50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:bg-white/80"
            />

            <input
              type="text"
              name="cid"
              placeholder="Citizen ID"
              value={formData.cid}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-blue-50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:bg-white/80"
            />

            <div className="relative group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-blue-50 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:bg-white/80 pr-10"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-full transition-colors duration-200 group-hover:bg-white/10"
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              >
                {isPasswordVisible ? (
                  <EyeOffIcon className="w-4 h-4 text-gray-600" />
                ) : (
                  <EyeIcon className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>

            <div className="relative group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/70 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 backdrop-blur-sm transition-all duration-200 hover:bg-white/80 pr-10"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-full transition-colors duration-200 group-hover:bg-white/10"
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              >
                {isPasswordVisible ? (
                  <EyeOffIcon className="w-4 h-4 text-gray-600" />
                ) : (
                  <EyeIcon className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>

            <div className="flex items-center group">
              <input
                type="checkbox"
                name="termsCheck"
                id="terms_Check"
                checked={formData.termsCheck}
                onChange={(e) => setFormData({ ...formData, termsCheck: e.target.checked })}
                className="h-4 w-4 rounded border-white/30 text-orange-600 focus:ring-orange-500 bg-blue-200 transition-colors duration-200"
              />
              <label htmlFor="termsCheck" className="ml-2 text-sm text-orange-600 cursor-pointer group-hover:text-white/90 transition-colors duration-200">
                I agree to the terms and conditions
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 rounded-lg text-white text-base font-semibold transform transition-all duration-200 ${isLoading
                  ? "bg-gray-400/50 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 hover:scale-105 active:scale-95"
                } shadow-lg mt-2`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Registering...
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
            <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/Auth/SignIn" className="text-orange-600 hover:underline">
            Sign in
          </a>
        </div>
          </form>
        </div>
        

        {/* Right Side - Image with Animation
        <div className="w-full lg:w-1/2 lg:pl-12 flex items-center justify-center animate-slide-in hidden lg:block h-[600px]">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-pink-300 rounded-2xl blur-2xl animate-pulse" />
            <img
              src="/logo_design.jpg"
              alt="Sign up illustration"
            />
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default SignUp;
