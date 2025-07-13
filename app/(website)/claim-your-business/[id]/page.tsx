"use client";
import PathTracker from "@/components/shared/PathTracker";
import { getSingleBusiness } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const SingleBusiness = () => {
  const params = useParams();

  const id = params?.id;

  const { data: singleBusiness, isLoading } = useQuery({
    queryKey: ["get-single-business", id],
    queryFn: async () => await getSingleBusiness(id).then((res) => res.data),
  });

  if (isLoading)
    return (
      <div className="text-center flex flex-col items-center justify-center min-h-[calc(100vh-88px)] text-lg">
        Loading...
      </div>
    );

  return (
    <div className="container pt-8 pb-16 space-y-10">
      <div>
        <PathTracker title={""} header={singleBusiness?.businessInfo?.name} />
      </div>

      <div className="bg-white rounded-lg shadow-[0px_2px_12px_0px_#003d3924] p-6">
        <div className="flex items-center gap-5">
          {/* Profile Image */}
          <div className="flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={singleBusiness?.businessInfo?.image[0] || "/placeholder.svg"}
              alt={"business.png"}
              width={1000}
              height={1000}
              className="rounded-lg object-cover h-[200px] w-[200px] hover:scale-105 transition"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {singleBusiness?.businessInfo?.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 my-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{"3.7"}</span>
                </div>

                {/* Services */}
                <div className="flex items-center gap-2 mb-2">
                  {singleBusiness?.instrumentInfo?.map(
                    (service: { serviceName: string }, index: string) => (
                      <button
                        className="h-[48px] px-5 rounded-lg bg-[#F8F8F8]"
                        key={index}
                      >
                        {service?.serviceName}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button className=" bg-[#139a8e] h-[48px] text-white px-5 rounded-lg w-[180px]">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Verify Your Claim
          </h1>
          <p className="text-gray-600">
            Please select one of the following methods to verify your claim
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Verification */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12">
                    <Image
                      src={"/images/email.png"}
                      alt="/images/email.png"
                      width={2000}
                      height={2000}
                      className="h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Email Verification
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      • A verification code will be sent to the email address
                      associated with the business.
                    </li>
                    <li>
                      • Enter the code received in the provided field to verify
                      your ownership.
                    </li>
                  </ul>
                </div>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-[40px] rounded-lg">
                Verify
              </button>
            </div>
          </div>

          {/* Phone Verification */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12">
                    <Image
                      src={"/images/phone.png"}
                      alt="/images/phone.png"
                      width={2000}
                      height={2000}
                      className="h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Phone Verification
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>
                      • A verification code will be sent to phone number via SMS
                      or an automated phone call.
                    </li>
                    <li>
                      • Enter the code received to complete the verification.
                    </li>
                  </ul>
                </div>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-[40px] rounded-lg">
                Verify
              </button>
            </div>
          </div>

          {/* Document Verification */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12">
                    <Image
                      src={"/images/document.png"}
                      alt="/images/document.png"
                      width={2000}
                      height={2000}
                      className="h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Document Verification{" "}
                    <span className="text-gray-400 font-normal">
                      (Optional)
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    If you prefer, you can upload official documents to verify
                    ownership. These could include:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• A business license.</li>
                    <li>• A utility bill showing the business address.</li>
                    <li>
                      • Other documents that can confirm your connection to the
                      business.
                    </li>
                  </ul>
                </div>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 h-[40px] rounded-lg">
                Verify
              </button>
            </div>
          </div>
        </div>

        {/* Note */}
        <div>
          <p className="mt-5">
            <span className="font-medium">Note:</span> Submission will be
            reviewed by the admin and you will be notified through sms or email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleBusiness;
