import React from 'react';
import UserMenu from '../../auth/user-menu';

export default function Header() {
  return (
    <header className="h-16 bg-indigo-600 text-white flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold">
        ChatGenius
      </h1>
      <UserMenu />
    </header>
  );
} 