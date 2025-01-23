import React, { useState } from "react";
import QrCode from "react-qr-code";

export default function QrCodeGenerator() {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">QR Code Generator</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <input
          type="text"
          name="qr-code"
          placeholder="Enter the value here"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-center mt-6">
          {value ? (
            <QrCode value={value} size={256} />
          ) : (
            <p className="text-gray-500">
              Enter a value to generate a QR code.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
