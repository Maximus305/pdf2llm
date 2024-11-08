"use client"

import React, { useState } from 'react';
import { File, Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [showCreditInfo, setShowCreditInfo] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderCreditInfo = () => (
    <div className="w-full max-w-[1024px] mx-auto mt-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="font-medium mb-4 text-xl">Credit Usage Guide</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="flex items-center gap-2">
              <File className="w-4 h-4" />
              PDF Processing (1-10 pages)
            </span>
            <span>1 credit</span>
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
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
  className={`
    fixed top-0 left-0 right-0 
    flex justify-between items-center p-4 
    z-50 transition-all duration-300
    ${isPastHero 
      ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800' 
      : 'bg-transparent'
    }
  `}
>
  <div className="flex items-center space-x-2">
    <Link href="/">
      <div className="flex items-center space-x-2">
        <img src="/images/logo.svg" className="w-6 h-6" alt="Logo" />
        <span className="font-semibold text-base">PDF2LLM.AI</span>
      </div>
    </Link>
  </div>
  <nav className="flex items-center space-x-6">
    <Link href="/" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
      Home
    </Link>
    <Link href="/pricing" className="text-sm font-medium text-orange-500">
      Pricing
    </Link>
    <Link href="/docs" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
      Documentation
    </Link>
    <Link href="/sign-in" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
      Sign In
    </Link>
    <Link 
      href="/sign-up" 
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
    >
      Get Started
    </Link>
  </nav>
</header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-600 text-lg mb-6">Choose the plan that works best for you</p>
          <button
            onClick={() => setShowCreditInfo(!showCreditInfo)}
            className="text-gray-600 hover:text-gray-900 underline"
          >
            What are credits worth?
          </button>
        </div>

        {showCreditInfo && renderCreditInfo()}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1024px] mx-auto mt-8">
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
              className="w-full py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get Started
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
            >
              Get Pro
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
            >
              Buy Credits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}