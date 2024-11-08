"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {  
  FileText, 
  ArrowRight, 
  ChevronDown, 
  ChevronRight, 
  Code, 
  FileJson, 
  Book, 
  Zap,
  LucideIcon 
} from 'lucide-react';


interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}



const Page: React.FC = () => {
  const [, setIsAtTop] = useState<boolean>(true);
  const [isPastHero, setIsPastHero] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const heroHeight = window.innerHeight;
      setIsAtTop(window.scrollY === 0);
      setIsPastHero(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      const offset = -20;
      const elementPosition = featuresSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const features: Feature[] = [
    {
      icon: Code,
      title: "Perfect Markdown",
      description: "Convert PDFs to clean, properly formatted Markdown with accurate headers, lists, and code blocks.",
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
      delay: 0
    },
    {
      icon: FileJson,
      title: "Structure Preserved",
      description: "Maintain document structure including tables, images, and complex formatting.",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
      delay: 100
    },
    {
      icon: Book,
      title: "Multiple Formats",
      description: "Support for academic papers, documentation, books, and other complex documents.",
      gradient: "bg-gradient-to-br from-orange-500 to-red-600",
      delay: 200
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process documents quickly with our optimized conversion pipeline.",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      delay: 300
    }
  ];

  const renderFloatingElements = (): JSX.Element => (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(circle,#888_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Header */}
      <header 
        className={`
          fixed top-0 left-0 right-0 
          flex justify-between items-center p-4 
          z-50 transition-all duration-300
          ${isPastHero 
            ? 'bg-transparent text-black' 
            : 'bg-transparent text-white'}
        `}
      >
        <div className="flex items-center space-x-2">
          <img src="/images/logo.svg" className="w-6 h-6" alt="Logo" />
          <span className="font-semibold text-base">PDF2LLM.AI</span>
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="/pricing" className="text-sm font-medium hover:text-gray-300 transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:text-gray-300 transition-colors">
            Documentation
          </Link>
          <Link href="/sign-in" className="text-sm font-medium hover:text-gray-300 transition-colors">
            Sign In
          </Link>
          <Link 
            href="/sign-up" 
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${isPastHero 
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-white text-gray-900 hover:bg-gray-100'}
            `}
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black" />
        
        {renderFloatingElements()}

        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-60 h-60 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="text-center relative z-10 max-w-5xl mx-auto px-4">
          <h1 className="text-white text-6xl font-bold mb-6 leading-tight">
            Transform PDFs into Precise{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
              Markdown
            </span>
          </h1>
          <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
            Experience the world&apos;s most accurate PDF to Markdown conversion, powered by ChatGPT.
          </p>
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center justify-center space-x-4">
            <Link href="/sign-up" className="group relative inline-flex">
                <span className="animate-border-fast absolute -inset-[3px] rounded-lg bg-gradient-to-r from-[#FF8B64] via-orange-500 to-[#D7524A] opacity-70 blur-sm transition-all duration-200 group-hover:opacity-100" />
                <span className="animate-border-fast absolute -inset-[2px] rounded-lg bg-gradient-to-r from-[#FF8B64] via-orange-500 to-[#D7524A]" />
                <span className="relative inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gray-900 text-white font-medium transition-colors duration-200 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:via-orange-500 group-hover:to-red-500">
                  Get Started
                  <ArrowRight size={18} className="ml-2" />
                </span>
              </Link>
              <Link 
                href="/docs" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
              >
                View Docs
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
            <button 
              onClick={scrollToFeatures}
              className="flex flex-col items-center text-white/80 hover:text-white transition-colors group"
            >
              <span className="text-sm mb-2">Learn More</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gray-100 dark:bg-gray-800">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
      <span className="text-orange-600 dark:text-orange-500 font-semibold uppercase mb-4 text-sm">
        Features
      </span>
      <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        Convert PDFs beyond expectations
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
        Our AI-powered conversion maintains perfect fidelity while transforming complex PDFs into clean, structured Markdown.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
      {features.map((feature, index) => (
        <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center h-64 w-64">
          <div className="flex items-center justify-center mb-4">
            <feature.icon className="text-gray-900 dark:text-white" size={32} />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-center text-gray-900 dark:text-white">{feature.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      

      {/* How it Works Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Three simple steps to convert your PDFs into perfect Markdown
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FileText,
                title: "1. Upload PDF",
                description: "Upload your PDF through our interface or API"
              },
              {
                icon: Zap,
                title: "2. AI Processing",
                description: "Our AI analyzes and converts your document"
              },
              {
                icon: Code,
                title: "3. Get Markdown",
                description: "Download perfectly formatted Markdown"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to transform your PDFs?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of developers who trust our service for their PDF to Markdown conversion needs.
            </p>
            <Link 
              href="/sign-up" 
              className="inline-flex items-center px-8 py-3 rounded-lg bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started for Free
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/images/logo.svg" className="w-8 h-8 rounded-lg" alt="Logo" />
                <span className="font-semibold text-lg">PDF2LLM.AI</span>
              </div>
              <p className="text-gray-400">
                The most accurate PDF to Markdown conversion powered by AI.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: [
                  { href: "/features", text: "Features" },
                  { href: "/pricing", text: "Pricing" },
                  { href: "/enterprise", text: "Enterprise" }
                ]
              },
              {
                title: "Resources",
                links: [
                  { href: "/docs", text: "Documentation" },
                  { href: "/api", text: "API Reference" },
                  { href: "/blog", text: "Blog" }
                ]
              },
              {
                title: "Company",
                links: [
                  { href: "/about", text: "About" },
                  { href: "/contact", text: "Contact" },
                  { href: "/legal", text: "Legal" }
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        href={link.href} 
                        className="text-gray-400 hover:text-white"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} PDF2LLM.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>


    </div>
  );
};


const styles = `
@keyframes border-move {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Hide Scrollbar */
::-webkit-scrollbar {
  display: none;
}

/* Enable smooth scrolling and hide scrollbar */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  scroll-behavior: smooth;
}

.animate-border-fast {
  background-size: 200% 200%;
  animation: border-move 1s linear infinite;
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Hover Effects */
.hover-lift {
  transition: transform 0.2s ease-in-out;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Gradient Text */
.gradient-text {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* Glass Effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Custom Button States */
.btn-primary {
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Card Hover Effects */
.card-hover {
  transition: all 0.3s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Background Patterns */
.bg-pattern {
  background-image: radial-gradient(circle, rgba(255,255,255,.2) 1px, transparent 1px);
  background-size: 20px 20px;
}

/* Responsive Design Helpers */
@media (max-width: 768px) {
  .mobile-padding {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .mobile-text-center {
    text-align: center;
  }
  
  .mobile-stack {
    flex-direction: column;
  }

  .mobile-hidden {
    display: none;
  }
}

/* Focus States */
.focus-ring {
  outline: none;
  ring: 2px;
  ring-offset: 2px;
  ring-opacity: 0.5;
}

/* Learn More Button Hover Effect */
.learn-more-btn {
  transition: all 0.3s ease-in-out;
}

.learn-more-btn:hover .chevron-down {
  transform: translateY(4px);
}

.feature-icon-container {
  transition: all 0.3s ease-in-out;
}

.feature-icon-container:hover {
  background: linear-gradient(135deg, #FF8B64 0%, #FF7B54 100%);
}

.feature-icon-container:hover svg {
  color: white;
}

/* Improved Accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}



export default Page;