import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Award, BookOpen } from 'lucide-react';

interface ProfileSectionProps {
  title: string;
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ title, items, renderItem }) => (
  <section className="bg-white rounded-xl shadow-sm p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="space-y-4">
      {items.map((item, index) => renderItem(item, index))}
    </div>
  </section>
);

export default ProfileSection;
