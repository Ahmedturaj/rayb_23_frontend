"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { resendOTP, verifyEmail } from "@/app/actions/auth";

export default function VerifyOTPPage() {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const type = searchParams.get("type") || "";

    useEffect(() => {
        if (!token) router.push("/auth/register");
        else inputRefs.current[0]?.focus();
    }, [router, token]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendDisabled && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (countdown === 0) {
            setResendDisabled(false);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [resendDisabled, countdown]);

    if (!token || !type) {
        router.push("/auth/register")
        return
    }

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").trim();
        if (/^\d{6}$/.test(pastedData)) {
            setOtp(pastedData.split(""));
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP");
            return;
        }
        setIsLoading(true);
        const { ok, data } = await verifyEmail(token, otpValue, type);
        if (ok && data?.success) {
            toast.success("Your email has been verified successfully");
            if (type === "signup") {
                router.push("/auth/login");
            } else {
                router.push(`/auth/reset-password?token=${token}`);
            }
        } else {
            toast.error(data?.message || "Invalid OTP code");
        }
        setIsLoading(false);
    };

    const handleResendOTP = async () => {
        if (!token) {
            router.push("/auth/register");
            return;
        }
        setResendDisabled(true);
        setCountdown(60);
        const otpValue = otp.join("");
        const { ok, data } = await resendOTP(token, otpValue);
        if (ok && data?.success) {
            toast.success("A new OTP has been sent to your email");
        } else {
            toast.error(data?.message || "Failed to resend OTP");
            setResendDisabled(false);
        }
    };

    return (
        <div className="lg:py-20 py-10 flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Verify Email</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Enter the 6-digit OTP sent to your email</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-50 py-8 px-6 shadow rounded-lg sm:px-10 space-y-6"
                >
                    <div className="flex justify-center space-x-3">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                className="w-12 h-12 text-center text-xl rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white ${isLoading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </button>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Didn&apos;t receive OTP?</span>
                        <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={resendDisabled}
                            className={`font-medium ${resendDisabled ? "text-gray-400 cursor-not-allowed" : "text-teal-600 hover:text-teal-700"
                                }`}
                        >
                            {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
