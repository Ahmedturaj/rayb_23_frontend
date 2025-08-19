"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Plus } from "lucide-react"

export default function InstrumentName() {
  const [selectedFamily, setSelectedFamily] = useState("Woodwinds")
  const [instrumentTitle, setInstrumentTitle] = useState("")

  return (
    <div>
      <div>
        {/* Instrument Family Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">Instrument Family</label>
          <div className="relative">
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#139a8e]-500 focus:border-[#139a8e]-500 text-gray-900"
            >
              <option value="Woodwinds">Woodwinds</option>
              <option value="Brass">Brass</option>
              <option value="Strings">Strings</option>
              <option value="Percussion">Percussion</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Instrument Name Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Instrument Name</h2>

          {/* Add Instrument Name Input */}
          <div className="mb-4">
            <input
              type="text"
              value={instrumentTitle}
              onChange={(e) => setInstrumentTitle(e.target.value)}
              placeholder="Add your title..."
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#139a8e]-500 focus:border-[#139a8e]-500 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Large Input Area with Plus Icon */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center mb-6">
            <div className="text-center">
              <Plus className="w-8 h-8 text-gray-400 mx-auto" />
            </div>
          </div>
        </div>

        {/* Publish Button */}
        <Button className="w-full bg-[#139a8e] hover:bg-[#139a8e] text-white py-3 rounded-md font-medium">Publish</Button>
      </div>
    </div>
  )
}
