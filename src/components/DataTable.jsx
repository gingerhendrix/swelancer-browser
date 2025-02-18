import React from 'react';

export function DataTable({ data, onRowClick, selectedRow }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available. Please upload an XLSX file.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Variant</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Price Limit</th>
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
              <td className="border px-4 py-2">{row.question_id}</td>
              <td className="border px-4 py-2">{row.variant}</td>
              <td className="border px-4 py-2">${row.price}</td>
              <td className="border px-4 py-2">${row.price_limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}