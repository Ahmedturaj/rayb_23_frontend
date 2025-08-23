"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const InstrumentFamilyModal = ({ isOpen, onClose, title }: ModalProps) => {
  const [instrumentTitle, setInstrumentTitle] = useState("");

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // TanStack Query mutation for posting data
  const mutation = useMutation({
    mutationFn: async (data: { instrumentFamily: string }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instrument-family/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create instrument family");
      }
      return response.json();
    },
    onSuccess: () => {
      toast.success("Instrument family created successfully!");
      setInstrumentTitle(""); // Clear input after success
      onClose(); // Close modal after success
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create instrument family");
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (instrumentTitle.trim()) {
      mutation.mutate({ instrumentFamily: instrumentTitle });
    } else {
      toast.error("Please enter an instrument family name");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 w-full max-w-lg relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {title && (
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                {title}
              </h2>
            )}

            {/* Body */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  value={instrumentTitle}
                  onChange={(e) => setInstrumentTitle(e.target.value)}
                  placeholder="Enter instrument family"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#139a8e]-500 focus:border-[#139a8e]-500 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className={`bg-[#139a8e] py-3 w-full text-center rounded-lg text-white ${
                  mutation.isPending ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {mutation.isPending ? "Adding..." : "Add an instrument"}
              </button>
            </form>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstrumentFamilyModal;