import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import React from "react";

const BusinessInfo = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-500">24 Results for</h1>
          <h1 className="text-xl font-bold">“Guitar Cleaning”</h1>
        </div>

        <div>
          <h1 className="text-gray-500">Sort by</h1>
          <Select defaultValue="hight-to-low">
            <SelectTrigger className="border-none focus:ring-offset-0 p-0 h-5 focus:ring-0 shadow-none justify-normal gap-2 focus:border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hight-to-low">Rated High to Low</SelectItem>
              <SelectItem value="low-to-high">Rated Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center justify-center gap-4 text-black/75 bg-[#f7f8f8] border border-gray-200 w-[120px] py-2 px-5 rounded-lg">
          <h1>strings</h1>{" "}
          <button>
            <X className="h-4 w-4" />
          </button>
        </div>

        <div>
          <Checkbox className="border border-gray-500" /> Open Now
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
