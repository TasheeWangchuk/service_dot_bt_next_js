"use client";
import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, GraduationCap, Building2, Calendar, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const EducationManager = () => {
  interface Education {
    id: number;
    type: string;
    title: string;
    institution: string;
    startYear: string;
    endYear: string;
    grade: string;
    achievements: string;
  }
  
  const [educations, setEducations] = useState<Education[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    type: 'degree', 
    title: '',
    institution: '',
    startYear: '',
    endYear: '',
    grade: '',
    achievements: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId !== null) {
      setEducations(prev =>
        prev.map(edu => edu.id === editingId ? { ...formData, id: editingId } : edu)
      );
      setEditingId(null);
    } else {
      setEducations(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setIsAddModalOpen(false);
    setFormData({
      type: 'degree',
      title: '',
      institution: '',
      startYear: '',
      endYear: '',
      grade: '',
      achievements: ''
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'degree':
        return <GraduationCap className="w-6 h-6" />;
      case 'school':
        return <Building2 className="w-6 h-6" />;
      // case 'certificate':
      //   return <Award className="w-6 h-6" />;
      default:
        return <GraduationCap className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="w-full">
        <div className="flex justify-between items-center mb-8">
          {/* <h2 className="text-3xl font-bold text-gray-800">Education</h2>  */}
           <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="text-orange-500 hover:text-orange-700 bg-transparent"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Education
          </Button>
        </div>

        {educations.length === 0 ? (
          <Card className="p-12 text-center bg-white border-dashed border-2">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-500 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Education Added Yet</h3>
            <p className="text-gray-500 mb-6">Add your educational background to showcase your qualifications</p>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              variant="outline"
              className="mx-auto"
            >
              Add Education Details
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educations.map(education => (
              <Card key={education.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {getTypeIcon(education.type)}
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {education.type}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{education.title}</h3>
                  <p className="text-blue-600 font-medium mb-3">{education.institution}</p>
                  
                  <div className="flex items-center text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{education.startYear} - {education.endYear || 'Present'}</span>
                  </div>
                  
                  {education.grade && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Grade:</span> {education.grade}
                    </p>
                  )}
                  
                  {education.achievements && (
                    <p className="text-gray-600 mt-3 line-clamp-2">{education.achievements}</p>
                  )}
                  
                  <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => {
                        setFormData(education);
                        setEditingId(education.id);
                        setIsAddModalOpen(true);
                      }}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-red-600"
                      onClick={() => setEducations(prev => prev.filter(edu => edu.id !== education.id))}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingId ? 'Edit Education' : 'Add Education'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="degree">Degree</option>
                  <option value="school">School</option>
                  {/* <option value="certificate">Certificate</option> */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {formData.type === 'degree' ? 'Degree Name' : 
                   formData.type === 'school' ? 'Class/Grade' : 'Certificate Name'}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  {formData.type === 'certificate' ? 'Issuing Organization' : 'Institution Name'}
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Year</label>
                  <input
                    type="text"
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">End Year</label>
                  <input
                    type="text"
                    name="endYear"
                    value={formData.endYear}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                    placeholder="Or leave empty if ongoing"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Grade/Score (Optional)</label>
                <input
                  type="text"
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., percentage %, A+, First Class"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Achievements/Description (Optional)</label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 h-24"
                  placeholder="List any notable achievements, awards, or additional information"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  {editingId ? 'Save Changes' : 'Add Education'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EducationManager;