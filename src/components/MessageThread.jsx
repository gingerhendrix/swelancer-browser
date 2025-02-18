import React from 'react';
import { MessageContent } from './MessageContent';

export function MessageThread({ messages }) {
  if (!messages || messages.length === 0) {
    return null;
  }

  let parsedMessages;
  try {
    if (typeof messages === 'string') {
      // Log the original string for debugging
      console.log('Original message string:', messages);
      
      // First attempt: try parsing as is
      try {
        parsedMessages = JSON.parse(messages);
      } catch (e) {
        // Second attempt: replace single quotes and escape newlines
        const prepared = messages
          .replace(/(?<!\\)'/g, '"') // Replace unescaped single quotes with double quotes
          .replace(/\n/g, '\\n')     // Escape newlines
          .replace(/\\"/g, '\\\\"'); // Escape any existing escaped double quotes
        
        console.log('Prepared string:', prepared);
        parsedMessages = JSON.parse(prepared);
      }
    } else {
      parsedMessages = messages;
    }

    // Validate the parsed structure
    if (!Array.isArray(parsedMessages)) {
      throw new Error('Parsed result is not an array');
    }

    // Validate each message object
    parsedMessages = parsedMessages.map(msg => {
      if (!msg.role || !msg.content) {
        console.warn('Invalid message format:', msg);
        return {
          role: msg.role || 'unknown',
          content: msg.content || 'Invalid message format'
        };
      }
      return msg;
    });

  } catch (error) {
    console.error('Failed to parse messages:', error);
    console.error('Messages value:', messages);
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        <p className="font-bold">Error parsing messages:</p>
        <pre className="mt-2 text-sm overflow-x-auto">
          {error.message}
        </pre>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {parsedMessages.map((message, index) => (
        <MessageContent
          key={index}
          content={message.content}
          role={message.role}
        />
      ))}
    </div>
  );
}