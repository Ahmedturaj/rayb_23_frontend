"use client";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import Image from "next/image";
import React from "react";

interface LoginModalProps {
  isLogoutBusinessSuccessModalOpen: boolean;
  setIsLogoutBusinessSuccessModalOpen: (value: boolean) => void;
  handelOkay: () => void;
}

const LogOutBusinessSuccessModal: React.FC<LoginModalProps> = ({
  isLogoutBusinessSuccessModalOpen,
  setIsLogoutBusinessSuccessModalOpen,
  handelOkay,
}) => {
  if (!isLogoutBusinessSuccessModalOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Modal Content */}
        <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-lg p-6 z-10 animate-fadeIn text-center">
          <h2 className="text-2xl font-semibold text-center mb-1">Submitted</h2>

          <p className="text-gray-500 mb-2">
            Thanks! Your submission is under review. You&apos;ll be notified
            when it&apos;s approved.
          </p>

          <div>
            <Image
              src={"/images/submitted.svg"}
              alt="submitted.png"
              width={1000}
              height={1000}
              className="h-40 w-40 mx-auto"
            />
          </div>

          <div className="text-start">
            <h1 className="mb-2">
              <span className="text-gray-600 font-medium">Email</span>{" "}
              <span className="text-gray-500">(Optional)</span>
            </h1>

            <div className="relative">
              <Input
                type="email"
                placeholder="Enter Your Email"
                className="focus-visible:ring-0 pl-9"
              />

              <Mail className="h-5 w-5 absolute top-1/4 left-2 text-gray-700" />
            </div>
          </div>

          <div className="flex items-center gap-5 mt-5">
            <button
              onClick={() => setIsLogoutBusinessSuccessModalOpen(false)}
              className="border border-primary text-primary py-2 rounded-lg w-1/2 font-semibold"
            >
              Cancel
            </button>

            <button
              onClick={handelOkay}
              className="bg-primary text-white py-2 rounded-lg w-1/2 font-semibold"
            >
              Okay
            </button>
          </div>

          <button
            onClick={() => setIsLogoutBusinessSuccessModalOpen(false)}
            className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutBusinessSuccessModal;
