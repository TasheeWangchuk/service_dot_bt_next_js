import React, { useState } from "react";

interface ExperienceFormProps {
  onSave: (experience: { role: string; company: string; startDate: string; endDate: string }) => void;
  onClose: () => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
  });

  const [isPresent, setIsPresent] = useState(false); // Track if the role is ongoing

  const [errors, setErrors] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset error for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { role: "", company: "", startDate: "", endDate: "" };

    if (!formData.role) {
      newErrors.role = "Role is required.";
      isValid = false;
    }

    if (!formData.company) {
      newErrors.company = "Company name is required.";
      isValid = false;
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
      isValid = false;
    }

    if (!isPresent && !formData.endDate) {
      newErrors.endDate = "End date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave({ ...formData, endDate: isPresent ? "Present" : formData.endDate });
    }
  };

  const handleCheckboxChange = () => {
    setIsPresent((prev) => !prev);
    if (!isPresent) {
      setFormData((prev) => ({
        ...prev,
        endDate: "Present",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        endDate: "",
      }));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl transition-all duration-500 transform scale-95 hover:scale-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Add Experience</h2>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <input
              id="role"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleChange}
              className={`mt-2 w-full rounded-md border ${errors.role ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter your role"
            />
            {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company/Organization Name
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className={`mt-2 w-full rounded-md border ${errors.company ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Enter company name"
            />
            {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company}</p>}
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="month"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`mt-2 w-full rounded-md border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="month"
              id="endDate"
              name="endDate"
              value={isPresent ? "" : formData.endDate}
              onChange={handleChange}
              disabled={isPresent}
              className={`mt-2 w-full rounded-md border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
          </div>

          {/* Present Checkbox */}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="isPresent"
              checked={isPresent}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPresent" className="ml-2 text-sm text-gray-700">
              I am currently working here (Present)
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;
