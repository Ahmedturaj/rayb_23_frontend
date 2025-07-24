import React from "react";

interface PropsTypes {
  value: string;
  setValue: (val: string) => void;
}

const ControlMusicLessons = ({value, setValue} : PropsTypes) => {
  return (
    <div className="flex items-center space-x-4">
      <h1 className="text-xl font-semibold">Music Lessons</h1>

      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-1 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            name="musicLessons"
            value="yes"
            checked={value === "yes"}
            onChange={() => setValue("yes")}
            className="accent-teal-600"
          />
          <span>Yes</span>
        </label>

        <label className="flex items-center space-x-1 text-sm text-gray-700 cursor-pointer">
          <input
            type="radio"
            name="musicLessons"
            value="no"
            checked={value === "no"}
            onChange={() => setValue("no")}
            className="accent-teal-600"
          />
          <span>No</span>
        </label>
      </div>
    </div>
  );
};

export default ControlMusicLessons;
