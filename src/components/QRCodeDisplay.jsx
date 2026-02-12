import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeDisplay = ({ value, size = 128, title = "QR Code" }) => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <div className="p-2 bg-white border border-gray-300 rounded">
        <QRCode
          value={value}
          size={size}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      </div>
      <p className="text-sm text-gray-600 text-center">
        Scan this QR code for attendance marking
      </p>
    </div>
  );
};

export default QRCodeDisplay;
