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

  return (
    <header className="h-14 bg-white border-b border-gray-200 fixed top-0 w-full z-10">
      <div className="h-full w-full px-8 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-gray-800">
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z"/>
            </svg>
            <span className="font-semibold text-sm tracking-tight">PDF2LLM.AI</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link 
              href="/docs" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Docs
            </Link>
          </nav>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">10 credits</div>
            <div className="text-sm text-gray-600">Free Plan</div>
          </div>

          {/* User menu */}
          <div className="relative flex items-center" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 group p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{username}</span>
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium bg-gradient-to-r from-blue-800 to-blue-900 shadow-sm"
              >
                {initials}
              </div>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 top-full">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{username}</p>
                  <p className="text-xs text-gray-500">Free Plan</p>
                </div>
                <div className="py-1">
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/api" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    API
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      // Add logout logic here
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;