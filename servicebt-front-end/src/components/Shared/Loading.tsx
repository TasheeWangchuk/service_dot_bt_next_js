import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-white/30 backdrop-blur-sm">
      {/* Decorative background patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-float-slow"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-float-slow-reverse"></div>
      </div>

      <div className="relative w-32 h-32 mb-8">
        {/* Animate*/}
        <div className="absolute inset-0">
          <div className="w-12 h-12 bg-orange-500/20 rounded-full absolute top-0 left-0 animate-cloud-1"></div>
          <div className="w-10 h-10 bg-orange-500/30 rounded-full absolute top-4 left-8 animate-cloud-2"></div>
          <div className="w-14 h-14 bg-orange-500/25 rounded-full absolute top-8 left-4 animate-cloud-3"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-500 rounded-full animate-spin-slow">
            <div className="w-full h-full border-4 border-orange-500 rounded-full transform rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="text-center z-10">
        <h2 className="text-2xl font-medium text-orange-800 mb-2">Loading</h2>
        <p className="text-orange-600/80 animate-pulse">Please wait a moment...</p>
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(-20px) translateX(10px); }
  }
  @keyframes float-slow-reverse {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(20px) translateX(-10px); }
  }
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes cloud-1 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(10px, -5px); }
  }
  @keyframes cloud-2 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-8px, 8px); }
  }
  @keyframes cloud-3 {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(5px, 5px); }
  }

  .animate-float-slow {
    animation: float-slow 6s ease-in-out infinite;
  }
  .animate-float-slow-reverse {
    animation: float-slow-reverse 7s ease-in-out infinite;
  }
  .animate-spin-slow {
    animation: spin-slow 8s linear infinite;
  }
  .animate-cloud-1 {
    animation: cloud-1 4s ease-in-out infinite;
  }
  .animate-cloud-2 {
    animation: cloud-2 5s ease-in-out infinite;
  }
  .animate-cloud-3 {
    animation: cloud-3 6s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default LoadingPage;