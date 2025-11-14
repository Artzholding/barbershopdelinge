import { useState } from 'react';
import { QrCode, Download, Printer } from 'lucide-react';

export default function QRCodeGenerator() {
  const [qrSize, setQrSize] = useState('300');
  const baseUrl = window.location.origin;
  const reviewUrl = `${baseUrl}/#/review`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(reviewUrl)}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'barbershop-review-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>QR Code - Barbershop De Linge Reviews</title>
          <style>
            @media print {
              @page { margin: 0; }
              body { margin: 1cm; }
            }
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 20px;
            }
            .container {
              text-align: center;
              max-width: 500px;
            }
            h1 {
              color: #78350f;
              margin-bottom: 10px;
              font-size: 28px;
            }
            p {
              color: #4b5563;
              margin-bottom: 20px;
              font-size: 16px;
            }
            img {
              max-width: 100%;
              height: auto;
              border: 2px solid #78350f;
              border-radius: 10px;
              padding: 20px;
              background: white;
            }
            .footer {
              margin-top: 20px;
              font-size: 14px;
              color: #6b7280;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Scan voor een Review</h1>
            <p>Help ons beter te worden! Scan deze QR code en deel je ervaring</p>
            <img src="${qrCodeUrl}" alt="Review QR Code" />
            <div class="footer">
              <p><strong>Barbershop & Tattoos De Linge</strong></p>
              <p>Lingedijk 26, 6661 EG Elst</p>
            </div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center">
          <QrCode size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">QR Code Generator</h3>
          <p className="text-gray-600">Maak een QR code voor review collectie</p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          QR Code Grootte
        </label>
        <select
          value={qrSize}
          onChange={(e) => setQrSize(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          <option value="200">Klein (200x200)</option>
          <option value="300">Gemiddeld (300x300)</option>
          <option value="500">Groot (500x500)</option>
          <option value="800">Extra Groot (800x800)</option>
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-6 flex flex-col items-center">
        <img
          src={qrCodeUrl}
          alt="Review QR Code"
          className="border-4 border-amber-700 rounded-lg shadow-lg"
        />
        <p className="mt-4 text-sm text-gray-600 text-center">
          Scan om direct een review achter te laten
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
        >
          <Download size={20} />
          Download QR Code
        </button>
        <button
          onClick={handlePrint}
          className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors flex items-center justify-center gap-2 font-semibold"
        >
          <Printer size={20} />
          Print QR Code
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Gebruik Tips:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Plaats de QR code bij de kassa voor directe feedback</li>
          <li>• Hang de code bij de spiegel waar klanten zitten</li>
          <li>• Voeg toe aan visitekaartjes en bonnetjes</li>
          <li>• Plaats bij de uitgang voor feedback bij vertrek</li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 font-medium mb-2">Review URL:</p>
        <input
          type="text"
          value={reviewUrl}
          readOnly
          className="w-full p-2 border border-gray-300 rounded text-xs"
          onClick={(e) => e.currentTarget.select()}
        />
        <p className="text-xs text-gray-500 mt-2">
          Deze link kan ook handmatig worden gedeeld via WhatsApp of SMS
        </p>
      </div>
    </div>
  );
}
