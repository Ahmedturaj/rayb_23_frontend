import Image from "next/image";
import React from "react";

interface LoginModalProps {
  isBusinessSuccessModalOpen: boolean;
  setIsBusinessSuccessModalOpen: (value: boolean) => void;
}

const BusinessSuccessModal: React.FC<LoginModalProps> = ({
  isBusinessSuccessModalOpen,
  setIsBusinessSuccessModalOpen,
}) => {
  if (!isBusinessSuccessModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsBusinessSuccessModalOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 z-10 animate-fadeIn text-center">
        <h2 className="text-2xl font-semibold text-center mb-1">Submitted</h2>

        <p className="text-gray-500 mb-2">
          Thanks! Your submission is under review. You&apos;ll be notified when
          it&apos;s approved.
        </p>

        <div>
          <Image 
          src={'/images/submitted.svg'}
          alt="submitted.png"
          width={1000}
          height={1000}
          className="h-40 w-40 mx-auto"
          />
        </div>

        <div className="flex items-center gap-5 mt-5">
          <button onClick={() => setIsBusinessSuccessModalOpen(false)} className="border border-primary text-primary py-2 rounded-lg w-1/2 font-semibold">Cancel</button>

          <button onClick={() => setIsBusinessSuccessModalOpen(false)} className="bg-primary text-white py-2 rounded-lg w-1/2 font-semibold">Okay</button>
        </div>

        <button
          onClick={() => setIsBusinessSuccessModalOpen(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default BusinessSuccessModal;
