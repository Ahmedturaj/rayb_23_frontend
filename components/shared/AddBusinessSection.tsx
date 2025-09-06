import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const AddBusinessSection = () => {
  return (
    <div className="border border-gray-200 bg-gray-50 mt-10 p-5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="flex gap-6 items-start md:items-center">
        <div>
          <Image
            src={"/images/location.png"}
            alt="location.png"
            width={1000}
            height={1000}
            className="w-[48px] h-[60px]"
          />
        </div>

        <div>
          <h1 className="font-semibold text-xl">Can’t find your business?</h1>
          <p className="text-[#485150] text-[16px] mt-2">
            Adding your business to Instrufix is completely free!
          </p>
        </div>
      </div>

      <div className="w-full md:w-auto">
        <Link href={"/add-a-business"}>
          <Button className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white px-8 h-[48px]">
            Add Business
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AddBusinessSection;
