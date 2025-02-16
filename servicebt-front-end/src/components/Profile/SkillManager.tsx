// components/SkillsManager.tsx
import React, { useState, useEffect } from 'react';
import ItemList from '../Shared/ItemList';
// import ItemService from '@/app/api/ServiceProvider/itemservice';
import { toast } from 'react-toastify';

interface Skill {
  id: string;
  name: string;
}

const SkillsManager: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  // const skillApi = new ItemService('skills');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      // const data = await skillApi.getAll();
      // setSkills(data);
    } catch (error) {
      toast.error('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (name: string) => {
    try {
      const newSkill = await skillApi.create(name);
      setSkills([...skills, newSkill]);
      toast.success('Skill added successfully');
    } catch (error) {
      toast.error('Failed to add skill');
      throw error;
    }
  };

  const handleRemoveSkill = async (index: number) => {
    const skill = skills[index];
    try {
      await skillApi.delete(skill.id);
      setSkills(skills.filter((_, i) => i !== index));
      toast.success('Skill removed successfully');
    } catch (error) {
      toast.error('Failed to remove skill');
      throw error;
    }
  };

  return (
    <ItemList
      title="Skills"
      items={skills.map(skill => skill.name)}
      onAdd={handleAddSkill}
      onRemove={handleRemoveSkill}
      placeholder="Add new skill"
      loading={loading}
      maxItems={15}
      gridCols={3}
    />
  );
};

export default SkillsManager;