// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Trash2, PlusCircle, Calendar, Building2, GraduationCap, Squirrel } from 'lucide-react';
// import { toast } from 'react-toastify';
// import apiClient from '@/app/lib/apiClient';
// import { Card } from '../ui/card';
// import { Button } from '../ui/button';

// interface Experience {
//   experience_id: number;
  
//   role: string;
//   company: string;
//   startDate: string;
//   endDate: string;

  
// }

// const ExperienceManager = () => {
//   const [experiences, setExperiences] = useState<Experience[]>([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState({
//     role: "",
//     company: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [isPresent, setIsPresent] = useState(false);
//   const [errors, setErrors] = useState({
//     role: "",
//     company: "",
//     startDate: "",
//     endDate: "",
//   });

//   useEffect(() => {
//     fetchExperiences();
//   }, []);

//   const fetchExperiences = async () => {
//     try {
//       const response = await apiClient.get('/api/v1/experiences/');
//       setExperiences(response.data);
//       setLoading(false);
//     } catch (error) {
//       // toast.error('Failed to fetch experiences');
//       setLoading(false);
//     }
//   };

//   const handleAddExperience = async () => {
//     if (!validateForm()) return;

//     try {
//       const experienceData = {
//         ...formData,
//         endDate: isPresent ? "Present" : formData.endDate,
      
//     };

//       const response = await apiClient.post('/api/v1/experiences/', experienceData);
//       setExperiences([...experiences, response.data]);
//       toast.success('Experience added successfully');
//       resetForm();
//       setIsFormOpen(false);
//     } catch (error) {
//       toast.error('Failed to add experience');
//     }
//   };

//   const handleDeleteExperience = async (experience_id: number) => {
//     try {
//       await apiClient.delete(`/api/v1/experiences/${experience_id}/`);
//       setExperiences(experiences.filter(exp => exp.experience_id !== experience_id));
//       toast.success('Experience deleted successfully');
//     } catch (error) {
//       toast.error('Failed to delete experience');
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors(prev => ({
//       ...prev,
//       [name]: "",
//     }));
//   };

//   const handleCheckboxChange = () => {
//     setIsPresent(prev => !prev);
//     if (!isPresent) {
//       setFormData(prev => ({
//         ...prev,
//         endDate: "Present",
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         endDate: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     let isValid = true;
//     let newErrors = {
//       role: "",
//       company: "",
//       startDate: "",
//       endDate: "",
//     };

//     if (!formData.role) {
//       newErrors.role = "Role is required";
//       isValid = false;
//     }
//     if (!formData.company) {
//       newErrors.company = "Company is required";
//       isValid = false;
//     }
//     if (!formData.startDate) {
//       newErrors.startDate = "Start date is required";
//       isValid = false;
//     }
//     if (!isPresent && !formData.endDate) {
//       newErrors.endDate = "End date is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const resetForm = () => {
//     setFormData({
//       role: "",
//       company: "",
//       startDate: "",
//       endDate: "",
//     });
//     setIsPresent(false);
//     setErrors({
//       role: "",
//       company: "",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   return (
//     <div className="w-full">
//       <div className="flex justify-between items-center mb-6">
//         {/* <h2 className="text-xl font-semibold text-gray-900">Experience</h2> */}
//         <button
//           onClick={() => setIsFormOpen(true)}
//           className="inline-flex items-center px-4 py-2 text-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
//         >
//           <PlusCircle className="w-4 h-4 mr-2" />
//           Add
//         </button>
//       </div>

//       {/* Experience Cards */}
//        <div className="space-y-4">
//         {loading ? (
//           <div className="text-center py-4 text-gray-500">Loading experiences...</div>
//          ) : experiences.length === 0 ? (
//             <Card className="p-12 text-center bg-white border-dashed border-2">
//               <Squirrel className="w-16 h-16 mx-auto mb-4 text-blue-500 opacity-50" />
//               <h3 className="text-xl font-semibold mb-2">No Experience Added Yet</h3>
//               if (error)
//               toast.error(error);
              
//               <p className="text-gray-500 mb-6">Add your Experiences to Experience showcase</p>
//               <Button 
//                 onClick={() => setIsFormOpen(true)}
//                 variant="outline"
//                 className="mx-auto"
//               >
//                 Add Experience
//               </Button>
//             </Card>
//           ) : (
//           experiences.map((experience) => (
//             <div key={experience.experience_id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   <h3 className="text-lg font-semibold text-gray-900">{experience.role}</h3>
//                   <div className="flex items-center text-gray-600">
//                     <Building2 className="w-4 h-4 mr-2" />
//                     <span>{experience.company}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     <span>{experience.startDate} - {experience.endDate}</span>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => handleDeleteExperience(experience.experience_id)}
//                   className="text-gray-400 hover:text-red-500 transition-colors"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Add/Edit Modal */}
//       {isFormOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl">
//             <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Experience</h2>

//             <div className="space-y-6">
//               {/* Role Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Role</label>
//                 <input
//                   type="text"
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className={`mt-1 w-full rounded-md border ${
//                     errors.role ? 'border-red-500' : 'border-gray-300'
//                   } shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500`}
//                   placeholder="Enter your role"
//                 />
//                 {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
//               </div>

//               {/* Company Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Company</label>
//                 <input
//                   type="text"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   className={`mt-1 w-full rounded-md border ${
//                     errors.company ? 'border-red-500' : 'border-gray-300'
//                   } shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500`}
//                   placeholder="Enter company name"
//                 />
//                 {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company}</p>}
//               </div>

//               {/* Dates */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">Start Date</label>
//                   <input
//                     type="month"
//                     name="startDate"
//                     value={formData.startDate}
//                     onChange={handleChange}
//                     className={`mt-1 w-full rounded-md border ${
//                       errors.startDate ? 'border-red-500' : 'border-gray-300'
//                     } shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500`}
//                   />
//                   {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">End Date</label>
//                   <input
//                     type="month"
//                     name="endDate"
//                     value={isPresent ? "" : formData.endDate}
//                     onChange={handleChange}
//                     disabled={isPresent}
//                     className={`mt-1 w-full rounded-md border ${
//                       errors.endDate ? 'border-red-500' : 'border-gray-300'
//                     } shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500`}
//                   />
//                   {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
//                 </div>
//               </div>

//               {/* Present Checkbox */}
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="isPresent"
//                   checked={isPresent}
//                   onChange={handleCheckboxChange}
//                   className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="isPresent" className="ml-2 text-sm text-gray-700">
//                   I currently work here
//                 </label>
//               </div>
//             </div>

//             {/* Modal Actions */}
//             <div className="flex justify-end space-x-4 mt-8">
//               <button
//                 onClick={() => {
//                   resetForm();
//                   setIsFormOpen(false);
//                 }}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddExperience}
//                 className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExperienceManager;
// "use client";

// import React, { useState, useEffect } from 'react';
// import { Trash2, PlusCircle, Calendar, Building2, MapPin, Squirrel } from 'lucide-react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { useToast } from '@/hooks/use-toast';
// import apiClient from '@/app/lib/apiClient';
// import Loading from '../Shared/Loading';

// interface Experience {
//   id: number;
//   job_title: string;
//   company_name: string;
//   country: string;
//   city: string;
//   start_date: string;
//   end_date: string;
//   work_description: string;
// }

// const ExperienceManager = () => {
//   const { toast } = useToast();
//   const [experiences, setExperiences] = useState<Experience[]>([]);
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isPresent, setIsPresent] = useState(false);
  
//   const [formData, setFormData] = useState({
//     job_title: '',
//     company_name: '',
//     country: '',
//     city: '',
//     start_date: '',
//     end_date: '',
//     work_description: ''
//   });

//   const [errors, setErrors] = useState({
//     job_title: '',
//     company_name: '',
//     country: '',
//     city: '',
//     start_date: '',
//     end_date: '',
//     work_description: ''
//   });

//   useEffect(() => {
//     fetchExperiences();
//   }, []);

//   const fetchExperiences = async () => {
//     try {
//       const response = await apiClient.get('/api/v1/experiences/');
//       setExperiences(response.data);
//       setLoading(false);
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to fetch experiences"
//       });
//       setLoading(false);
//     }
//   };

//   const handleAddExperience = async () => {
//     if (!validateForm()) return;

//     try {
//       const experienceData = {
//         ...formData,
//         end_date: isPresent ? null : formData.end_date,
//       };
//       console.log("Upload data",experienceData);
//       const response = await apiClient.post('/api/v1/experiences/', experienceData);
//       setExperiences([...experiences, response.data]);
      
//       toast({
//         title: "Success",
//         description: "Experience added successfully"
//       });
//       resetForm();
//       setIsFormOpen(false);
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to add experience"
//       });
//     }
//   };

//   const handleDeleteExperience = async (experience_id: number) => {
//     try {
//       await apiClient.delete(`/api/v1/experiences/${experience_id}/`);
//       setExperiences(experiences.filter(exp => exp.id !== experience_id));
//       toast({
//         title: "Success",
//         description: "Experience deleted successfully"
//       });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to delete experience"
//       });
//     }
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//     setErrors(prev => ({
//       ...prev,
//       [name]: '',
//     }));
//   };

//   const handleCheckboxChange = () => {
//     setIsPresent(prev => !prev);
//     if (!isPresent) {
//       setFormData(prev => ({
//         ...prev,
//         end_date: '',
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         end_date: '',
//       }));
//     }
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {
//       job_title: '',
//       company_name: '',
//       country: '',
//       city: '',
//       start_date: '',
//       end_date: '',
//       work_description: ''
//     };

//     if (!formData.job_title) {
//       newErrors.job_title = 'Job title is required';
//       isValid = false;
//     }
//     if (!formData.company_name) {
//       newErrors.company_name = 'Company name is required';
//       isValid = false;
//     }
//     if (!formData.country) {
//       newErrors.country = 'Country is required';
//       isValid = false;
//     }
//     if (!formData.city) {
//       newErrors.city = 'City is required';
//       isValid = false;
//     }
//     if (!formData.start_date) {
//       newErrors.start_date = 'Start date is required';
//       isValid = false;
//     }
//     if (!isPresent && !formData.end_date) {
//       newErrors.end_date = 'End date is required';
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const resetForm = () => {
//     setFormData({
//       job_title: '',
//       company_name: '',
//       country: '',
//       city: '',
//       start_date: '',
//       end_date: '',
//       work_description: ''
//     });
//     setIsPresent(false);
//     setErrors({
//       job_title: '',
//       company_name: '',
//       country: '',
//       city: '',
//       start_date: '',
//       end_date: '',
//       work_description: ''
//     });
//   };

//   return (
//     <div className="w-full">
//       <div className="flex justify-between items-center mb-6">
//         <Button
//           onClick={() => setIsFormOpen(true)}
//           variant="outline"
//           className="text-orange-500 hover:text-orange-600"
//         >
//           <PlusCircle className="w-4 h-4 mr-2" />
//           Add Experience
//         </Button>
//       </div>

//       <div className="space-y-4">
//         {loading ? (
//           <Loading/> 
//         ) : experiences.length === 0 ? (
//           <Card className="p-12 text-center border-dashed border-2">
//             <Squirrel className="w-16 h-16 mx-auto mb-4 text-orange-500 opacity-50" />
//             <h3 className="text-xl font-semibold mb-2">No Experience Added Yet</h3>
//             <p className="text-gray-500 mb-6">Add your professional experiences to showcase your journey</p>
//             <Button 
//               onClick={() => setIsFormOpen(true)}
//               variant="outline"
//               className="mx-auto"
//             >
//               Add Experience
//             </Button>
//           </Card>
//         ) : (
//           experiences.map((experience) => (
//             <Card key={experience.id} className="p-6 hover:shadow-md transition-shadow">
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   <h3 className="text-lg font-semibold text-gray-900">{experience.job_title}</h3>
//                   <div className="flex items-center text-gray-600">
//                     <Building2 className="w-4 h-4 mr-2" />
//                     <span>{experience.company_name}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <MapPin className="w-4 h-4 mr-2" />
//                     <span>{experience.city}, {experience.country}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     <span>{experience.start_date} - {experience.end_date || 'Present'}</span>
//                   </div>
//                   {experience.work_description && (
//                     <p className="text-gray-600 mt-2">{experience.work_description}</p>
//                   )}
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleDeleteExperience(experience.id)}
//                   className="text-gray-400 hover:text-red-500"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </Button>
//               </div>
//             </Card>
//           ))
//         )}
//       </div>

//       {isFormOpen && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <Card className="w-full max-w-lg p-6">
//             <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Experience</h2>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Job Title</label>
//                 <Input
//                   name="job_title"
//                   value={formData.job_title}
//                   onChange={handleChange}
//                   className={errors.job_title ? 'border-red-500' : ''}
//                   placeholder="Enter your job title"
//                 />
//                 {errors.job_title && <p className="text-sm text-red-500 mt-1">{errors.job_title}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Company Name</label>
//                 <Input
//                   name="company_name"
//                   value={formData.company_name}
//                   onChange={handleChange}
//                   className={errors.company_name ? 'border-red-500' : ''}
//                   placeholder="Enter company name"
//                 />
//                 {errors.company_name && <p className="text-sm text-red-500 mt-1">{errors.company_name}</p>}
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Country</label>
//                   <Input
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className={errors.country ? 'border-red-500' : ''}
//                     placeholder="Enter country"
//                   />
//                   {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">City</label>
//                   <Input
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     className={errors.city ? 'border-red-500' : ''}
//                     placeholder="Enter city"
//                   />
//                   {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-1">Start Date</label>
//                   <Input
//                     type="date"
//                     name="start_date"
//                     value={formData.start_date}
//                     onChange={handleChange}
//                     className={errors.start_date ? 'border-red-500' : ''}
//                   />
//                   {errors.start_date && <p className="text-sm text-red-500 mt-1">{errors.start_date}</p>}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-1">End Date</label>
//                   <Input
//                     type="date"
//                     name="end_date"
//                     value={formData.end_date}
//                     onChange={handleChange}
//                     disabled={isPresent}
//                     className={errors.end_date ? 'border-red-500' : ''}
//                   />
//                   {errors.end_date && <p className="text-sm text-red-500 mt-1">{errors.end_date}</p>}
//                 </div>
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="isPresent"
//                   checked={isPresent}
//                   onChange={handleCheckboxChange}
//                   className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
//                 />
//                 <label htmlFor="isPresent" className="ml-2 text-sm text-gray-700">
//                   I currently work here
//                 </label>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">Work Description</label>
//                 <Textarea
//                   name="work_description"
//                   value={formData.work_description}
//                   onChange={handleChange}
//                   placeholder="Describe your work and achievements"
//                   rows={4}
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end space-x-4 mt-6">
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   resetForm();
//                   setIsFormOpen(false);
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleAddExperience}
//                 className="bg-orange-500 hover:bg-orange-600"
//               >
//                 Save
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExperienceManager;
"use client";
import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle, Calendar, Building2, MapPin, Squirrel } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Loading from '../Shared/Loading';
import apiClient from '@/app/lib/apiClient';

interface Experience {
  experience_id: number;
  job_title: string;
  company_name: string;
  country: string;
  city: string;
  start_date: string;
  end_date: string | null;
  work_description: string;
}

export default function ExperienceManager() {
  const { toast } = useToast();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPresent, setIsPresent] = useState(false);
  
  const [formData, setFormData] = useState({
    job_title: '',
    company_name: '',
    country: '',
    city: '',
    start_date: '',
    end_date: '',
    work_description: ''
  });

  const [errors, setErrors] = useState({
    job_title: '',
    company_name: '',
    country: '',
    city: '',
    start_date: '',
    end_date: '',
    work_description: ''
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await apiClient.get('/api/v1/experiences/');
      if (response.status !== 200) throw new Error('Failed to fetch');
      const data = response.data;
      setExperiences(data);
      setLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch experiences"
      });
      setLoading(false);
    }
  };

  const handleAddExperience = async () => {
    if (!validateForm()) return;

    try {
      const experienceData = {
        ...formData,
        end_date: isPresent ? null : formData.end_date,
      };

      const response = await fetch('/api/v1/experiences/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(experienceData),
      });

      if (!response.ok) throw new Error('Failed to add experience');
      
      const newExperience = await response.json();
      setExperiences([...experiences, newExperience]);
      
      toast({
        title: "Success",
        description: "Experience added successfully"
      });
      resetForm();
      setIsFormOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add experience"
      });
    }
  };

  const handleDeleteExperience = async (experience_id: number) => {
    try {
      const response = await fetch(`/api/v1/experiences/${experience_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to delete');

      setExperiences(experiences.filter(exp => exp.experience_id !== experience_id));
      toast({
        title: "Success",
        description: "Experience deleted successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete experience"
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prev => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleCheckboxChange = () => {
    setIsPresent(prev => !prev);
    if (!isPresent) {
      setFormData(prev => ({
        ...prev,
        end_date: '',
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      job_title: '',
      company_name: '',
      country: '',
      city: '',
      start_date: '',
      end_date: '',
      work_description: ''
    };

    if (!formData.job_title) {
      newErrors.job_title = 'Job title is required';
      isValid = false;
    }
    if (!formData.company_name) {
      newErrors.company_name = 'Company name is required';
      isValid = false;
    }
    if (!formData.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    }
    if (!formData.city) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required';
      isValid = false;
    }
    if (!isPresent && !formData.end_date) {
      newErrors.end_date = 'End date is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const resetForm = () => {
    setFormData({
      job_title: '',
      company_name: '',
      country: '',
      city: '',
      start_date: '',
      end_date: '',
      work_description: ''
    });
    setIsPresent(false);
    setErrors({
      job_title: '',
      company_name: '',
      country: '',
      city: '',
      start_date: '',
      end_date: '',
      work_description: ''
    });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => setIsFormOpen(true)}
          variant="outline"
          className="text-orange-500 hover:text-orange-600"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <Loading />
        ) : experiences.length === 0 ? (
          <Card className="p-12 text-center border-dashed border-2">
            <Squirrel className="w-16 h-16 mx-auto mb-4 text-orange-500 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No Experience Added Yet</h3>
            <p className="text-gray-500 mb-6">Add your professional experiences to showcase your journey</p>
            <Button 
              onClick={() => setIsFormOpen(true)}
              variant="outline"
              className="mx-auto"
            >
              Add Experience
            </Button>
          </Card>
        ) : (
          experiences.map((experience) => (
            <Card key={experience.experience_id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">{experience.job_title}</h3>
                  <div className="flex items-center text-gray-600">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span>{experience.company_name}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{experience.city}, {experience.country}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{experience.start_date} - {experience.end_date || 'Present'}</span>
                  </div>
                  {experience.work_description && (
                    <p className="text-gray-600 mt-2">{experience.work_description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteExperience(experience.experience_id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Experience</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <Input
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleChange}
                  className={errors.job_title ? 'border-red-500' : ''}
                  placeholder="Enter your job title"
                />
                {errors.job_title && <p className="text-sm text-red-500 mt-1">{errors.job_title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <Input
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className={errors.company_name ? 'border-red-500' : ''}
                  placeholder="Enter company name"
                />
                {errors.company_name && <p className="text-sm text-red-500 mt-1">{errors.company_name}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={errors.country ? 'border-red-500' : ''}
                    placeholder="Enter country"
                  />
                  {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={errors.city ? 'border-red-500' : ''}
                    placeholder="Enter city"
                  />
                  {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <Input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className={errors.start_date ? 'border-red-500' : ''}
                  />
                  {errors.start_date && <p className="text-sm text-red-500 mt-1">{errors.start_date}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <Input
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    disabled={isPresent}
                    className={errors.end_date ? 'border-red-500' : ''}
                  />
                  {errors.end_date && <p className="text-sm text-red-500 mt-1">{errors.end_date}</p>}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPresent"
                  checked={isPresent}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isPresent" className="ml-2 text-sm text-gray-700">
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Work Description</label>
                <Textarea
                  name="work_description"
                  value={formData.work_description}
                  onChange={handleChange}
                  placeholder="Describe your work and achievements"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsFormOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddExperience}
                className="bg-orange-500 hover:bg-orange-600"
              >
                Save
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}