import { ImageUp, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";

interface BusinessInformProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadImage: () => void;
  images: string[];
  handleRemoveImage: (index: number) => void;
  setBusinessName: (name: string) => void;
  setAddressName: (address: string) => void;
  setDescription: (description: string) => void;
  setPhoneNumber: (phone: string) => void;
  setEmail: (email: string) => void;
  setWebsite: (website: string) => void;
  businessMan: string;
  addressName: string;
  description: string;
  phoneNumber: string;
  email: string;
  website: string;
}

const BusinessInform: React.FC<BusinessInformProps> = ({
  handleFileChange,
  handleUploadImage,
  images,
  handleRemoveImage,
  setBusinessName,
  setAddressName,
  setDescription,
  setPhoneNumber,
  setEmail,
  setWebsite,
  businessMan,
  addressName,
  description,
  phoneNumber,
  email,
  website,
}) => {
  return (
    <div>
      {/* upload photos */}
      <div className="mt-8">
        <label className="text-[24px] font-medium">Business Photos</label>
        <div className="flex gap-5 flex-wrap">
          {/* Upload button */}
          <div className="w-[200px] h-[200px]">
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
              className="w-full h-full flex items-center justify-center flex-col gap-4 rounded-md cursor-pointer bg-[#F8F8F8] mt-4"
              onClick={handleUploadImage}
            >
              <ImageUp className="text-5xl" />
              <p className="text-center text-xl">Upload Photos</p>
            </div>
          </div>

          {/* Image previews */}
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-[200px] h-[200px] rounded-lg overflow-hidden mt-4"
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
      </div>

      {/* business details */}
      <div className="mt-10">
        <label className="text-[24px] font-medium">Business Details</label>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-md font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Business name"
                className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[48px]"
                value={businessMan}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-md font-medium text-gray-700">
                Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="488 San Mateo Ave San Bruno, CA 94066"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-10 py-2 text-sm focus:outline-none h-[48px]"
                  value={addressName}
                  onChange={(e) => setAddressName(e.target.value)}
                />
                <MapPin
                  className="absolute top-[50%] left-3 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-md font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Business description"
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[100px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-md font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="(650) 877-0805"
                className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[48px]"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-md font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Business email"
                className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[48px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-md font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              placeholder="Business website"
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[48px]"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInform;
