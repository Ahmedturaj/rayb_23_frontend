"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import InstrumentFamilyModal from "./InstrumentFamilyModal";

// === Types ===
interface InstrumentType {
  _id: string;
  type: string;
  serviceType: string[];
}

interface InstrumentData {
  _id: string;
  instrumentFamily: string;
  instrumentTypes: InstrumentType[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  code: number;
  message: string;
  data: InstrumentData[] | InstrumentData;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

// === Reusable Modal Component ===
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-4">{children}</div>
        {footer && <div className="flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

// === API Calls ===
const fetchInstrumentFamilies = async (): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instrument-family`);
  if (!response.ok) throw new Error("Failed to fetch instrument families");
  return response.json();
};

const fetchInstrumentDetails = async (id: string): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instrument-family/${id}`);
  if (!response.ok) throw new Error("Failed to fetch instrument details");
  return response.json();
};

const deleteInstrumentFamily = async (id: string): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instrument-family/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete instrument family");
  return response.json();
};

const updateInstrumentFamily = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<InstrumentData>;
}): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instrument-family/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update instrument family");
  return response.json();
};

// === Main Component ===
export default function InstrumentFamily() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<InstrumentData>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["instrumentFamilies"],
    queryFn: fetchInstrumentFamilies,
  });

  const { data: instrumentDetails, isLoading: isDetailsLoading } = useQuery<ApiResponse>({
    queryKey: ["instrumentDetails", selectedInstrumentId],
    queryFn: () => fetchInstrumentDetails(selectedInstrumentId!),
    enabled: !!selectedInstrumentId && isViewModalOpen,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInstrumentFamily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instrumentFamilies"] });
      toast.success("Instrument family deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedInstrumentId(null);
    },
    onError: (error) => toast.error(`Error: ${(error as Error).message}`),
  });

  const updateMutation = useMutation({
    mutationFn: updateInstrumentFamily,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instrumentFamilies"] });
      toast.success("Instrument family updated successfully");
      setIsEditModalOpen(false);
      setSelectedInstrumentId(null);
    },
    onError: (error) => toast.error(`Error: ${(error as Error).message}`),
  });

  const instrumentData: InstrumentData[] = Array.isArray(data?.data) ? data?.data : [];
  const totalItems = instrumentData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = instrumentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedInstrumentId(id);
    setIsDeleteModalOpen(true);
  };

  const handleViewClick = (id: string) => {
    setSelectedInstrumentId(id);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (instrument: InstrumentData) => {
    setSelectedInstrumentId(instrument._id);
    setEditFormData({
      instrumentFamily: instrument.instrumentFamily,
      instrumentTypes: instrument.instrumentTypes,
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInstrumentId) {
      updateMutation.mutate({ id: selectedInstrumentId, data: editFormData });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div></div>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-[#139a8e] hover:bg-[#139a8e] text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Instrument Family
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Instrument Family</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Instrument Types</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-red-600">
                  Error: {(error as Error).message}
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm">No data available</td>
              </tr>
            ) : (
              paginatedData.map((item) => (
                <tr key={item._id} className="border-b border-gray-200 last:border-b-0">
                  <td className="px-6 py-4 text-sm text-gray-900">{item.instrumentFamily}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.instrumentTypes.map((t) => t.type).join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-pre-line">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleViewClick(item._id)} className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button onClick={() => handleEditClick(item)} className="p-1 hover:bg-gray-100 rounded">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button onClick={() => handleDeleteClick(item._id)} className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-2 text-sm rounded ${
                currentPage === idx + 1 ? "bg-[#139a8e] text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {idx + 1}
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

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
        footer={
          <>
            <Button onClick={() => setIsDeleteModalOpen(false)} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
              Cancel
            </Button>
            <Button
              onClick={() => selectedInstrumentId && deleteMutation.mutate(selectedInstrumentId)}
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this instrument family?</p>
      </Modal>

      {/* View Details Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Instrument Family Details">
        {isDetailsLoading ? (
          <p>Loading...</p>
        ) : instrumentDetails?.data && !Array.isArray(instrumentDetails.data) ? (
          <div className="space-y-2">
            <p><strong>Family:</strong> {instrumentDetails.data.instrumentFamily}</p>
            <p>
              <strong>Types:</strong>{" "}
              {instrumentDetails.data.instrumentTypes.map((t) => `${t.type} (${t.serviceType.join(", ")})`).join("; ")}
            </p>
            <p><strong>Created:</strong> {new Date(instrumentDetails.data.createdAt).toLocaleString()}</p>
            <p><strong>Updated:</strong> {new Date(instrumentDetails.data.updatedAt).toLocaleString()}</p>
          </div>
        ) : (
          <p>Error loading details</p>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Instrument Family"
        footer={
          <>
            <Button onClick={() => setIsEditModalOpen(false)} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
              Cancel
            </Button>
            <Button
              onClick={handleEditSubmit}
              className="bg-[#139a8e] text-white hover:bg-[#139a8e]/90"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Instrument Family</label>
            <input
              type="text"
              value={editFormData.instrumentFamily || ""}
              onChange={(e) => setEditFormData({ ...editFormData, instrumentFamily: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md h-[40px] pl-3 shadow-sm focus:border-[#139a8e] focus:ring-[#139a8e]"
            />
          </div>
          {/* For now, editing instrumentTypes as plain text (comma-separated types).
              You can extend this later to manage serviceType too. */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Instrument Types (comma-separated)</label>
            <input
              type="text"
              value={editFormData.instrumentTypes?.map((t) => t.type).join(", ") || ""}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  instrumentTypes: e.target.value.split(",").map((t, i) => ({
                    _id: editFormData.instrumentTypes?.[i]?._id || `${Date.now()}-${i}`,
                    type: t.trim(),
                    serviceType: editFormData.instrumentTypes?.[i]?.serviceType || [],
                  })),
                })
              }
              className="mt-1 block w-full border h-[40px] pl-3 rounded-md border-gray-300 shadow-sm focus:border-[#139a8e] focus:ring-[#139a8e]"
            />
          </div>
        </form>
      </Modal>

      {isOpen && (
        <InstrumentFamilyModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Pick an instrument family" />
      )}
    </div>
  );
}
