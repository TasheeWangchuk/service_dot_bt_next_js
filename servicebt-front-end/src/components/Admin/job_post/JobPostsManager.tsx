import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const JobPostsManager = () => {
  const [jobs, setJobs] = useState([
    { job_id: 1, title: 'Web Developer Needed', status: 'Pending', budget: 1000 },
    { job_id: 2, title: 'Data Analyst', status: 'Open', budget: 1200 },
  ]);

  const handleApprove = (jobId: number) => {
    setJobs(jobs.map((job) => (job.job_id === jobId ? { ...job, status: 'Open' } : job)));
  };

  const handleReject = (jobId: number) => {
    setJobs(jobs.map((job) => (job.job_id === jobId ? { ...job, status: 'Closed' } : job)));
  };

  const statusData = [
    { name: 'Pending', value: jobs.filter((job) => job.status === 'Pending').length },
    { name: 'Open', value: jobs.filter((job) => job.status === 'Open').length },
    { name: 'Closed', value: jobs.filter((job) => job.status === 'Closed').length },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-black">Job Posts Management</h2>

      <table className="w-full mb-6">
        <thead>
          <tr className="border-b text-black">
            <th className="text-left p-3">Title</th>
            <th className="text-left p-3">Budget</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.job_id} className="border-b text-black">
              <td className="p-3">{job.title}</td>
              <td className="p-3">${job.budget}</td>
              <td className="p-3">{job.status}</td>
              <td className="p-3">
                {job.status === 'Pending' && (
                  <>
                    <button onClick={() => handleApprove(job.job_id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">Approve</button>
                    <button onClick={() => handleReject(job.job_id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8">
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#FFBB28', '#00C49F', '#FF8042'][index % 3]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobPostsManager;
