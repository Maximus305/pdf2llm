export interface PDFFile {
    id: string;
    firestoreId?: string;
    name: string;
    isProcessing: boolean;
    pages: AnalyzedPage[];
    userId?: string;
  }
  
  export interface AnalyzedPage {
    page: number;
    description: string;
  }
  
  export interface FirestorePDF {
    id: string;  
    name: string;
    userId: string;
    pages: AnalyzedPage[];
    createdAt: number;
  }
  
  export interface Message {
    role: 'user' | 'assistant';
    content: string;
  }