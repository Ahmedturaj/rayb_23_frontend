"use client";
import React, { useState } from "react";
import BusinessHours from "../BusinessHours";
import BusinessInform from "../BusinessInform";
import Service from "../Service";

const AddBusiness = () => {
  const [images, setImages] = useState<string[]>([]);

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
          <Service />
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
          <button className="py-3 h-[48px] w-[288px] rounded-lg bg-[#139a8e] text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusiness;
