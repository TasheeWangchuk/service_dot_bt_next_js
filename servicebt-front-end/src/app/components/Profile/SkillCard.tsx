import React, { useState } from 'react';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Skills</h2>
        <button
          onClick={toggleEditing}
          className="text-orange-500 font-medium hover:underline"
        >
          {isEditing ? 'Done' : '+ Edit'}
        </button>
      </div>
      <div className="flex flex-wrap gap-4 border rounded-md p-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 border rounded-full text-gray-700 bg-white shadow-sm hover:bg-gray-50"
          >
            <span>{skill}</span>
            {isEditing && (
              <button
                onClick={() => handleRemoveSkill(index)}
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
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="px-3 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Add new skill"
            />
            <button
              onClick={handleAddSkill}
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

export default Skills;
