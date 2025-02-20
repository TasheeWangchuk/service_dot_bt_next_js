"use client";
import React, { useState } from "react";
import { PlusCircle, Pencil, Trash2, GraduationCap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Education {
  id: number;
  country: string;
  university: string;
  degree: string;
  start_date: number;
  end_date?: number | string;
  grade?: string;
  achievements?: string;
}

interface FormState {
  country: string;
  university: string;
  degree: string;
  start_date: string | number;
  end_date?: string | number;
  grade?: string;
  achievements?: string;
}

const EducationManager: React.FC = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormState>({
    country: "",
    university: "",
    degree: "",
    start_date: "",
    end_date: "",
    grade: "",
    achievements: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEducation: Education = {
      id: editingId ?? Date.now(),
      country: formData.country,
      university: formData.university,
      degree: formData.degree,
      start_date: Number(formData.start_date),
      end_date: formData.end_date ? Number(formData.end_date) : undefined,
      grade: formData.grade,
      achievements: formData.achievements,
    };

    if (editingId !== null) {
      setEducations((prev) => prev.map((edu) => (edu.id === editingId ? newEducation : edu)));
      setEditingId(null);
    } else {
      setEducations((prev) => [...prev, newEducation]);
    }

    setIsAddModalOpen(false);
    setFormData({ country: "", university: "", degree: "", start_date: "", end_date: "", grade: "", achievements: "" });
  };

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="w-full">
        <div className="flex justify-between items-center mb-8">
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
            <Button onClick={() => setIsAddModalOpen(true)} variant="outline" className="mx-auto">
              Add Education Details
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educations.map((education) => (
              <Card key={education.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <Badge variant="outline">{education.country}</Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{education.degree}</h3>
                  <p className="text-blue-600 font-medium mb-3">{education.university}</p>

                  <div className="flex items-center text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{education.start_date} - {education.end_date || "Present"}</span>
                  </div>

                  {education.grade && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Grade:</span> {education.grade}
                    </p>
                  )}

                  {education.achievements && <p className="text-gray-600 mt-3 line-clamp-2">{education.achievements}</p>}

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
                      // variant="ghost"
                      size="sm"
                      className="text-orange-500 bg-transparent border border-gray-300 hover:text-orange-600"
                      onClick={() => setEducations((prev) => prev.filter((edu) => edu.id !== education.id))}
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
              <DialogTitle className="text-2xl">{editingId ? "Edit Education" : "Add Education"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["country", "university", "degree"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="text"
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                {["start_date", "end_date"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium mb-1">{field.replace("_", " ").toUpperCase()}</label>
                    <input
                      type="number"
                      name={field}
                      value={(formData as any)[field] || ""}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                ))}
              </div>

              <Button  className="bg-orange-500 hover:bg-orange-600" type="submit">{editingId ? "Save Changes" : "Add Education"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EducationManager;
