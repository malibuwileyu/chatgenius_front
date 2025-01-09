import React from 'react';
import Header from '../../components/ui/header';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-pink-50">
      <Header />
      {children}
    </div>
  );
} 