"use client"

import React, { useState, useRef, ChangeEvent } from 'react';
import { Search, Plus, X, SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import { cn } from "@/lib/utils";
import { FiCopy, FiDownload } from 'react-icons/fi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PDFFile {
  file: File;
  id: string;
  name: string;
  isProcessing: boolean;
  pages: AnalyzedPage[];
}

interface AnalyzedPage {
  page: number;
  description: string;
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
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div className="text-3xl font-semibold">Chat about your PDF</div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="text-gray-600"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6 h-[calc(100vh-180px)]">
        <div className="space-y-4">
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
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          ))}
          {isLoading && (
            <div className="bg-gray-100 text-gray-900 p-4 rounded-lg max-w-[80%] animate-pulse">
              Thinking...
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Chat Input */}
      <div className="p-6 border-t">
        <div className="relative">
          <Input
            placeholder="Ask about your PDF..."
            className="pl-4 pr-12 h-12 rounded-full border-[#D7524A] focus:border-[#E2673F] focus:ring-[#E2673F]"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black h-8 w-8 disabled:opacity-50"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            <SendHorizontal className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const PDFAnalyzerDashboard = () => {
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const gradientButtonStyle = "bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90";

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPDFs = Array.from(files).filter(file => file.type === "application/pdf");
      if (newPDFs.length > 0) {
        const formattedPDFs = newPDFs.map(file => ({
          file,
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          isProcessing: false,
          pages: []
        }));

        setPdfFiles(prev => [...prev, ...formattedPDFs]);
        setErrorMessage(null);

        // Process each PDF automatically after adding
        formattedPDFs.forEach(pdf => handleProcessing(pdf));
      } else {
        setErrorMessage("Please select valid PDF files.");
      }
    }
  };

  const handleProcessing = async (pdfFile: PDFFile) => {
    setPdfFiles(prev => prev.map(pdf => 
      pdf.id === pdfFile.id ? { ...pdf, isProcessing: true } : pdf
    ));

    try {
      const arrayBuffer = await pdfFile.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const numPages = pdfDoc.getPageCount();

      const formData = new FormData();
      formData.append('file', pdfFile.file);

      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const analyzedPages = await Promise.all(
        Array.from({ length: numPages }, async (_, i) => {
          const analysisResponse = await axios.post('/api/analyze-image', {
            image: response.data.images[i].image
          });
          return {
            page: i + 1,
            description: analysisResponse.data.analyzedImage.description
          };
        })
      );

      setPdfFiles(prev => prev.map(pdf => 
        pdf.id === pdfFile.id ? { ...pdf, isProcessing: false, pages: analyzedPages } : pdf
      ));

      setSelectedFileId(pdfFile.id);
    } catch (error) {
      console.error('Error processing PDF:', error);
      setErrorMessage('An error occurred while processing the PDF.');
      setPdfFiles(prev => prev.map(pdf => 
        pdf.id === pdfFile.id ? { ...pdf, isProcessing: false } : pdf
      ));
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = (text: string, pageNum: number) => {
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `page_${pageNum}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const selectedFile = pdfFiles.find(pdf => pdf.id === selectedFileId);
  const filteredPdfFiles = pdfFiles.filter(pdf => 
    pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div 
        className={cn(
          "flex min-h-screen max-h-screen overflow-hidden transition-all duration-300 ease-in-out",
          isChatOpen ? "mr-[500px]" : ""
        )}
      >
        {/* Sidebar */}
        <div className="w-48 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/images/logo.svg" alt="Logo" className="h-6 w-6" />
              <span className="font-semibold">PDF2LLM.AI</span>
            </div>
            <div className="space-y-2">
              <div className={`${gradientButtonStyle} rounded px-3 py-2`}>
                Dashboard
              </div>
              <div className="text-gray-600 px-3 py-2">
                API
              </div>
              <div className="text-gray-600 px-3 py-2">
                API key
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex max-h-screen overflow-hidden">
          {/* PDF List */}
          <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-6">Your pdfs</h1>
            <div className="flex items-center justify-between mb-8">
              <div className="relative flex-1 mr-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  type="text"
                  placeholder="Search for pdf"
                  className="pl-9 pr-4 h-10 w-full bg-gray-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" className="text-gray-600">
                  Options
                </Button>
                <Button 
                  size="icon" 
                  className="bg-black text-white rounded-full h-8 w-8"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {filteredPdfFiles.length > 0 ? filteredPdfFiles.map((pdf) => (
                <div 
                  key={pdf.id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setSelectedFileId(pdf.id)}
                >
                  <div className="mb-2 relative">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M12 18v-6" />
                      <path d="m9 15 3 3 3-3" />
                    </svg>
                    {pdf.isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-center">{pdf.name}</span>
                </div>
              )) : (
                <div className="col-span-3 text-center text-gray-500 mt-10">
                  {searchQuery ? "No PDFs match your search" : "No PDFs uploaded yet"}
                </div>
              )}
            </div>
          </div>

          {/* PDF Preview */}
          <div className="w-1/2 flex flex-col h-screen max-h-screen overflow-hidden">
            {/* Fixed header */}
            <div className="p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  {selectedFile ? selectedFile.name : "Select a PDF"}
                </h2>
                {selectedFile && (
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-gray-600">
                      Options
                    </Button>
                    <Button variant="ghost" className="text-gray-600">
                      Share
                    </Button>
                    <Button
                      className={gradientButtonStyle}
                      onClick={() => setIsChatOpen(true)}
                    >
                      Ask about your pdf
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-gray-600"
                      onClick={() => setSelectedFileId(null)}
                      >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {selectedFile ? (
                <div className="space-y-4">
                  {selectedFile.pages.map((page, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">Page {page.page}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Viewing:</span>
                            <Button variant="ghost" className="text-gray-900 font-medium">
                              Markdown Preview
                            </Button>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8"
                            onClick={() => handleCopy(page.description)}
                          >
                            <FiCopy className="h-4 w-4 text-gray-600" />
                          </Button>
                          
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="h-8 w-8"
                            onClick={() => handleDownload(page.description, page.page)}
                          >
                            <FiDownload className="h-4 w-4 text-gray-600" />
                          </Button>
                        </div>
                      </div>
                      <div className="prose max-w-none bg-white rounded-lg p-4">
                        {page.description ? (
                          <ReactMarkdown>{page.description}</ReactMarkdown>
                        ) : (
                          <div className="text-gray-500 text-center py-4">
                            Processing page content...
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center mt-10">
                  Select a PDF to view its contents
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when chat is open */}
      {isChatOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-30"
          onClick={() => setIsChatOpen(false)}
        />
      )}

      {/* Chat Panel */}
      <ChatPanel 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        selectedPdf={selectedFile?.name ?? null}
        pdfContents={selectedFile?.pages.map(page => ({
          pageNumber: page.page,
          content: page.description
        }))}
      />

      {/* Hidden file input */}
      <input
        type="file"
        accept=".pdf"
        ref={fileInputRef}
        className="hidden"
        multiple
        onChange={handleFileChange}
      />

      {/* Error message toast */}
      {errorMessage && (
        <div 
          className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg"
          onClick={() => setErrorMessage(null)}
        >
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default PDFAnalyzerDashboard;