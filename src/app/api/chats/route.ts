import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  image?: string;
}

interface RequestBody {
  messages: Message[];
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

function isBase64TooLarge(base64String: string, maxSizeInBytes: number): boolean {
  const base64Data = base64String.includes(',') 
    ? base64String.split(',')[1] 
    : base64String;
    
  const paddingBytes = (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);
  const sizeInBytes = ((base64Data.length * 3) / 4) - paddingBytes;
  console.log(`Base64 size: ${sizeInBytes} bytes`);
  return sizeInBytes > maxSizeInBytes;
}

export async function POST(req: NextRequest) {
  console.log('POST request received at /api/chats');

  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is not set');
    return NextResponse.json({ error: 'OpenAI API key is missing' }, { status: 500 });
  }

  let body: RequestBody;
  try {
    body = await req.json();
    console.log('Request body parsed successfully');
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
  }

  const lastMessage = body.messages[body.messages.length - 1];

  try {
    if (lastMessage.image) {
      console.log('Processing message with image');
      
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (isBase64TooLarge(lastMessage.image, maxSizeInBytes)) {
        return NextResponse.json(
          { error: 'Image size exceeds the maximum limit of 5 MB' }, 
          { status: 413 }
        );
      }

      // Format the messages array for vision
      const visionMessages = [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: lastMessage.content // Use the actual user message
            },
            {
              type: "image_url",
              image_url: {
                url: lastMessage.image
              }
            }
          ]
        }
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: visionMessages,
          max_tokens: 3000
        }),
      });

      console.log('OpenAI API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }

      const data: OpenAIResponse = await response.json();
      return NextResponse.json({ message: data.choices[0].message.content });
    } else {
      console.log('Processing text-only message');
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: body.messages,
          max_tokens: 3000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
      }

      const data: OpenAIResponse = await response.json();
      return NextResponse.json({ message: data.choices[0].message.content });
    }
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
}