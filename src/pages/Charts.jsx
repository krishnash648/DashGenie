import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 700 },
  { name: 'May', users: 600 },
];

const Charts = () => {
  return (
    <div className="p-8 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Charts</h1>
      <p className="text-lg mb-6">Here’s a cool user growth chart. 📊✨</p>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#8884d8" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
