"use client";
import React, { useState } from "react";
import BusinessHours from "../BusinessHours";
import BusinessInform from "../BusinessInform";
import Service from "../Service";
import { useQuery } from "@tanstack/react-query";
import { getAllInstrument } from "@/lib/api";

interface ServiceType {
  newInstrumentName: string;
  pricingType: string;
  minPrice: string;
  maxPrice: string;
  price: string;
}

const AddBusiness = () => {
  const [images, setImages] = useState<string[]>([]);

  // modal control
  const [serviceModal, setServiceModal] = useState(false);
  const [ServiceModalMusic, setServiceModalMusic] = useState(false);

  // control instrument family
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [selectedInstrumentsMusic, setSelectedInstrumentsMusic] = useState<
    string[]
  >([]);

  //control selected instrument group
  const [selectedInstrumentsGroup, setSelectedInstrumentsGroup] = useState("");
  const [selectedInstrumentsGroupMusic, setSelectedInstrumentsGroupMusic] =
    useState<string>("");

  //service Modal related
  const [newInstrumentName, setNewInstrumentName] = useState("");
  const [pricingType, setPricingType] = useState("exact");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<ServiceType[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<ServiceType[]>([]);

  const handleAddInstrument = () => {
    setSelected((prev) => [
      ...prev,
      {
        newInstrumentName: newInstrumentName,
        pricingType: pricingType,
        price: price,
        minPrice: minPrice,
        maxPrice: maxPrice,
        selectedInstrumentsGroup: selectedInstrumentsGroup,
      },
    ]);
    setNewInstrumentName("");
    setPricingType("");
    setPrice("");
    setMinPrice("");
    setMaxPrice("");

    setServiceModal(false);
  };

  const handleAddInstrumentMusic = () => {
    setSelectedMusic((prev) => [
      ...prev,
      {
        newInstrumentName: newInstrumentName,
        pricingType: pricingType,
        price: price,
        minPrice: minPrice,
        maxPrice: maxPrice,
        selectedInstrumentsGroupMusic: selectedInstrumentsGroupMusic,
      },
    ]);
    setNewInstrumentName("");
    setPricingType("");
    setPrice("");
    setMinPrice("");
    setMaxPrice("");

    setServiceModalMusic(false);
  };

  const { data: allInstrument } = useQuery({
    queryKey: ["get-all-instrument"],
    queryFn: async () => {
      const res = await getAllInstrument();
      return res?.data;
    },
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

          <BusinessInform
            handleFileChange={handleFileChange}
            handleUploadImage={handleUploadImage}
            images={images}
            handleRemoveImage={handleRemoveImage}
          />
        </div>

        {/* divider */}
        <div className=" border-b border-gray-200 pt-12"></div>

        {/* services offered */}
        <div className="pt-10">
          <Service
            allInstrument={allInstrument}
            serviceModal={serviceModal}
            setServiceModal={setServiceModal}
            serviceModalMusic={ServiceModalMusic}
            setServiceModalMusic={setServiceModalMusic}
            selectedInstruments={selectedInstruments}
            setSelectedInstruments={setSelectedInstruments}
            selectedInstrumentsMusic={selectedInstrumentsMusic}
            setSelectedInstrumentsMusic={setSelectedInstrumentsMusic}
            selectedInstrumentsGroup={selectedInstrumentsGroup}
            setSelectedInstrumentsGroup={setSelectedInstrumentsGroup}
            selectedInstrumentsGroupMusic={selectedInstrumentsGroupMusic}
            setSelectedInstrumentsGroupMusic={setSelectedInstrumentsGroupMusic}
            newInstrumentName={newInstrumentName}
            setNewInstrumentName={setNewInstrumentName}
            pricingType={pricingType}
            setPricingType={setPricingType}
            price={price}
            setPrice={setPrice}
            handleAddInstrument={handleAddInstrument}
            handleAddInstrumentMusic={handleAddInstrumentMusic}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selected={selected}
            setSelected={setSelected}
            selectedMusic={selectedMusic}
            setSelectedMusic={setSelectedMusic}
          />
        </div>

        {/* divider */}
        <div className=" border-b border-gray-200 pt-12"></div>

        {/* Business Hours */}
        <div className="pt-10">
          <div>
            <h1 className="text-[28px] font-semibold">3. Business Hours</h1>
            <p className="text-[#485150] text-[16px]">
              Let your customers know when your shop is open throughout the week
            </p>
          </div>

          <div>
            <BusinessHours />
          </div>
        </div>

        {/* divider */}
        <div className=" border-b border-gray-200 pt-12"></div>

        {/* Submit for Verification */}
        <div className="pt-10">
          <div>
            <h1 className="text-[28px] font-semibold">
              4. Submit for Verification
            </h1>
            <p className="text-[#485150] text-[16px]">
              Once you’ve filled out all the information (business details,
              instrument families, services, and pricing), click{" "}
              <strong>Submit</strong> to send the business details for
              verification.
            </p>

            <ul className=" list-disc text-[#485150] text-[16px] ml-5">
              <li>
                Your submission will be reviewed by the admin team for accuracy
                and completeness.
              </li>
              <li>
                You’ll receive an email notification once the business is
                approved and listed on the website.
              </li>
            </ul>
          </div>
        </div>

        {/* submit button */}
        <div className="pt-10 text-center">
          <button
            type="submit"
            className="py-3 h-[48px] w-[288px] rounded-lg bg-[#139a8e] text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusiness;
