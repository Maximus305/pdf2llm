"use client"

import React, { useState } from 'react';

import { File, Check, Info } from 'lucide-react'; // Use File instead of FileText


export default function CreditsPage() {

  const [, setCurrentPlan] = useState<string>('Free Plan');
  const [showCosts, setShowCosts] = useState<boolean>(false);
  

  const renderPlans = () => (
    <div className="grid grid-cols-3 gap-6 w-full max-w-[1024px] mx-auto">
      {/* Free Plan */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-medium">Free Plan</h3>
        <div className="mt-2 mb-6">
          <span className="text-3xl font-bold">$0</span>
          <span className="text-gray-500 text-sm ml-2">10 credits</span>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Basic PDF processing up to 10 credits</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Limited API access</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Standard support</span>
          </div>
        </div>
        <button 
          className="w-full py-2 bg-gray-100 text-gray-400 rounded-lg text-center"
          disabled
        >
          Current Plan
        </button>
      </div>

      {/* Monthly Plan */}
      <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-[#16A34A]">
        <span className="inline-block px-3 py-1 text-sm text-[#16A34A] bg-green-50 rounded-full mb-2">
          Recommended
        </span>
        <h3 className="text-xl font-medium">Pro Plan</h3>
        <div className="mt-2 mb-6">
          <span className="text-3xl font-bold">$5</span>
          <span className="text-gray-500 text-sm ml-2">100 credits</span>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Full PDF processing</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Unlimited API access</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Priority support</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Credit rollover up to 50</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Advanced features</span>
          </div>
        </div>
        <button 
          className="w-full py-2 bg-[#16A34A] text-white rounded-lg hover:bg-[#15803D] transition-colors"
          onClick={() => setCurrentPlan('Monthly Plan')}
        >
          Upgrade to Pro
        </button>
      </div>

      {/* Pay As You Go */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-xl font-medium">Pay-As-You-Go</h3>
        <div className="mt-2 mb-6">
          <span className="text-3xl font-bold">From $2</span>
          <span className="text-gray-500 text-sm ml-2">Flexible credits</span>
        </div>
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Full PDF processing</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Flexible API usage</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Priority support</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Credits valid for 6 months</span>
          </div>
          <div className="flex items-start gap-3">
            <Check className="h-5 w-5 mt-0.5 text-gray-400" />
            <span className="text-gray-600">Volume discounts</span>
          </div>
        </div>
        <button 
          className="w-full py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => setCurrentPlan('Pay-As-You-Go')}
        >
          Buy Credits
        </button>
      </div>
    </div>
  );

  const renderCredits = () => (
    <div className="w-full max-w-[1024px] mx-auto mt-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium">Available Credits</span>
          <button 
            onClick={() => setShowCosts(!showCosts)} 
            className="text-gray-400 hover:text-gray-600"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
        <div>
          <p className="text-4xl font-bold">10</p>
          <p className="text-gray-500">Credits Remaining</p>
        </div>
      </div>

      {showCosts && (
        <div className="bg-white rounded-lg p-6 shadow-sm mt-6">
          <h3 className="font-medium mb-4">Credit Costs</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="flex items-center gap-2">
                <File className="w-4 h-4" /> {/* Use File icon */}
                PDF Processing (1-10 pages)
              </span>
              <span>1 credits</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="flex items-center gap-2">
                <File className="w-4 h-4" />
                PDF Processing (11-50 pages)
              </span>
              <span>2 credits</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="flex items-center gap-2">
                <File className="w-4 h-4" />
                PDF Processing (51-100 pages)
              </span>
              <span>5 credits</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="flex items-center gap-2">
                <File className="w-4 h-4" />
                PDF Processing (101-200 pages)
              </span>
              <span>8 credits</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
     
        

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Change Your Plan</h2>
            <p className="text-gray-600 mt-2">Select the plan that best fits your needs</p>
          </div>
          {renderPlans()}
          {renderCredits()}
        </div>
      </div>
    </div>
  );
}