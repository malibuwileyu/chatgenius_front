'use client';
import React from 'react';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useTokenRefresh } from '../hooks/useTokenRefresh';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useTokenRefresh();
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
} 