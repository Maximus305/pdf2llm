
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
    creditsTotal: 10,
    creditsUsed: 3,
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
          <div className="space-y-6 bg-gray-50">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900 mb-4">Current Plan: {currentPlan.type}</h2>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Credits Remaining</span>
                      <span className="text-2xl font-medium">{currentPlan.creditsTotal - currentPlan.creditsUsed} / {currentPlan.creditsTotal}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gray-900"
                        style={{width: `${((currentPlan.creditsTotal - currentPlan.creditsUsed) / currentPlan.creditsTotal) * 100}%`}}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex gap-3">
                        <Check className="h-5 w-5 flex-none text-gray-600" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab('plans')}
                    className="bg-gray-900 text-white rounded-lg px-6 py-2.5 w-full font-medium hover:bg-gray-800"
                  >
                    Upgrade Plan
                  </button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    { action: "PDF Conversion", credits: -10, date: "Today" },
                    { action: "AI Chat Query", credits: -5, date: "Yesterday" },
                    { action: "File Export", credits: -1, date: "Yesterday" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <span className="text-gray-900 font-medium">{item.credits}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'usage':
        return (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-6">Credit Usage Rates</h2>
              <div className="space-y-4">
                {[
                  { feature: 'PDF Conversion (1-10 Pages)', cost: '10 credits' },
                  { feature: 'PDF Conversion (11-50 Pages)', cost: '20 credits' },
                  { feature: 'Basic AI Chat Query', cost: '5 credits per query' },
                  { feature: 'Advanced AI Chat Query', cost: '8 credits per query' },
                  { feature: 'File Export', cost: '1 credit per download' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{item.feature}</span>
                    <span className="text-gray-900 font-medium">{item.cost}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'plans':
        return (
          <div className="space-y-6">
            {[
              {
                type: "Monthly Plan",
                price: "$20",
                credits: "100 credits",
                features: [
                  "All conversion options, including charts/diagrams",
                  "Priority support and processing",
                  "AI chat with both basic and advanced query options",
                  "Rollover of unused credits (up to 50 credits)"
                ],
                recommended: true
              },
              {
                type: "Pay-As-You-Go",
                price: "Flexible",
                credits: "Purchased as needed",
                features: [
                  "Purchase credits in bundles",
                  "Flexible usage with no monthly commitment",
                  "Access to all features",
                  "Credits valid for 6 months"
                ]
              }
            ].map((plan) => (
              <Card 
                key={plan.type}
                className={`relative ${plan.recommended ? 'ring-1 ring-gray-200' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">{plan.type}</h3>
                      <div className="mt-2">
                        <span className="text-2xl font-medium">{plan.price}</span>
                        <span className="text-gray-500"> - {plan.credits}</span>
                      </div>
                    </div>
                    {plan.recommended && (
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                        Recommended
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex gap-3">
                        <Check className="h-5 w-5 flex-none text-gray-600" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full rounded-lg px-4 py-2.5 text-sm font-medium bg-gray-900 text-white hover:bg-gray-800">
                    Switch to {plan.type}
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
};

  return (
    <div className="flex min-h-screen bg-white">
      {/* Restored Original Sidebar */}
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
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto px-6">
            <div className="flex space-x-8 h-16 items-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 h-full text-sm font-medium ${
                    activeTab === tab.id
                      ? 'text-gray-900 border-b-2 border-gray-900'
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

        <div className="max-w-5xl mx-auto px-6 py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;