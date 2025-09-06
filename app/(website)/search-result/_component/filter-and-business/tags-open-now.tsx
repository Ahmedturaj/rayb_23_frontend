import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import React from "react";

const TagsAndOpenNow = () => {
  return (
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
  );
};

export default TagsAndOpenNow;
