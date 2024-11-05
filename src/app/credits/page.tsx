
"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Coins, History, Package } from 'lucide-react';
import Link from 'next/link';

const CreditsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const gradientButtonStyle = "bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90";
  
  const currentPlan = {
    type: "Free Plan",
    price: "$0",
    period: "monthly",
    creditsLeft: 7,
    features: [
      "Limited monthly credits for basic usage",
      "Limited conversion options (up to 10 pages per document)",
      "Basic AI chat (1-3 queries/month)",
      "No rollover for unused credits"
    ]
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Coins },
    { id: 'usage', name: 'Credit Usage', icon: History },
    { id: 'plans', name: 'Change Plan', icon: Package },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Current Plan: {currentPlan.type}</h2>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-gray-600 text-lg">Credits Left</span>
                      <span className="text-3xl font-semibold text-gray-900">{currentPlan.creditsLeft} Credits</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                  {currentPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <Check className="h-5 w-5 flex-none text-green-500" /> {/* Updated to green */}
                        <span className="text-gray-700">{feature}</span>
                    </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab('plans')}
                    className={`${gradientButtonStyle} rounded-lg px-6 py-3 w-full font-medium text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]`}
                  >
                    Upgrade Plan
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: "PDF Conversion", credits: -10, date: "Today" },
                    { action: "AI Chat Query", credits: -5, date: "Yesterday" },
                    { action: "File Export", credits: -1, date: "Yesterday" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div>
                        <p className="text-gray-900 font-medium">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <span className={`text-lg font-medium ${item.credits < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {item.credits} credits
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'usage':
        return (
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-8">Credit Usage Rates</h2>
              <div className="space-y-4">
                {[
                  { feature: 'PDF Conversion (1-10 Pages)', cost: '10 credits' },
                  { feature: 'PDF Conversion (11-50 Pages)', cost: '20 credits' },
                  { feature: 'Basic AI Chat Query', cost: '5 credits per query' },
                  { feature: 'Advanced AI Chat Query', cost: '8 credits per query' },
                  { feature: 'File Export', cost: '1 credit per download' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <span className="text-gray-700">{item.feature}</span>
                    <span className="text-gray-900 font-semibold">{item.cost}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

        case 'plans':
            return (
              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    type: "Free Plan",
                    price: "$0",
                    credits: "10 credits monthly",
                    features: [
                      "Basic conversion options",
                      "Limited monthly credits",
                      "Basic AI chat",
                      "No credit rollover"
                    ],
                    current: true
                  },
                  {
                    type: "Monthly Plan",
                    price: "$20",
                    credits: "100 credits",
                    features: [
                      "All conversion options",
                      "Priority support",
                      "Advanced AI chat",
                      "Credit rollover (50 max)"
                    ],
                    recommended: true
                  },
                  {
                    type: "Pay-As-You-Go",
                    price: "Flexible",
                    credits: "Purchased as needed",
                    features: [
                      "Buy credits in bundles",
                      "No monthly commitment",
                      "All features included",
                      "6-month credit validity"
                    ]
                  }
                ].map((plan) => (
                  <Card 
                    key={plan.type}
                    className={`border-none shadow-lg transition-transform duration-200 hover:scale-[1.02] ${
                      plan.recommended ? 'ring-2 ring-[#D7524A]' : ''
                    } ${plan.current ? 'ring-2 ring-gray-200' : ''}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{plan.type}</h3>
                          <div className="mt-2">
                            <span className="text-2xl font-semibold">{plan.price}</span>
                            <span className="text-gray-500 text-sm ml-2">{plan.credits}</span>
                          </div>
                        </div>
                        {plan.recommended && (
                          <span className="bg-[#D7524A] bg-opacity-10 px-3 py-1 rounded-full text-sm font-medium text-[#D7524A]">
                            Recommended
                          </span>
                        )}
                        {plan.current && (
                          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">
                            Current Plan
                          </span>
                        )}
                      </div>
    
                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <Check className="h-4 w-4 flex-none text-[#D7524A]" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
    
                      <button 
                        className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium 
                          ${plan.current 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : plan.recommended 
                              ? gradientButtonStyle 
                              : 'bg-gray-900 text-white hover:bg-gray-800'
                          } 
                          transition-all duration-200`}
                        disabled={plan.current}
                      >
                        {plan.current ? 'Current Plan' : `Switch to ${plan.type}`}
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
    
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-48 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold">PDF2LLM.AI</span>
          </div>
          <div className="space-y-2">
            <Link href="/dashboard" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              Dashboard
            </Link>
            <Link href="/api" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              API
            </Link>
            <Link href="/api-key" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              API Key
            </Link>
            <Link href="/settings" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
              Settings
            </Link>
            <Link href="/credits" className={`${gradientButtonStyle} rounded px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95`}>
              Credits
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex space-x-12 h-16 items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 h-full text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-[#D7524A] border-b-2 border-[#D7524A]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-8 py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;