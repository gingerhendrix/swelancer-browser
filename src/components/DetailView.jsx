import React from 'react';
import { Users, UserCog } from 'lucide-react';
import { MessageThread } from './MessageThread';

export function DetailView({ data }) {
  const getRoleIcon = (variant) => {
    if (variant === 'ic_swe') {
      return <Users className="w-5 h-5" />;
    }
    return <UserCog className="w-5 h-5" />;
  };

  const getRoleText = (variant) => {
    return variant === 'ic_swe' ? 'Engineer' : 'Manager';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {getRoleIcon(data.variant)}
            <span className="text-gray-600">{getRoleText(data.variant)}</span>
          </div>
          <span className="text-gray-300">|</span>
          <span className="font-mono">{data.question_id}</span>
        </div>
        <div className="text-lg font-semibold text-green-700">${data.price}</div>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <MessageThread messages={data.prompt} />
      </div>
    </div>
  );
}