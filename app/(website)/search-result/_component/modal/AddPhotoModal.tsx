"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ImageUp, Loader } from "lucide-react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface AddPhotoModalProps {
  setIsAddPhotoOpen: (isOpen: boolean) => void;
  businessID: string | undefined;
}

const AddPhotoModal: React.FC<AddPhotoModalProps> = ({
  setIsAddPhotoOpen,
  businessID,
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const handleUploadImage = () => {
    const input = document.getElementById("image_input");
    if (input) input.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const { mutateAsync: uploadPhotos, isPending } = useMutation({
    mutationKey: ["upload-photos"],
    mutationFn: async (formData: FormData) => {
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/picture/upload-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload photos");
      }
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Photos uploaded successfully!");
      setIsAddPhotoOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to upload photos");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageFiles.length === 0) {
      toast.warning("Please select at least one photo to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("business", businessID || "");

      imageFiles.forEach((file) => {
        formData.append("image", file);
      });

      await uploadPhotos(formData);
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/25 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md lg:max-w-[720px] h-[350px] overflow-y-auto rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-[28px] font-semibold">Add Photos</h1>
              <p className="text-lg text-gray-600">
                Upload photos for this business
              </p>
            </div>

            {/* upload image */}
            <div className="w-full h-[102px]">
              <input
                type="file"
                name="image"
                id="image_input"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <div
                className="w-full h-full flex items-center justify-center flex-col gap-4 rounded-md cursor-pointer bg-[#F8F8F8] mt-4 text-teal-600 border border-dashed border-teal-600"
                onClick={handleUploadImage}
              >
                <ImageUp className="text-5xl" />
                <p className="text-center text-xl">Upload Photos</p>
              </div>
            </div>

            {/* Image previews */}
            <div className="grid grid-cols-3 gap-5 lg:grid-cols-5">
              {imagePreviews.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[102px] h-[102px] rounded-lg overflow-hidden mt-4"
                >
                  <Image
                    src={image}
                    alt={`image-${index}`}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                  <MdDelete
                    className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-1 right-1 rounded cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 lg:max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setIsAddPhotoOpen(false)}
                className="flex-1 border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition ${
                  isPending && "opacity-70"
                }`}
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </span>
                ) : (
                  "Upload Photos"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhotoModal;
