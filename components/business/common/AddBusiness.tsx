"use client";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const AddBusiness = () => {
  const [image, setImage] = useState("");

  const handleUploadImage = () => {
    const input = document.getElementById("image_input");
    if (input) {
      input.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    const file = files && files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
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
          <div className="my-5">
            <label className="text-[24px]">Business Photos</label>

            <div className="w-[200px]">
              <div>
                <input
                  type="file"
                  name="image"
                  id="image_input"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {image === "" ? (
                  <div
                    className="w-full md:w-[90%] flex items-center dark:border-slate-600 justify-center flex-col gap-4 border-[#e5eaf2] border rounded-md py-6 cursor-pointer"
                    onClick={handleUploadImage}
                  >
                    <ImageUp className="text-5xl" />
                    <p className="text-center">Upload Photo</p>
                  </div>
                ) : (
                  <div className="relative w-full md:w-[80%] h-[300px]">
                    <Image
                      src={image}
                      alt="image"
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover"
                    />
                    <MdDelete
                      className="text-[2rem] text-white bg-[#000000ad] p-1 absolute top-0 right-0 cursor-pointer"
                      onClick={() => setImage("")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBusiness;
