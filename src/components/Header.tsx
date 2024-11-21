// components/Header.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [initials, setInitials] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const displayName = user.displayName || 'User';
        setUsername(displayName);
        const firstLetter = displayName.split(' ').map(name => name[0]).join('');
        setInitials(firstLetter);
      } else {
        setUsername('Guest');
        setInitials('G');
      }
    });

    return () => unsubscribe();
  }, []);

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

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 fixed top-0 w-full z-10">
      <div className="h-full w-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold">PDF2LLM.AI</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/docs" className="text-gray-600 hover:text-gray-800">Docs</Link>
          <Link href="/credits" className="text-gray-600 hover:text-gray-800">Credits</Link>
          <Link href="/current-plan" className="text-gray-600 hover:text-gray-800">Current Plan</Link>

          <div className="relative flex items-center" ref={dropdownRef}>
            <button 
              onClick={toggleDropdown} 
              className="flex items-center text-gray-600 px-3 py-2 transition-transform transform hover:scale-105 active:scale-95"
            >
              <span className="ml-2 p-2">{username}</span>
              <div 
                className="flex items-center justify-center text-center text-white"
                style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(to right, #097957 , #090977)' }}
              >
                {initials}
              </div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg top-full">
                <Link 
                  href="/dashboard" 
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/api" 
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  API
                </Link>
                <Link 
                  href="/settings" 
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={handleLinkClick}
                >
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;