'use client';

import { useEffect, useState } from 'react';
import { initializeUser } from '@/lib/utils/user';

export default function Header() {
  const [user, setUser] = useState<{ username: string; userId: string } | null>(null);

  useEffect(() => {
    try {
      const currentUser = initializeUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to initialize user:', error);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-primary border-b border-secondary flex items-center justify-between px-4">
      <div className="w-32"></div>
      <h1 className="text-xl font-bold">ChatGenius</h1>
      <div className="w-32 text-right">
        {user ? user.username : 'Loading...'}
      </div>
    </header>
  );
} 