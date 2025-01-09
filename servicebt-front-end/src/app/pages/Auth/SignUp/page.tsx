"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const SignUp: React.FC = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Client"; // Default to Client if no role is provided

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cid: "",
    password: "",
    confirmPassword: "",
    role: role, // Initialize role from query parameter
    termsCheck: true,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
  
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !cid ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    // Create the payload to match the example format
    const payload = JSON.stringify({
      username: email.split("@")[0],  // Extract username from email
      email,
      password,
      confirm_password: confirmPassword,  // Use snake_case
      cid,
      first_name: firstName,  // Use snake_case
      last_name: lastName,    // Use snake_case
      phone,
      role,
      terms_check: termsCheck,  // Boolean value for terms_check
    });
  
    try {
      const response = await axios.post(
        "https://service-bhutan-api.onrender.com/api/v1/users/register/",
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct content type
          },
        }
      );
  
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
    } catch (error: any) {
      console.error("Error during registration:", error);
      if (error.response) {
        console.log("Server Response Error:", error.response.data);
        setError(error.response.data.message || "An error occurred.");
      } else if (error.request) {
        console.log("No Response Received:", error.request);
        setError("Failed to connect to the server. Please try again.");
      } else {
        console.log("Unexpected Error:", error.message);
        setError("Something went wrong. Please try again.");
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-600 p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full space-y-6">
        <h1 className="text-3xl font-semibold text-center text-orange-600">
          Join {role === "Client" ? "Service Providers" : "Clients"} on Service.bt
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Sign up as a {role} and start exploring opportunities!
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 transition"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 transition"
            />
          </div>
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 transition"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 transition"
          />
          <input
            type="text"
            name="cid"
            placeholder="Citizen ID"
            value={formData.cid}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 transition"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 placeholder-gray-500 transition"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              name="termsCheck"
              checked={formData.termsCheck}
              onChange={(e) => setFormData({ ...formData, termsCheck: e.target.checked })}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500"
            />
            <label htmlFor="termsCheck" className="ml-2 text-sm text-gray-600">
              I agree to the terms and conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
