"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch"; // Make sure this path is correct

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const defaultTime = {
  startTime: "09:00",
  startMeridiem: "AM",
  endTime: "05:00",
  endMeridiem: "PM",
};

export default function BusinessHours() {
  const [businessHours, setBusinessHours] = React.useState(
    daysOfWeek.reduce((acc, day) => {
      acc[day] = {
        enabled: day !== "Sunday",
        ...defaultTime,
      };
      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as Record<string, any>)
  );

  const handleToggle = (day: string, checked: boolean) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: checked,
      },
    }));
  };

  const handleChange = (
    day: string,
    field: "startTime" | "startMeridiem" | "endTime" | "endMeridiem",
    value: string
  ) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  return (
    <div className="mt-8">
      <div className="space-y-4">
        {daysOfWeek.map((day) => {
          const { enabled, startTime, startMeridiem, endTime, endMeridiem } =
            businessHours[day];

          return (
            <div key={day} className="flex items-center gap-16">
              <div className="w-24 flex items-center gap-3">
                <Switch
                  onCheckedChange={(checked) => handleToggle(day, checked)}
                />
                <span className="text-sm font-medium text-gray-800">{day}</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) =>
                    handleChange(day, "startTime", e.target.value)
                  }
                  disabled={!enabled}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm disabled:bg-gray-100"
                />
                <select
                  value={startMeridiem}
                  onChange={(e) =>
                    handleChange(day, "startMeridiem", e.target.value)
                  }
                  disabled={!enabled}
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm disabled:bg-gray-100"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>

                <span className="text-sm text-gray-500">to</span>

                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => handleChange(day, "endTime", e.target.value)}
                  disabled={!enabled}
                  className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm disabled:bg-gray-100"
                />
                <select
                  value={endMeridiem}
                  onChange={(e) =>
                    handleChange(day, "endMeridiem", e.target.value)
                  }
                  disabled={!enabled}
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm disabled:bg-gray-100"
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
