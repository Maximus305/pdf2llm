"use client";

import React, { useState, useRef, ChangeEvent, useEffect, Suspense } from 'react';
import { Search, Plus, X, SendHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import { cn } from "@/lib/utils";
import { FiCopy, FiDownload } from 'react-icons/fi';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { 
  onAuthStateChanged, 
  User
} from 'firebase/auth';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';

interface PDFFile {
  id: string;
  name: string;
  isProcessing: boolean;
  pages: AnalyzedPage[];
  userId?: string;
}

interface AnalyzedPage {
  page: number;
  description: string;
}

interface FirestorePDF {
  id: string;
  name: string;
  userId: string;
  pages: AnalyzedPage[];
  createdAt: number;
}

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
          <h3 className="text-xl font-semibold">Chat about your PDF!</h3>
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

const PDFAnalyzerContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPdfId = searchParams.get('pdf');
  
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(initialPdfId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const gradientButtonStyle = "bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90";
  
  const updateSelectedFile = (pdfId: string | null) => {
    setSelectedFileId(pdfId);
    if (pdfId) {
      router.replace(`${window.location.pathname}?pdf=${pdfId}`, { 
        scroll: false 
      });
    } else {
      router.replace(window.location.pathname, { 
        scroll: false 
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
      if (user) {
        loadUserPDFs(user.uid);
      } else {
        setPdfFiles([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserPDFs = async (userId: string) => {
    try {
      const pdfQuery = query(
        collection(db, 'pdfs'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(pdfQuery);
      const pdfs: PDFFile[] = [];
      
      for (const doc of querySnapshot.docs) {
        const data = doc.data() as FirestorePDF;
        pdfs.push({
          id: doc.id,
          name: data.name,
          pages: data.pages,
          isProcessing: false
        });
      }
      
      setPdfFiles(pdfs);
    } catch (error) {
      console.error('Error loading PDFs:', error);
      setErrorMessage('Failed to load your PDFs');
    }
  };

  const savePDFToFirebase = async (pdfFile: PDFFile, analyzedPages: AnalyzedPage[]) => {
    if (!user) return;

    try {
      const pdfData: FirestorePDF = {
        id: pdfFile.id,
        name: pdfFile.name,
        userId: user.uid,
        pages: analyzedPages,
        createdAt: Date.now()
      };
      
      await addDoc(collection(db, 'pdfs'), pdfData);
    } catch (error) {
      console.error('Error saving PDF:', error);
      throw new Error('Failed to save PDF');
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      setErrorMessage('Please sign in to upload PDFs');
      return;
    }

    const files = event.target.files;
    if (files) {
      const newPDFs = Array.from(files).filter(file => file.type === "application/pdf");
      if (newPDFs.length > 0) {
        const formattedPDFs = newPDFs.map(file => ({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          isProcessing: false,
          pages: []
        }));

        setPdfFiles(prev => [...prev, ...formattedPDFs]);
        setErrorMessage(null);
        
        updateSelectedFile(formattedPDFs[0].id);
        
        for (let i = 0; i < formattedPDFs.length; i++) {
          await handleProcessing(formattedPDFs[i], newPDFs[i]);
        }
      } else {
        setErrorMessage("Please select valid PDF files.");
      }
    }
  };

  const handleProcessing = async (pdfFile: PDFFile, file: File) => {
    setPdfFiles(prev => prev.map(pdf => 
      pdf.id === pdfFile.id ? { ...pdf, isProcessing: true } : pdf
    ));

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const numPages = pdfDoc.getPageCount();

      const formData = new FormData();
      formData.append('file', file);

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

      await savePDFToFirebase(pdfFile, analyzedPages);

      setPdfFiles(prev => prev.map(pdf => 
        pdf.id === pdfFile.id ? { 
          ...pdf, 
          isProcessing: false, 
          pages: analyzedPages
        } : pdf
      ));

      updateSelectedFile(pdfFile.id);
    } catch (error) {
      console.error('Error processing PDF:', error);
      setErrorMessage('An error occurred while processing the PDF.');
      setPdfFiles(prev => prev.map(pdf => 
        pdf.id === pdfFile.id ? { ...pdf, isProcessing: false } : pdf
      ));
    }
  };

  const handleDeletePDF = async (pdfId: string) => {
    if (!user) {
      setErrorMessage('You must be signed in to delete a PDF.');
      return;
    }
  
    try {
      // Find the PDF document in Firestore
      const pdfQuery = query(
        collection(db, 'pdfs'),
        where('id', '==', pdfId)
      );
      const querySnapshot = await getDocs(pdfQuery);
  
      // Delete each document found
      await Promise.all(querySnapshot.docs.map(doc => deleteDoc(doc.ref)));
  
      // Update local state to remove the deleted PDF
      setPdfFiles(prev => prev.filter(pdf => pdf.id !== pdfId));
      if (selectedFileId === pdfId) {
        updateSelectedFile(null);
      }
    } catch (error) {
      console.error('Error deleting PDF:', error);
      setErrorMessage('Failed to delete PDF');
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

  const filteredPdfFiles = pdfFiles.filter(pdf => 
    pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedFile = pdfFiles.find(pdf => pdf.id === selectedFileId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className={cn(
        "flex min-h-screen max-h-screen overflow-hidden transition-all duration-300 ease-in-out",
        isChatOpen ? "mr-[500px]" : ""
      )}>
        {/* Sidebar */}
        <div className="w-48 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <img src="/images/logo.svg" alt="Logo" className="h-6.1 w-6" />
              <span className="font-semibold">PDF2LLM.AI</span>
            </div>
            <div className="space-y-2">
            <Link href="/dashboard" className={`${gradientButtonStyle} rounded px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95`}>
                Dashboard
              </Link>
              <Link href="/api" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
                API
              </Link>
              <Link href="/api-key" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
                API Key
              </Link>
              <Link href="/settings" className="text-gray-600 px-3 py-2 block transition-transform transform hover:scale-105 active:scale-95">
                Settings
              </Link>
            </div>
          </div>
        </div>
  
        {/* Main content */}
        <div className="flex-1 flex max-h-screen overflow-hidden">
          {/* PDF List */}
          <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            <h1 className="text-2xl font-semibold mb-6">Your PDFs</h1>
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
                  className="bg-black text-white rounded-full h-8 w-8 hover:scale-110"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!user}
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {filteredPdfFiles.length > 0 ? filteredPdfFiles.map((pdf) => (
                <div 
                  key={pdf.id}
                  className={`flex flex-col items-center cursor-pointer relative p-2 rounded-lg aspect-square 
                    ${pdf.id === selectedFileId ? 'bg-gray-100' : ''}`}
                  onClick={() => updateSelectedFile(pdf.id)}
                >
                  <div className="flex items-center justify-center flex-1">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400">
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
                  <span className="text-sm text-center truncate w-full mt-1">{pdf.name}</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute top-2 right-2 text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePDF(pdf.id);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )) : (
                <div className="col-span-7 text-center text-gray-500 mt-10">
                  {!user ? (
                    "Please sign in to view your PDFs"
                  ) : searchQuery ? (
                    "No PDFs match your search"
                  ) : (
                    "Click on + to add your first pdf"
                  )}
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
                      onClick={() => updateSelectedFile(null)}
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
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {page.description}
                          </ReactMarkdown>
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

// Main PDFAnalyzerDashboard component with Suspense
const PDFAnalyzerDashboard = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    }>
      <PDFAnalyzerContent />
    </Suspense>
  );
};

export default PDFAnalyzerDashboard;