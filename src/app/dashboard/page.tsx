"use client";

import React, { useState, useRef, ChangeEvent, useEffect, Suspense } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import { PDFDocument } from 'pdf-lib';
import { cn } from "@/lib/utils";
import { FiCopy, FiDownload } from 'react-icons/fi';
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
  doc
} from 'firebase/firestore';

// Import local components
import ChatPanel from './ChatPanel';

// Interfaces
interface PDFFile {
  id: string;
  firestoreId?: string;
  name: string;
  isProcessing: boolean;
  pages: AnalyzedPage[];
  userId?: string;
  error?: boolean;
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

const PDFAnalyzerContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPdfId = searchParams.get('pdf');
  const [, setInitialLoadComplete] = useState(false);
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(initialPdfId);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [processingQueue, setProcessingQueue] = useState<{file: File, pdfFile: PDFFile}[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const gradientButtonStyle = "bg-gradient-to-r from-[#D7524A] to-[#E2673F] text-white hover:opacity-90";

  // Process queue effect
  useEffect(() => {
    const processQueue = async () => {
      if (processingQueue.length > 0 && !isProcessing) {
        setIsProcessing(true);
        const { file, pdfFile } = processingQueue[0];
        
        try {
          await handleProcessing(pdfFile, file);
          setProcessingQueue(prev => prev.slice(1));
        } catch (error) {
          console.error('Error processing PDF:', error);
          setPdfFiles(prev => prev.map(pdf => 
            pdf.id === pdfFile.id ? { ...pdf, isProcessing: false, error: true } : pdf
          ));
          setProcessingQueue(prev => prev.slice(1));
        } finally {
          setIsProcessing(false);
        }
      }
    };

    processQueue();
  }, [processingQueue, isProcessing]);

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
    console.log('Checking authentication state...');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User authenticated:', user.uid);
        setUser(user);
        await loadUserPDFs(user);
      } else {
        console.log('User not authenticated.');
        setPdfFiles([]);
        setSelectedFileId(null);
      }
      setIsLoading(false);
      setInitialLoadComplete(true);
    });

    return () => unsubscribe();
  }, []);

  const loadUserPDFs = async (user: User) => {
    try {
      console.log('Loading PDFs for user:', user.uid);
      const pdfQuery = query(
        collection(db, 'pdfs'),
        where('userId', '==', user.uid)
      );
      
      const querySnapshot = await getDocs(pdfQuery);
      const pdfs: PDFFile[] = [];
      
      for (const doc of querySnapshot.docs) {
        const data = doc.data() as FirestorePDF;
        pdfs.push({
          id: data.id,
          firestoreId: doc.id,
          name: data.name,
          pages: data.pages,
          isProcessing: false
        });
      }
      
      console.log('Loaded PDFs:', pdfs);
      setPdfFiles(pdfs);
      
      if (initialPdfId) {
        const pdfExists = pdfs.some(pdf => pdf.id === initialPdfId);
        if (pdfExists) {
          setSelectedFileId(initialPdfId);
        }
      }
    } catch (error) {
      console.error('Error loading PDFs:', error);
      setErrorMessage('Failed to load your PDFs');
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
        const formattedPDFs = newPDFs.map(file => {
          const id = `${file.name}-${Date.now()}`.replace(/[^a-zA-Z0-9]/g, '-');
          return {
            id,
            name: file.name,
            isProcessing: true,
            pages: []
          };
        });
  
        setPdfFiles(prev => [...prev, ...formattedPDFs]);
        
        setProcessingQueue(prev => [
          ...prev,
          ...formattedPDFs.map((pdf, index) => ({
            file: newPDFs[index],
            pdfFile: pdf
          }))
        ]);
  
        if (!selectedFileId) {
          updateSelectedFile(formattedPDFs[0].id);
        }
  
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setErrorMessage("Please select valid PDF files.");
      }
    }
  };

  const handleProcessing = async (pdfFile: PDFFile, file: File) => {
    try {
      console.log(`Starting processing for PDF: ${pdfFile.name}`);
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
  
      const firestoreId = await savePDFToFirebase(pdfFile, analyzedPages);
  
      setPdfFiles(prev => prev.map(pdf => 
        pdf.id === pdfFile.id ? { 
          ...pdf, 
          isProcessing: false, 
          pages: analyzedPages,
          firestoreId,
          error: false
        } : pdf
      ));
  
    } catch (error) {
      console.error('Error processing PDF:', error);
      throw error;
    }
  };

  const savePDFToFirebase = async (pdfFile: PDFFile, analyzedPages: AnalyzedPage[]): Promise<string> => {
    if (!user) throw new Error('User not authenticated');
  
    try {
      console.log('Saving PDF to Firebase:', pdfFile.name);
      const pdfData: FirestorePDF = {
        id: pdfFile.id,
        name: pdfFile.name,
        userId: user.uid,
        pages: analyzedPages,
        createdAt: Date.now()
      };
      
      const docRef = await addDoc(collection(db, 'pdfs'), pdfData);
      console.log('PDF saved with Firestore ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving PDF:', error);
      throw new Error('Failed to save PDF');
    }
  };

  const handleDeletePDF = async (pdfId: string) => {
    if (!user) {
      setErrorMessage('You must be signed in to delete a PDF.');
      return;
    }
  
    const pdfToDelete = pdfFiles.find(pdf => pdf.id === pdfId);
    if (!pdfToDelete?.firestoreId) {
      console.error('Firestore ID not found for PDF');
      return;
    }
  
    try {
      console.log('Deleting PDF from Firebase:', pdfToDelete.name);
      await deleteDoc(doc(db, 'pdfs', pdfToDelete.firestoreId));
      console.log('PDF deleted successfully.');
      
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
      console.log('Copying text to clipboard...');
      await navigator.clipboard.writeText(text);
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 1000);
      console.log('Text copied successfully.');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleDownload = (text: string, pageNum: number) => {
    console.log(`Downloading page ${pageNum} as markdown...`);
    const element = document.createElement('a');
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `page_${pageNum}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    console.log(`Page ${pageNum} downloaded.`);
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
                  ) : searchQuery ? ("No PDFs match your search"
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
            <div className="p-6 bg-gray-50">
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
                            className={`h-8 w-8 ${isClicked ? 'bg-green-500 hover:bg-green-500' : ''}`}
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