"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FileText, 
  MessageSquare, 
  Settings, 
  AlertTriangle,
  Shield,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Zap,
  Upload,
  Download,
  Lock,
  Mail
} from 'lucide-react';

const DocPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header 
        className={`
          fixed top-0 left-0 right-0 
          flex justify-between items-center p-4 
          z-50 transition-all duration-300
          bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
          border-b border-gray-200 dark:border-gray-800
        `}
      >
        <div className="flex items-center space-x-2">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.svg" width={24} height={24} alt="Logo" />
              <span className="font-semibold text-base">PDF2LLM.AI</span>
            </div>
          </Link>
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm font-medium text-orange-500">
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
      <div className="pt-16 flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 fixed h-full dark:bg-gray-900 overflow-y-auto">
          <nav className="p-4 space-y-2">
            <Link href="#quick-start" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Zap size={18} />
              <span>Quick Start</span>
            </Link>
            <Link href="#features" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <BookOpen size={18} />
              <span>Core Features</span>
            </Link>
            <Link href="#best-practices" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <FileText size={18} />
              <span>Best Practices</span>
            </Link>
            <Link href="#troubleshooting" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <AlertTriangle size={18} />
              <span>Troubleshooting</span>
            </Link>
            <Link href="#security" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <Shield size={18} />
              <span>Security & Privacy</span>
            </Link>
            <Link href="#faq" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              <HelpCircle size={18} />
              <span>FAQ</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          <div className="max-w-4xl mx-auto px-8 py-12">
            {/* Hero Section */}
            <div className="mb-12 pb-12 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-4xl font-bold mb-4">Documentation</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Learn how to convert PDFs to Markdown with our comprehensive guide.
              </p>
            </div>

            {/* Quick Start */}
            <section id="quick-start" className="mb-16">
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="text-orange-500" size={24} />
                <h2 className="text-2xl font-bold">Quick Start</h2>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Account Setup</h3>
                  <ol className="list-decimal list-inside space-y-2 mb-6">
                    <li>Visit PDF2LLM website</li>
                    <li>Click &quot;Sign Up&quot; and choose email/password or social login</li>
                    <li>Verify your email if required</li>
                    <li>Log in to access your dashboard</li>
                  </ol>

                  <h3 className="text-xl font-semibold mb-4">Converting Your First PDF</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Click &quot;Upload PDF&quot; on the dashboard</li>
                    <li>Drag and drop your PDF or click to browse (max size: 1MB during beta)</li>
                    <li>Wait for the conversion process to complete</li>
                    <li>Preview your markdown in the viewer</li>
                    <li>Save your converted file</li>
                  </ol>
                </div>
              </div>
            </section>
            {/* Core Features */}
            <section id="features" className="mb-16 pt-16">
              <div className="flex items-center space-x-2 mb-6">
                <BookOpen className="text-orange-500" size={24} />
                <h2 className="text-2xl font-bold">Core Features</h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">PDF Upload & Conversion</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Upload className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>File Size Limits: Maximum 1MB per file (beta)</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Supports charts, graphs, diagrams, and tables</span>
                    </li>
                    <li className="flex items-start">
                      <Download className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Preview converted markdown before saving</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">AI Chat Interface</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <MessageSquare className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Ask questions about your PDF content</span>
                    </li>
                    <li className="flex items-start">
                      <MessageSquare className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Get contextual answers</span>
                    </li>
                    <li className="flex items-start">
                      <MessageSquare className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Extract specific information</span>
                    </li>
                    <li className="flex items-start">
                      <MessageSquare className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Analyze complex diagrams and charts</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="mb-16 pt-16">
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="text-orange-500" size={24} />
                <h2 className="text-2xl font-bold">Best Practices</h2>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">PDF Preparation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FileText className="text-orange-500 mr-2 mt-1" size={16} />
                    <span>Ensure PDF is under 1MB for beta</span>
                  </li>
                  <li className="flex items-start">
                    <FileText className="text-orange-500 mr-2 mt-1" size={16} />
                    <span>Check for readable text and clear images</span>
                  </li>
                  <li className="flex items-start">
                    <Lock className="text-orange-500 mr-2 mt-1" size={16} />
                    <span>Remove password protection</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="mb-16 pt-16">
              <div className="flex items-center space-x-2 mb-6">
                <AlertTriangle className="text-orange-500" size={24} />
                <h2 className="text-2xl font-bold">Troubleshooting</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Upload Problems</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <AlertTriangle className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Verify file is under 1MB</span>
                    </li>
                    <li className="flex items-start">
                      <RefreshCw className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Check internet connection</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-semibold mb-4">Conversion Issues</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <RefreshCw className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Retry conversion</span>
                    </li>
                    <li className="flex items-start">
                      <FileText className="text-orange-500 mr-2 mt-1" size={16} />
                      <span>Check PDF formatting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Security & Privacy */}
            <section id="security" className="mb-16 pt-16">
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="text-orange-500" size={24} />
                <h2 className="text-2xl font-bold">Security & Privacy</h2>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Lock className="text-orange-500 mr-2 mt-1" size={16} />
                    <span>All files encrypted at rest</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-orange-500 mr-2 mt-1" size={16} />
                    <span>Regular security audits</span>
                  </li>
                  <li className="flex items-start">
                    <Lock className="text-orange-500 mr-2 mt-1" size={16} />
                    <span>HTTPS encryption</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-16 pt-16">
              <div className="flex items-center space-x-2 mb-6">
                <HelpCircle className="text-orange-500" size={24} />
                <h2 className="text-2xl font-bold">FAQ</h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    q: "What is the maximum file size supported?",
                    a: "During the beta phase, PDFs are limited to 1MB maximum size. We plan to increase this limit in future releases."
                  },
                  {
                    q: "How can I reduce my PDF file size?",
                    a: "You can use PDF compression tools, optimize images, or remove unnecessary elements to reduce file size."
                  },{
                    q: "Can I edit the converted markdown?",
                    a: "Yes, you can edit markdown files directly in the preview screen."
                  },
                  {
                    q: "Are my files secure?",
                    a: "Yes, all files are encrypted and stored securely using enterprise-grade security protocols."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Support */}
            <section id="support" className="pt-16">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-8 text-white">
                <div className="flex items-center space-x-4 mb-4">
                  <Mail size={24} />
                  <h2 className="text-2xl font-bold">Need Help?</h2>
                </div>
                <p className="mb-6">
                  Our support team is here to help you with any questions or issues.
                </p>
                <Link 
                  href="mailto:support@pdf2llm.com"
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                  <Mail size={18} className="ml-2" />
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocPage;