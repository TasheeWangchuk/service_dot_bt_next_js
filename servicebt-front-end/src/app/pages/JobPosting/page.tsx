"use client";
import React, { useState } from "react";
import Navbar from "../../components/NavBar";

export default function JobPost() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    jobType: "Online",
    jobCategory: "",
    deadline: "",
    budgetMin: "",
    budgetMax: "",
    contactPrefix: "+971",
    contactDetails: "",
    attachment: null,
    confirmNoFakeEngagement: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully! Check the console for form data.");
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar scrolled={false} />

      {/* Header Section */}
      <div className="bg-[url('/Artboard.png')] bg-cover bg-center py-8">
        <div className="text-center mt-8">
          <h1 className="text-3xl font-bold text-orange-500 mb-2">
            Tell us what you <span className="text-gray-800">NEED!</span>
          </h1>
          <p className="text-sm text-gray-500">
            Hire Great Freelancers, Post Opportunities here. You will get the
            responses at an instant's notice.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div
        className="bg-[url('/Artboard.png')] bg-cover bg-center flex justify-center items-center py-8"
      >
        <div className="w-full max-w-4xl shadow-md rounded-lg p-8 bg-white">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Job Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter job title"
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter job description"
                rows={4}
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
                required
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Job Type
              </label>
              <div className="flex space-x-4">
                {["Online", "On Site", "Hybrid"].map((type) => (
                  <label
                    key={type}
                    className={`cursor-pointer px-4 py-2 border rounded-full ${formData.jobType === type
                        ? "bg-orange-500 text-white"
                        : "text-gray-700 hover:bg-orange-500 hover:text-white"
                      } transition`}
                  >
                    <input
                      type="radio"
                      name="jobType"
                      value={type}
                      checked={formData.jobType === type}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Job Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Job Category
              </label>
              <select
                name="jobCategory"
                value={formData.jobCategory}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
                required
              >
                <option value="">Select category</option>
                <option value="web">Web Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Deadline
              </label>
              <input
                type="text"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                placeholder=""
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
                required
              />
            </div>

            {/* Budget Range */}
            <div className="flex space-x-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Budget Min
                </label>
                <input
                  type="number"
                  name="budgetMin"
                  value={formData.budgetMin}
                  onChange={handleChange}
                  placeholder="Min"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Budget Max
                </label>
                <input
                  type="number"
                  name="budgetMax"
                  value={formData.budgetMax}
                  onChange={handleChange}
                  placeholder="Max"
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="contactPrefix"
                value={formData.contactPrefix}
                onChange={handleChange}
                placeholder="e.g., +971"
                className="w-1/4 border rounded-md px-3 py-2"
              />
              <input
                type="text"
                name="contactDetails"
                value={formData.contactDetails}
                onChange={handleChange}
                placeholder="Enter your email or phone"
                className="w-3/4 border rounded-md px-3 py-2"
                required
              />
            </div>

            {/* Warning */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
              <p className="text-sm">
                ⚠️ <strong>Warning about fake social engagement:</strong>{" "}
                Creating fake engagement (e.g., reviews, likes) is prohibited and is in violation of our{" "}
                <a href="" className="font-medium text-blue-600 hover:underline">
                  Terms and conditions
                </a>
                .
              </p>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="confirmNoFakeEngagement"
                  checked={formData.confirmNoFakeEngagement}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <label className="text-sm text-gray-700">
                  I confirm this project is not for fake engagement.
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-500 text-white font-semibold px-8 py-2 rounded-full hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
