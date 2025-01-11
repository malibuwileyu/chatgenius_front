'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Channel {
  id: string;
  name: string;
  type: string;
}

export default function ChannelSettingsPage() {
  const router = useRouter();
  const params = useParams();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchChannel = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/channels/${params.channelId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch channel');
        }

        const data = await response.json();
        setChannel(data);
      } catch (error) {
        setError('Failed to load channel settings');
        console.error('Error:', error);
      }
    };

    fetchChannel();
  }, [params.channelId, router]);

  const handleDeleteChannel = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    if (confirm('Are you sure you want to delete this channel? This action cannot be undone.')) {
      try {
        const response = await fetch(`http://localhost:8080/api/channels/${params.channelId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete channel');
        }

        router.push('/chat');
      } catch (error) {
        setError('Failed to delete channel');
        console.error('Error:', error);
      }
    }
  };

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  if (!channel) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 text-black">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 className="text-2xl font-bold">{channel.name} Settings</h1>
      </div>

      <div className="space-y-6">
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Danger Zone</h2>
          <button
            onClick={handleDeleteChannel}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Channel
          </button>
        </div>
      </div>
    </div>
  );
} 