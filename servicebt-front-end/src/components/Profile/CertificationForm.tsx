"use client";

import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  image: File | null;
}

interface CertificationFormProps {
  certifications: Certification[];
  onSave: (certification: Certification) => void;
  onDelete: (index: number) => void;
  onClose: () => void;
}

const CertificationForm: React.FC<CertificationFormProps> = ({
  certifications,
  onSave,
  onDelete,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && !file.type.startsWith("image/")) {
      setErrorMessage("Please upload a valid image file.");
      setImage(null); // Reset the image state
    } else {
      setErrorMessage(""); // Clear any previous error
      setImage(file);
    }
  };

  const handleSave = () => {
    setErrorMessage(""); // Clear previous error message

    if (!title || !issuer || !issueDate || !image) {
      setErrorMessage("Please fill out all fields and upload an image.");
      return;
    }

    onSave({ title, issuer, issueDate, image });
    setTitle("");
    setIssuer("");
    setIssueDate("");
    setImage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add Certification</h2>

        {/* Error Message */}
        {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

        {/* Certification Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Certification Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900"
            placeholder="Enter certification title"
          />
        </div>

        {/* Issuer */}
        <div className="mb-4">
          <label
            htmlFor="issuer"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Issuer
          </label>
          <input
            type="text"
            id="issuer"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900"
            placeholder="Enter issuer name"
          />
        </div>

        {/* Issue Date */}
        <div className="mb-4">
          <label
            htmlFor="issueDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Issue Date
          </label>
          <input
            type="date"
            id="issueDate"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900"
          />
        </div>

        {/* Upload Image */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload Certificate
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 text-gray-900"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => setIsViewAllOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <AiOutlineEye /> View All
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </div>

        {/* View All Modal */}
        {isViewAllOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">All Certifications</h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
                  >
                    <div>
                      <h3 className="font-bold">{cert.title}</h3>
                      <p className="text-sm text-gray-600">Issuer: {cert.issuer}</p>
                      <p className="text-sm text-gray-600">
                        Issue Date: {cert.issueDate}
                      </p>
                    </div>
                    <button
                      onClick={() => onDelete(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsViewAllOpen(false)}
                className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationForm;
