import { NextRequest, NextResponse } from 'next/server';

interface ImageData {
  image: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// Function to check if base64 string is too large
function isBase64TooLarge(base64String: string, maxSizeInBytes: number): boolean {
  const paddingBytes = (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0);
  const sizeInBytes = ((base64String.length * 3) / 4) - paddingBytes;
  console.log(`Base64 size: ${sizeInBytes} bytes`);
  return sizeInBytes > maxSizeInBytes;
}

export async function POST(req: NextRequest) {
  console.log('POST request received at /api/analyze-image');

  // Check if the API key is set
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API key is not set');
    return NextResponse.json({ error: 'OpenAI API key is missing' }, { status: 500 });
  } else {
    console.log('OpenAI API key is set');
  }

  let requestBody;
  try {
    requestBody = await req.json();
    console.log('Request body parsed successfully');
  } catch (error) {
    console.error('Error parsing request body:', error);
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
  }

  console.log('Request body:', requestBody);

  const { image } = requestBody as ImageData;

  if (!image) {
    console.log('No image data found in request body');
    return NextResponse.json({ error: 'Invalid input: image data is required' }, { status: 400 });
  }

  // Check if the base64 image is too large
  const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB limit
  if (isBase64TooLarge(image, maxSizeInBytes)) {
    console.error('The base64 image is too large!');
    return NextResponse.json({ error: 'Image size exceeds the maximum limit of 5 MB' }, { status: 413 });
  }

  console.log('Image data found, length:', image.length);

  try {
    console.log('Preparing to send request to OpenAI API');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: 'say everything you see in the image but in markdown, including describeing images and charts dont tell me that its markdown (or include the three grave accents)just show markdown and also all the text no'
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${image}`
                }
              }
            ]
          }
        ],
        max_tokens: 3000
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error! status: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    console.log('OpenAI API response parsed successfully');

    const description = data.choices[0].message.content;
    console.log('Image description:', description);

    return NextResponse.json({
      message: 'Image analyzed successfully',
      analyzedImage: { image, description },
    });
  } catch (error) {
    console.error('Error in try block:', error);
    return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 });
  }
}

// Log when the module is loaded
console.log('Analyze image route module loaded');