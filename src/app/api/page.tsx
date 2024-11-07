import React from 'react';
import Link from 'next/link';

import {Settings } from 'lucide-react';

const gradientButtonStyle = "bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90";

const UnderConstructionPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Under Construction</h1>
          <p className="text-lg text-gray-600">We&apos;re working hard to bring you this page. Please check back later!</p>
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionPage;