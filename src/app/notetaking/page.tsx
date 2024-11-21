

"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Loader2, Terminal, Activity, Cpu, Wifi, Database, Command, Box, Zap, FolderInput, Shield, GitBranch, AlertTriangle } from 'lucide-react';

interface Message {
  role: 'assistant' | 'user';
  content: string;
  image?: string;
  id: string;
}

const AIChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '> SYSTEM ONLINE', id: 'init-1' },
    { role: 'assistant', content: '> CONNECTING...', id: 'init-2' },
    { role: 'assistant', content: '> READY', id: 'init-3' }
  ]);
  const [input, setInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accessCode] = useState(Math.random().toString(36).substr(2, 8).toUpperCase());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if ((!input.trim() && !imagePreview) || isLoading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: input, image: imagePreview ?? undefined, id: Date.now().toString() }
    ];
    setMessages(newMessages);
    setInput('');
    setImagePreview(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data: { message: string } = await response.json();
      setMessages([
        ...newMessages,
        { role: 'assistant', content: data.message, id: `response-${Date.now()}` }
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: '> ERROR: FILE TOO LARGE [5MB MAX]', 
          id: `error-${Date.now()}`
        }]);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-4 border-black bg-yellow-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Terminal className="h-5 w-5 text-black" />
              <span className="text-lg font-mono font-black text-black">Bill</span>
            </div>
            <div className="font-mono text-xs border-4 border-black bg-white px-2 py-1">
              ID: {accessCode}
            </div>
          </div>
          
          <div className="flex items-center gap-6 font-mono text-sm">
            <div className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 border-4 border-black">
              <Shield className="h-4 w-4" />
              <span className="font-bold">SECURE</span>
            </div>
            <AlertTriangle className="h-6 w-6 text-black animate-pulse" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-[1fr,320px] gap-6 p-6 h-[calc(100vh-64px)]">
        {/* Main Terminal Area */}
        <div className="border-4 border-black bg-white">
          <div className="border-b-4 border-black p-3 flex items-center justify-between bg-blue-500">
            <div className="flex items-center gap-2 text-black">
              <Terminal className="h-4 w-4" />
              <span className="font-mono text-sm font-bold">MAIN TERMINAL</span>
            </div>
            <div className="flex gap-2">
              <div className="w-4 h-4 bg-red-500 border-2 border-black"></div>
              <div className="w-4 h-4 bg-yellow-400 border-2 border-black"></div>
              <div className="w-4 h-4 bg-green-500 border-2 border-black"></div>
            </div>
          </div>

          <div className="flex-1 font-mono text-sm overflow-auto p-4 h-[calc(100vh-240px)]" ref={containerRef}>
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="flex items-center gap-2 text-black mb-1 text-xs font-bold">
                  {message.role === 'user' ? (
                    <>
                      <GitBranch className="h-3 w-3" />
                      <span>USER</span>
                      <span className="text-gray-500">[{new Date().toISOString()}]</span>
                    </>
                  ) : (
                    <>
                      <Command className="h-3 w-3" />
                      <span>SYSTEM</span>
                      <span className="text-gray-500">[{new Date().toISOString()}]</span>
                    </>
                  )}
                </div>
                <div className={`
                  p-3 border-4 border-black font-mono font-bold
                  ${message.role === 'user'
                    ? 'bg-purple-500 text-white'
                    : 'bg-green-500 text-white'}
                `}>
                  {message.role === 'assistant' ? '> ' : '$ '}{message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-2 text-black font-bold">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>PROCESSING...</span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-black p-4 bg-gray-100">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const input = document.getElementById('image-upload') as HTMLInputElement;
                  input?.click();
                }}
                className="p-2 bg-orange-500 text-white border-4 border-black hover:bg-orange-600"
                title="Upload Data"
              >
                <FolderInput className="h-5 w-5" />
              </button>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="flex-1 relative font-mono">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black font-bold">$</div>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="TYPE MESSAGE"
                  className="w-full pl-7 pr-12 py-2 bg-white text-black border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-blue-500 placeholder:text-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || (!input.trim() && !imagePreview)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-black hover:text-blue-500 disabled:opacity-30"
                >
                  <Zap className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* System Status */}
          <div className="border-4 border-black bg-white p-4">
            <div className="flex items-center gap-2 text-black font-bold mb-4 bg-red-500 p-2">
              <Database className="h-4 w-4" />
              <span className="font-mono text-sm text-white">SYSTEM STATUS</span>
            </div>
            
            <div className="space-y-3 font-mono text-sm">
              {[
                { icon: <Cpu className="h-4 w-4" />, label: 'CORE', status: 'ONLINE', statusColor: 'bg-green-500' },
                { icon: <Wifi className="h-4 w-4" />, label: 'NETWORK', status: 'ACTIVE', statusColor: 'bg-yellow-400' },
                { icon: <Activity className="h-4 w-4" />, label: 'MESSAGES', status: messages.length, statusColor: 'bg-blue-500' }
              ].map((item, index) => (
                <div key={index} className="border-4 border-black p-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-black font-bold">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span className={`${item.statusColor} text-white font-bold px-2 py-1 border-2 border-black`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Data */}
          {imagePreview && (
            <div className="border-4 border-black bg-white p-4">
              <div className="flex items-center gap-2 text-black font-bold mb-4 bg-purple-500 p-2">
                <Box className="h-4 w-4" />
                <span className="font-mono text-sm text-white">UPLOADED IMAGE</span>
              </div>
              <div className="border-4 border-black overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-auto" 
                />
              </div>
              <div className="mt-2 text-xs font-mono text-center bg-yellow-400 p-2 border-2 border-black">
                IMAGE LOADED
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;