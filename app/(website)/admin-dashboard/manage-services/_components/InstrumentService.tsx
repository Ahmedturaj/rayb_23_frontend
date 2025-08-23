// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { ChevronDown, Plus } from "lucide-react"

// export default function InstrumentService() {
//   const [selectedFamily, setSelectedFamily] = useState("Woodwinds")
//   const [instrumentTitle, setInstrumentTitle] = useState("")

//   return (
//     <div>
//       <div>
//         {/* Instrument Family Dropdown */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-900 mb-2">Instrument Name</label>
//           <div className="relative">
//             <select
//               value={selectedFamily}
//               onChange={(e) => setSelectedFamily(e.target.value)}
//               className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#139a8e]-500 focus:border-[#139a8e]-500 text-gray-900"
//             >
//               <option value="Woodwinds">Woodwinds</option>
//               <option value="Brass">Brass</option>
//               <option value="Strings">Strings</option>
//               <option value="Percussion">Percussion</option>
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
//           </div>
//         </div>

//         {/* Instrument Name Section */}
//         <div className="mb-6">
//           <h2 className="text-lg font-medium text-gray-900 mb-4">Service Name</h2>

//           {/* Add Instrument Name Input */}
//           <div className="mb-4">
//             <input
//               type="text"
//               value={instrumentTitle}
//               onChange={(e) => setInstrumentTitle(e.target.value)}
//               placeholder="Add your title..."
//               className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#139a8e]-500 focus:border-[#139a8e]-500 text-gray-900 placeholder-gray-400"
//             />
//           </div>

//           {/* Large Input Area with Plus Icon */}
//           <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center mb-6">
//             <div className="text-center">
//               <Plus className="w-8 h-8 text-gray-400 mx-auto" />
//             </div>
//           </div>
//         </div>

//         {/* Publish Button */}
//         <Button className="w-full bg-[#139a8e] hover:bg-[#139a8e] text-white py-3 rounded-md font-medium">Publish</Button>
//       </div>
//     </div>
//   )
// }



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

export default function InstrumentService() {
  const [selectedInstrumentType, setSelectedInstrumentType] = useState<string>("")
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>("")
  const [serviceTypes, setServiceTypes] = useState<string[]>([""]) // start with one input

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

  // Ensure instrumentFamilies is always an array
  const instrumentFamilies: InstrumentFamily[] = Array.isArray(instrumentFamiliesRaw) ? instrumentFamiliesRaw : []


  // Mutation to update service types
  const mutation = useMutation({
    mutationFn: async (newServiceTypes: string[]) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/instrument-family/${selectedFamilyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceType: newServiceTypes }),
      })
      if (!response.ok) throw new Error("Failed to update service types")
      const data: ApiResponse = await response.json()
      return data
    },
    onSuccess: () => {
      toast.success("Service types added successfully!")
      setServiceTypes([""]) // reset inputs
      setSelectedInstrumentType("") // reset dropdown
      setSelectedFamilyId("")
    },
    onError: (error: Error) => {
      toast.error(`Failed to add service types: ${error.message}`)
    },
  })

  // Handle input change
  const handleServiceTypeChange = (index: number, value: string) => {
    const newTypes = [...serviceTypes]
    newTypes[index] = value
    setServiceTypes(newTypes)
  }

  // Add new input
  const addServiceType = () => setServiceTypes([...serviceTypes, ""])

  // Remove input
  const removeServiceType = (index: number) => {
    const newTypes = serviceTypes.filter((_, i) => i !== index)
    setServiceTypes(newTypes.length > 0 ? newTypes : [""])
  }

  // Handle publish
  const handleSubmit = () => {
    const validTypes = serviceTypes.filter((t) => t.trim() !== "")
    if (!selectedFamilyId) return toast.error("Please select an instrument type")
    if (validTypes.length === 0) return toast.error("Please add at least one service type")
    mutation.mutate(validTypes)
  }

  return (
    <div>
      {/* Dropdown */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-900 mb-2">Instrument Type</label>
        <div className="relative">
          <select
            value={selectedInstrumentType}
            onChange={(e) => {
              const selectedFamily = instrumentFamilies.find(f => f.instrumentTypes.includes(e.target.value))
              setSelectedInstrumentType(e.target.value)
              setSelectedFamilyId(selectedFamily?._id || "")
              setServiceTypes(selectedFamily?.serviceType.length ? selectedFamily.serviceType : [""])
            }}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-[#139a8e]-500 focus:border-[#139a8e]-500 text-gray-900"
            disabled={isLoading || isError}
          >
            <option value="">Select Instrument Type</option>
            {instrumentFamilies.flatMap(family =>
              family.instrumentTypes.map(type => (
                <option key={`${family._id}-${type}`} value={type}>
                  {type}
                </option>
              ))
            )}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        {isLoading && <p className="text-sm text-gray-500 mt-2">Loading instrument types...</p>}
        {isError && <p className="text-sm text-red-500 mt-2">Error: {error?.message}</p>}
      </div>

      {/* Service Types */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Service Types</h2>

        {serviceTypes.map((type, index) => (
          <div key={index} className="mb-4 flex items-center gap-2">
            <input
              type="text"
              value={type}
              onChange={e => handleServiceTypeChange(index, e.target.value)}
              placeholder="Add service type..."
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#139a8e]-500 focus:border-[#139a8e]-500 text-gray-900 placeholder-gray-400"
            />
            {serviceTypes.length > 1 && (
              <Button variant="outline" size="icon" onClick={() => removeServiceType(index)} className="border-gray-300">
                <Trash2 className="w-5 h-5 text-gray-400" />
              </Button>
            )}
          </div>
        ))}

        {/* Add input button */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg py-3 px-4 flex items-center justify-center mb-6">
          <Button variant="ghost" size="icon" onClick={addServiceType} className="hover:bg-gray-100">
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