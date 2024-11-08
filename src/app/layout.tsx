'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // Import auth from your firebase module

import './globals.css';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState(''); // State for username
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch username from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Assuming the user's display name is stored in Firebase
        setUsername(user.displayName || 'User');
      } else {
        setUsername('Guest');
      }
    });

    return () => unsubscribe();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 fixed top-0 w-full z-10">
      <div className="h-full w-full px-4 flex items-center justify-between">
        {/* Logo in left corner */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold">PDF2LLM.AI</span>
          </Link>
        </div>

        {/* User Account Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={toggleDropdown} 
            className="text-gray-600 px-3 py-2 transition-transform transform hover:scale-105 active:scale-95"
          >
            {username}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
              <Link 
                href="/dashboard" 
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link 
                href="/api" 
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                API
              </Link>
              <Link 
                href="/settings" 
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
              >
                Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const Sidebar = () => {
  return (
    <div className="w-48 bg-white border-r border-gray-200 flex flex-col h-screen fixed">
      <div className="p-4 flex-grow">
        <div className="absolute left-4 top-4">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold">PDF2LLM.AI</span>
          </Link>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-20">
          <Link 
            href="/dashboard" 
            className="text-gray-600 px-3 py-2 transition-transform transform hover:scale-105 active:scale-95"
          >
            Dashboard
          </Link>
          <Link 
            href="/api" 
            className="text-gray-600 px-3 py-2 transition-transform transform hover:scale-105 active:scale-95"
          >
            API
          </Link>
        </div>
      </div>
      <div className="p-4 border-t border-gray-200">
        <Link 
          href="/settings" 
          className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >         
          Settings
        </Link>
      </div>
    </div>
  );
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const auth: { isAuthenticated: boolean } = {
    isAuthenticated: true // Replace with your auth logic
  };

  const pathname = usePathname();
  const pagesWithoutHeader = ['/', '/docs', '/pricing', '/sign-in', '/sign-up'];
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