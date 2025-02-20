import React from 'react';

export function DataTable({ data, onRowClick, selectedRow }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available.
      </div>
    );
  }

  return (
    <table className="min-w-full table-auto">
      <thead className="sticky top-0 bg-white shadow z-10">
        <tr>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-left">Variant</th>
          <th className="px-4 py-2 text-left">Price</th>
          <th className="px-4 py-2 text-left">Price Limit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={row.question_id || index}
            onClick={() => onRowClick(row)}
            className={`cursor-pointer hover:bg-gray-50 ${
              selectedRow?.question_id === row.question_id ? 'bg-blue-50' : ''
            }`}
          >
            <td className="border-b px-4 py-2">{row.question_id}</td>
            <td className="border-b px-4 py-2">{row.variant}</td>
            <td className="border-b px-4 py-2">${row.price}</td>
            <td className="border-b px-4 py-2">${row.price_limit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}