"use client"

import React from 'react';
import Link from 'next/link';

const LegalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50 bg-white border-b border-gray-200 shadow-sm"
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
          <Link href="/" className="text-sm font-medium hover:text-gray-600 transition-colors">
            Home
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-gray-600 transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:text-gray-600 transition-colors">
            Documentation
          </Link>
          <Link href="/sign-in" className="text-sm font-medium hover:text-gray-600 transition-colors">
            Sign In
          </Link>
          <Link 
            href="/sign-up" 
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gray-900 text-white hover:bg-gray-800"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Legal Information</h1>

          {/* Terms of Service */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Terms of Service</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-600 mb-4">
                By using PDF2LLM.AI, you agree to these terms of service. Our service is provided "as is" without any warranties, 
                express or implied. We reserve the right to modify, suspend, or discontinue the service at any time.
              </p>
              <p className="text-gray-600 mb-4">
                Users must not misuse our services or help anyone else do so. This includes attempting to access our services 
                through methods other than our provided interface and instructions.
              </p>
              <p className="text-gray-600">
                We may suspend or stop providing our services to you if you do not comply with our terms or policies or if 
                we are investigating suspected misconduct.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Privacy Policy</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-600 mb-4">
                We take your privacy seriously. We collect and process personal data only to provide and improve our services. 
                This includes information you provide when creating an account and data about how you use our service.
              </p>
              <p className="text-gray-600 mb-4">
                We do not sell your personal information to third parties. We may share your information with service providers 
                who assist us in operating our service, subject to confidentiality obligations.
              </p>
              <p className="text-gray-600">
                You have the right to access, correct, or delete your personal data. Contact us at privacy@pdf2llm.ai for 
                any privacy-related concerns.
              </p>
            </div>
          </section>

          {/* Cookie Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Cookie Policy</h2>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to provide, protect, and improve our services. Cookies help us 
                understand how you interact with our service and remember your preferences.
              </p>
              <p className="text-gray-600">
                You can control cookie settings through your browser preferences. However, disabling certain cookies may 
                limit your ability to use some features of our service.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} PDF2LLM.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalPage;
