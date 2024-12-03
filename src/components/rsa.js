import React, { useState } from "react";
import JSEncrypt from "jsencrypt";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Home from "./home";

function Rsa() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [keySize, setKeySize] = useState(2048);  // Default to 2048 bits
  const [manualPublicKey, setManualPublicKey] = useState("");
  const [plainText, setPlainText] = useState("");
  const [manualPrivateKey, setManualPrivateKey] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [result, setResult] = useState("");

  const generateKeys = () => {
    const encryptor = new JSEncrypt({ default_key_size: keySize });
    const pubKey = encryptor.getPublicKey().replace(/(\r?\n|\r|-----.*-----)/g, "");
    const privKey = encryptor.getPrivateKey().replace(/(\r?\n|\r|-----.*-----)/g, "");

    setPublicKey(pubKey);
    setPrivateKey(privKey);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert(`${text} copied to clipboard!`))
      .catch((error) => console.error("Failed to copy: ", error));
  };

  const encrypt = () => {
    if (!manualPublicKey || !plainText) {
      alert("Please provide both a public key and a plaintext message.");
      return;
    }

    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(manualPublicKey);
    const encrypted = encryptor.encrypt(plainText);

    if (!encrypted) {
      alert("Encryption failed. Please check the public key and plaintext.");
      return;
    }

    setEncryptedText(encrypted);
    setResult(encrypted);
  };

  const decrypt = () => {
    if (!manualPrivateKey || !encryptedText) {
      alert("Please provide both a private key and an encrypted message.");
      return;
    }

    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(manualPrivateKey);
    const decrypted = decryptor.decrypt(encryptedText);

    if (!decrypted) {
      alert("Decryption failed. Please check the private key and encrypted message.");
      return;
    }

    setResult(decrypted);
  };

  const goBack = () => setRedirectToHome(true);

  if (redirectToHome) {
    return <Home />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-200 p-6 flex flex-col items-center">
      <div onClick={goBack} className="cursor-pointer text-blue-600 text-xl flex items-center mb-8 hover:text-blue-800 transition duration-300">
        <ArrowBackIcon />
        <span className="ml-2">Back to Home</span>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">RSA Key Generation</h2>

        <div className="mb-6">
          <label htmlFor="key-size" className="block text-gray-700 text-lg font-medium">Select RSA Key Size</label>
          <select
            id="key-size"
            className="w-full p-4 mt-2 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setKeySize(parseInt(e.target.value))}
            value={keySize}
          >
            <option value="512">512 bits</option>
            <option value="1024">1024 bits</option>
            <option value="2048">2048 bits</option>
          </select>
        </div>

        <button
          className="w-full p-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none transition duration-300"
          onClick={generateKeys}
        >
          Generate RSA Key Pair
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <label className="block text-gray-700 font-medium">Public Key</label>
            <div className="flex justify-between mt-2">
              <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
                readOnly
                value={publicKey}
                placeholder="Your public key will appear here"
              />
              <button
                className="ml-4 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-200"
                onClick={() => copyToClipboard(publicKey)}
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Private Key</label>
            <div className="flex justify-between mt-2">
              <textarea
                className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
                readOnly
                value={privateKey}
                placeholder="Your private key will appear here"
              />
              <button
                className="ml-4 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-200"
                onClick={() => copyToClipboard(privateKey)}
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Encryption and Decryption</h2>

      
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800">RSA Encryption</h3>
            <label htmlFor="manual-public-key" className="block text-gray-700 mt-4">Enter Public Key</label>
            <textarea
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
              id="manual-public-key"
              rows="4"
              value={manualPublicKey}
              onChange={(e) => setManualPublicKey(e.target.value)}
              placeholder="Enter Public Key"
            />

            <label htmlFor="plain-text" className="block text-gray-700 mt-4">Plain Text</label>
            <textarea
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
              id="plain-text"
              rows="4"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              placeholder="Enter Plain Text..."
            />

            <button
              className="w-full p-4 bg-blue-600 text-white rounded-xl mt-4 hover:bg-blue-700 focus:outline-none transition duration-300"
              onClick={encrypt}
            >
              Encrypt
            </button>
          </div>

          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800">RSA Decryption</h3>
            <label htmlFor="manual-private-key" className="block text-gray-700 mt-4">Enter Private Key</label>
            <textarea
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
              id="manual-private-key"
              rows="4"
              value={manualPrivateKey}
              onChange={(e) => setManualPrivateKey(e.target.value)}
              placeholder="Enter Private Key"
            />

            <label htmlFor="encrypted-text" className="block text-gray-700 mt-4">Encrypted Text</label>
            <textarea
              className="w-full p-4 mt-2 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
              id="encrypted-text"
              rows="4"
              value={encryptedText}
              onChange={(e) => setEncryptedText(e.target.value)}
              placeholder="Enter Encrypted Text..."
            />

            <button
              className="w-full p-4 bg-blue-600 text-white rounded-xl mt-4 hover:bg-blue-700 focus:outline-none transition duration-300"
              onClick={decrypt}
            >
              Decrypt
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Result</h2>
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500"
            id="result"
            rows="4"
            value={result}
            readOnly
            placeholder="Result will be displayed here"
          />
          <button
            className="w-full p-4 bg-green-600 text-white rounded-xl mt-4 hover:bg-green-700 focus:outline-none transition duration-300"
            onClick={() => copyToClipboard(result)}
          >
            Copy Result
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rsa;
