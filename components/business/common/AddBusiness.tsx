"use client";
import React, { useState } from "react";
import BusinessHours from "../BusinessHours";
import BusinessInform from "../BusinessInform";
import Service from "../Service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addBusiness, getAllInstrument } from "@/lib/api";
import { Loader } from "lucide-react";
import { toast } from "sonner";

interface ServiceType {
  newInstrumentName: string;
  pricingType: string;
  minPrice: string;
  maxPrice: string;
  price: string;
  selectedInstrumentsGroup?: string;
  instrumentFamily?: string;
  selectedInstrumentsGroupMusic?: string;
}

type OptionKey = "buy" | "sell" | "trade" | "rent";

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

const AddBusiness = () => {
  // modal control
  const [serviceModal, setServiceModal] = useState(false);
  const [instrumentFamily, setInstrumentFamily] = useState<string>("");
  const [ServiceModalMusic, setServiceModalMusic] = useState(false);

  // control instrument family
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [selectedInstrumentsMusic, setSelectedInstrumentsMusic] = useState<
    string[]
  >([]);

  //control selected instrument group
  const [selectedInstrumentsGroup, setSelectedInstrumentsGroup] = useState("");
  const [selectedInstrumentsGroupMusic, setSelectedInstrumentsGroupMusic] =
    useState<string>("");

  //service Modal related
  const [newInstrumentName, setNewInstrumentName] = useState("");
  const [pricingType, setPricingType] = useState("exact");
  const [price, setPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState<ServiceType[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<ServiceType[]>([]);

  console.log("selected", selected);
  console.log("selected Music", selectedMusic);

  const handleAddInstrument = () => {
    setSelected((prev) => [
      ...prev,
      {
        newInstrumentName: newInstrumentName,
        pricingType: pricingType,
        price: price,
        minPrice: minPrice,
        maxPrice: maxPrice,
        selectedInstrumentsGroup: selectedInstrumentsGroup,
        instrumentFamily: instrumentFamily,
      },
    ]);
    setNewInstrumentName("");
    setPricingType("");
    setPrice("");
    setMinPrice("");
    setMaxPrice("");

    setServiceModal(false);
  };

  const handleAddInstrumentMusic = () => {
    setSelectedMusic((prev) => [
      ...prev,
      {
        newInstrumentName: newInstrumentName,
        pricingType: pricingType,
        price: price,
        minPrice: minPrice,
        maxPrice: maxPrice,
        selectedInstrumentsGroupMusic: selectedInstrumentsGroupMusic,
        instrumentFamily: instrumentFamily,
      },
    ]);
    setNewInstrumentName("");
    setPricingType("");
    setPrice("");
    setMinPrice("");
    setMaxPrice("");

    setServiceModalMusic(false);
  };

  const { data: allInstrument } = useQuery({
    queryKey: ["get-all-instrument"],
    queryFn: async () => {
      const res = await getAllInstrument();
      return res?.data;
    },
  });

  // buy / cell/ trade / rent related state

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOptions, setSelectedOptions] = useState<
    Record<OptionKey, boolean>
  >({
    buy: false,
    sell: false,
    trade: false,
    rent: false,
  });

  //business hour
  const [businessHours, setBusinessHours] = React.useState(
    daysOfWeek.map((day) => ({
      day,
      enabled: false, // default to false
      ...defaultTime,
    }))
  );

  //business information related
  const [images, setImages] = useState<string[]>([]);
  const [businessMan, setBusinessName] = useState("");
  const [addressName, setAddressName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleUploadImage = () => {
    const input = document.getElementById("image_input");
    if (input) {
      input.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const imageURLs = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    // Combine with existing images
    setImages((prev) => [...prev, ...imageURLs]);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { mutateAsync: addBusinessData, isPending } = useMutation({
    mutationKey: ["add-business"],
    mutationFn: async (data: FormData) => {
      await addBusiness(data);
    },
    onSuccess: () => {
      toast.success("Business added successfully!");
    },
    onError: () => {
      toast.error("Failed to add business!");
    },
  });

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // Create FormData object
  //   const formData = new FormData();

  //   // Business Information
  //   formData.append("businessInfo[name]", businessMan);
  //   formData.append("businessInfo[address]", addressName);
  //   formData.append("businessInfo[description]", description);
  //   if (phoneNumber) formData.append("businessInfo[phone]", phoneNumber);
  //   if (email) formData.append("businessInfo[email]", email);
  //   if (website) formData.append("businessInfo[website]", website);

  //   // Add images (assuming you want to upload actual files, not just URLs)
  //   const imageInput = document.getElementById(
  //     "image_input"
  //   ) as HTMLInputElement;
  //   if (imageInput?.files) {
  //     for (let i = 0; i < imageInput.files.length; i++) {
  //       formData.append("businessInfo[image]", imageInput.files[i]);
  //     }
  //   }

  //   // Services
  //   selected.forEach((service, index) => {
  //     formData.append(
  //       `services[${index}][serviceName]`,
  //       service.newInstrumentName
  //     );
  //     formData.append(`services[${index}][pricingType]`, service.pricingType);
  //     formData.append(
  //       `services[${index}][instrumentName]`,
  //       service.newInstrumentName
  //     );
  //     formData.append(
  //       `services[${index}][instrumentFamily]`,
  //       selectedInstrumentsGroup
  //     );

  //     if (service.price)
  //       formData.append(`services[${index}][price]`, service.price);
  //     if (service.minPrice)
  //       formData.append(`services[${index}][minPrice]`, service.minPrice);
  //     if (service.maxPrice)
  //       formData.append(`services[${index}][maxPrice]`, service.maxPrice);
  //   });

  //   // Music Lessons
  //   selectedMusic.forEach((lesson, index) => {
  //     formData.append(
  //       `musicLessons[${index}][newInstrumentName]`,
  //       lesson.newInstrumentName
  //     );
  //     formData.append(
  //       `musicLessons[${index}][pricingType]`,
  //       lesson.pricingType
  //     );
  //     formData.append(
  //       `musicLessons[${index}][selectedInstrumentsGroupMusic]`,
  //       selectedInstrumentsGroupMusic
  //     );

  //     if (lesson.price)
  //       formData.append(`musicLessons[${index}][price]`, lesson.price);
  //     if (lesson.minPrice)
  //       formData.append(`musicLessons[${index}][minPrice]`, lesson.minPrice);
  //     if (lesson.maxPrice)
  //       formData.append(`musicLessons[${index}][maxPrice]`, lesson.maxPrice);
  //   });

  //   // Business Hours
  //   businessHours.forEach((hour, index) => {
  //     if (hour.enabled) {
  //       formData.append(`businessHours[${index}][day]`, hour.day.toLowerCase());
  //       formData.append(
  //         `businessHours[${index}][open]`,
  //         `${hour.startTime} ${hour.startMeridiem}`
  //       );
  //       formData.append(
  //         `businessHours[${index}][close]`,
  //         `${hour.endTime} ${hour.endMeridiem}`
  //       );
  //       formData.append(`businessHours[${index}][closed]`, "false");
  //     } else {
  //       formData.append(`businessHours[${index}][day]`, hour.day.toLowerCase());
  //       formData.append(`businessHours[${index}][closed]`, "true");
  //     }
  //   });

  //   // Service options
  //   formData.append("buyInstruments", selectedOptions.buy.toString());
  //   formData.append("sellInstruments", selectedOptions.sell.toString());
  //   formData.append("offerMusicLessons", (selectedMusic.length > 0).toString());

  //   // Add other fields that might be required
  //   formData.append("status", "pending");
  //   formData.append("isVerified", "false");

  //   await addBusinessData(formData);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    const imageInput = document.getElementById(
      "image_input"
    ) as HTMLInputElement;
    const imageFiles = imageInput?.files ? Array.from(imageInput.files) : [];

    console.log(imageFiles)

    imageFiles.forEach((file) => {
      formData.append("image", file);
    });

    const businessData = {
      businessInfo: {
        name: businessMan,
        address: addressName,
        description,
        phone: phoneNumber,
        email,
        website,
      },
      services: selected.map((service) => ({
        newInstrumentName: service.newInstrumentName,
        pricingType: service.pricingType,
        price: service.price,
        minPrice: service.minPrice,
        maxPrice: service.maxPrice,
        selectedInstrumentsGroup: service.selectedInstrumentsGroup,
        instrumentFamily: service.instrumentFamily,
      })),
      musicLessons: selectedMusic.map((lesson) => ({
        newInstrumentName: lesson.newInstrumentName,
        pricingType: lesson.pricingType,
        price: lesson.price,
        minPrice: lesson.minPrice,
        maxPrice: lesson.maxPrice,
        selectedInstrumentsGroupMusic: lesson.selectedInstrumentsGroupMusic,
      })),
      businessHours: businessHours.map((hour) => ({
        day: hour.day, // Must match enum values exactly
        startTime: hour.startTime,
        startMeridiem: hour.startMeridiem,
        endTime: hour.endTime,
        endMeridiem: hour.endMeridiem,
        enabled: hour.enabled,
      })),
      buyInstruments: selectedOptions.buy,
      sellInstruments: selectedOptions.sell,
      offerMusicLessons: selectedMusic.length > 0,
      status: "pending",
      isVerified: false,
    };

    formData.append("data", JSON.stringify(businessData));

    console.log("Submitting:", {
      images: imageFiles.map((f) => f.name),
      businessData,
    });

    await addBusinessData(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* business information */}
        <div>
          <div>
            <h1 className="text-[28px] font-semibold">
              1. Business Information
            </h1>
            <p className="text-[#485150] text-[16px]">
              Complete the following fields to provide key details about the
              business
            </p>
          </div>

          <BusinessInform
            handleFileChange={handleFileChange}
            handleUploadImage={handleUploadImage}
            images={images}
            handleRemoveImage={handleRemoveImage}
            setAddressName={setAddressName}
            setBusinessName={setBusinessName}
            setDescription={setDescription}
            setEmail={setEmail}
            setPhoneNumber={setPhoneNumber}
            setWebsite={setWebsite}
          />
        </div>

        {/* divider */}
        <div className=" border-b border-gray-200 pt-12"></div>

        {/* services offered */}
        <div className="pt-10">
          <Service
            allInstrument={allInstrument}
            serviceModal={serviceModal}
            setServiceModal={setServiceModal}
            serviceModalMusic={ServiceModalMusic}
            setServiceModalMusic={setServiceModalMusic}
            selectedInstruments={selectedInstruments}
            setSelectedInstruments={setSelectedInstruments}
            selectedInstrumentsMusic={selectedInstrumentsMusic}
            setSelectedInstrumentsMusic={setSelectedInstrumentsMusic}
            selectedInstrumentsGroup={selectedInstrumentsGroup}
            setSelectedInstrumentsGroup={setSelectedInstrumentsGroup}
            selectedInstrumentsGroupMusic={selectedInstrumentsGroupMusic}
            setSelectedInstrumentsGroupMusic={setSelectedInstrumentsGroupMusic}
            newInstrumentName={newInstrumentName}
            setNewInstrumentName={setNewInstrumentName}
            pricingType={pricingType}
            setPricingType={setPricingType}
            price={price}
            setPrice={setPrice}
            handleAddInstrument={handleAddInstrument}
            handleAddInstrumentMusic={handleAddInstrumentMusic}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            selected={selected}
            setSelected={setSelected}
            selectedMusic={selectedMusic}
            setSelectedMusic={setSelectedMusic}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            setInstrumentFamily={setInstrumentFamily}
          />
        </div>

        {/* divider */}
        <div className=" border-b border-gray-200 pt-12"></div>

        {/* Business Hours */}
        <div className="pt-10">
          <div>
            <h1 className="text-[28px] font-semibold">3. Business Hours</h1>
            <p className="text-[#485150] text-[16px]">
              Let your customers know when your shop is open throughout the week
            </p>
          </div>

          <div>
            <BusinessHours
              businessHours={businessHours}
              setBusinessHours={setBusinessHours}
            />
          </div>
        </div>

        {/* divider */}
        <div className=" border-b border-gray-200 pt-12"></div>

        {/* Submit for Verification */}
        <div className="pt-10">
          <div>
            <h1 className="text-[28px] font-semibold">
              4. Submit for Verification
            </h1>
            <p className="text-[#485150] text-[16px]">
              Once you’ve filled out all the information (business details,
              instrument families, services, and pricing), click{" "}
              <strong>Submit</strong> to send the business details for
              verification.
            </p>

            <ul className=" list-disc text-[#485150] text-[16px] ml-5">
              <li>
                Your submission will be reviewed by the admin team for accuracy
                and completeness.
              </li>
              <li>
                You’ll receive an email notification once the business is
                approved and listed on the website.
              </li>
            </ul>
          </div>
        </div>

        {/* submit button */}
        <div className="pt-10 text-center">
          <button
            type="submit"
            className={`flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition ${
              isPending && "opacity-70"
            }`}
          >
            {isPending ? (
              <span className="flex items-center justify-center">
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBusiness;
