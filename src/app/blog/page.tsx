"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const blogPosts = [
    {
      title: "Introducing PDF2LLM.AI: The Future of PDF to Markdown Conversion",
      excerpt: "Learn how we're revolutionizing document conversion with advanced AI technology.",
      date: "October 15, 2023",
      author: "PDF2LLM Team",
      slug: "introducing-pdf2llm"
    },
    {
      title: "Best Practices for PDF to Markdown Conversion",
      excerpt: "Discover tips and tricks to get the most out of your PDF conversions.",
      date: "October 10, 2023", 
      author: "Technical Team",
      slug: "conversion-best-practices"
    },
    {
      title: "Enterprise PDF Processing: A Complete Guide",
      excerpt: "Everything you need to know about handling PDFs at scale.",
      date: "October 5, 2023",
      author: "Enterprise Solutions Team",
      slug: "enterprise-pdf-processing"
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

      {/* Hero Section */}
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              PDF2LLM Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Insights, updates and guides about PDF processing and document conversion
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
