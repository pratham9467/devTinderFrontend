import React from "react";
import { useNavigate } from "react-router";

const Error = () => {
  const navigateTo = useNavigate();
  
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 max-w-md text-center">
        <div className="text-6xl mb-4">😱</div>
        <h2 className="text-2xl font-bold text-red-400 mb-3">Oops! Something went wrong</h2>
        <p className="text-gray-300 mb-6">We couldn't find what you're looking for. Let's get you back on track!</p>
        <button 
          className="btn bg-linear-to-r from-[#fe3c72] to-[#ef4a75] hover:from-[#fd5564] hover:to-[#fe3c72] text-white border-0"
          onClick={() => navigateTo("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Error;
