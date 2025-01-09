import React from 'react';
import { useUserStore } from '../../../stores/user-store';

export default function Header() {
  const { currentUser } = useUserStore();

  return (
    <header className="h-16 bg-indigo-600 text-white flex items-center justify-between px-6 border-b-2 border-black">
      <h1 className="text-2xl font-bold">
        ChatGenius
      </h1>
      <div className="flex items-center space-x-2">
        <span className="text-sm">
          {currentUser.name}
        </span>
      </div>
    </header>
  );
} 