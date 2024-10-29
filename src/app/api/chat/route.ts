// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

type Role = 'user' | 'assistant' | 'system';

interface ChatMessage {
  role: Role;
  content: string;
  name?: string;
}

interface PDFContext {
  pageNumber: number;
  content: string;
}

interface RequestBody {
  messages: Array<{
    isUser: boolean;
    content: string;
  }>;
  pdfContext?: PDFContext[];
  selectedPdf?: string;
}

export async function POST(req: NextRequest) {
  try {
    console.log('Incoming request headers:', req.headers);
    
    const body: RequestBody = await req.json();
    console.log('Parsed request body:', body);
    
    const { messages, pdfContext, selectedPdf } = body;

    if (!messages || !Array.isArray(messages)) {
      console.log('Invalid input: messages array missing or incorrect');
      return NextResponse.json(
        { message: 'Invalid input: messages array is required' },
        { status: 400 }
      );
    }

    // Create properly typed system message
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are an AI assistant helping users analyze PDF documents. ${
        selectedPdf 
          ? `\n\nCurrently analyzing PDF: "${selectedPdf}"\n\nUse the following extracted content from the PDF to answer questions:\n${
              pdfContext?.map((ctx: PDFContext) => `Page ${ctx.pageNumber}: ${ctx.content}`).join('\n\n')
            }`
          : ''
      }\n\nUse the provided context to give accurate, relevant answers. Break down complex topics and cite specific sections when possible.`
    };

    // Convert messages to proper format
    const formattedMessages: ChatMessage[] = messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.content
    }));

    console.log('System message created:', systemMessage);
    console.log('Formatted messages:', formattedMessages);

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...formattedMessages],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log('OpenAI API response:', completion);

    return NextResponse.json({
      message: completion.choices[0].message.content
    });
    
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Type guard to check if error is an Error object
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { message: 'Error processing chat request', error: errorMessage },
      { status: 500 }
    );
  }
}