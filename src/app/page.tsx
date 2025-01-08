'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GENERAL_CHANNEL_ID = '123e4567-e89b-12d3-a456-426614174000';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/channels/${GENERAL_CHANNEL_ID}`);
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-gray-400">Redirecting to general channel...</div>
    </div>
  );
}
