"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch"; // adjust this import if needed

type BusinessHour = {
  day: string;
  enabled: boolean;
  startTime: string;
  startMeridiem: string;
  endTime: string;
  endMeridiem: string;
};

type BusinessHoursProps = {
  businessHours: BusinessHour[];
  setBusinessHours: React.Dispatch<React.SetStateAction<BusinessHour[]>>;
};

export default function BusinessHours({ businessHours, setBusinessHours }: BusinessHoursProps) {

  const handleToggle = (day: string, checked: boolean) => {
    setBusinessHours((prev) =>
      prev.map((entry) =>
        entry.day === day ? { ...entry, enabled: checked } : entry
      )
    );
  };

  const handleChange = (
    day: string,
    field: "startTime" | "startMeridiem" | "endTime" | "endMeridiem",
    value: string
  ) => {
    setBusinessHours((prev) =>
      prev.map((entry) =>
        entry.day === day ? { ...entry, [field]: value } : entry
      )
    );
  };

  return (
    <div className="mt-8">
      <div className="space-y-4">
        {businessHours.map(
          ({
            day,
            enabled,
            startTime,
            startMeridiem,
            endTime,
            endMeridiem,
          }) => (
            <div key={day} className="flex items-center gap-16">
              {/* Toggle and day label */}
              <div className="w-24 flex items-center gap-3">
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => handleToggle(day, checked)}
                />
                <span className="text-sm font-medium text-gray-800">{day}</span>
              </div>

              {/* Time pickers */}
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
          )
        )}
      </div>
    </div>
  );
}
