import React, { useState } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

const UserManager = () => {
  const [users, setUsers] = useState([
    { user_id: 1, username: 'john_doe', role: 'Freelancer', is_banned: false },
    { user_id: 2, username: 'jane_doe', role: 'Client', is_banned: true },
  ]);

  const handleToggleBan = (userId: number) => {
    setUsers(users.map((user) => (user.user_id === userId ? { ...user, is_banned: !user.is_banned } : user)));
  };

  const roleData = [
    { name: 'Freelancers', value: users.filter((user) => user.role === 'Freelancer').length },
    { name: 'Clients', value: users.filter((user) => user.role === 'Client').length },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-black">User Management</h2>

      <table className="w-full mb-6">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3">Username</th>
            <th className="text-left p-3">Role</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="border-b">
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">{user.is_banned ? 'Banned' : 'Active'}</td>
              <td className="p-3">
                <button
                  onClick={() => handleToggleBan(user.user_id)}
                  className={`bg-${user.is_banned ? 'green' : 'red'}-500 text-white px-3 py-1 rounded hover:bg-${user.is_banned ? 'green' : 'red'}-600`}
                >
                  {user.is_banned ? 'Unban' : 'Ban'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={roleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserManager;
