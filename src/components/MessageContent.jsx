import React from 'react';
import ReactMarkdown from 'react-markdown';

export function MessageContent({ content, role }) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex items-center mb-2">
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200">
          {role === 'user' ? '👤' : '🤖'}
        </span>
        <span className="ml-2 font-medium capitalize">{role}</span>
      </div>
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}