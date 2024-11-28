// components/chat/ChatPanel.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { X, SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPdf: string | null;
  pdfContents?: { pageNumber: number; content: string; }[];
}

const ChatPanel = ({ isOpen, onClose, selectedPdf, pdfContents }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([]);
    setInputValue('');
    setIsLoading(false);
  }, [selectedPdf]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = {
      role: 'user' as const,
      content: inputValue
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(msg => ({
            isUser: msg.role === 'user',
            content: msg.content
          })),
          pdfContext: pdfContents,
          selectedPdf
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your request.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div 
      className={cn(
        "fixed right-0 top-0 h-screen w-[500px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex justify-between items-center p-6 border-b">
        <div>
          <h3 className="text-xl font-semibold text-red-500">Chat about your PDF</h3>
          {selectedPdf && (
            <p className="text-sm text-gray-500 mt-1">
              Currently analyzing: {selectedPdf}
            </p>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="text-gray-600"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-6 h-[calc(100vh-180px)]">
        <div className="space-y-4">
          {messages.length === 0 && selectedPdf && (
            <div className="text-gray-500 text-center p-4">
              Ask a question about your PDF
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg max-w-[80%]",
                message.role === 'user' 
                  ? "bg-black text-white ml-auto" 
                  : "bg-gray-100 text-gray-900"
              )}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className="bg-gray-100 text-gray-900 p-4 rounded-lg max-w-[80%] animate-pulse">
              Thinking...
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="relative">
          <Input
            placeholder="Ask about your PDF..."
            className="pr-12"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading || !selectedPdf}
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading || !selectedPdf}
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;