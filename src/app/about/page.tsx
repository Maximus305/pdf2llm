"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About PDF2LLM.AI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize how people work with PDFs using the power of artificial intelligence.
          </p>
        </section>

        {/* Our Story */}
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              PDF2LLM.AI was born from a simple observation: while PDFs are universal, working with them isn't always easy. 
              Our team of AI enthusiasts and developers came together to create a solution that makes PDF processing 
              not just easier, but smarter.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of users worldwide, from individual developers to large enterprises, 
              helping them convert PDFs to markdown with unprecedented accuracy and efficiency.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="max-w-7xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "We continuously push the boundaries of what's possible with AI and document processing."
              },
              {
                title: "Reliability",
                description: "Our service is built to be dependable, accurate, and available when you need it."
              },
              {
                title: "User-Centric",
                description: "Every feature we develop is guided by real user needs and feedback."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO & Co-founder",
                image: "/images/team/sarah.jpg"
              },
              {
                name: "Michael Rodriguez",
                role: "CTO & Co-founder",
                image: "/images/team/michael.jpg"
              },
              {
                name: "Emma Wilson",
                role: "Head of AI",
                image: "/images/team/emma.jpg"
              },
              {
                name: "David Kim",
                role: "Lead Developer",
                image: "/images/team/david.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
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

export default AboutPage;
