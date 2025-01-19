import React, { useState } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

const SkillsManager = () => {
  const [skills, setSkills] = useState([
    { skill_id: 1, name: 'React', popularity: 85 },
    { skill_id: 2, name: 'Python', popularity: 95 },
  ]);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setSkills([...skills, { skill_id: skills.length + 1, name: newSkill, popularity: 50 }]);
      setNewSkill('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-black">Skills Management</h2>

      <form onSubmit={handleAddSkill} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Enter new skill"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Add Skill
          </button>
        </div>
      </form>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={skills}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="popularity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsManager;
