import React, { useState } from "react";
import Sha256 from "./sha256";
import Rsa from "./rsa";
//
import Aes from "./Aes";  
import back from "./back.jpg";
import { CiCalendarDate } from 'react-icons/ci'; 

function Home() {
  const [redirect, setRedirect] = useState(null);

  const renderRedirect = () => {
    switch (redirect) {
      case "sha256":
        return <Sha256 />;
      case "rsa":
        return <Rsa />;
      case "aes":
        return <Aes />; 
      default:
        return null;
    }
  };

  if (redirect) {
    return renderRedirect();
  }

  return (
    <div className="relative min-h-screen">
  
      <img className="back_img absolute inset-0 w-full h-full object-cover" src={back} alt="Background" />
      
      <div className="container mx-auto pt-24 flex flex-col items-center justify-center relative z-10">
        
       
        <div className="text-center space-y-4 mb-12 max-w-3xl">
          <p className="web_name text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
            Encryptify Hub
          </p>
          <p className="web_name_details text-lg text-gray-600">
            Unlock the secrets of modern encryption algorithms with Encryptify Hub. Explore RSA, AES, and SHA-256 and how they secure our digital world.
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {[{
            title: "RSA",
            description: "RSA is an asymmetric algorithm used for secure communication and digital signatures, forming the backbone of secure protocols like HTTPS.",
            onClick: () => setRedirect("rsa"),
          },
          {
            title: "AES",
            description: "AES is a widely used symmetric encryption standard that secures data with key lengths of 128, 192, or 256 bits, crucial for industries like finance and healthcare.",
            onClick: () => setRedirect("aes"),  
          },
          {
            title: "SHA-256",
            description: "SHA-256 is a cryptographic hash function that ensures data integrity by producing a unique 256-bit hash, widely used in blockchain and password storage.",
            onClick: () => setRedirect("sha256"),
          }].map((item, index) => (
            <div key={index} onClick={item.onClick} className="max-w-xs p-5 rounded-lg border border-gray-300 bg-gray-200 shadow-2xl hover:shadow-xl transition-transform transform hover:scale-105 hover:border-gray-400 hover:bg-gray-100">
              <div className="flex flex-col items-center space-y-4">
               
                <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
                  {item.title}
                </h2>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <hr className="border-gray-300 w-full" />
                <div className="flex justify-center w-full">
                  <button className="bg-blue-500 hover:shadow-2xl transition-transform transform hover:scale-105 hover:bg-blue-600 w-[200px] h-[43px] rounded-xl font-bold text-white">
                    <h1 className="text-xl my-auto">Get Start</h1>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
