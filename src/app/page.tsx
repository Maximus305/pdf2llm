"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Page = () => {
  const [isTop, setIsTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isSignInPage = pathname === '/sign-in';
  const isSignUpPage = pathname === '/sign-up';

  return (
    <div className="relative">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50 transition-colors duration-300 ${isTop ? 'bg-transparent text-white' : 'bg-white text-black backdrop-filter backdrop-blur-md'}`}>
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.svg" alt="Logo" width={28} height={28} />
          <span className="font-semibold text-base">PDF2LLM.AI</span>
        </div>
        <div className="flex space-x-3">
          <Link href="/sign-in" className="text-sm font-semibold hover:text-gray-300 transition-colors">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden" style={{ paddingTop: '112px' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black" />
        
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />

        <div className="text-center mb-32 relative z-10">
            <h1 className="text-white text-5xl font-semibold mb-4 drop-shadow-2xl">
                Transform PDFs into Precise Markdown.
            </h1>
            <p className="text-gray-300 text-lg mb-8">
                Experience the world&apos;s most accurate PDF to Markdown<br />
                conversion, powered by ChatGPT.
            </p>
            <Link href="/sign-in" className="group relative inline-flex">
                <span className="animate-border-fast absolute -inset-[3px] rounded-lg bg-gradient-to-r from-[#FF8B64] via-orange-500 to-[#D7524A] opacity-70 blur-sm transition-all duration-200 group-hover:opacity-100"></span>
                <span className="animate-border-fast absolute -inset-[2px] rounded-lg bg-gradient-to-r from-[#FF8B64] via-orange-500 to-[#D7524A]"></span>
                <span className="relative inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gray-900 text-white font-medium transition-colors duration-200 group-hover:bg-gray-800">Get Started</span>
            </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <h2 className="text-5xl font-medium text-center mb-20">
            We convert pdfs <span className="bg-[#FF8B64] px-1">beyond</span><br />
            text with <span className="font-bold">AI</span>.
          </h2>

          <div className="flex justify-between items-center gap-12">
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg p-8 shadow-lg">
                <div className="space-y-2 mb-6">
                  <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-300 rounded w-full"></div>
                  <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                </div>
                <div className="border border-gray-200 rounded p-4">
                  <div className="flex h-32 gap-2">
                    <div className="w-1/4 bg-green-400 rounded-t self-end h-1/2"></div>
                    <div className="w-1/4 bg-[#D7524A] rounded-t self-end h-2/3"></div>
                    <div className="w-1/4 bg-blue-400 rounded-t self-end h-full"></div>
                    <div className="w-1/4 bg-purple-400 rounded-t self-end h-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-24 h-px bg-gray-300 relative">
              <div className="absolute -right-2 -top-1 w-3 h-3 border-t-2 border-r-2 border-gray-300 transform rotate-45"></div>
            </div>

            <div className="flex-1">
              <div className="bg-gray-900 rounded-lg p-8 space-y-8 shadow-lg border border-[#D7524A]">
                <div className="flex items-center justify-between text-white">
                  <span>Text converted:</span>
                  <Check className="text-green-400" size={24} />
                </div>
                <div className="flex items-center justify-between text-white">
                  <span>Charts converted</span>
                  <Check className="text-green-400" size={24} />
                </div>
                <div className="flex items-center justify-between text-white">
                  <span>Images Described</span>
                  <Check className="text-green-400" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Section */}
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
        <div className="max-w-6xl w-full space-y-8">
          <h2 className="text-white text-5xl font-medium text-center mb-16">
            Use our API to convert any amount of pages
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="space-y-4">
                <p className="text-white text-lg">Loading pdfs</p>
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-[#D7524A] to-[#D7524A] rounded-full transform transition-transform duration-1000 animate-progress"></div>
                </div>
                <p className="text-white text-right">99%</p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <h3 className="text-white text-6xl font-bold">
                1k pages +<br />limits
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = `
@keyframes progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}

@keyframes convert {
  0%, 100% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}

.convert-animation {
  animation: convert 3s ease-in-out infinite;
}

@keyframes border-move {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

.animate-border-fast {
  background-size: 200% 200%;
  animation: border-move 1s linear infinite;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Page;