// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Verify API key exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

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
    // Parse request body with error handling
    let body: RequestBody;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { message: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { messages, pdfContext, selectedPdf } = body;

    if (!messages?.length) {
      return NextResponse.json(
        { message: 'Messages array is required and must not be empty' },
        { status: 400 }
      );
    }

    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are an AI assistant helping users analyze PDF documents. ${
        selectedPdf 
          ? `\n\nCurrently analyzing PDF: "${selectedPdf}"\n\nUse the following extracted content from the PDF to answer questions:\n${
              pdfContext?.map(ctx => `Page ${ctx.pageNumber}: ${ctx.content}`).join('\n\n')
            }`
          : ''
      }\n\nUse the provided context to give accurate, relevant answers. Break down complex topics and cite specific sections when possible.`
    };

    const formattedMessages: ChatMessage[] = messages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.content
    }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [systemMessage, ...formattedMessages],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI API');
    }

    return NextResponse.json({
      message: completion.choices[0].message.content
    });
    
  } catch (error) {
    console.error('Chat API Error:', error);
    
    if (error instanceof Error) {
      // Handle OpenAI API errors specifically
      if ('status' in error && typeof error.status === 'number') {
        return NextResponse.json(
          { message: error.message },
          { status: error.status }
        );
      }
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}