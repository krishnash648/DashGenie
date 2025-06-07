import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

// Sample data
const chartData = [
  { month: "Jan", sales: 35, orders: 20 },
  { month: "Feb", sales: 28, orders: 15 },
  { month: "Mar", sales: 34, orders: 22 },
  { month: "Apr", sales: 32, orders: 18 },
  { month: "May", sales: 40, orders: 25 },
];

const Dashboard = () => {
  // Calculate summary values
  const totalSales = chartData.reduce((sum, d) => sum + d.sales, 0);
  const totalOrders = chartData.reduce((sum, d) => sum + d.orders, 0);
  const avgSales = (totalSales / chartData.length).toFixed(1);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center transition-colors">
          <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Total Sales</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalSales}</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center transition-colors">
          <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Total Orders</span>
          <span className="text-2xl font-bold text-green-600 dark:text-green-400">{totalOrders}</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center transition-colors">
          <span className="text-gray-500 dark:text-gray-400 text-sm mb-2">Avg. Sales</span>
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{avgSales}</span>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 transition-colors">
        <h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8 transition-colors">
        <h3 className="text-lg font-semibold mb-4">Monthly Orders</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="orders" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;