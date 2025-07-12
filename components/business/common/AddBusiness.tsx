"use client";
import { ImageUp, MapPin, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const AddBusiness = () => {
  const [images, setImages] = useState<string[]>([]);
  const [instrumentModalOpen, setInstrumentModalOpen] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [newInstrumentName, setNewInstrumentName] = useState("");
  const [selectedFamily, setSelectedFamily] = useState("Strings");
  const [pricingType, setPricingType] = useState("exact");
  const [price, setPrice] = useState("");

  const handleUploadImage = () => {
    const input = document.getElementById("image_input");
    if (input) {
      input.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imageURLs = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    // Combine with existing images
    setImages((prev) => [...prev, ...imageURLs]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const instrumentGroups = {
    Strings: ["Guitar", "Violin", "Cello", "Harp"],
    Brass: ["Trumpet", "Trombone", "Tuba", "French Horn"],
    Woodwinds: ["Saxophone", "Clarinet", "Flute"],
    Percussions: ["Drums", "Symbol", "Xylophone"],
  };

  const serviceGroup = ["Guitar", "Ukulele", "Flute", "Drums", "Bass"];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<string[]>([
    "Guitar",
    "Violin",
    "Cello",
    "Harp",
    "Saxophone",
    "Clarinet",
    "Flute",
    "Trumpet",
    "Trombone",
    "Tuba",
    "French Horn",
    "Drums",
    "Symbol",
    "Xylophone",
  ]);

  const toggleInstrument = (instrument: string) => {
    setSelected((prev) =>
      prev.includes(instrument)
        ? prev.filter((item) => item !== instrument)
        : [...prev, instrument]
    );
  };

  const handleAddInstrument = () => {
    if (!newInstrumentName.trim()) return;
    setSelected((prev) => [...prev, newInstrumentName.trim()]);
    setNewInstrumentName("");
    setSelectedFamily("Strings");
    setInstrumentModalOpen(false);
  };

  return (
    <div>
      <form>
        {/* business information */}
        <div>
          <div>
            <h1 className="text-[28px] font-semibold">
              1. Business Information
            </h1>
            <p className="text-[#485150] text-[16px]">
              Complete the following fields to provide key details about the
              business
            </p>
          </div>

          {/* upload photos */}
          <div className="mt-8">
            <label className="text-[24px]">Business Photos</label>
            <div className="flex gap-5 flex-wrap">
              {/* Upload button */}
              <div className="w-[200px] h-[200px]">
                <input
                  type="file"
                  name="images"
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
            <label className="text-[24px]">Business Details</label>

            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Business name"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[48px]"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Business address"
                      className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-10 py-2 text-sm focus:outline-none h-[48px]"
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
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Business description"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[100px]"
                />
              </div>

              {/* Phone + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Business phone number"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[48px]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Business email"
                    className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[48px]"
                  />
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  placeholder="Business website"
                  className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:outline-none h-[48px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className=" border-b border-gray-200 pt-12"></div>

        {/* services offered */}
        <div className="pt-10">
          <div className="space-y-10">
            {/* Section Header */}
            <div className="space-y-2">
              <h2 className="text-[28px] font-semibold">2. Services Offered</h2>
              <p className="text-[#485150] text-[16px]">
                Now, you can specify the services the business provides for each
                selected instrument family. This section helps the customers
                understand exactly what you offer.
              </p>
              <p className="text-[#485150] text-[16px]">
                In addition to repairs and adjustments, you can also offer
                services related to buying, selling, trading, and teaching
                instruments.
              </p>
              <p className="text-[#139a8e] text-[16px] lg:max-w-6xl">
                We encourage businesses to provide pricing information for
                better customer visibility and to improve search results.
                Pricing does not need to be exact and can be listed as estimates
                or ranges.
              </p>
            </div>

            {/* Instrument Services */}
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Instrument Repairs & Services
              </h3>
              <h3 className="text-xl font-semibold mb-2">
                Select / Add Instruments
              </h3>
              <p className="text-[#485150] text-[16px] lg:max-w-6xl">
                Help customers understand the types of instruments the business
                services by selecting the relevant instrument families. These
                categories help us match the services with customers’ needs.
              </p>

              {/* Instrument Groups */}
              <div className="grid grid-cols-2 gap-8 mt-5">
                {Object.entries(instrumentGroups).map(
                  ([group, instruments]) => (
                    <div key={group}>
                      <h4 className="font-medium text-gray-900 mb-3">
                        {group}
                      </h4>
                      <div className="space-y-2">
                        {instruments.map((instrument) => (
                          <label
                            key={instrument}
                            className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              // checked={selected.includes(instrument)}
                              onChange={() => toggleInstrument(instrument)}
                              className="form-checkbox w-4 h-4 text-teal-600 rounded accent-[#139a8e]"
                            />
                            {instrument}
                          </label>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Add Instrument Button */}
              <button
                type="button"
                className="mt-10 inline-flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md text-sm hover:bg-teal-50 transition-colors w-[100%] md:w-[580px] h-[48px]"
                onClick={() => setInstrumentModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Add an Instrument
              </button>
            </div>

            {/* Service Type & Pricing */}
            <div>
              <h3 className="text-xl font-semibold">Service Type & Pricing</h3>

              {/* category select */}
              <div className="my-5">
                {serviceGroup.map((service, index) => (
                  <button
                    key={index}
                    className="bg-[#139a8e] mr-5 py-3 px-5 rounded-lg"
                  >
                    {service}
                  </button>
                ))}
              </div>

              {/* pricing input field */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* field 1 */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Restringing
                    </label>

                    <div className="flex items-center space-x-4 mb-3">
                      {["Exact", "Range", "Hourly"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-1 text-sm text-gray-600"
                        >
                          <input
                            type="radio"
                            name="pricingType"
                            value={type.toLowerCase()}
                            checked={pricingType === type.toLowerCase()}
                            onChange={() => setPricingType(type.toLowerCase())}
                            className="accent-teal-500"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="$  Service Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                  />
                </div>

                {/* field 2 */}
                <div className="lg:col-span-1">
                  <label className="block text-xl font-medium text-gray-700 mb-2">
                    Setup & Adjustments
                  </label>

                  <input
                    type="text"
                    placeholder="$  Service Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                  />
                </div>

                {/* field 3 */}
                <div className="lg:col-span-1">
                  <div>
                    <div className="flex items-center space-x-4 mb-3">
                      {["Exact", "Range", "Hourly"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-1 text-sm text-gray-600"
                        >
                          <input
                            type="radio"
                            name="pricingType"
                            value={type.toLowerCase()}
                            checked={pricingType === type.toLowerCase()}
                            onChange={() => setPricingType(type.toLowerCase())}
                            className="accent-teal-500"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="$  Service Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                  />
                </div>

                {/* field 4 */}
                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xl font-medium text-gray-700 mb-2">
                      Replating
                    </label>

                    <div className="flex items-center space-x-4 mb-3">
                      {["Exact", "Range", "Hourly"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-1 text-sm text-gray-600"
                        >
                          <input
                            type="radio"
                            name="pricingType"
                            value={type.toLowerCase()}
                            checked={pricingType === type.toLowerCase()}
                            onChange={() => setPricingType(type.toLowerCase())}
                            className="accent-teal-500"
                          />
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="$  Service Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                  />
                </div>
              </div>

              {/* Add Instrument Button */}
              <button
                type="button"
                className="mt-10 inline-flex items-center gap-2 px-4 py-2 border border-teal-600 text-teal-700 rounded-md text-sm hover:bg-teal-50 transition-colors w-[100%] md:w-[580px] h-[48px]"
                onClick={() => setServiceModal(true)}
              >
                <Plus className="w-4 h-4" />
                Add a Service
              </button>
            </div>
          </div>
        </div>

        {/* Add Instrument Modal */}
        {instrumentModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold">Add Instrument</h2>

              {/* Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instrument Name
                </label>
                <input
                  type="text"
                  placeholder="Type instrument name"
                  value={newInstrumentName}
                  onChange={(e) => setNewInstrumentName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              {/* Radio Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instrument Family
                </label>
                <div className="space-y-2">
                  {Object.keys(instrumentGroups).map((family) => (
                    <label
                      key={family}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={family}
                        checked={selectedFamily === family}
                        onChange={() => setSelectedFamily(family)}
                        className="form-radio text-teal-600"
                      />
                      <span className="text-gray-800">{family}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddInstrument}
                  className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                >
                  Add Instrument
                </button>
                <button
                  onClick={() => setInstrumentModalOpen(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add service Modal */}
        {serviceModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 space-y-6">
              <h2 className="text-xl font-semibold">Add A Service</h2>

              {/* Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Name
                </label>
                <input
                  type="text"
                  placeholder="Type instrument name"
                  value={newInstrumentName}
                  onChange={(e) => setNewInstrumentName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm bg-gray-50 focus:outline-none h-[48px]"
                />
              </div>

              {/* service pricing input */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xl font-medium text-gray-700 mb-2">
                    Service Pricing
                  </label>

                  <div className="flex items-center space-x-4 mb-3">
                    {["Exact", "Range", "Hourly"].map((type) => (
                      <label
                        key={type}
                        className="flex items-center space-x-1 text-sm text-gray-600"
                      >
                        <input
                          type="radio"
                          name="pricingType"
                          value={type.toLowerCase()}
                          checked={pricingType === type.toLowerCase()}
                          onChange={() => setPricingType(type.toLowerCase())}
                          className="accent-teal-500"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="$  Service Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none h-[48px] bg-gray-50"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddInstrument}
                  className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                >
                  Add Instrument
                </button>
                <button
                  onClick={() => setServiceModal(false)}
                  className="flex-1 border border-gray-300 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddBusiness;
