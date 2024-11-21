// components/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';

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

export default Sidebar;