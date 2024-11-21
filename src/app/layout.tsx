'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import './globals.css';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const auth = {
    isAuthenticated: true // Replace with your auth logic
  };

  const pathname = usePathname();
  const pagesWithoutHeader = ['/', '/docs', '/pricing', '/sign-in', '/sign-up', '/features', '/enterprise', '/blog', '/about', '/contact', '/legal'];
  const shouldShowHeader = !pagesWithoutHeader.includes(pathname);

  return (
    <html lang="en">
      <body className="bg-gray-50">
        {auth.isAuthenticated ? (
          <div className="min-h-screen flex flex-col">
            {shouldShowHeader && <Header />}
            <main className={`flex-1 ${shouldShowHeader ? 'pt-14' : ''}`}>
              {children}
            </main>
          </div>
        ) : (
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-48">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  );
}