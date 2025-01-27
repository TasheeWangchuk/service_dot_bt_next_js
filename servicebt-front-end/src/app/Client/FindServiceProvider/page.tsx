// import React, { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { Search, MapPin, Briefcase, Star, ChevronLeft, ChevronRight, Clock, Upload } from 'lucide-react';
// import freelancerService from '../services/freelancerService';

// const FreelancerSearch = () => {
//   const { data: session } = useSession();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [freelancers, setFreelancers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [filters, setFilters] = useState({
//     category: '',
//     location: '',
//     minRate: '',
//     maxRate: '',
//     skills: '',
//     page: 1,
//     limit: 10
//   });

//   // File upload handler
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setLoading(true);
//       const response = await axios.post('/api/freelancers/upload-profile-picture', formData, {
//         onUploadProgress: (progressEvent) => {
//           const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(progress);
//         }
//       });

//       // Update profile picture URL
//       await freelancerService.updateFreelancer(session.user.id, {
//         profilePicture: response.data.url
//       });

//       setUploadProgress(0);
//     } catch (error) {
//       setError('Failed to upload profile picture');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Advanced search with debounce and filters
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchTerm || Object.values(filters).some(Boolean)) {
//         fetchFreelancers();
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchTerm, filters]);

//   // Rest of the component remains the same...
// };

// export default FreelancerSearch;
"use client";
import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Star, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import ProtectedRoute from "../../routes/ProtectedRoute";


const FreelancerSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const categories = [
    "Web Development",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Video Editing",
    "Mobile Development"
  ];

  const locations = [
    "Remote",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany"
  ];

  const sampleFreelancers = [
    {
      id: 1,
      name: "Sarah Miller",
      headline: "Full-Stack Developer & UI/UX Enthusiast",
      profilePicture: "/api/placeholder/150/150",
      bio: "Passionate full-stack developer with 6+ years of experience crafting scalable web applications. Specialized in React ecosystem and modern JavaScript. I believe in writing clean, maintainable code and creating intuitive user experiences.",
      rating: 4.9,
      hourlyRate: "$65",
      location: "United States",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      completedProjects: 127,
      totalHours: 2400,
      responseRate: "98%"
    },
    {
      id: 2,
      name: "David Chen",
      headline: "Senior UI/UX Designer & Webflow Expert",
      profilePicture: "/api/placeholder/150/150",
      bio: "Award-winning designer with a knack for creating beautiful, functional interfaces. I combine aesthetic excellence with user-centered design principles to deliver exceptional digital experiences that drive results.",
      rating: 4.8,
      hourlyRate: "$55",
      location: "Canada",
      skills: ["Figma", "Adobe XD", "Webflow", "UI Design", "Prototyping"],
      completedProjects: 89,
      totalHours: 1800,
      responseRate: "95%"
    }
  ];

  return (
    // <ProtectedRoute allowedRoles={["Client"]}>
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find Freelancers</h1>
        
        {/* Search Section */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by skill, title or keyword"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters and Results */}
        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-64 space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h2 className="font-semibold mb-4">Filter by:</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select location</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Hourly Rate</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-1/2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-1/2 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 space-y-6">
            {sampleFreelancers.map(freelancer => (
              <div key={freelancer.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  {/* Profile Picture */}
                  <div className="flex-shrink-0">
                    <img
                      src={freelancer.profilePicture}
                      alt={`${freelancer.name}'s profile`}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-semibold">{freelancer.name}</h3>
                        <p className="text-gray-600 font-medium">{freelancer.headline}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-orange-600">{freelancer.hourlyRate}</p>
                        <p className="text-sm text-gray-500">per hour</p>
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {freelancer.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {freelancer.completedProjects} projects
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {freelancer.totalHours}+ hours
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400" size={16} fill="currentColor" />
                        {freelancer.rating} ({freelancer.responseRate} response rate)
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-gray-600 mb-4 line-clamp-2">{freelancer.bio}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills.map(skill => (
                        <span 
                          key={skill} 
                          className="px-3 py-1 bg-blue-50 text-orange-600 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-1">
                {[1, 2, 3].map(page => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded-full ${
                      page === 1 ? 'bg-orange-600 text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    //{/* </ProtectedRoute> */}
  );
};

export default FreelancerSearch;