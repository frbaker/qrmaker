import React, { useState } from 'react';
import QRCode from 'qrcode';

import './App.css';

function QrCodeGenerator() {
  const [inputText, setInputText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const generateQrCode = async () => {
    try {
      const url = await QRCode.toDataURL(inputText);
      setQrCodeUrl(url);
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Code</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
              text-align: center;
            }
            img.qr-code {
              max-width: 200px;
              max-height: 200px;
            }
            img.logo {
              max-width: 260px;
              max-height: 260px;
              margin-bottom: 20px;
            }
            p {
              margin-top: 20px;
              font-size: 16px;
              word-wrap: break-word;
              max-width: 80%;
            }
          </style>
        </head>
        <body>
          <img class="logo" src="http://bestofthenorthshore.com/imgs/silver-bay-mn.png" alt="Logo" />
          <img class="qr-code" src="${qrCodeUrl}" alt="QR Code" />
          <p>${inputText}</p>
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();

      setTimeout(() => {
        printWindow.print();

        setTimeout(() => {
          printWindow.close();
        }, 500); // Close window after printing
      }, 500); // Ensure content is fully loaded
    };
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Floyd's QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={generateQrCode} style={{ marginLeft: '10px', padding: '10px 20px' }}>
        Generate QR Code
      </button>

      {qrCodeUrl && (
        <div style={{ position: 'relative', display: 'inline-block', marginTop: '20px' }}>
          <h2>Generated QR Code:</h2>
          <img src={qrCodeUrl} alt="QR Code" style={{ width: '200px', height: '200px' }} />
          <img
            src="http://bestofthenorthshore.com/imgs/silver-bay-mn.png"  // Replace with the path to your logo
            alt="Logo"
            style={{
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '60px',
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <button onClick={handleDownload} style={{ padding: '10px 20px', marginRight: '10px' }}>
              Download QR Code
            </button>
            <button onClick={handlePrint} style={{ padding: '10px 20px' }}>
              Print QR Code
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QrCodeGenerator;
