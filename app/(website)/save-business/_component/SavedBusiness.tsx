"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import BusinessCard from "../../search-result/_component/BusinessCard";

interface SavedBusiness {
  _id: string;
  savedBusiness: {
    _id: string;
    businessInfo: {
      name: string;
      image: string[];
      address: string;
      phone: string;
      email: string;
      website: string;
      description: string;
    };
    services: Array<{
      newInstrumentName: string;
      pricingType: string;
      price: string;
      minPrice: string;
      maxPrice: string;
      selectedInstrumentsGroup: string;
      instrumentFamily: string;
    }>;
    // Other properties from your data structure
  };
}

const SavedBusiness = () => {
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const { data, isLoading, error } = useQuery({
    queryKey: ["saved-businesses"],
    queryFn: async () => {
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/saved-business/my-saved-business`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch saved businesses");
      }

      return response.json();
    },
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    toast.error(error.message);
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        {error.message}
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="container mx-auto py-8 text-center text-gray-500">
        No saved businesses found
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Saved Businesses</h1>
      <div className="space-y-6">
        {data.data.map((item: SavedBusiness) => {
          // Transform the data to match BusinessCard props
          const business = {
            _id: item.savedBusiness._id,
            businessInfo: item.savedBusiness.businessInfo,
            instrumentInfo: item.savedBusiness.services.map((service) => ({
              newInstrumentName: service.selectedInstrumentsGroup,
              price:
                service.pricingType === "exact"
                  ? service.price
                  : service.pricingType === "range"
                  ? `${service.minPrice}-${service.maxPrice}`
                  : `${service.price}/hr`,
            })),
          };

          return <BusinessCard key={item._id} business={business} />;
        })}
      </div>
    </div>
  );
};

export default SavedBusiness;
