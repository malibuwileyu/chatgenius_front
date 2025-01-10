'use client';
import React from 'react';
import Header from '../../components/ui/header/index';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>
  );
} 