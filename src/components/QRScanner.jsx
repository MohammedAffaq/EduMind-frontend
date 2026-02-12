import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Camera, CameraOff, CheckCircle, XCircle, Clock } from 'lucide-react';

const QRScanner = ({ onScanSuccess, onScanError, isActive = true }) => {
  const scannerRef = useRef(null);
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const [scanStatus, setScanStatus] = useState(null); // 'success', 'error', null

  useEffect(() => {
    if (isActive && !scanner) {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );

      html5QrcodeScanner.render(
        (decodedText, decodedResult) => {
          // Success callback
          setLastScan(decodedText);
          setScanStatus('success');
          setIsScanning(false);

          if (onScanSuccess) {
            onScanSuccess(decodedText, decodedResult);
          }

          // Clear status after 3 seconds
          setTimeout(() => {
            setScanStatus(null);
            setLastScan(null);
          }, 3000);
        },
        (errorMessage) => {
          // Error callback - only log if it's not a common scanning error
          if (!errorMessage.includes('No QR code found')) {
            console.warn('QR Scan error:', errorMessage);
            if (onScanError) {
              onScanError(errorMessage);
            }
          }
        }
      );

      setScanner(html5QrcodeScanner);
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [isActive, onScanSuccess, onScanError]);

  const toggleScanning = () => {
    if (scanner) {
      if (isScanning) {
        scanner.pause();
        setIsScanning(false);
      } else {
        scanner.resume();
        setIsScanning(true);
      }
    }
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear().catch(console.error);
      setScanner(null);
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div
          id="qr-reader"
          ref={scannerRef}
          className="w-full max-w-md mx-auto border-2 border-gray-300 rounded-lg overflow-hidden"
          style={{ minHeight: '300px' }}
        />

        {/* Status Overlay */}
        {scanStatus && (
          <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg transition-opacity duration-300 ${scanStatus ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-center text-white">
              {scanStatus === 'success' ? (
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle size={48} className="text-green-400" />
                  <p className="text-lg font-semibold">Attendance Marked!</p>
                  <p className="text-sm opacity-90">Present</p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <XCircle size={48} className="text-red-400" />
                  <p className="text-lg font-semibold">Scan Failed</p>
                  <p className="text-sm opacity-90">Try again</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scanning Indicator */}
        {isScanning && !scanStatus && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>Scanning</span>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex space-x-4">
        <button
          onClick={toggleScanning}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isScanning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isScanning ? <CameraOff size={20} /> : <Camera size={20} />}
          <span>{isScanning ? 'Pause' : 'Start'} Scanning</span>
        </button>

        <button
          onClick={stopScanning}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
        >
          <XCircle size={20} />
          <span>Stop</span>
        </button>
      </div>

      {/* Last Scan Info */}
      {lastScan && scanStatus === 'success' && (
        <div className="w-full max-w-md p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 text-green-800">
            <CheckCircle size={20} />
            <div>
              <p className="font-medium">Attendance Recorded</p>
              <p className="text-sm opacity-75">User ID: {lastScan}</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-gray-600 text-sm max-w-md">
        <p>Position the QR code within the scanning area.</p>
        <p>Ensure good lighting and hold steady for best results.</p>
      </div>
    </div>
  );
};

export default QRScanner;
