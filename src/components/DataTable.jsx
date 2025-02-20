import React from 'react';
import { Users, UserCog } from 'lucide-react';

export function DataTable({ data, onRowClick, selectedRow }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available.
      </div>
    );
  }

  const getRoleIcon = (variant) => {
    if (variant === 'ic_swe') {
      return <Users className="w-4 h-4" />;
    }
    return <UserCog className="w-4 h-4" />;
  };

  return (
    <table className="w-full table-auto">
      <thead className="sticky top-0 bg-white shadow z-10">
        <tr>
          <th className="px-4 py-2 text-left">Role</th>
          <th className="px-4 py-2 text-left">ID</th>
          <th className="px-4 py-2 text-right">Price</th>
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
            <td className="border-b px-4 py-2">
              <div className="flex items-center text-gray-600" title={row.variant === 'ic_swe' ? 'Engineer' : 'Manager'}>
                {getRoleIcon(row.variant)}
              </div>
            </td>
            <td className="border-b px-4 py-2 font-mono text-sm">{row.question_id}</td>
            <td className="border-b px-4 py-2 text-right">${row.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}