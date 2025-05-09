"use client";

import React, { useState } from "react";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Shared/Footer";
import { AiOutlineEdit, AiOutlineSave, AiOutlineMessage } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

interface Review {
  id: number;
  clientName: string;
  rating: number;
  comment: string;
}

export default function ClientProfilePage() {
  // Sample data - in a real app, you would fetch this from an API
  const [clientData, setClientData] = useState({
    name: "John Doe",
    description: "Professional client looking for quality services",
    profilePicture: "/default-profile.jpg",
    numberOfServices: 5,
    email: "john.doe@example.com",
    phone: "+1234567890",
    reviews: [
      {
        id: 1,
        clientName: "Service Provider 1",
        rating: 4,
        comment: "Great to work with!",
      },
      {
        id: 2,
        clientName: "Service Provider 2",
        rating: 5,
        comment: "Excellent communication and prompt payments.",
      },
    ] as Review[],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    name: clientData.name,
    description: clientData.description,
    email: clientData.email,
    phone: clientData.phone,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save the updated info here (e.g., API call)
    setClientData({
      ...clientData,
      ...clientInfo,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white p-8 mt-6 rounded-xl shadow-lg">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={clientData.profilePicture}
            alt={`${clientInfo.name}'s profile`}
            className="w-32 h-32 rounded-full border border-gray-200 object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{clientInfo.name}</h1>
            <p className="text-sm text-gray-600">{clientInfo.description}</p>

            {/* Display services count */}
            <p className="mt-4 text-sm text-gray-600">
              <strong>{clientData.numberOfServices}</strong> services posted
            </p>

            {/* Editing the profile */}
            {isEditing ? (
              <div className="mt-4">
                <input
                  type="text"
                  name="email"
                  value={clientInfo.email}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full mt-2"
                />
                <input
                  type="text"
                  name="phone"
                  value={clientInfo.phone}
                  onChange={handleChange}
                  className="border p-2 rounded-md w-full mt-2"
                />
                <button
                  onClick={handleSave}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <AiOutlineSave className="mr-2" />
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-gray-700">Email: {clientInfo.email}</p>
                <p className="text-gray-700">Phone: {clientInfo.phone}</p>
                <button
                  onClick={handleEdit}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  <AiOutlineEdit className="mr-2" />
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-6 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Reviews</h2>
          <div className="space-y-4">
            {clientData.reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              clientData.reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold">{review.clientName}</h3>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`${
                            index < review.rating
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mt-6 p-6 bg-gray-100 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Email: {clientInfo.email}</p>
            <p className="text-sm text-gray-600">Phone: {clientInfo.phone}</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <AiOutlineMessage className="mr-2" />
              Message Client
            </button>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}