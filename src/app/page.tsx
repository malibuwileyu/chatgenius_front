'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Channel {
  id: string;
  name: string;
}

export default function HomePage() {
  const router = useRouter();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [username, setUsername] = useState('');
  const [connectionError, setConnectionError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      router.push('/login');
      return;
    }

    // Set the token in cookies if it exists in localStorage
    document.cookie = `token=${token}; path=/`;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch user info
        const userResponse = await fetch('http://localhost:8080/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!userResponse.ok) {
          if (userResponse.status === 401) {
            // Clear invalid token
            localStorage.removeItem('token');
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
            router.push('/login');
            return;
          }
          throw new Error('Failed to fetch user info');
        }
        
        const userData = await userResponse.json();
        setUsername(userData.username || '');

        // Fetch channels
        const channelsResponse = await fetch('http://localhost:8080/api/channels', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!channelsResponse.ok) {
          throw new Error('Failed to fetch channels');
        }

        const channelsData = await channelsResponse.json();
        const channelArray = Array.isArray(channelsData) ? channelsData : channelsData.channels || [];
        setChannels(channelArray);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error fetching data:', errorMessage);
        if (errorMessage.includes('Failed to fetch')) {
          setConnectionError('Unable to connect to server. Please check your connection.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleChannelSelect = (channelId: string) => {
    router.push(`/chat?channel=${channelId}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left Section - Channels */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Channels</h2>
        {connectionError && (
          <div className="mb-4 p-2 bg-red-500 bg-opacity-20 text-red-100 rounded text-sm">
            {connectionError}
          </div>
        )}
        <ul className="space-y-2">
          {channels.map(channel => (
            <li
              key={channel.id}
              className="cursor-pointer p-2 rounded hover:bg-gray-700"
              onClick={() => handleChannelSelect(channel.id)}
            >
              # {channel.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Middle Section - Direct Messages */}
      <div className="w-1/4 bg-gray-700 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <div className="text-gray-400 text-sm">
          Direct messages will appear here
        </div>
      </div>

      {/* Right Section - Profile */}
      <div className="w-2/4 bg-white p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Welcome, {username}!</h1>
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-gray-600">
              Profile information and settings will be available here soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
