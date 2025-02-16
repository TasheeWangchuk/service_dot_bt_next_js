"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from '@/components/NavBar/NavBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '@/app/lib/apiClient';
import { useRouter } from 'next/navigation';
import ReactSelect from 'react-select';

const Post = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [skills, setSkills] = useState<{ skill_id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ category_id: number; category_name: string }[]>([]);

  interface FormData {
    title: string;
    description: string;
    budget: string;
    deadline: string;
    job_category: number;
    payment_type: string;
    time_preferences_type: string;
    experience_level: string;
    location: string;
    skills: number[];
  }

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    job_category: 1,
    payment_type: "",
    time_preferences_type: "",
    experience_level: "",
    location: "REMOTE",
    skills: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsRes, categoriesRes] = await Promise.all([
          apiClient.get('/api/v1/skills'),
          apiClient.get('/api/v1/job-categories'),
        ]);
        setSkills(skillsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.post('/api/v1/jobs/', {
        ...formData,
        budget: parseFloat(formData.budget),
      });
      toast.success("Job posted successfully!");
      setTimeout(() => {
        router.push('MyPosts');
        router.refresh();
      }, 1500);
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast.error(error.response?.data?.message || "Failed to create job posting");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <Navbar />
      <ToastContainer position="top-right" theme="light" />
      <div className="max-w-4xl mx-auto mt-10 relative">
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Title*</Label>
                <Input value={formData.title} onChange={(e) => handleChange("title", e.target.value)} required />
              </div>

              <div>
                <Label>Description*</Label>
                <Textarea value={formData.description} onChange={(e) => handleChange("description", e.target.value)} required />
              </div>

              <div>
                <Label>Budget*</Label>
                <Input type="number" value={formData.budget} onChange={(e) => handleChange("budget", e.target.value)} required />
              </div>

              <div>
                <Label>Deadline*</Label>
                <Input type="date" value={formData.deadline} onChange={(e) => handleChange("deadline", e.target.value)} required />
              </div>

              <div>
                <Label>Category*</Label>
                <Select onValueChange={(value) => handleChange("job_category", Number(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.category_id} value={category.category_id.toString()}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Payment Type*</Label>
                <Select onValueChange={(value) => handleChange("payment_type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIXED">Fixed</SelectItem>
                    <SelectItem value="MILESTONE">Milestone Based</SelectItem>
                    <SelectItem value="PROJECT">Project Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div><Label>Location Type*</Label>
                <Select onValueChange={(value) => handleChange("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="REMOTE">REMOTE</SelectItem>
                    <SelectItem value="ONSITE">On Site</SelectItem>
                    <SelectItem value="HYBRID">Hybride</SelectItem>
                  </SelectContent>
                </Select></div>

              <div>
                <Label>Time Preference*</Label>
                <Select onValueChange={(value) => handleChange("time_preferences_type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                  <SelectItem value="FLEXIBLE">Flexible Hours</SelectItem>
                    <SelectItem value="CONTRACT">Contract Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Experience Level*</Label>
                <Select onValueChange={(value) => handleChange("experience_level", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENTRY">Entry</SelectItem>
                    <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                    <SelectItem value="EXPERT">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Skills*</Label>
                <ReactSelect
                  isMulti
                  options={skills.map(skill => ({ label: skill.name, value: skill.skill_id }))}
                  value={skills.filter(skill => formData.skills.includes(skill.skill_id)).map(skill => ({ label: skill.name, value: skill.skill_id }))}
                  onChange={(selected) => handleChange("skills", selected.map(s => s.value))}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Posting..." : "Post Job"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Post;
