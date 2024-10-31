import React from 'react';

const PDFToMarkdownPage = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center text-center p-4"
      style={{ 
        background: 'radial-gradient(circle at center, #1A2433 0%, #0D1117 100%)'
      }}
    >
      <h1 className="text-4xl md:text-5xl text-white font-medium">
        Transform PDFs into{' '}
        <span 
          className="text-[#D86244] font-normal"
          style={{ 
            textShadow: '0 0 20px rgba(216, 98, 68, 0.3)'
          }}
        >
          Precise
        </span>{' '}
        Markdown.
      </h1>
      
      <p className="text-gray-300 mt-2 text-lg">
        Experience the world's most accurate PDF to Markdown<br />
        conversion, powered by ChatGPT.
      </p>
    </div>
  );
};

export default PDFToMarkdownPage;