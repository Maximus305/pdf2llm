"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Plan } from './Plan';
import { Usage } from './Usage';
import { Billing } from './Billing';
import { Limits } from './Limits';
import { Questions } from './Questions';
import { Account } from './Account';

const SettingsPage = () => {
  const pathname = usePathname();
  
  // Get the current section from the URL or default to Account
  const currentSection = pathname === '/settings' ? 'Account' : 
    (pathname.split('/').pop() || 'Account').replace(/^./, str => str.toUpperCase());

  const getComponent = () => {
    switch (currentSection) {
      case 'Account':
        return <Account />;
      case 'Plan':
        return <Plan />;
      case 'Usage':
        return <Usage />;
      case 'Billing':
        return <Billing />;
      case 'Limits':
        return <Limits />;
      case 'Questions':
        return <Questions />;
      default:
        return <Account />;
    }
  };

  return (
    <div className="min-h-screen relative bg-gray-50">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 w-full h-full bg-dot-pattern z-0"></div>
      <div className="max-w-7xl mx-auto z-10 relative"> {/* Ensure content is above the background */}
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              {getComponent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;