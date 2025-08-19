"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import InstrumentFamilyModal from "./InstrumentFamilyModal";

interface InstrumentData {
  id: number;
  familyName: string;
  instrumentName: string;
  date: string;
}

const mockData: InstrumentData[] = [
  {
    id: 1,
    familyName: "Woodwinds",
    instrumentName: "10",
    date: "06/21/2025\n03:18pm",
  },
];

export default function InstrumentFamily() {
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalItems = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];

    // Always show page 1
    pages.push(1);

    // Show page 2 if we have more than 1 page
    if (totalPages > 1) {
      pages.push(2);
    }

    // Add ellipsis if there are more pages
    if (totalPages > 3) {
      pages.push("...");
    }

    // Show last page if it's different from what we already have
    if (totalPages > 2) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div></div>
        <Button onClick={() => setIsOpen(true)} className="bg-[#139a8e] hover:bg-[#139a8e] text-white px-4 py-2 rounded-md flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Instrument Family
        </Button>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Instrument Family Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Instrument Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 last:border-b-0"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.familyName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.instrumentName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-pre-line">
                  {item.date}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing 1 to 5 of 12 results
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {renderPaginationNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() =>
                typeof page === "number" ? handlePageChange(page) : undefined
              }
              disabled={page === "..."}
              className={`px-3 py-2 text-sm rounded ${
                page === currentPage
                  ? "bg-[#139a8e] text-white"
                  : page === "..."
                  ? "text-gray-400 cursor-default"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isOpen && <InstrumentFamilyModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Pick an instrument family" />}
    </div>
  );
}
