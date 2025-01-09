// "use client";
// import React, { useState } from "react";

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

//   const categories = {
//     'Web Development': [
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
//     const { name, type, value, checked, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : files ? files[0] : value,
//     }));
//   };
// //Time pref
//   const [preferredTime, setPreferredTime] = useState("");
//   const [customTime, setCustomTime] = useState("");

//   const [requiresLocation, setRequiresLocation] = useState(false);
//   const [locationPreference, setLocationPreference] = useState("");
//   const [customLocation, setCustomLocation] = useState("");

//   //Location pref
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Form submitted successfully!");

//   };

//   return (
//     <div className="sticky min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
//           Post a Job
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-xl">
      //     {/* Job Title */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Job Title</label>
      //       <input
      //         type="text"
      //         name="jobTitle"
      //         value={formData.jobTitle}
      //         onChange={handleChange}
      //         placeholder="Enter job title"
      //         className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
      //         required
      //       />
      //     </div>

      //     {/* Job Description */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Description</label>
      //       <textarea
      //         name="description"
      //         value={formData.description}
      //         onChange={handleChange}
      //         placeholder="Describe the job requirements"
      //         rows={4}
      //         className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
      //         required
      //       />
      //     </div>

      //     {/* Category */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Category</label>
      //       <select
      //         name="category"
      //         value={formData.category}
      //         onChange={handleChange}
      //         className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
      //         required
      //       >
      //         <option value="">Select a category</option>
      //         {Object.keys(categories).map((cat) => (
      //           <option key={cat} value={cat}>
      //             {cat}
      //           </option>
      //         ))}
      //       </select>
      //     </div>

      //     {/* Subcategory */}
      //     {formData.category && (
      //       <div>
      //         <label className="block text-gray-700 font-medium mb-1">Subcategory</label>
      //         <select
      //           name="subcategory"
      //           value={formData.subcategory}
      //           onChange={handleChange}
      //           className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
      //           required
      //         >
      //           <option value="">Select a subcategory</option>
      //           {categories[formData.category]?.map((subcat) => (
      //             <option key={subcat} value={subcat}>
      //               {subcat}
      //             </option>
      //           ))}
      //         </select>
      //       </div>
      //     )}
      //     <div className="mb-6">
      //     <label htmlFor="requires-location" className="block text-sm font-medium text-gray-700">
      //       Requires Location Preference?
      //     </label>
      //     <div className="flex items-center space-x-4 mt-2">
      //       <button
      //         type="button"
      //         className={`px-4 py-2 rounded-md border ${
      //           requiresLocation ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"
      //         }`}
      //         onClick={() => setRequiresLocation(true)}
      //       >
      //         Yes
      //       </button>
      //       <button
      //         type="button"
      //         className={`px-4 py-2 rounded-md border ${
      //           !requiresLocation ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"
      //         }`}
      //         onClick={() => setRequiresLocation(false)}
      //       >
      //         No
      //       </button>
      //     </div>
      //   </div>

      //   {/* Location Preference - displayed only if location is required */}
      //   {requiresLocation && (
      //     <div className="mb-6">
      //       <label htmlFor="location-preference" className="block text-sm font-medium text-gray-700">
      //         Location Preference
      //       </label>
      //       <fieldset className="mt-2">
      //         <legend className="sr-only">Location Preference</legend>
      //         <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
      //           <div className="flex items-center">
      //             <input
      //               id="remote"
      //               name="location-preference"
      //               type="radio"
      //               value="remote"
      //               className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
      //               checked={locationPreference === "remote"}
      //               onChange={() => setLocationPreference("remote")}
      //             />
      //             <label htmlFor="remote" className="ml-3 block text-sm font-medium text-gray-700">
      //               Remote
      //             </label>
      //           </div>
      //           <div className="flex items-center">
      //             <input
      //               id="onsite"
      //               name="location-preference"
      //               type="radio"
      //               value="onsite"
      //               className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
      //               checked={locationPreference === "onsite"}
      //               onChange={() => setLocationPreference("onsite")}
      //             />
      //             <label htmlFor="onsite" className="ml-3 block text-sm font-medium text-gray-700">
      //               On-Site
      //             </label>
      //           </div>
      //           <div className="flex items-center">
      //             <input
      //               id="hybrid"
      //               name="location-preference"
      //               type="radio"
      //               value="hybrid"
      //               className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
      //               checked={locationPreference === "hybrid"}
      //               onChange={() => setLocationPreference("hybrid")}
      //             />
      //             <label htmlFor="hybrid" className="ml-3 block text-sm font-medium text-gray-700">
      //               Hybrid
      //             </label>
      //           </div>
      //           <div className="flex items-center">
      //             <input
      //               id="other-location"
      //               name="location-preference"
      //               type="radio"
      //               value="other"
      //               className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
      //               checked={locationPreference === "other"}
      //               onChange={() => setLocationPreference("other")}
      //             />
      //             <label htmlFor="other-location" className="ml-3 block text-sm font-medium text-gray-700">
      //               Other
      //             </label>
      //           </div>
      //         </div>
      //       </fieldset>

      //       {/* Custom Location input for "Other" option */}
      //       {locationPreference === "other" && (
      //         <input
      //           type="text"
      //           name="custom-location"
      //           placeholder="Specify custom location"
      //           className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      //           value={customLocation}
      //           onChange={(e) => setCustomLocation(e.target.value)}
      //         />
      //       )}
      //     </div>
      //   )}
        
      //     {/* Skills */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Required Skills</label>
      //       <input
      //         type="text"
      //         name="skills"
      //         value={formData.skills}
      //         onChange={handleChange}
      //         placeholder="Enter skills separated by commas"
      //         className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
      //       />
      //     </div>

      //     {/* Experience Level */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Experience Level</label>
      //       <select
      //         name="experienceLevel"
      //         value={formData.experienceLevel}
      //         onChange={handleChange}
      //         className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
      //       >
      //         <option value="Beginner">Beginner</option>
      //         <option value="Intermediate">Intermediate</option>
      //         <option value="Expert">Expert</option>
      //       </select>
      //     </div>

      //     {/* Deliverables */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Deliverables or Goals</label>
      //       <input
      //         type="text"
      //         name="deliverables"
      //         value={formData.deliverables}
      //         onChange={handleChange}
      //         placeholder="Specify expected deliverables or your goal to achieve"
      //         className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
      //       />
      //     </div>
      //     {/* Preferred Time */}
      // <div className="mb-6">
      //   <label htmlFor="preferred-time" className="block text-sm font-medium text-gray-700">
      //     Preferred Time
      //   </label>
      //   <select
      //     id="preferred-time"
      //     name="preferred-time"
      //     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      //     value={preferredTime}
      //     onChange={(e) => setPreferredTime(e.target.value)}
      //   >
      //     <option value="">Select Preferred Time</option>
      //     <option value="morning">Morning</option>
      //     <option value="afternoon">Afternoon</option>
      //     <option value="evening">Evening</option>
      //     <option value="night">Night</option>
      //     <option value="flexible">Flexible</option>
      //     <option value="other">Other</option>
      //   </select>
      //   {preferredTime === "other" && (
      //     <input
      //       type="text"
      //       name="custom-time"
      //       placeholder="Specify custom time"
      //       className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      //       value={customTime}
      //       onChange={(e) => setCustomTime(e.target.value)}
      //     />
      //   )}
      // </div>      
      //     {/* Budget */}
      //     <div className="grid grid-cols-2 gap-4">
      //       <div>
      //         <label className="block text-gray-700 font-medium mb-1">Minimum Budget</label>
      //         <input
      //           type="number"
      //           name="budgetMin"
      //           value={formData.budgetMin}
      //           onChange={handleChange}
      //           placeholder="Min budget"
      //           className="w-full border rounded-md px-3 py-2"
      //         />
      //       </div>
      //       <div>
      //         <label className="block text-gray-700 font-medium mb-1">Maximum Budget</label>
      //         <input
      //           type="number"
      //           name="budgetMax"
      //           value={formData.budgetMax}
      //           onChange={handleChange}
      //           placeholder="Max budget"
      //           className="w-full border rounded-md px-3 py-2"
      //         />
      //       </div>
      //     </div>

      //     {/* Payment Type */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Payment Type</label>
      //       <select
      //         name="paymentType"
      //         value={formData.paymentType}
      //         onChange={handleChange}
      //         className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
      //       >
      //         <option value="Fixed">Fixed</option>
      //         <option value="Hourly">Hourly</option>
      //       </select>
      //     </div>

      //     {/* Deadline */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Deadline</label>
      //       <input
      //         type="date"
      //         name="deadline"
      //         value={formData.deadline}
      //         onChange={handleChange}
      //         className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
      //       />
      //     </div>

      //     {/* Contact Details */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Contact Details</label>
      //       <input
      //         type="text"
      //         name="contactDetails"
      //         value={formData.contactDetails}
      //         onChange={handleChange}
      //         placeholder="Enter email or phone"
      //         className="w-full border rounded-md px-3 py-2"
      //         required
      //       />
      //     </div>

      //     {/* Attachments */}
      //     <div>
      //       <label className="block text-gray-700 font-medium mb-1">Attachments (Optional)</label>
      //       <input
      //         type="file"
      //         name="attachment"
      //         onChange={handleChange}
      //         className="w-full border rounded-md px-3 py-2"
      //       />
      //     </div>
          

      //     {/* Terms and NDA */}
      //     <div className="space-y-2">
      //       <div className="flex items-center">
      //         <input
      //           type="checkbox"
      //           name="agreeToTerms"
      //           checked={formData.agreeToTerms}
      //           onChange={handleChange}
      //           className="mr-2"
      //           required
      //         />
      //         <label className="text-gray-700 text-sm">
      //           I agree to the terms and conditions.
      //         </label>
      //       </div>
      //       <div className="flex items-center">
      //         <input
      //           type="checkbox"
      //           name="ndaRequired"
      //           checked={formData.ndaRequired}
      //           onChange={handleChange}
      //           className="mr-2"
      //         />
      //         <label className="text-gray-700 text-sm">
      //           This project requires a non-disclosure agreement (NDA).
      //         </label>
      //       </div>
      //     </div>

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

import React, { useState } from "react";
import axios from "axios";

export default function Post() {
  const [formData, setFormData] = useState<{
    jobTitle: string;
    description: string;
    category: string;
    subcategory: string;
    skills: string;
    experienceLevel: string;
    deliverables: string;
    budgetMin: string;
    budgetMax: string;
    paymentType: string;
    deadline: string;
    startDate: string;
    contactMethod: string;
    contactDetails: string;
    attachment: File | null;
    agreeToTerms: boolean;
    ndaRequired: boolean;
  }>({
    jobTitle: "",
    description: "",
    category: "",
    subcategory: "",
    skills: "",
    experienceLevel: "",
    deliverables: "",
    budgetMin: "",
    budgetMax: "",
    paymentType: "Fixed",
    deadline: "",
    startDate: "",
    contactMethod: "Email",
    contactDetails: "",
    attachment: null,
    agreeToTerms: false,
    ndaRequired: false,
  });

  const categories: { [key: string]: string[] } = {
    'Software Development': [
    'Front-end Development',
    'Back-end Development',
    'Full-stack Development',
    'E-commerce Development',
    'WordPress Development',
    'Mobile App Development',
    'Game Development',
  ],
  Design: [
    'Graphic Design',
    'UX/UI Design',
    'Web Design',
    'Product Design',
    'Branding',
    'Logo Design',
    'Animation and Motion Graphics',
    'Print Design',
  ],
  'Writing & Content': [
    'Copywriting',
    'Content Writing',
    'Technical Writing',
    'SEO Writing',
    'Blogging',
    'Ghostwriting',
    'Editing and Proofreading',
    'Transcription',
  ],
  'Digital Marketing': [
    'Social Media Marketing',
    'SEO (Search Engine Optimization)',
    'SEM (Search Engine Marketing)',
    'Email Marketing',
    'Affiliate Marketing',
    'Influencer Marketing',
    'Content Marketing',
    'Marketing Strategy',
  ],
  'Customer Service & Support': [
    'Virtual Assistance',
    'Customer Support',
    'Data Entry',
    'Online Research',
    'Chat Support',
    'Email Handling',
  ],
  'Video & Animation': [
    'Video Editing',
    'Video Production',
    'Animation (2D/3D)',
    'Motion Graphics',
    'Explainer Videos',
    'Voiceovers',
    'VFX (Visual Effects)',
  ],
  'Business & Finance': [
    'Accounting & Bookkeeping',
    'Financial Planning',
    'Business Consulting',
    'Market Research',
    'Project Management',
    'HR & Recruitment',
    'Legal Consulting',
  ],
  'IT & Networking': [
    'Network Administration',
    'Cloud Computing',
    'Cybersecurity',
    'Database Administration',
    'Software Development',
    'DevOps',
    'IT Support',
  ],
  'Translation & Language Services': [
    'Translation',
    'Transcription',
    'Proofreading',
    'Language Tutoring',
    'Subtitling',
  ],
  'Photography & Videography': [
    'Product Photography',
    'Event Photography',
    'Wedding Photography',
    'Stock Photography',
    'Videography',
    'Aerial Photography',
  ],
  'Voice & Audio': [
    'Voice Acting',
    'Podcast Editing',
    'Audio Editing',
    'Sound Design',
    'Music Composition',
  ],
  'Engineering & Architecture': [
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Architectural Design',
    'CAD Drafting',
    '3D Modeling',
  ],
  'Health & Wellness': [
    'Fitness Coaching',
    'Nutrition Consulting',
    'Mental Health Counseling',
    'Yoga Instruction',
    'Life Coaching',
  ],
  'Education & Tutoring': [
    'Online Tutoring',
    'Language Teaching',
    'Test Prep',
    'Career Coaching',
    'Educational Content Creation',
  ],
  'Home Services': [
    'Plumbing',
    'Electrical Services',
    'Carpentry',
    'Painting & Decorating',
    'HVAC (Heating, Ventilation, and Air Conditioning)',
    'Roofing',
    'Home Cleaning',
    'Appliance Repair',
  ],
  'Childcare & Elder Care': [
    'Babysitting',
    'Nanny Services',
    'Senior Care (Elderly Care)',
    'Personal Care Aide',
    'Childcare Tutoring',
    'Pet Sitting',
    'Special Needs Care',
  ],
  'Health & Wellness (Non-Clinical)': [
    'Personal Training',
    'Fitness Coaching',
    'Yoga Instruction',
    'Massage Therapy',
    'Meditation Coaching',
    'Health Coaching',
  ],
  'Event & Party Services': [
    'Event Planning',
    'Party Entertainment (Clowns, Magicians, etc.)',
    'Catering',
    'Bartending',
    'Wedding Planning',
    'DJ/Live Music Performance',
  ],
  'Manual Labor & Handyman Services': [
    'Moving & Delivery',
    'Furniture Assembly',
    'Yard Work/Landscaping',
    'Snow Removal',
    'Cleaning (Post-Construction, etc.)',
    'Heavy Lifting/Hauling',
  ],
  'Transportation & Travel Services': [
    'Taxi/Ride-Sharing Driver',
    'Delivery Driver (Food, Packages, etc.)',
    'Chauffeur',
    'Tour Guide',
    'Travel Planning/Consulting',
  ],
  'Miscellaneous Local Services': [
    'Personal Shopping',
    'Home Organization',
    'Pet Grooming',
    'Sewing/Tailoring',
    'Photography (Family, Event, etc.)',
  ],
  'Other': ['Other'],

  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          if (typeof value === 'boolean') {
            data.append(key, value.toString());
          } else {
            data.append(key, value);
          }
        }
      });

      const response = await axios.post('/api/jobs', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Job posted successfully!');
      setFormData({
        jobTitle: "",
        description: "",
        category: "",
        subcategory: "",
        skills: "",
        experienceLevel: "",
        deliverables: "",
        budgetMin: "",
        budgetMax: "",
        paymentType: "Fixed",
        deadline: "",
        startDate: "",
        contactMethod: "Email",
        contactDetails: "",
        attachment: null,
        agreeToTerms: false,
        ndaRequired: false,
      });
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job. Please try again.');
    }
  };

  //Time pref
  const [preferredTime, setPreferredTime] = useState("");
  const [customTime, setCustomTime] = useState("");

  const [requiresLocation, setRequiresLocation] = useState(false);
  const [locationPreference, setLocationPreference] = useState("");
  const [customLocation, setCustomLocation] = useState("");


  return (
    <div className="sticky min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-6 text-center">
          Post a Job
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-xl">
        {/* Job Title */}
        <div>
            <label className="block text-gray-700 font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Enter job title"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the job requirements"
              rows={4}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
              required
            >
              <option value="">Select a category</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory */}
          {formData.category && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Subcategory</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
                required
              >
                <option value="">Select a subcategory</option>
                {categories[formData.category]?.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="mb-6">
          <label htmlFor="requires-location" className="block text-sm font-medium text-gray-700">
            Requires Location Preference?
          </label>
          <div className="flex items-center space-x-4 mt-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-md border ${
                requiresLocation ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setRequiresLocation(true)}
            >
              Yes
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md border ${
                !requiresLocation ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setRequiresLocation(false)}
            >
              No
            </button>
          </div>
        </div>

        {/* Location Preference - displayed only if location is required */}
        {requiresLocation && (
          <div className="mb-6">
            <label htmlFor="location-preference" className="block text-sm font-medium text-gray-700">
              Location Preference
            </label>
            <fieldset className="mt-2">
              <legend className="sr-only">Location Preference</legend>
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    id="remote"
                    name="location-preference"
                    type="radio"
                    value="remote"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={locationPreference === "remote"}
                    onChange={() => setLocationPreference("remote")}
                  />
                  <label htmlFor="remote" className="ml-3 block text-sm font-medium text-gray-700">
                    Remote
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="onsite"
                    name="location-preference"
                    type="radio"
                    value="onsite"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={locationPreference === "onsite"}
                    onChange={() => setLocationPreference("onsite")}
                  />
                  <label htmlFor="onsite" className="ml-3 block text-sm font-medium text-gray-700">
                    On-Site
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="hybrid"
                    name="location-preference"
                    type="radio"
                    value="hybrid"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={locationPreference === "hybrid"}
                    onChange={() => setLocationPreference("hybrid")}
                  />
                  <label htmlFor="hybrid" className="ml-3 block text-sm font-medium text-gray-700">
                    Hybrid
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="other-location"
                    name="location-preference"
                    type="radio"
                    value="other"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    checked={locationPreference === "other"}
                    onChange={() => setLocationPreference("other")}
                  />
                  <label htmlFor="other-location" className="ml-3 block text-sm font-medium text-gray-700">
                    Other
                  </label>
                </div>
              </div>
            </fieldset>

            {/* Custom Location input for "Other" option */}
            {locationPreference === "other" && (
              <input
                type="text"
                name="custom-location"
                placeholder="Specify custom location"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
              />
            )}
          </div>
        )}
        
          {/* Skills */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Required Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter skills separated by commas"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Experience Level</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Deliverables */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Deliverables or Goals</label>
            <input
              type="text"
              name="deliverables"
              value={formData.deliverables}
              onChange={handleChange}
              placeholder="Specify expected deliverables or your goal to achieve"
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
            />
          </div>
          {/* Preferred Time */}
      <div className="mb-6">
        <label htmlFor="preferred-time" className="block text-sm font-medium text-gray-700">
          Preferred Time
        </label>
        <select
          id="preferred-time"
          name="preferred-time"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
        >
          <option value="">Select Preferred Time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
          <option value="flexible">Flexible</option>
          <option value="other">Other</option>
        </select>
        {preferredTime === "other" && (
          <input
            type="text"
            name="custom-time"
            placeholder="Specify custom time"
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
          />
        )}
      </div>      
          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Minimum Budget</label>
              <input
                type="number"
                name="budgetMin"
                value={formData.budgetMin}
                onChange={handleChange}
                placeholder="Min budget"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Maximum Budget</label>
              <input
                type="number"
                name="budgetMax"
                value={formData.budgetMax}
                onChange={handleChange}
                placeholder="Max budget"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Payment Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Payment Type</label>
            <select
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
            >
              <option value="Fixed">Fixed</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-orange-200"
            />
          </div>

          {/* Contact Details */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact Details</label>
            <input
              type="text"
              name="contactDetails"
              value={formData.contactDetails}
              onChange={handleChange}
              placeholder="Enter email or phone"
              className="w-full border rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Attachments (Optional)</label>
            <input
              type="file"
              name="attachment"
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          

          {/* Terms and NDA */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mr-2"
                required
              />
              <label className="text-gray-700 text-sm">
                I agree to the terms and conditions.
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="ndaRequired"
                checked={formData.ndaRequired}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-700 text-sm">
                This project requires a non-disclosure agreement (NDA).
              </label>
            </div>
          </div>


          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-transform transform hover:scale-105"
            >
              Submit Job Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
