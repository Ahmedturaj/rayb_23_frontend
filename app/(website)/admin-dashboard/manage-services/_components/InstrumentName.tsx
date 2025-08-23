"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

// Instrument family interface
interface InstrumentFamily {
  _id: string
  instrumentFamily: string
  instrumentTypes: string[]
  serviceType: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

// API response interface
interface ApiResponse {
  success: boolean
  code: number
  message: string
  data: InstrumentFamily[]
}

export default function InstrumentName() {
  const [selectedFamily, setSelectedFamily] = useState<string>("")
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("")
  const [instrumentTypes, setInstrumentTypes] = useState<string[]>([""]) // start with one input

  // Fetch instrument families
  const { data: instrumentFamiliesRaw, isLoading, isError, error } = useQuery({
    queryKey: ["instrumentFamilies"],
    queryFn: async (): Promise<InstrumentFamily[]> => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instrument-family`)
      if (!response.ok) throw new Error("Failed to fetch instrument families")
      const data: ApiResponse = await response.json()
      return data.data
    },
  })

  // Ensure instrumentFamilies is always array
  const instrumentFamilies: InstrumentFamily[] = Array.isArray(instrumentFamiliesRaw) ? instrumentFamiliesRaw : []

  // Mutation to update instrument types
  const mutation = useMutation({
    mutationFn: async (newInstrumentTypes: string[]) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instrument-family/${selectedFamilyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instrumentTypes: newInstrumentTypes }),
      })
      if (!response.ok) throw new Error("Failed to update instrument types")
      const data: ApiResponse = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success("Instrument types added successfully!")
      setInstrumentTypes([""]) // reset inputs
      setSelectedFamily("") // reset dropdown
      setSelectedFamilyId("")
    },
    onError: (error: Error) => {
      toast.error(`Failed to add instrument types: ${error.message}`)
    },
  })

  // Handle input change
  const handleInstrumentTypeChange = (index: number, value: string) => {
    const newTypes = [...instrumentTypes]
    newTypes[index] = value
    setInstrumentTypes(newTypes)
  }

  // Add new input
  const addInstrumentType = () => setInstrumentTypes([...instrumentTypes, ""])

  // Remove input
  const removeInstrumentType = (index: number) => {
    const newTypes = instrumentTypes.filter((_, i) => i !== index)
    setInstrumentTypes(newTypes.length > 0 ? newTypes : [""])
  }

  // Handle publish
  const handleSubmit = () => {
    const validTypes = instrumentTypes.filter((t) => t.trim() !== "")
    if (!selectedFamilyId) return toast.error("Please select an instrument family")
    if (validTypes.length === 0) return toast.error("Please add at least one instrument type")
    mutation.mutate(validTypes)
  }

  return (
    <div>
      {/* Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">Instrument Family</label>
        <div className="relative">
          <select
            value={selectedFamily}
            onChange={(e) => {
              const selectedOption = instrumentFamilies.find(f => f.instrumentFamily === e.target.value)
              setSelectedFamily(e.target.value)
              setSelectedFamilyId(selectedOption?._id || "")
              // preload existing instrumentTypes
              setInstrumentTypes(selectedOption?.instrumentTypes.length ? selectedOption.instrumentTypes : [""])
            }}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#139a8e]-500 focus:border-[#139a8e]-500 text-gray-900"
            disabled={isLoading || isError}
          >
            <option value="">Select Instrument Family</option>
            {instrumentFamilies.map(family => (
              <option key={family._id} value={family.instrumentFamily}>
                {family.instrumentFamily}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        {isLoading && <p className="text-sm text-gray-500 mt-2">Loading instrument families...</p>}
        {isError && <p className="text-sm text-red-500 mt-2">Error: {error?.message}</p>}
      </div>

      {/* Instrument Types */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Instrument Types</h2>

        {instrumentTypes.map((type, index) => (
          <div key={index} className="mb-4 flex items-center gap-2">
            <input
              type="text"
              value={type}
              onChange={e => handleInstrumentTypeChange(index, e.target.value)}
              placeholder="Add instrument type..."
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#139a8e]-500 focus:border-[#139a8e]-500 text-gray-900 placeholder-gray-400"
            />
            {instrumentTypes.length > 1 && (
              <Button variant="outline" size="icon" onClick={() => removeInstrumentType(index)} className="border-gray-300">
                <Trash2 className="w-5 h-5 text-gray-400" />
              </Button>
            )}
          </div>
        ))}

        {/* Add input button */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center mb-6">
          <Button variant="ghost" size="icon" onClick={addInstrumentType} className="hover:bg-gray-100">
            <Plus className="w-8 h-8 text-gray-400 mx-auto" />
          </Button>
        </div>
      </div>

      {/* Publish */}
      <Button
        className="w-full bg-[#139a8e] hover:bg-[#139a8e] text-white py-3 rounded-md font-medium"
        onClick={handleSubmit}
        disabled={mutation.status === 'pending' || isError}
      >
        {mutation.status === 'pending' ? "Publishing..." : "Publish"}
      </Button>
    </div>
  )
}
