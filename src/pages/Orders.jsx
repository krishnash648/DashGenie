import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const columns = [
  { field: 'id', headerName: 'Order ID', width: 100 },
  { field: 'customer', headerName: 'Customer', width: 150 },
  { field: 'date', headerName: 'Date', width: 120 },
  { field: 'amount', headerName: 'Amount', width: 110 },
  { field: 'status', headerName: 'Status', width: 120 },
];

const rows = [
  { id: 1, customer: "John Doe", date: "2025-06-01", amount: 120, status: "Paid" },
  { id: 2, customer: "Jane Smith", date: "2025-06-02", amount: 80, status: "Pending" },
  { id: 3, customer: "Alice Brown", date: "2025-06-03", amount: 150, status: "Shipped" },
];

function exportToCSV(data, filename = 'orders.csv') {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];
  for (const row of data) {
    const values = headers.map(header => JSON.stringify(row[header] ?? ''));
    csvRows.push(values.join(','));
  }
  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

const Orders = () => {
  const [search, setSearch] = useState('');
  const filteredRows = rows.filter(row =>
    row.customer.toLowerCase().includes(search.toLowerCase()) ||
    row.status.toLowerCase().includes(search.toLowerCase()) ||
    row.date.includes(search)
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by customer, status, or date..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 rounded border dark:bg-gray-900 dark:text-gray-100"
          title="Type to filter orders"
        />
        <button
          onClick={() => exportToCSV(filteredRows, 'orders.csv')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          title="Export filtered orders as CSV"
        >
          Export CSV
        </button>
      </div>
      <div style={{ height: 400, width: '100%', background: 'white', borderRadius: '8px', padding: '16px' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Orders;