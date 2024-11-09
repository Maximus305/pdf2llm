"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code, FileJson, Book, Zap, Shield, Sparkles, Workflow, Gauge } from 'lucide-react';

const FeaturesPage = () => {
  const [, setIsPastHero] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Code,
      title: "Perfect Markdown Conversion",
      description: "Convert PDFs to clean, properly formatted Markdown with accurate headers, lists, and code blocks. Our AI ensures perfect fidelity of the original document structure."
    },
    {
      icon: FileJson,
      title: "Structure Preservation", 
      description: "Maintain complex document structures including tables, images, and intricate formatting. Every element is carefully preserved in the conversion process."
    },
    {
      icon: Book,
      title: "Multiple Format Support",
      description: "Support for a wide range of documents including academic papers, technical documentation, books, and complex multi-column layouts."
    },
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Process documents quickly with our optimized conversion pipeline. Get your Markdown files in seconds, not minutes."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption for all uploads and processing. Your documents are securely handled and automatically deleted after conversion."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Accuracy",
      description: "Leverage the power of ChatGPT for intelligent document understanding and precise conversion of complex layouts."
    },
    {
      icon: Workflow,
      title: "API Integration",
      description: "Seamlessly integrate PDF to Markdown conversion into your workflow with our robust REST API and comprehensive documentation."
    },
    {
      icon: Gauge,
      title: "High Volume Processing",
      description: "Handle batch conversions and high-volume processing with ease. Perfect for enterprise needs and large-scale document management."
    }
  ];

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

      <div className="relative">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Powerful Features for Perfect Conversions
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover why PDF2LLM.AI is the most advanced PDF to Markdown conversion tool available.
              </p>
              <Link 
                href="/sign-up" 
                className="inline-flex items-center px-8 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
              >
                Get Started Free
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Ready to transform your PDFs?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Start converting your PDFs to perfect Markdown today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/sign-up" 
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors"
                >
                  Get Started Free
                  <ArrowRight size={18} className="ml-2" />
                </Link>
                <Link 
                  href="/docs" 
                  className="inline-flex items-center px-8 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeaturesPage;
