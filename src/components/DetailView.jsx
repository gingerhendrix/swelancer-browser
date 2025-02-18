import React from 'react';
import { MessageThread } from './MessageThread';

export function DetailView({ data }) {
  const formatValue = (key, value) => {
    if (key === 'prompt') {
      return <MessageThread messages={value} />;
    }

    if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside">
          {value.map((item, index) => (
            <li key={index}>{String(item)}</li>
          ))}
        </ul>
      );
    }
    
    if (typeof value === 'object' && value !== null) {
      return (
        <pre className="bg-gray-50 p-2 rounded overflow-x-auto">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }

    return String(value);
  };

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="border-b pb-2">
          <h3 className="font-semibold text-gray-700 capitalize">
            {key.replace(/_/g, ' ')}
          </h3>
          <div className="mt-1">
            {formatValue(key, value)}
          </div>
        </div>
      ))}
    </div>
  );
}