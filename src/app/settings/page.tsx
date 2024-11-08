"use client"
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Plan } from './Plan';
import { Usage } from './Usage';
import { Billing } from './Billing';
import { Limits } from './Limits';
import { Questions } from './Questions';
import { Account } from './Account';

type ActiveItemType = 'Account' | 'Plan' | 'Usage' | 'Billing' | 'Limits' | 'Questions';

const SettingsPage = () => {
  const [activeItem, setActiveItem] = useState<ActiveItemType>('Account');

  const getComponent = () => {
    switch (activeItem) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
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