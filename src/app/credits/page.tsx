"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Settings } from 'lucide-react';
import Link from 'next/link';

const CreditsPage = () => {
  const [showPlans, setShowPlans] = useState(true);
  const accentButton = "bg-[#D7524A] text-white hover:bg-[#C4473F]";
  const primaryButton = "bg-[#16A34A] text-white hover:bg-[#15803D]";
  const secondaryButton = "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50";

  const currentPlan = {
    type: "Free",
    creditsLeft: 7
  };

  const renderCreditStatus = () => (
    <Card className="mb-8 border shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg text-gray-600">Credits Left</h3>
            <p className="text-4xl font-bold text-gray-900 mt-1">{currentPlan.creditsLeft}</p>
          </div>
          <button
            onClick={() => setShowPlans(!showPlans)} // Toggle showPlans
            className={`${accentButton} px-6 py-2 rounded-lg font-medium`}
          >
            {showPlans ? 'Hide Plans' : 'Add Credits'}
          </button>
        </div>
      </CardContent>
    </Card>
  );

  const renderPlans = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        {
          type: "Free",
          price: "$0",
          credits: "10 credits",
          features: [
            "Basic conversion options",
            "Up to 10 pages per PDF",
            "Basic AI chat"
          ],
          current: true
        },
        {
          type: "Pro",
          price: "$20",
          credits: "100 credits",
          features: [
            "All conversion options",
            "Unlimited pages",
            "Advanced AI features",
            "Priority support",
            "API access"
          ],
          recommended: true
        },
        {
          type: "Pay-As-You-Go",
          price: "From $10",
          credits: "50 credits",
          features: [
            "All Pro features",
            "Flexible credit purchases",
            "6-month validity",
            "Volume discounts"
          ]
        }
      ].map((plan) => (
        <Card 
          key={plan.type}
          className={`border ${
            plan.recommended 
              ? 'ring-1 ring-[#16A34A] shadow-lg relative transform hover:scale-102 transition-all duration-200' 
              : 'shadow-md hover:shadow-lg transition-all duration-200'
          }`}
        >
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              <div className="mb-6">
                {plan.recommended && (
                  <span className="bg-green-50 text-[#16A34A] px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                    Best Value
                  </span>
                )}
                <h3 className="text-xl font-medium text-gray-900">{plan.type}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-2">{plan.credits}</span>
                </div>
              </div>

              <div className="flex-grow space-y-4 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 mt-0.5 text-gray-400" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full rounded-lg px-4 py-3 font-medium 
                  ${plan.current 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : plan.recommended
                      ? primaryButton
                      : plan.type === "Pay-As-You-Go"
                        ? secondaryButton
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  } 
                  transition-all`}
                disabled={plan.current}
              >
                {plan.current 
                  ? 'Current Plan' 
                  : plan.recommended 
                    ? 'Upgrade to Pro' 
                    : plan.type === "Pay-As-You-Go"
                      ? 'Buy Credits'
                      : 'Choose Plan'}
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderPlansView = () => (
    <div className="p-8 max-w-7xl mx-auto">
      {renderCreditStatus()}
      {showPlans && ( // Conditionally render plans
        <>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Choose Your Plan</h2>
          </div>
          {renderPlans()}
        </>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-48 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
        <div className="p-4 flex-grow">
          <div className="flex items-center space-x-2 mb-8">
            <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold text-gray-900">PDF2LLM.AI</span>
          </div>
          <div className="space-y-2">
            <Link href="/dashboard" className="text-gray-600 px-3 py-2 block hover:bg-gray-50 rounded-lg">
              Dashboard
            </Link>
            <Link href="/api" className="text-gray-600 px-3 py-2 block hover:bg-gray-50 rounded-lg">
              API
            </Link>
            <Link href="/api-key" className="text-gray-600 px-3 py-2 block hover:bg-gray-50 rounded-lg">
              API Key
            </Link>
            <Link href="/credits" className={`${accentButton} px-3 py-2 block rounded-lg font-medium`}>
              Credits
            </Link>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <Link href="/settings" className="text-gray-600 px-3 py-2 block hover:bg-gray-50 rounded-lg flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="h-full">
          {renderPlansView()}
        </div>
      </div>
    </div>
  );
};

export default CreditsPage;