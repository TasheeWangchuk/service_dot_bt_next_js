import React, { useState } from "react";
import { X } from "lucide-react";

interface FiltersProps {
    selectedLocation: string;
    setSelectedLocation: (value: string) => void;
    minRate: string;
    setMinRate: (value: string) => void;
    maxRate: string;
    setMaxRate: (value: string) => void;
    selectedSkills: string[];
    setSelectedSkills: (skills: string[]) => void;
    allSkills: string[];
    setFilters: React.Dispatch<React.SetStateAction<{ 
      role: string; 
      search: string; 
      location: string; 
      min_rate: string; 
      max_rate: string; 
      skills: string[]; 
      page: number; 
    }>>;
}

const [filters, setFilters] = useState<{ 
    role: string; 
    search: string; 
    location: string; 
    min_rate: string; 
    max_rate: string; 
    skills: string[];  
    page: number; 
  }>({
    role: "",
    search: "",
    location: "",
    min_rate: "",
    max_rate: "",
    skills: [], 
    page: 1,
  });

const Filters: React.FC<FiltersProps> = ({
  selectedLocation, setSelectedLocation,
  minRate, setMinRate, maxRate, setMaxRate,
  selectedSkills, setSelectedSkills, allSkills
}) => {
  
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="w-64 space-y-6 bg-white p-4 rounded-lg border">
      <h2 className="font-semibold mb-4">Filters</h2>

      {/* Location Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <input 
          type="text"
          placeholder="Type location"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
      </div>

      {/* Rate Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Service Rate</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
          />
        </div>
      </div>

      {/* Skill Filter */}
      <div>
        <label className="block text-sm font-medium mb-2">Skills</label>
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <span key={skill} className="flex items-center px-3 py-1 bg-blue-50 text-orange-600 rounded-full text-sm">
              {skill} <X className="ml-1 cursor-pointer" size={14} onClick={() => toggleSkill(skill)} />
            </span>
          ))}
        </div>
        <select 
          className="w-full p-2 border rounded-lg mt-2 focus:ring-2 focus:ring-blue-500"
          onChange={(e) => toggleSkill(e.target.value)}
        >
          <option value="">Select skill</option>
          {allSkills.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
