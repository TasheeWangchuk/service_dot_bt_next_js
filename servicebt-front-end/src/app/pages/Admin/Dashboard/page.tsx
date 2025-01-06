// "use client";

// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AdminPage = () => {
//   // Dummy Data
//   const [jobPosts, setJobPosts] = useState([
//     { id: 1, title: "Web Design", status: "Pending", bids: 5 },
//     { id: 2, title: "Graphic Design", status: "Approved", bids: 8 },
//     { id: 3, title: "SEO Services", status: "Completed", bids: 10 },
//   ]);

//   const [users, setUsers] = useState([
//     { id: 1, name: "Tashi", role: "Client", status: "Banned" },
//     { id: 2, name: "Sonam", role: "Service Provider", status: "Active" },
//     { id: 3, name: "Dawa", role: "Client", status: "Active" },
//   ]);

//   const stats = {
//     totalPosts: 50,
//     approvedPosts: 100,
//     pendingPosts: 5,
//     completedJobs: 20,
//     totalBids: 100,
//   };

//   // Handlers
//   const handleApproveJob = (id) => {
//     setJobPosts((prev) =>
//       prev.map((job) =>
//         job.id === id ? { ...job, status: "Approved" } : job
//       )
//     );
//   };

//   const handleBanUser = (id) => {
//     setUsers((prev) =>
//       prev.map((user) => (user.id === id ? { ...user, status: "Banned" } : user))
//     );
//   };

//   const handleUnbanUser = (id) => {
//     setUsers((prev) =>
//       prev.map((user) =>
//         user.id === id ? { ...user, status: "Active" } : user
//       )
//     );
//   };

//   // Chart Data
//   const chartData = {
//     responsive: false,
//     labels: ["Approved", "Pending", "Completed"],
//     datasets: [
//       {
//         label: "Job Stats",
//         data: [stats.approvedPosts, stats.pendingPosts, stats.completedJobs],
//         backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true, // Set to true for automatic resizing
//     maintainAspectRatio: false, // Allow custom height
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Job Post Statistics",
//       },
//     },
//   };
  

//   return (
//     <div className="sticky p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-white p-4 shadow rounded-lg">
//           <h2 className="text-lg font-semibold">Total Job Posts</h2>
//           <p className="text-2xl font-bold text-blue-600">{stats.totalPosts}</p>
//         </div>
//         <div className="bg-white p-4 shadow rounded-lg">
//           <h2 className="text-lg font-semibold">Total Bids</h2>
//           <p className="text-2xl font-bold text-green-600">{stats.totalBids}</p>
//         </div>
//         <div className="bg-white p-4 shadow rounded-lg">
//           <h2 className="text-lg font-semibold">Pending Posts</h2>
//           <p className="text-2xl font-bold text-yellow-600">{stats.pendingPosts}</p>
//         </div>
//         <div className="bg-white p-4 shadow rounded-lg">
//           <h2 className="text-lg font-semibold">Completed Jobs</h2>
//           <p className="text-2xl font-bold text-purple-600">{stats.completedJobs}</p>
//         </div>
//       </div>

//       <div className="mb-4"style={{ width: '50vw', height: '100vh' }}>
//         <Bar options={chartOptions} data={chartData} />
//       </div>

//       <div className="bg-white p-6 shadow rounded-lg mb-8">
//         <h2 className="text-2xl font-bold mb-4">Job Posts</h2>
//         <table className="w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">Title</th>
//               <th className="border border-gray-300 p-2">Status</th>
//               <th className="border border-gray-300 p-2">Bids</th>
//               <th className="border border-gray-300 p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobPosts.map((job) => (
//               <tr key={job.id}>
//                 <td className="border border-gray-300 p-2">{job.title}</td>
//                 <td className="border border-gray-300 p-2">{job.status}</td>
//                 <td className="border border-gray-300 p-2">{job.bids}</td>
//                 <td className="border border-gray-300 p-2">
//                   {job.status === "Pending" && (
//                     <button
//                       onClick={() => handleApproveJob(job.id)}
//                       className="bg-blue-500 text-white px-4 py-1 rounded"
//                     >
//                       Approve
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="bg-white p-6 shadow rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Users</h2>
//         <table className="w-full table-auto border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">Name</th>
//               <th className="border border-gray-300 p-2">Role</th>
//               <th className="border border-gray-300 p-2">Status</th>
//               <th className="border border-gray-300 p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td className="border border-gray-300 p-2">{user.name}</td>
//                 <td className="border border-gray-300 p-2">{user.role}</td>
//                 <td className="border border-gray-300 p-2">{user.status}</td>
//                 <td className="border border-gray-300 p-2">
//                   {user.status === "Active" ? (
//                     <button
//                       onClick={() => handleBanUser(user.id)}
//                       className="bg-red-500 text-white px-4 py-1 rounded"
//                     >
//                       Ban
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleUnbanUser(user.id)}
//                       className="bg-green-500 text-white px-4 py-1 rounded"
//                     >
//                       Unban
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;

"use client";

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Modal component for job post preview
const JobPostModal = ({ job, onClose, onApprove }) => {
  if (!job) return null; // Don't render if no job is provided

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{job.title}</h2>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Bids:</strong> {job.bids}</p>
        <p><strong>Description:</strong> This is where you could add a description of the job post.</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded mr-2">Close</button>
          <button onClick={() => { onApprove(job.id); onClose(); }} className="bg-blue-500 text-white px-4 py-2 rounded">Approve</button>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  // Dummy Data
  const [jobPosts, setJobPosts] = useState([
    { id: 1, title: "Web Design", status: "Pending", bids: 5 },
    { id: 2, title: "Graphic Design", status: "Approved", bids: 8 },
    { id: 3, title: "SEO Services", status: "Completed", bids: 10 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Tashi", role: "Client", status: "Banned" },
    { id: 2, name: "Sonam", role: "Service Provider", status: "Active" },
    { id: 3, name: "Dawa", role: "Client", status: "Active" },
  ]);

  const stats = {
    totalPosts: 50,
    approvedPosts: 100,
    pendingPosts: 5,
    completedJobs: 20,
    totalBids: 100,
  };

  // Handlers
  const handleApproveJob = (id) => {
    setJobPosts((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: "Approved" } : job
      )
    );
  };

  const handleBanUser = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status: "Banned" } : user))
    );
  };

  const handleUnbanUser = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: "Active" } : user
      )
    );
  };

  // Chart Data
  const chartData = {
    labels: ["Approved", "Pending", "Completed"],
    datasets: [
      {
        label: "Job Stats",
        data: [stats.approvedPosts, stats.pendingPosts, stats.completedJobs],
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Job Post Statistics",
      },
    },
  };

  // Modal state
  const [selectedJob, setSelectedJob] = useState(null);

  const handleOpenModal = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <div className="sticky p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Job Posts</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.totalPosts}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Total Bids</h2>
          <p className="text-2xl font-bold text-green-600">{stats.totalBids}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Pending Posts</h2>
          <p className="text-2xl font-bold text-yellow-600">{stats.pendingPosts}</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">Completed Jobs</h2>
          <p className="text-2xl font-bold text-purple-600">{stats.completedJobs}</p>
        </div>
      </div>

      <div className="mb-4" style={{ width: '50vw', height: '100vh' }}>
        <Bar options={chartOptions} data={chartData} />
      </div>

      <div className="bg-white p-6 shadow rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Job Posts</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Bids</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobPosts.map((job) => (
              <tr key={job.id}>
                <td className="border border-gray-300 p-2">{job.title}</td>
                <td className="border border-gray-300 p-2">{job.status}</td>
                <td className="border border-gray-300 p-2">{job.bids}</td>
                <td className="border border-gray-300 p-2">
                  {job.status === "Pending" && (
                    <button
                      onClick={() => handleOpenModal(job)} // Open modal with job details
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Job Post Modal */}
      {selectedJob && (
        <JobPostModal 
          job={selectedJob} 
          onClose={handleCloseModal} 
          onApprove={handleApproveJob} 
        />
      )}

      {/* Users Section */}
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className="border border-gray-300 p-2">{user.status}</td>
                <td className="border border-gray-300 p-2">
                  {user.status === "Active" ? (
                    <button
                      onClick={() => handleBanUser(user.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Ban
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnbanUser(user.id)}
                      className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                      Unban
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div >
  );
};

export default AdminPage;
