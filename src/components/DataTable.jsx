import React, { useState, useMemo } from 'react';
import { Users, UserCog, ChevronUp, ChevronDown, Search } from 'lucide-react';

export function DataTable({ data, onRowClick, selectedRow }) {
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortField, setSortField] = useState('question_id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchId, setSearchId] = useState('');

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(row => row.variant === roleFilter);
    }

    // Apply ID search
    if (searchId) {
      result = result.filter(row => 
        row.question_id.toLowerCase().includes(searchId.toLowerCase())
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let compareA = a[sortField];
      let compareB = b[sortField];

      // Special handling for variant field to sort by engineer/manager
      if (sortField === 'variant') {
        compareA = a.variant === 'ic_swe' ? 0 : 1;
        compareB = b.variant === 'ic_swe' ? 0 : 1;
      }

      if (compareA < compareB) return sortDirection === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, roleFilter, sortField, sortDirection, searchId]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIndicator = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 inline-block" /> : 
      <ChevronDown className="w-4 h-4 inline-block" />;
  };

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 space-y-3 border-b">
        {/* Role Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setRoleFilter('all')}
            className={`px-3 py-1.5 rounded text-sm flex items-center gap-1
              ${roleFilter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Users className="w-4 h-4" />
            <UserCog className="w-4 h-4" />
            All
          </button>
          <button
            onClick={() => setRoleFilter('ic_swe')}
            className={`px-3 py-1.5 rounded text-sm flex items-center gap-1
              ${roleFilter === 'ic_swe' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <Users className="w-4 h-4" />
            Engineers
          </button>
          <button
            onClick={() => setRoleFilter('swe_manager')}
            className={`px-3 py-1.5 rounded text-sm flex items-center gap-1
              ${roleFilter === 'swe_manager' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <UserCog className="w-4 h-4" />
            Managers
          </button>
        </div>

        {/* ID Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded border text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-white shadow z-10">
            <tr>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('variant')}
              >
                Role <SortIndicator field="variant" />
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('question_id')}
              >
                ID <SortIndicator field="question_id" />
              </th>
              <th 
                className="px-4 py-2 text-right cursor-pointer hover:bg-gray-50"
                onClick={() => handleSort('price')}
              >
                Price <SortIndicator field="price" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((row, index) => (
              <tr
                key={row.question_id || index}
                onClick={() => onRowClick(row)}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedRow?.question_id === row.question_id ? 'bg-blue-50' : ''
                }`}
              >
                <td className="border-b px-4 py-2">
                  <div className="flex items-center text-gray-600" title={row.variant === 'ic_swe' ? 'Engineer' : 'Manager'}>
                    {row.variant === 'ic_swe' ? 
                      <Users className="w-4 h-4" /> : 
                      <UserCog className="w-4 h-4" />
                    }
                  </div>
                </td>
                <td className="border-b px-4 py-2 font-mono text-sm">{row.question_id}</td>
                <td className="border-b px-4 py-2 text-right">${row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}