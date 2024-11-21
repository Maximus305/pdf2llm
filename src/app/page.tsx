"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {  
  FileText, 
  ArrowRight, 
  ChevronDown,  
  Code,   
  Zap,
  Sparkles,
  Braces,
  CheckCircle2
} from 'lucide-react';






const HeroSection = () => {
  const [, setIsLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const examples = [
    {
      input: `# Research Findings
      
According to our study, the
implementation of AI in
healthcare has shown a 45%
improvement in early
diagnosis rates.`,
      output: `# Research Findings

According to our study, the
implementation of AI in
healthcare has shown a 45%
improvement in early
diagnosis rates.`
    },
    {
      input: `def calculate_metrics():
    accuracy = 95.7
    precision = 0.92
    recall = 0.89
    return accuracy`,
      output: `\`\`\`python
def calculate_metrics():
    accuracy = 95.7
    precision = 0.92
    recall = 0.89
    return accuracy
\`\`\``
    },
    {
      input: `* First insight
* Second insight
* Third insight
  * Sub-point A
  * Sub-point B`,
      output: `- First insight
- Second insight
- Third insight
  - Sub-point A
  - Sub-point B`
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % examples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col justify-between overflow-x-hidden">
      {/* Background gradients - contained within viewport */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-[-25%] top-0 w-[1000px] h-[1000px] bg-[radial-gradient(circle,#FF5733_0%,transparent_70%)] opacity-[0.08] blur-[120px]" />
        <div className="absolute right-[25%] top-[25%] w-[800px] h-[800px] bg-[radial-gradient(circle,#FF8A4C_0%,transparent_70%)] opacity-[0.05] blur-[130px]" />
        <div className="absolute left-[-25%] top-0 w-[1000px] h-[1000px] bg-[radial-gradient(circle,#FF3333_0%,transparent_70%)] opacity-[0.08] blur-[120px]" />
        <div className="absolute left-[33%] top-[50%] w-[600px] h-[600px] bg-[radial-gradient(circle,#FF4500_0%,transparent_70%)] opacity-[0.05] blur-[100px]" />
      </div>

      {/* Pattern Background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.15]" width="100%" height="100%">
          <defs>
            <pattern id="hero-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 0 L50 0 L50 50 L0 50 Z" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
              <path d="M50 0 L100 0 L100 50 L50 50 Z" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
              <path d="M0 50 L50 50 L50 100 L0 100 Z" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
              <path d="M50 50 L100 50 L100 100 L50 100 Z" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
              <circle cx="50" cy="50" r="3" fill="rgba(255,87,51,0.15)" />
              <circle cx="0" cy="0" r="2" fill="rgba(255,87,51,0.1)" />
              <circle cx="100" cy="100" r="2" fill="rgba(255,87,51,0.1)" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#hero-pattern)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="min-h-screen flex flex-col">
          {/* Content Grid */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center py-12 lg:py-20">
            {/* Left Column - Content */}
            <div className="flex flex-col items-center lg:items-start justify-center space-y-6 lg:space-y-10 max-w-xl mx-auto w-full">
              {/* Feature Badge */}
              <div className="inline-flex items-center rounded-[4px] bg-orange-50 px-3 sm:px-4 py-2 space-x-2">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-orange-500" />
                <span className="text-sm sm:text-base text-orange-600 font-medium">AI-Powered Conversion</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 space-y-2 lg:space-y-4 text-center lg:text-left">
                <div className="relative">
                  PDF to
                  <div className="absolute inset-0 blur-2xl bg-orange-100/40" />
                </div>
                <div className="relative">
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text">Markdown</span>
                  <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-orange-400 to-red-500 opacity-20" />
                </div>
                <div className="relative">
                  Made Simple
                  <div className="absolute inset-0 blur-2xl bg-orange-100/40" />
                </div>
              </h1>

              {/* Feature List */}
              <div className="space-y-4 lg:space-y-6 w-full">
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="relative">
                    <Code className="w-5 sm:w-6 h-5 sm:h-6 relative z-10" />
                    <div className="absolute inset-0 blur-lg bg-orange-500/10" />
                  </div>
                  <span className="text-base lg:text-lg">Perfect Markdown syntax</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="relative">
                    <Braces className="w-5 sm:w-6 h-5 sm:h-6 relative z-10" />
                    <div className="absolute inset-0 blur-lg bg-red-500/10" />
                  </div>
                  <span className="text-base lg:text-lg">Maintains document structure</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="relative">
                    <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 relative z-10" />
                    <div className="absolute inset-0 blur-lg bg-orange-500/10" />
                  </div>
                  <span className="text-base lg:text-lg">99.9% conversion accuracy</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-6 w-full sm:w-auto">
                <Link 
                  href="/sign-up"
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white text-base sm:text-lg font-medium hover:opacity-90 transition-opacity"
                >
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-400 to-red-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  Start Converting
                  <ArrowRight className="ml-2 sm:ml-3 w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <button className="w-full sm:w-auto relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-transparent text-gray-800 text-base sm:text-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
                  <div className="absolute inset-0 -z-10 bg-gray-100/50 blur-xl opacity-50" />
                  Docs
                </button>
              </div>
            </div>

            {/* Right Column - Terminal Demo */}
            <div className="relative w-full max-w-xl lg:max-w-2xl mx-auto transform rotate-0 lg:rotate-2 hover:rotate-0 transition-transform duration-500 mt-8 lg:mt-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 opacity-20 blur rounded-xl" />
              
              <div className="bg-[#0D1117] rounded-xl overflow-hidden shadow-2xl relative">
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-[#161B22] border-b border-gray-800">
                  <div className="flex space-x-2">
                    <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-[#FF5F56]" />
                    <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm sm:text-base text-gray-400">PDF → Markdown</span>
                  </div>
                </div>

                {/* Terminal Content */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <div className="text-sm sm:text-base text-gray-400">Input</div>
                      <pre className="font-mono text-sm sm:text-base text-gray-300 bg-[#1C2128] rounded-lg p-4 sm:p-6 overflow-x-auto">
                        {examples[currentIndex].input}
                      </pre>
                    </div>
                    
                    <div className="flex justify-center py-2">
                      <div className="relative">
                        <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 text-orange-500 relative z-10" />
                        <div className="absolute inset-0 blur-lg bg-orange-500/20" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm sm:text-base text-gray-400">Output</div>
                      <pre className="font-mono text-sm sm:text-base text-gray-300 bg-[#1C2128] rounded-lg p-4 sm:p-6 overflow-x-auto">
                        {examples[currentIndex].output}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learn More Button */}
          <div className="flex justify-center mb-8 lg:mb-12">
            <button 
              onClick={scrollToFeatures}
              className="group flex flex-col items-center space-y-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="text-xs sm:text-sm font-medium">Learn More</span>
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-gray-400 group-hover:bg-gray-50 transition-all">
                <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};



const Page: React.FC = () => {
  const [, setIsAtTop] = useState<boolean>(true);
  const [, setIsPastHero] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const heroHeight = window.innerHeight * .95; // Adjust the threshold to 80% of the viewport height
      setIsAtTop(window.scrollY === 0);
      setIsPastHero(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


 

 

  return (
    <div className="relative">
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 flex justify-between items-center p-3 z-50 transition-all duration-300 bg-white border-b border-gray-300 text-black"
      >
        <div className="flex items-center space-x-2">
          <img src="/images/logo.svg" className="w-5 h-5" alt="Logo" />
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
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-gray-900 text-white hover:bg-gray-800"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <HeroSection/>

     {/* Enhanced Features Section */}
<section id="features" className="py-32 bg-gradient-to-b from-white to-orange-50/30 relative overflow-hidden">
  {/* Decorative Elements */}
  <div className="absolute inset-0">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,#FFF7ED_0%,transparent_70%)] opacity-80" />
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle,#FFF4E6_0%,transparent_70%)] opacity-60" />
    <div className="absolute inset-0 bg-[linear-gradient(110deg,#ffffff_0.8px,transparent_0.8px),linear-gradient(to_bottom,#ffffff_0.8px,transparent_0.8px)] bg-[size:24px_24px] opacity-[0.4]" />
  </div>

  <div className="max-w-7xl mx-auto px-4 relative z-10">
    {/* Header */}
    <div className="text-center mb-24">
      <div className="inline-flex items-center bg-gradient-to-r from-orange-50 to-red-50 rounded-full px-6 py-2 shadow-sm border border-orange-100 mb-6">
        <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text font-medium">
          Experience the Magic
        </span>
      </div>
      <h2 className="text-5xl font-bold mb-6">
        Transform PDFs with
        <span className="bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text"> intelligent tools</span>
      </h2>
      <p className="text-gray-600 text-xl max-w-2xl mx-auto">
        Seamless conversion powered by advanced AI
      </p>
    </div>

    {/* Feature Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
      
      {/* Feature Card 1 */}
      <div className="group relative p-1 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 transition-transform hover:scale-[1.02] duration-300">
        <div className="bg-white rounded-xl p-8 h-full">
          <div className="mb-6 relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center transform transition-transform group-hover:rotate-12">
              <Code className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 blur-2xl bg-orange-200 opacity-0 group-hover:opacity-30 transition-opacity" />
          </div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text mb-4">
            Perfect Syntax
          </h3>
          <p className="text-gray-600">
            Flawless conversion with perfect headers, lists, and code blocks
          </p>
        </div>
      </div>

      {/* Feature Card 2 */}
      <div className="group relative p-1 rounded-2xl bg-gradient-to-r from-red-500 to-orange-400 transition-transform hover:scale-[1.02] duration-300">
        <div className="bg-white rounded-xl p-8 h-full">
          <div className="mb-6 relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-400 flex items-center justify-center transform transition-transform group-hover:rotate-12">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 blur-2xl bg-red-200 opacity-0 group-hover:opacity-30 transition-opacity" />
          </div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-red-500 to-orange-400 text-transparent bg-clip-text mb-4">
            Lightning Fast
          </h3>
          <p className="text-gray-600">
            Process complex documents in milliseconds
          </p>
        </div>
      </div>

      {/* Feature Card 3 */}
      <div className="group relative p-1 rounded-2xl bg-gradient-to-r from-orange-400 to-red-500 transition-transform hover:scale-[1.02] duration-300">
        <div className="bg-white rounded-xl p-8 h-full">
          <div className="mb-6 relative">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center transform transition-transform group-hover:rotate-12">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div className="absolute inset-0 blur-2xl bg-orange-200 opacity-0 group-hover:opacity-30 transition-opacity" />
          </div>
          <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text mb-4">
            Format Magic
          </h3>
          <p className="text-gray-600">
            Preserve complex layouts and formatting with ease
          </p>
        </div>
      </div>
    </div>

    {/* Stats with Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { number: "500K+", label: "Documents Converted", gradient: "from-orange-400 to-red-500" },
        { number: "<500ms", label: "Processing Time", gradient: "from-red-500 to-orange-400" },
        { number: "99.9%", label: "Conversion Accuracy", gradient: "from-orange-400 to-red-500" }
      ].map((stat, index) => (
        <div key={index} 
          className="group  bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 shadow-sm border border-orange-100/50 hover:border-orange-20 transition-all"
        >
          <div className="text-4xl font-bold mb-2">
            <span className={`bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text`}>
              {stat.number}
            </span>
          </div>
          <div className="text-white">{stat.label}</div>
          <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-orange-400 to-red-500 mt-4 transition-all duration-300" />
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
      <section className="py-24">
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
                The most accurate PDF to markdown conversion powered by AI.
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
@keyframes reveal {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: scale(1);
  }
}

@keyframes text-scan {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.scan-animation {
  position: relative;
}

.scan-animation::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(74, 144, 226, 0.2) 50%,
    transparent 100%
  );
  animation: text-scan 3s linear infinite;
  background-size: 50% 100%;
  background-repeat: no-repeat;
}

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

/* Add these new animation styles */
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
  opacity: 0;
}

/* Blueprint grid animation */
@keyframes grid-fade {
  0% {
    opacity: 0;
    background-size: 15px 15px;
  }
  100% {
    opacity: 0.2;
    background-size: 20px 20px;
  }
}

.bg-[radial-gradient(#4A90E2_1px,transparent_1px)] {
  animation: grid-fade 1s ease-out forwards;
}

/* Measurement lines animation */
@keyframes line-draw {
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    width: 100%;
    opacity: 0.4;
  }
}

.border-t-2.border-dashed {
  animation: line-draw 1s ease-out forwards;
}

/* Blueprint annotation fade in */
@keyframes annotation-fade {
  0% {
    opacity: 0;
    transform: translateY(10px) rotate(-6deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotate(-6deg);
  }
}

.text-blue-400\/60 {
  animation: annotation-fade 0.8s ease-out forwards;
  animation-delay: 1s;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Page;
