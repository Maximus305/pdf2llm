import React from 'react';
import Link from 'next/link';

const gradientButtonStyle = "bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90";

const UnderConstructionPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold">PDF2LLM.AI</span>
          </div>
          <div className="space-y-2">
            <Link 
              href="/home" 
              className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95"
            >
              Dashboard
            </Link>
            <Link 
              href="/api" 
              className={`${gradientButtonStyle} rounded px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95`}
            >
              API
            </Link>
            <Link 
              href="/api-key" 
              className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95"
            >
              API Key
            </Link>
            <Link 
              href="/settings" 
              className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Under Construction</h1>
          <p className="text-lg text-gray-600">We're working hard to bring you this page. Please check back later!</p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;