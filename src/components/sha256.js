import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Home from "./home"; // Assuming Home component exists in the same directory

function Sha256() {
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const hash256 = async (text) => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    } catch (error) {
      console.error("Error generating hash:", error);
    }
  };

  const handleChange = async (event) => {
    const text = event.target.value;
    setInput(text);
    if (text.trim()) {
      const hash = await hash256(text);
      setOutput(hash);
    } else {
      setOutput(""); 
    }
  };

  const goBack = () => {
    setRedirectToHome(true);
  };

  if (redirectToHome) {
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
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">SHA-256 Hash Generator</h2>

        <p className="text-lg text-gray-600 text-center max-w-2xl mb-6">
          SHA-256 (Secure Hash Algorithm 256-bit) is a cryptographic hash function that outputs a unique 256-bit value for any input.
          It's widely used in securing data, verifying integrity, and supporting applications like blockchain technology, digital certificates.
        </p>

        <div className="mb-8">
          {/* Input Text Area */}
          <textarea
            onChange={handleChange}
            value={input}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none"
            placeholder="Enter text to hash..."
            rows="6"
          />
        </div>

        <div className="mb-8">
          {/* Output Text Area */}
          <textarea
            value={output}
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none"
            placeholder="Generated SHA-256 hash..."
            readOnly
            rows="6"
          />
        </div>

        <div>
          {/* Copy Button for Hash */}
          <button
            className="w-full p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 focus:outline-none transition duration-300"
            onClick={() => navigator.clipboard.writeText(output)}
          >
            Copy Hash
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sha256;
