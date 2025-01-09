"use client";
import React, { useState } from "react";
import axios from "axios";
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    setError("");
  
    try {
      const response = await axios.post(
        "https://service-bhutan-api.onrender.com/api/v1/users/login/",
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data);
      // Store tokens if returned (e.g., localStorage)
      // Redirect user to dashboard
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Invalid email or password.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
      <div className="bg-white rounded-lg p-8 shadow-md max-w-sm w-full align-left">
        <h1 className="text-xl text-orange-600 font-extrabold mb-4">
          Discover Services, Hire Talent, Get Things Done!
        </h1>
        <p className="text-gray-600 mb-6">Your One-Stop Solution for Jobs and Services!</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-800">
          <input
            type="email"
            placeholder="Email address or phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2 focus:outline-none focus:border-orange-500 transition duration-300"
          />
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle input type
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:border-orange-500 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle visibility
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            >
              {isPasswordVisible ? "Hide" : "Show"} {/* Button text based on visibility */}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Login
          </button>
        </form>
        <div className="text-center my-4 text-gray-600">OR</div>
        <button className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
