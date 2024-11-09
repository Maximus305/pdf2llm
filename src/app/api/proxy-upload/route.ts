import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

// Configure Next.js to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

type UploadResponse = {
  success?: boolean;
  images?: Array<{ image: string; page: number }>;
  error?: string;
  details?: string;
};

interface FormidableFile {
  filepath: string;
  newFilename: string;
  originalFilename: string | null;
  mimetype: string | null;
  size: number;
}

async function convertPDFPageToImage(pdfBuffer: Buffer, pageIndex: number): Promise<string> {
  try {
    // Load the PDF document
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    
    // Get the specific page
    const page = pdfDoc.getPages()[pageIndex];
    const { width, height } = page.getSize();

    // Create a new document with just this page
    const singlePagePdf = await PDFDocument.create();
    const [copiedPage] = await singlePagePdf.copyPages(pdfDoc, [pageIndex]);
    singlePagePdf.addPage(copiedPage);

    // Save the single page PDF
    const pageBuffer = await singlePagePdf.save();

    // For testing, return a mock base64 image
    // In production, you'd convert the PDF page to an actual image
    return `data:image/png;base64,mock_image_data_for_page_${pageIndex + 1}`;
  } catch (error) {
    console.error('Error converting page to image:', error);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  console.log('Received upload request');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const form = formidable({
    maxFileSize: 10 * 1024 * 1024, // 10MB limit
    allowEmptyFiles: false,
    keepExtensions: true,
    multiples: false,
    filter: (part) => {
      return part.mimetype ? part.mimetype.includes('application/pdf') : false;
    },
  });

  try {
    // Parse the form data
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('Form parsing error:', err);
            reject(err);
            return;
          }
          resolve([fields, files]);
        });
      }
    );

    // Get the uploaded file
    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const uploadedFile: FormidableFile = Array.isArray(file) ? file[0] : file;
    
    // Read the file
    const pdfBuffer = await fs.promises.readFile(uploadedFile.filepath);
    
    // Load the PDF document to get page count
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const pageCount = pdfDoc.getPageCount();

    console.log(`Processing PDF with ${pageCount} pages`);

    // Process all pages concurrently
    const pagePromises = Array.from({ length: pageCount }, async (_, index) => {
      try {
        const imageData = await convertPDFPageToImage(pdfBuffer, index);
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

    // Clean up the temporary file
    try {
      await fs.promises.unlink(uploadedFile.filepath);
      console.log('Temporary file cleaned up');
    } catch (error) {
      console.error('Error cleaning up temporary file:', error);
    }

    return res.status(200).json({
      success: true,
      images
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    
    return res.status(500).json({
      error: 'An unexpected error occurred',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}