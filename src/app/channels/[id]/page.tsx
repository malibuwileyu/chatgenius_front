'use client';

import { useState, useEffect } from 'react';
import { Message, User, CreateMessageRequest } from '@/types/db';
import { sendMessage, getChannelMessages } from '@/lib/api/messages';

const FIXED_USERS = {
  user2: {
    id: '123e4567-e89b-12d3-a456-426614174002',
    username: 'testuser2'
  },
  user5: {
    id: '123e4567-e89b-12d3-a456-426614174005',
    username: 'testuser5'
  }
};

const CHANNEL_ID = '123e4567-e89b-12d3-a456-426614174000';

export default function ChannelPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [useUser2, setUseUser2] = useState(true); // Flag to alternate between users

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const channelMessages = await getChannelMessages(CHANNEL_ID);
        setMessages(channelMessages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };

    loadMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      const currentUser = useUser2 ? FIXED_USERS.user2 : FIXED_USERS.user5;
      
      const newMessage: CreateMessageRequest = {
        channelId: CHANNEL_ID,
        userId: currentUser.id,
        content: message.trim(),
        type: 'text',
      };

      try {
        const createdMessage = await sendMessage(newMessage);
        const messageWithUser = {
          ...createdMessage,
          username: currentUser.username
        };
        setMessages(prev => [...prev, messageWithUser]);
        setMessage('');
        setUseUser2(prev => !prev);
        
        const updatedMessages = await getChannelMessages(CHANNEL_ID);
        setMessages(updatedMessages);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const formatTimestamp = (date: Date) => {
    try {
      const messageDate = new Date(date);
      return messageDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return '';
    }
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col relative">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-secondary rounded-lg p-4 relative">
            <div className="absolute top-2 right-4 text-xs text-gray-400">
              {formatTimestamp(msg.createdAt)}
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center flex-shrink-0 border border-black">
                <span className="text-sm text-white">{msg.username || FIXED_USERS[useUser2 ? 'user2' : 'user5'].username}</span>
              </div>
              <div className="flex-1 mt-1">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-[200px] right-0 p-6 border-t border-secondary bg-primary">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-[1200px] mx-auto">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-secondary rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
} 