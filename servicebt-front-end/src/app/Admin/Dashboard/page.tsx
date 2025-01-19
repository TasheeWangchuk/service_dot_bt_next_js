"use client";
import React, { useState } from 'react';
import { 
  Users, Database, Home, Briefcase, 
  Star, Tags, Grid, AlertCircle 
} from 'lucide-react';
import { 
  BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';

// Sidebar Navigation
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => (
    <div className="fixed left-0 top-0 h-full w-64 bg-orange-500 text-white p-4">
    <div className="text-xl font-bold mb-8 p-2">Admin Panel</div>
    <nav className="space-y-2">
      <button 
        onClick={() => setActiveTab('dashboard')}
        className={`flex items-center w-full p-3 rounded ${activeTab === 'dashboard' ? 'bg-orange-600' : 'hover:bg-orange-700'}`}
      >
        <Home className="mr-2 text-white" size={20} />
        Dashboard
      </button>
      <button 
        onClick={() => setActiveTab('jobs')}
        className={`flex items-center w-full p-3 rounded ${activeTab === 'jobs' ? 'bg-orange-600' : 'hover:bg-orange-700'}`}
      >
        <Briefcase className="mr-2 text-white" size={20} />
        Job Posts
      </button>
      <button 
        onClick={() => setActiveTab('users')}
        className={`text-white flex items-center w-full p-3 rounded ${activeTab === 'users' ? 'bg-orange-600' : 'hover:bg-orange-700'}`}
      >
        <Users className="mr-2 text-white" size={20} />
        Users
      </button>
      <button 
        onClick={() => setActiveTab('skills')}
        className={`text-white flex items-center w-full p-3 rounded ${activeTab === 'skills' ? 'bg-orange-600' : 'hover:bg--700 hover:bg-orange-700'}`}
      >
        <Tags className="mr-2 text-white" size={20} />
        Skills
      </button>
      <button 
        onClick={() => setActiveTab('categories')}
        className={`text-white flex items-center w-full p-3 rounded ${activeTab === 'categories' ? 'bg-orange-600' : 'hover:bg-orange-700'}`}
      >
        <Grid className="mr-2 text-white" size={20} />
        Categories
      </button>
      <button 
        onClick={() => setActiveTab('reviews')}
        className={`text-white flex items-center w-full p-3 rounded ${activeTab === 'reviews' ? 'bg-orange-600' : 'hover:bg-orangey-700'}`}
      >
        <Star className="mr-2 text-white" size={20} />
        Reviews
      </button>
      <button 
        onClick={() => setActiveTab('reports')}
        className={`text-white flex items-center w-full p-3 rounded ${activeTab === 'reports' ? 'bg-orange-600' : 'hover:bg-orange-700'}`}
      >
        <AlertCircle className="mr-2 text-white" size={20} />
        Reports
      </button>
    </nav>
  </div>
);

// Skills Management Component
const SkillsManager = () => {
  const [skills, setSkills] = useState([
    { skill_id: 1, name: 'React' },
    { skill_id: 2, name: 'Python' },
  ]);
  const [newSkill, setNewSkill] = useState('');

  interface Skill {
    skill_id: number;
    name: string;
  }

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setSkills([...skills, { skill_id: skills.length + 1, name: newSkill }]);
      setNewSkill('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-black">Skills Management</h2>
      
      <form onSubmit={handleAddSkill} className="mb-6 text-black">
        <div className="flex gap-4">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 p-2 border rounded"
            placeholder="Enter new skill"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Add Skill
          </button>
        </div>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.skill_id} className="flex items-center justify-between p-3 border rounded text-black">
            {skill.name}
            <button className="text-red-500 hover:text-red-700">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Job Posts Management Component
const JobPostsManager = () => {
  const [jobs, setJobs] = useState([
    { 
      job_id: 1, 
      title: 'Web Developer Needed', 
      status: 'Pending',
      client_id: 1,
      budget: 1000,
      created_at: '2024-01-09'
    },
  ]);

  interface Job {
    job_id: number;
    title: string;
    status: string;
    client_id: number;
    budget: number;
    created_at: string;
  }

  const handleApprove = (jobId: number) => {
    setJobs(jobs.map((job: Job) => 
      job.job_id === jobId ? {...job, status: 'Open'} : job
    ));
  };

  interface Job {
    job_id: number;
    title: string;
    status: string;
    client_id: number;
    budget: number;
    created_at: string;
  }

  const handleReject = (jobId: number) => {
    setJobs(jobs.map((job: Job) => 
      job.job_id === jobId ? {...job, status: 'Closed'} : job
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-black">Job Posts Management</h2>
      
      <table className="w-full">
        <thead>
          <tr className="border-b text-black">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Budget</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Created</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.job_id} className="border-b text-black">
              <td className="p-3">{job.title}</td>
              <td className="p-3">${job.budget}</td>
              <td className="p-3">{job.status}</td>
              <td className="p-3">{job.created_at}</td>
              <td className="p-3 space-x-2">
                {job.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(job.job_id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(job.job_id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// User Management Component
const UserManager = () => {
  const [users, setUsers] = useState([
    { 
      user_id: 1, 
      username: 'john_doe',
      email: 'john@example.com',
      role: 'Freelancer',
      is_banned: false
    },
  ]);

  interface User {
    user_id: number;
    username: string;
    email: string;
    role: string;
    is_banned: boolean;
  }

  const handleToggleBan = (userId: number) => {
    setUsers(users.map((user: User) => 
      user.user_id === userId ? {...user, is_banned: !user.is_banned} : user
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-black">User Management</h2>
      
      <table className="w-full">
        <thead>
          <tr className="border-b text-black">
            <th className="text-left p-3">Username</th>
            <th className="text-left p-3">Email</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="border-b text-black">
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.is_banned ? 'Banned' : 'Active'}</td>
              <td className="p-3">
                <button
                  onClick={() => handleToggleBan(user.user_id)}
                  className={`${
                    user.is_banned ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                  } text-white px-3 py-1 rounded`}
                >
                  {user.is_banned ? 'Unban' : 'Ban'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Reviews Management Component
const ReviewsManager = () => {
  const [reviews, setReviews] = useState([
    { 
      review_id: 1,
      contract_id: 1,
      rating: 4.5,
      comment: 'Great work!',
      created_at: '2024-01-09'
    },
  ]);

  interface Review {
    review_id: number;
    contract_id: number;
    rating: number;
    comment: string;
    created_at: string;
  }

  const handleRemoveReview = (reviewId: number) => {
    setReviews(reviews.filter((review: Review) => review.review_id !== reviewId));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-black">Reviews Management</h2>
      
      <table className="w-full">
        <thead>
          <tr className="border-b text-black">
            <th className="text-left p-3">Contract ID</th>
            <th className="text-left p-3">Rating</th>
            <th className="text-left p-3">Comment</th>
            <th className="text-left p-3">Created</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.review_id} className="border-b text-black">
              <td className="p-3">{review.contract_id}</td>
              <td className="p-3">{review.rating}</td>
              <td className="p-3">{review.comment}</td>
              <td className="p-3">{review.created_at}</td>
              <td className="p-3">
                <button
                  onClick={() => handleRemoveReview(review.review_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main Admin Component
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats] = useState({
    totalUsers: 1250,
    activeJobs: 856,
    totalSkills: 342,
    pendingReviews: 25
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="ml-64 flex-1 p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-700">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-800">Total Users</h3>
                <p className="text-3xl font-bold text-gray-700">{stats.totalUsers}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-800">Active Jobs</h3>
                <p className="text-3xl font-bold text-gray-700">{stats.activeJobs}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-800">Total Skills</h3>
                <p className="text-3xl font-bold text-gray-700">{stats.totalSkills}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-800">Pending Reviews</h3>
                <p className="text-3xl font-bold ">{stats.pendingReviews}</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'skills' && <SkillsManager />}
        {activeTab === 'jobs' && <JobPostsManager />}
        {activeTab === 'users' && <UserManager />}
        {activeTab === 'reviews' && <ReviewsManager />}
      </div>
    </div>
  );
};

export default AdminPage;
// "use client";
// import React, { useState } from 'react';
// import Sidebar from '@/app/components/Admin/SideBar';
// import Dashboard from '@/app/components/Admin/Dashboard';
// import SkillsManager from '@/app/components/Admin/SkillsManager';
// import JobPostsManager from '@/app/components/Admin/JobPostsManager';
// import UserManager from '@/app/components/Admin/UserManager';
// import ReviewsManager from '@/app/components/Admin/ReviewsManager'; // Assume these are split into separate files
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer
// } from 'recharts';

// const AdminPage = () => {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [stats] = useState({
//     totalUsers: 1250,
//     activeJobs: 856,
//     totalSkills: 342,
//     pendingReviews: 25
//   });

//   // Sample Data for Charts
//   const barData = [
//     { name: 'Web Development', jobs: 300 },
//     { name: 'Data Science', jobs: 200 },
//     { name: 'UI/UX Design', jobs: 150 },
//   ];

//   const pieData = [
//     { name: '5 Stars', value: 400 },
//     { name: '4 Stars', value: 300 },
//     { name: '3 Stars', value: 200 },
//     { name: '2 Stars', value: 100 },
//   ];

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

//       <div className="ml-64 flex-1 p-8">
//         {activeTab === 'dashboard' && (
//           <div className="space-y-6">
//             <h1 className="text-3xl font-bold text-gray-700">Dashboard Overview</h1>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-lg font-medium text-gray-800">Total Users</h3>
//                 <p className="text-3xl font-bold text-gray-700">{stats.totalUsers}</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-lg font-medium text-gray-800">Active Jobs</h3>
//                 <p className="text-3xl font-bold text-gray-700">{stats.activeJobs}</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-lg font-medium text-gray-800">Total Skills</h3>
//                 <p className="text-3xl font-bold text-gray-700">{stats.totalSkills}</p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-lg font-medium text-gray-800">Pending Reviews</h3>
//                 <p className="text-3xl font-bold">{stats.pendingReviews}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">Jobs by Category</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="jobs" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="bg-white p-6 rounded-lg shadow">
//                 <h3 className="text-lg font-medium text-gray-800 mb-4">Reviews Distribution</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={100}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'skills' && <SkillsManager />}
//         {activeTab === 'jobs' && <JobPostsManager />}
//         {activeTab === 'users' && <UserManager />}
//         {activeTab === 'reviews' && <ReviewsManager />}
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
