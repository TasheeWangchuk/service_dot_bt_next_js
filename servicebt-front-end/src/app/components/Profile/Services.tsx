import React, { useState } from 'react';

const Services: React.FC = () => {
  const [Services, setServices] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newService, setNewService] = useState('');

  const handleAddService = () => {
    if (newService.trim()) {
      setServices([...Services, newService.trim()]);
      setNewService('');
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleRemoveServices = (index: number) => {
    setServices(Services.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 rounded-lg bg-gray-100 mt-7 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Services</h2>
        <button
          onClick={toggleEditing}
          className="text-orange-500 font-medium hover:underline"
        >
          {isEditing ? 'Done' : '+ Edit'}
        </button>
      </div>
      <div className="flex flex-wrap gap-4 rounded-md p-4">
        {Services.map((Services, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 rounded-full text-gray-700 bg-white shadow-sm hover:bg-gray-50"
          >
            <span>{Services}</span>
            {isEditing && (
              <button
                onClick={() => handleRemoveServices(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        {isEditing && (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              className="px-3 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Add new service"
            />
            <button
              onClick={handleAddService}
              className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
