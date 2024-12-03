import React, { useState } from "react";
import CryptoJS from "crypto-js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "./home";

function Aes() {
  const [redirecttohome, setredirecttohome] = useState(false);

  const [encryptText, setEncryptText] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
  const [outputFormat, setOutputFormat] = useState("Base64");
  const [encryptResult, setEncryptResult] = useState("");

  const [decryptText, setDecryptText] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [inputFormat, setInputFormat] = useState("Base64");
  const [decryptResult, setDecryptResult] = useState("");

  const encrypt = () => {
    if (encryptKey.length !== 16) {
      alert("Secret key must be exactly 16 characters for AES-128.");
      return;
    }

    const keyArray = CryptoJS.enc.Utf8.parse(encryptKey);
    const encrypted = CryptoJS.AES.encrypt(encryptText, keyArray, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    let encryptedResult;
    if (outputFormat === "Base64") {
      encryptedResult = encrypted.toString(); // Default is Base64
    } else if (outputFormat === "Hex") {
      encryptedResult = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    }

    setEncryptResult(encryptedResult);
  };

  const decrypt = () => {
    if (decryptKey.length !== 16) {
      alert("Secret key must be exactly 16 characters for AES-128.");
      return;
    }

    const keyArray = CryptoJS.enc.Utf8.parse(decryptKey);
    let decryptedResult;

    try {
      if (inputFormat === "Base64") {
        const decrypted = CryptoJS.AES.decrypt(decryptText, keyArray, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });
        decryptedResult = decrypted.toString(CryptoJS.enc.Utf8);
      } else if (inputFormat === "Hex") {
        const encryptedHex = CryptoJS.enc.Hex.parse(decryptText);
        const encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);

        const decrypted = CryptoJS.AES.decrypt(encryptedBase64, keyArray, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });
        decryptedResult = decrypted.toString(CryptoJS.enc.Utf8);
      }

      setDecryptResult(decryptedResult);
    } catch (error) {
      alert("Decryption failed. Please check your key and input.");
    }
  };

  const goBack = () => {
    setredirecttohome(true);
  };

  if (redirecttohome) {
    return <Home />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-200 p-6 flex flex-col items-center">
      {/* Back Button */}
      <div
        onClick={goBack}
        className="cursor-pointer text-blue-600 text-xl flex items-center mb-8 hover:text-blue-800 transition duration-300"
      >
        <ArrowBackIcon />
        <span className="ml-2">Back to Home</span>
      </div>

      {/* Main Content */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">AES Encryption/Decryption</h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mb-6">
          AES (Advanced Encryption Standard) is a symmetric-key block cipher widely used for encrypting sensitive data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Encryption Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">Encryption</h3>

            <label htmlFor="encrypt-text" className="block text-gray-700 mb-2">Enter text to be Encrypted</label>
            <textarea
              className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 mb-4"
              id="encrypt-text"
              rows="4"
              value={encryptText}
              onChange={(e) => setEncryptText(e.target.value)}
              placeholder="Enter Plain Text..."
            ></textarea>

            <label htmlFor="secret-key" className="block text-gray-700 mb-2">Enter Secret Key (128 bits)</label>
            <input
              type="text"
              id="secret-key"
              className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 mb-4"
              value={encryptKey}
              onChange={(e) => setEncryptKey(e.target.value)}
              placeholder="Enter Secret Key"
            />

            <label htmlFor="output-format" className="block text-gray-700 mb-2">Output Text Format</label>
            <select
              id="output-format"
              className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 mb-4"
              onChange={(e) => setOutputFormat(e.target.value)}
              value={outputFormat}
            >
              <option value="Base64">Base64</option>
              <option value="Hex">Hex</option>
            </select>

            <button
              onClick={encrypt}
              className="w-full p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              Encrypt Text
            </button>

            <textarea
              className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 mt-4"
              id="encrypt-result"
              rows="4"
              value={encryptResult}
              placeholder="Encrypted Result..."
              readOnly
            ></textarea>
          </div>

          {/* Decryption Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">Decryption</h3>

            <label htmlFor="decrypt-text" className="block text-gray-700 mb-2">Enter text to be Decrypted</label>
            <textarea
              className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 mb-4"
              id="decrypt-text"
              rows="4"
              value={decryptText}
              onChange={(e) => setDecryptText(e.target.value)}
              placeholder="Enter Encrypted Text..."
            ></textarea>

            <label htmlFor="decrypt-key" className="block text-gray-700 mb-2">Enter Secret Key (128 bits)</label>
            <input
              type="text"
              id="decrypt-key"
              className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 mb-4"
              value={decryptKey}
              onChange={(e) => setDecryptKey(e.target.value)}
              placeholder="Enter Secret Key"
            />

            <label htmlFor="input-format" className="block text-gray-700 mb-2">Input Text Format</label>
            <select
              id="input-format"
              className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 mb-4"
              onChange={(e) => setInputFormat(e.target.value)}
              value={inputFormat}
            >
              <option value="Base64">Base64</option>
              <option value="Hex">Hex</option>
            </select>

            <button
              onClick={decrypt}
              className="w-full p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none transition duration-300"
            >
              Decrypt Text
            </button>

            <textarea
              className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 mt-4"
              id="decrypt-result"
              rows="4"
              value={decryptResult}
              placeholder="Decrypted Result..."
              readOnly
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aes;
