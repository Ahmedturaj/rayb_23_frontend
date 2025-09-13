import Link from "next/link";
import React from "react";

interface LoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (value: boolean) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isLoginModalOpen,
  setIsLoginModalOpen,
}) => {
  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsLoginModalOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 z-10 animate-fadeIn text-center">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Please Login to Continue
        </h2>

        <p className="text-gray-500">
          Please log in to continue and access this feature. Your session helps
          us keep things secure and personalized.
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
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
