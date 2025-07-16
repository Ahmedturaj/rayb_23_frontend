import axios from "axios";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface ReviewModalProps {
  setIsOpen: (isOpen: boolean) => void;
  businessID: string;
}
const VerifyBusinessCode: React.FC<ReviewModalProps> = ({
  setIsOpen,
  businessID,
}) => {
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target as HTMLFormElement;
    const code = (form.elements.namedItem("code") as HTMLInputElement)?.value;

    const sendOtp = { otp: code };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/claim-bussiness/verify-email/${businessID}`,
        sendOtp,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Verification Successful!");
      setIsOpen(false);
    } catch (error) {
      console.log(`error from verify code : ${error}`);
      toast.error("Failed to verify!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 min-h-screen">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 ">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="text-center text-xl font-semibold">
              Enter Your Verification Code
            </div>

            <div className="my-8 flex justify-center">
              <InputOTP
                name="code"
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="flex items-center gap-5">
              <button
                onClick={() => setIsOpen(false)}
                className="h-[48px] border border-gray-200 w-full text-center rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`h-[48px] bg-teal-600 w-full text-center rounded-lg text-white ${
                  loading && "opacity-70"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Submitting
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyBusinessCode;
