import React from 'react';

const customers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
];

const Customers = () => {
  return (
    <div className="p-8 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Customers</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b dark:border-gray-700 text-left">ID</th>
              <th className="py-3 px-4 border-b dark:border-gray-700 text-left">Name</th>
              <th className="py-3 px-4 border-b dark:border-gray-700 text-left">Email</th>
              <th className="py-3 px-4 border-b dark:border-gray-700 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <td className="py-3 px-4 border-b dark:border-gray-700">{customer.id}</td>
                <td className="py-3 px-4 border-b dark:border-gray-700">{customer.name}</td>
                <td className="py-3 px-4 border-b dark:border-gray-700">{customer.email}</td>
                <td className={`py-3 px-4 border-b dark:border-gray-700 ${customer.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                  {customer.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
