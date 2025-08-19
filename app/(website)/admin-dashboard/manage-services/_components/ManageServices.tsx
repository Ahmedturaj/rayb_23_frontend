"use client";
import React, { useState } from "react";
import InstrumentFamily from "./InstrumentFamily";
import InstrumentName from "./InstrumentName";
import InstrumentService from "./InstrumentService";

const ManageServices = () => {
  const [isActive, setIsActive] = useState<string>("Add an instrument family");

  const btnName = [
    { name: "Add an instrument family" },
    { name: "Add an instrument" },
    { name: "Add a service" },
  ];

  return (
    <div>
      <div className="space-x-6">
        {btnName.map((item, index) => (
          <button
            onClick={() => setIsActive(item.name)}
            className={`border border-[#139a8e] text-[#139a8e] py-3 px-6 rounded-lg hover:bg-[#139a8e] hover:text-white ${
              isActive === item.name && "bg-[#139a8e] text-white"
            }`}
            key={index}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {isActive === "Add an instrument family" && <InstrumentFamily />}
        {isActive === "Add an instrument" && <InstrumentName />}
        {isActive === "Add a service" && <InstrumentService />}
      </div>
    </div>
  );
};

export default ManageServices;
