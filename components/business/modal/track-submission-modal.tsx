import Link from "next/link";
import React from "react";

interface LoginModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const TrackSubmissionModal: React.FC<LoginModalProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsModalOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 z-10 animate-fadeIn text-center">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Track Your Submissions
        </h2>

        <p className="text-gray-500">
          Want to review this business or track your submissions?
        </p>

        <div className="flex items-center gap-5 mt-5">
          <Link href={"/auth/signup"} className="bg-primary text-white py-2 rounded-lg w-1/2 font-semibold">
            <button>
              Sign Up
            </button>
          </Link>

          <Link href={"/auth/login"} className="bg-primary text-white py-2 rounded-lg w-1/2 font-semibold">
            <button >
              Login
            </button>
          </Link>
        </div>

        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TrackSubmissionModal;
