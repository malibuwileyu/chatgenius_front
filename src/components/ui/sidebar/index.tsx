'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const GENERAL_CHANNEL_ID = '123e4567-e89b-12d3-a456-426614174000';

const channels = [
  {
    id: GENERAL_CHANNEL_ID,
    name: 'general',
    description: 'General chat channel'
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-60 bg-primary border-r border-secondary flex flex-col">
      <div className="p-4 border-b border-secondary">
        <h2 className="text-lg font-semibold">Channels</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {channels.map(channel => (
          <Link
            key={channel.id}
            href={`/channels/${channel.id}`}
            className={`block px-3 py-2 rounded hover:bg-secondary transition-colors ${
              pathname === `/channels/${channel.id}` ? 'bg-secondary' : ''
            }`}
          >
            # {channel.name}
          </Link>
        ))}
      </div>
    </div>
  );
} 