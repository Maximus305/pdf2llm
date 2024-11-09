import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
// Configure Next.js to disable the default body parser




async function convertPDFPageToImage(pdfBuffer: Buffer, pageIndex: number): Promise<string> {
  try {
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    
    // Get the specific page

    

    // Create a new document with just this page
    const singlePagePdf = await PDFDocument.create();
    const [copiedPage] = await singlePagePdf.copyPages(pdfDoc, [pageIndex]);
    singlePagePdf.addPage(copiedPage);

    // Save the single page PDF
  

    // For testing, return a mock base64 image
    // In production, you'd convert the PDF page to an actual image
    return `data:image/png;base64,mock_image_data_for_page_${pageIndex + 1}`;
  } catch (error) {
    console.error('Error converting page to image:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  console.log('Received upload request');

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Load the PDF document to get page count
    const pdfDoc = await PDFDocument.load(buffer);
    const pageCount = pdfDoc.getPageCount();

    console.log(`Processing PDF with ${pageCount} pages`);

    // Process all pages concurrently
    const pagePromises = Array.from({ length: pageCount }, async (_, index) => {
      try {
        const imageData = await convertPDFPageToImage(buffer, index);
        return {
          image: imageData,
          page: index + 1
        };
      } catch (error) {
        console.error(`Error processing page ${index + 1}:`, error);
        return {
          image: `error_page_${index + 1}`,
          page: index + 1
        };
      }
    });

    const images = await Promise.all(pagePromises);

    return NextResponse.json({
      success: true,
      images
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    
    return NextResponse.json({
      error: 'An unexpected error occurred',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}