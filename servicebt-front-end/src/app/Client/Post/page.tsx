// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import Navbar from "@/components/Shared/NavBar";

// export default function Post() {
//   const [formData, setFormData] = useState<{
//     jobTitle: string;
//     description: string;
//     category: string;
//     subcategory: string;
//     skills: string;
//     experienceLevel: string;
//     deliverables: string;
//     budgetMin: string;
//     budgetMax: string;
//     paymentType: string;
//     deadline: string;
//     startDate: string;
//     contactMethod: string;
//     contactDetails: string;
//     attachment: File | null;
//     agreeToTerms: boolean;
//     ndaRequired: boolean;
//   }>({
//     jobTitle: "",
//     description: "",
//     category: "",
//     subcategory: "",
//     skills: "",
//     experienceLevel: "",
//     deliverables: "",
//     budgetMin: "",
//     budgetMax: "",
//     paymentType: "Fixed",
//     deadline: "",
//     startDate: "",
//     contactMethod: "Email",
//     contactDetails: "",
//     attachment: null,
//     agreeToTerms: false,
//     ndaRequired: false,
//   });

//   const categories: { [key: string]: string[] } = {
//     'Software Development': [
//     'Front-end Development',
//     'Back-end Development',
//     'Full-stack Development',
//     'E-commerce Development',
//     'WordPress Development',
//     'Mobile App Development',
//     'Game Development',
//   ],
//   Design: [
//     'Graphic Design',
//     'UX/UI Design',
//     'Web Design',
//     'Product Design',
//     'Branding',
//     'Logo Design',
//     'Animation and Motion Graphics',
//     'Print Design',
//   ],
//   'Writing & Content': [
//     'Copywriting',
//     'Content Writing',
//     'Technical Writing',
//     'SEO Writing',
//     'Blogging',
//     'Ghostwriting',
//     'Editing and Proofreading',
//     'Transcription',
//   ],
//   'Digital Marketing': [
//     'Social Media Marketing',
//     'SEO (Search Engine Optimization)',
//     'SEM (Search Engine Marketing)',
//     'Email Marketing',
//     'Affiliate Marketing',
//     'Influencer Marketing',
//     'Content Marketing',
//     'Marketing Strategy',
//   ],
//   'Customer Service & Support': [
//     'Virtual Assistance',
//     'Customer Support',
//     'Data Entry',
//     'Online Research',
//     'Chat Support',
//     'Email Handling',
//   ],
//   'Video & Animation': [
//     'Video Editing',
//     'Video Production',
//     'Animation (2D/3D)',
//     'Motion Graphics',
//     'Explainer Videos',
//     'Voiceovers',
//     'VFX (Visual Effects)',
//   ],
//   'Business & Finance': [
//     'Accounting & Bookkeeping',
//     'Financial Planning',
//     'Business Consulting',
//     'Market Research',
//     'Project Management',
//     'HR & Recruitment',
//     'Legal Consulting',
//   ],
//   'IT & Networking': [
//     'Network Administration',
//     'Cloud Computing',
//     'Cybersecurity',
//     'Database Administration',
//     'Software Development',
//     'DevOps',
//     'IT Support',
//   ],
//   'Translation & Language Services': [
//     'Translation',
//     'Transcription',
//     'Proofreading',
//     'Language Tutoring',
//     'Subtitling',
//   ],
//   'Photography & Videography': [
//     'Product Photography',
//     'Event Photography',
//     'Wedding Photography',
//     'Stock Photography',
//     'Videography',
//     'Aerial Photography',
//   ],
//   'Voice & Audio': [
//     'Voice Acting',
//     'Podcast Editing',
//     'Audio Editing',
//     'Sound Design',
//     'Music Composition',
//   ],
//   'Engineering & Architecture': [
//     'Mechanical Engineering',
//     'Electrical Engineering',
//     'Civil Engineering',
//     'Architectural Design',
//     'CAD Drafting',
//     '3D Modeling',
//   ],
//   'Health & Wellness': [
//     'Fitness Coaching',
//     'Nutrition Consulting',
//     'Mental Health Counseling',
//     'Yoga Instruction',
//     'Life Coaching',
//   ],
//   'Education & Tutoring': [
//     'Online Tutoring',
//     'Language Teaching',
//     'Test Prep',
//     'Career Coaching',
//     'Educational Content Creation',
//   ],
//   'Home Services': [
//     'Plumbing',
//     'Electrical Services',
//     'Carpentry',
//     'Painting & Decorating',
//     'HVAC (Heating, Ventilation, and Air Conditioning)',
//     'Roofing',
//     'Home Cleaning',
//     'Appliance Repair',
//   ],
//   'Childcare & Elder Care': [
//     'Babysitting',
//     'Nanny Services',
//     'Senior Care (Elderly Care)',
//     'Personal Care Aide',
//     'Childcare Tutoring',
//     'Pet Sitting',
//     'Special Needs Care',
//   ],
//   'Health & Wellness (Non-Clinical)': [
//     'Personal Training',
//     'Fitness Coaching',
//     'Yoga Instruction',
//     'Massage Therapy',
//     'Meditation Coaching',
//     'Health Coaching',
//   ],
//   'Event & Party Services': [
//     'Event Planning',
//     'Party Entertainment (Clowns, Magicians, etc.)',
//     'Catering',
//     'Bartending',
//     'Wedding Planning',
//     'DJ/Live Music Performance',
//   ],
//   'Manual Labor & Handyman Services': [
//     'Moving & Delivery',
//     'Furniture Assembly',
//     'Yard Work/Landscaping',
//     'Snow Removal',
//     'Cleaning (Post-Construction, etc.)',
//     'Heavy Lifting/Hauling',
//   ],
//   'Transportation & Travel Services': [
//     'Taxi/Ride-Sharing Driver',
//     'Delivery Driver (Food, Packages, etc.)',
//     'Chauffeur',
//     'Tour Guide',
//     'Travel Planning/Consulting',
//   ],
//   'Miscellaneous Local Services': [
//     'Personal Shopping',
//     'Home Organization',
//     'Pet Grooming',
//     'Sewing/Tailoring',
//     'Photography (Family, Event, etc.)',
//   ],
//   'Other': ['Other'],

//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, type, value } = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
//     const checked = (e.target as HTMLInputElement).checked;
//     const files = (e.target as HTMLInputElement).files;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value !== null) {
//           if (typeof value === 'boolean') {
//             data.append(key, value.toString());
//           } else {
//             data.append(key, value);
//           }
//         }
//       });

//       const response = await axios.post('/api/jobs', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       alert('Job posted successfully!');
//       setFormData({
//         jobTitle: "",
//         description: "",
//         category: "",
//         subcategory: "",
//         skills: "",
//         experienceLevel: "",
//         deliverables: "",
//         budgetMin: "",
//         budgetMax: "",
//         paymentType: "Fixed",
//         deadline: "",
//         startDate: "",
//         contactMethod: "Email",
//         contactDetails: "",
//         attachment: null,
//         agreeToTerms: false,
//         ndaRequired: false,
//       });
//     } catch (error) {
//       console.error('Error posting job:', error);
//       alert('Failed to post job. Please try again.');
//     }
//   };

//   //Time pref
//   const [preferredTime, setPreferredTime] = useState("");
//   const [customTime, setCustomTime] = useState("");

//   const [requiresLocation, setRequiresLocation] = useState(false);
//   const [locationPreference, setLocationPreference] = useState("");
//   const [customLocation, setCustomLocation] = useState("");


//   return (
//     <div
//     className="sticky min-h-screen"
//     style={{
//       backgroundImage: "url('/Artboard.png')",
//       backgroundSize: "cover",
//       backgroundAttachment: "fixed",
//       backgroundPosition: "center",
//     }}
//   >
//       <div className="max-w-4xl mx-auto p-6">
//       <Navbar/>
//         <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center mt-14">
//           Post a Job
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-8  p-8 rounded-lg shadow-xl">
//         {/* Job Title */}
//         <div>
//             <label className="block text-gray-700 font-medium mb-1">Job Title</label>
//             <input
//               type="text"
//               name="jobTitle"
//               value={formData.jobTitle}
//               onChange={handleChange}
//               placeholder="Enter job title"
//               className="w-full border rounded-md px-3 py-2 text-gray-500 focus:ring focus:ring-orange-200"
//               required
//             />
//           </div>

//           {/* Job Description */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe the job requirements"
//               rows={4}
//               className="w-full border rounded-md px-3 py-2 text-gray-500 focus:ring focus:ring-orange-200"
//               required
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-gray-500 focus:ring focus:ring-orange-200"
//               required
//             >
//               <option value="">Select a category</option>
//               {Object.keys(categories).map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Subcategory */}
//           {formData.category && (
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Subcategory</label>
//               <select
//                 name="subcategory"
//                 value={formData.subcategory}
//                 onChange={handleChange}
//                 className="w-full border rounded-md px-3 py-2 text-gray-500 focus:ring focus:ring-orange-200"
//                 required
//               >
//                 <option value="">Select a subcategory</option>
//                 {categories[formData.category]?.map((subcat) => (
//                   <option key={subcat} value={subcat}>
//                     {subcat}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}
//           <div className="mb-6">
//           <label htmlFor="requires-location" className="block text-sm font-medium text-gray-700">
//             Requires Location Preference?
//           </label>
//           <div className="flex items-center space-x-4 mt-2">
//             <button
//               type="button"
//               className={`px-4 py-2 rounded-md border ${
//                 requiresLocation ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"
//               }`}
//               onClick={() => setRequiresLocation(true)}
//             >
//               Yes
//             </button>
//             <button
//               type="button"
//               className={`px-4 py-2 rounded-md border ${
//                 !requiresLocation ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"
//               }`}
//               onClick={() => setRequiresLocation(false)}
//             >
//               No
//             </button>
//           </div>
//         </div>

//         {/* Location Preference - displayed only if location is required */}
//         {requiresLocation && (
//           <div className="mb-6">
//             <label htmlFor="location-preference" className="block text-sm font-medium text-gray-700">
//               Location Preference
//             </label>
//             <fieldset className="mt-2">
//               <legend className="sr-only">Location Preference</legend>
//               <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
//                 <div className="flex items-center">
//                   <input
//                     id="remote"
//                     name="location-preference"
//                     type="radio"
//                     value="remote"
//                     className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     checked={locationPreference === "remote"}
//                     onChange={() => setLocationPreference("remote")}
//                   />
//                   <label htmlFor="remote" className="ml-3 block text-sm font-medium text-gray-700">
//                     Remote
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     id="onsite"
//                     name="location-preference"
//                     type="radio"
//                     value="onsite"
//                     className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     checked={locationPreference === "onsite"}
//                     onChange={() => setLocationPreference("onsite")}
//                   />
//                   <label htmlFor="onsite" className="ml-3 block text-sm font-medium text-gray-700">
//                     On-Site
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     id="hybrid"
//                     name="location-preference"
//                     type="radio"
//                     value="hybrid"
//                     className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     checked={locationPreference === "hybrid"}
//                     onChange={() => setLocationPreference("hybrid")}
//                   />
//                   <label htmlFor="hybrid" className="ml-3 block text-sm font-medium text-gray-700">
//                     Hybrid
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     id="other-location"
//                     name="location-preference"
//                     type="radio"
//                     value="other"
//                     className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                     checked={locationPreference === "other"}
//                     onChange={() => setLocationPreference("other")}
//                   />
//                   <label htmlFor="other-location" className="ml-3 block text-sm font-medium text-gray-700">
//                     Other
//                   </label>
//                 </div>
//               </div>
//             </fieldset>

//             {/* Custom Location input for "Other" option */}
//             {locationPreference === "other" && (
//               <input
//                 type="text"
//                 name="custom-location"
//                 placeholder="Specify custom location"
//                 className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                 value={customLocation}
//                 onChange={(e) => setCustomLocation(e.target.value)}
//               />
//             )}
//           </div>
//         )}

//           {/* Skills */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Required Skills</label>
//             <input
//               type="text"
//               name="skills"
//               value={formData.skills}
//               onChange={handleChange}
//               placeholder="Enter skills separated by commas"
//               className="w-full border rounded-md px-3 py-2 text-gray-500 focus:ring focus:ring-orange-200"
//             />
//           </div>

//           {/* Experience Level */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Experience Level</label>
//             <select
//               name="experienceLevel"
//               value={formData.experienceLevel}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-gray-500 focus:ring focus:ring-orange-200"
//             >
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Expert">Expert</option>
//             </select>
//           </div>

//           {/* Deliverables */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Deliverables or Goals</label>
//             <input
//               type="text"
//               name="deliverables"
//               value={formData.deliverables}
//               onChange={handleChange}
//               placeholder="Specify expected deliverables or your goal to achieve"
//               className="w-full border rounded-md px-3 py-2 text-gray-500 focus:ring focus:ring-orange-200"
//             />
//           </div>
//           {/* Preferred Time */}
//       <div className="mb-6">
//         <label htmlFor="preferred-time" className="block text-sm font-medium text-gray-700">
//           Preferred Time
//         </label>
//         <select
//           id="preferred-time"
//           name="preferred-time"
//           className="mt-1 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//           value={preferredTime}
//           onChange={(e) => setPreferredTime(e.target.value)}
//         >
//           <option value="">Select Preferred Time</option>
//           <option value="morning">Morning</option>
//           <option value="afternoon">Afternoon</option>
//           <option value="evening">Evening</option>
//           <option value="night">Night</option>
//           <option value="flexible">Flexible</option>
//           <option value="other">Other</option>
//         </select>
//         {preferredTime === "other" && (
//           <input
//             type="text"
//             name="custom-time"
//             placeholder="Specify custom time"
//             className="mt-2 block w-full rounded-md text-gray-500 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             value={customTime}
//             onChange={(e) => setCustomTime(e.target.value)}
//           />
//         )}
//       </div>      
//           {/* Budget */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Minimum Budget</label>
//               <input
//                 type="number"
//                 name="budgetMin"
//                 value={formData.budgetMin}
//                 onChange={handleChange}
//                 placeholder="Min budget"
//                 className="w-full border text-gray-500 rounded-md px-3 py-2"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Maximum Budget</label>
//               <input
//                 type="number"
//                 name="budgetMax"
//                 value={formData.budgetMax}
//                 onChange={handleChange}
//                 placeholder="Max budget"
//                 className="w-full border rounded-md text-gray-500 px-3 py-2"
//               />
//             </div>
//           </div>

//           {/* Payment Type */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Payment Type</label>
//             <select
//               name="paymentType"
//               value={formData.paymentType}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-gray-500 focus:ring focus:ring-orange-200"
//             >
//               <option value="Fixed">Fixed</option>
//               <option value="Hourly">Hourly</option>
//             </select>
//           </div>

//           {/* Deadline */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Deadline</label>
//             <input
//               type="date"
//               name="deadline"
//               value={formData.deadline}
//               onChange={handleChange}
//               className="w-full border rounded-md px-3 py-2 text-gray-500 focus:ring focus:ring-orange-200"
//             />
//           </div>

//           {/* Contact Details */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Contact Details</label>
//             <input
//               type="text"
//               name="contactDetails"
//               value={formData.contactDetails}
//               onChange={handleChange}
//               placeholder="Enter email or phone"
//               className="w-full border rounded-md text-gray-500 px-3 py-2"
//               required
//             />
//           </div>

//           {/* Attachments */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">Attachments (Optional)</label>
//             <input
//               type="file"
//               name="attachment"
//               onChange={handleChange}
//               className="w-full border rounded-md text-gray-500 px-3 py-2"
//             />
//           </div>


//           {/* Terms and NDA */}
//           <div className="space-y-2">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="agreeToTerms"
//                 checked={formData.agreeToTerms}
//                 onChange={handleChange}
//                 className="mr-2"
//                 required
//               />
//               <label className="text-gray-700 text-sm">
//                 I agree to the terms and conditions.
//               </label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="ndaRequired"
//                 checked={formData.ndaRequired}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               <label className="text-gray-700 text-sm">
//                 This project requires a non-disclosure agreement (NDA).
//               </label>
//             </div>
//           </div>


//           {/* Submit Button */}
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-transform transform hover:scale-105"
//             >
//               Submit Job Post
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>

//   );
// }


"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Navbar from '@/components/NavBar/NavBar';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, X } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '@/app/lib/apiClient';
import { useRouter } from 'next/navigation';

const Post = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [skills, setSkills] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ category_id: string; category_name: string }[]>([]);
  const [inputSkill, setInputSkill] = useState("");
  
  // Types
  interface Skill {
    skill_id: number;
    name: string;
  }

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
    skills: string[];
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

  const handleRemoveSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 1) {// change later 
      newErrors.description = "Description must be at least 50 characters long";
    }

    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Valid budget is required";
    }

    if (!formData.deadline) {
      newErrors.deadline = "Deadline is required";
    } else {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      if (deadlineDate < today) {
        newErrors.deadline = "Deadline cannot be in the past";
      }
    }

    if (!formData.payment_type) {
      newErrors.payment_type = "Payment type is required";
    }

    if (!formData.time_preferences_type) {
      newErrors.time_preferences_type = "Time preference is required";
    }

    if (!formData.experience_level) {
      newErrors.experience_level = "Experience level is required";
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please check all required fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    console.log("formdata",formData)
    setIsLoading(true);

    try {
        const response = await apiClient.post('/api/v1/jobs/', {
        ...formData,
        budget: parseFloat(formData.budget)
      });

      toast.success("Job posting created successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        router.push('/post-list');  
        router.refresh();      
      }, 2000);

    } catch (error: any) {
      console.error('Error posting job:', error);
      toast.error(error.response?.data?.message || "Failed to create job posting");
    } finally {
      setIsLoading(false);
    }
  };

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
        // toast.error("Failed to load form data");
      }
    };
    fetchData();
  }, []);

  const handleAddSkill = () => {
    if (inputSkill.trim() && !formData.skills.includes(inputSkill.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, inputSkill.trim()] }));
      setInputSkill("");
      
      if (errors.skills) {
        setErrors(prev => {
          const { skills, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };
    
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/Artboard.png')",
          
        }}
      />
      
      <Navbar />
      <ToastContainer position="top-right" theme="light" />

      <div className="max-w-4xl mx-auto mt-10 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create a New Job Posting</h1>
          <p className="text-gray-600">Fill in the details below to post your job requirement</p>
        </div>

        <Card className="backdrop-blur-md bg-white/70 shadow-xl border border-white/20">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Job Title*
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Full Stack Web Developer Needed"
                  className={`w-full bg-white/50 backdrop-blur-sm transition-all duration-200 ${
                    errors.title ? 'border-red-500' : 'hover:bg-white/70 focus:bg-white/90'
                  }`}
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <Label>Job Category*</Label>
              <Select onValueChange={(value) => handleChange('job_category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Skills section */}
              <div className="space-y-2">
                <Label>Skills Required*</Label>
                <div className="flex gap-2">
                  <Input 
                    value={inputSkill} 
                    onChange={(e) => setInputSkill(e.target.value)}
                    placeholder="Type a skill..."
                    className="bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 focus:bg-white/90"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddSkill}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-orange-50/80 backdrop-blur-sm text-orange-700 px-3 py-1.5 rounded-full text-sm font-medium
                        border border-orange-200 shadow-sm
                        transition-all duration-200 ease-in-out
                        hover:bg-orange-100/90 hover:border-orange-300 hover:scale-105
                        flex items-center gap-2"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(index)}
                        className="hover:text-orange-800 rounded-full w-4 h-4 flex items-center justify-center
                          hover:bg-orange-200/80 transition-colors duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.skills && (
                  <p className="text-sm text-red-500">{errors.skills}</p>
                )}
              </div>

              {/* Job Description */}
                            <div className="space-y-2">
                <Label>
                  Job Description*
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the job requirements and responsibilities..."
                  className={`h-32 ${errors.description ? 'border-red-500' : ''}`}
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Budget and Deadline Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Budget (BTN)*
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="5000"
                    className={`w-full ${errors.budget ? 'border-red-500' : ''}`}
                    value={formData.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                  />
                  {errors.budget && (
                    <p className="text-sm text-red-500">{errors.budget}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>
                    Deadline*
                  </Label>
                  <div className="relative">
                    <Input
                      id="deadline"
                      type="date"
                      
                      className={`w-full ${errors.deadline ? 'border-red-500' : ''}`}
                      value={formData.deadline}
                      onChange={(e) => handleChange('deadline', e.target.value)}
                    />
                     <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" /> 
                   </div>
                  {errors.deadline && (
                    <p className="text-sm text-red-500">{errors.deadline}</p>
                  )}
              </div> 

              </div>

              {/* Job Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>
                    Payment Type*
                  </Label>
                  <Select
                    onValueChange={(value) => handleChange('payment_type', value)}
                  >
                    <SelectTrigger className={errors.payment_type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select payment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FIXED">Fixed Price</SelectItem>
                      <SelectItem value="Milestone">Milestone Based</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.payment_type && (
                    <p className="text-sm text-red-500">{errors.payment_type}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Time Preference*
                  </Label>
                  <Select
                    onValueChange={(value) => handleChange('time_preferences_type', value)}
                  >
                    <SelectTrigger className={errors.time_preferences_type ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select time preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FULL_TIME">Full Time</SelectItem>
                      <SelectItem value="PART_TIME">Part Time</SelectItem>
                      <SelectItem value="FLEXIBLE">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.time_preferences_type && (
                    <p className="text-sm text-red-500">{errors.time_preferences_type}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>
                    Experience Level*
                  </Label>
                  <Select
                    onValueChange={(value) => handleChange('experience_level', value)}
                  >
                    <SelectTrigger className={errors.experience_level ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ENTRY">Entry Level</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="EXPERT">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience_level && (
                    <p className="text-sm text-red-500">{errors.experience_level}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-200 
                    transform hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating...
                    </div>
                  ) : (
                    "Post Job"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    
  );
};

export default Post;
