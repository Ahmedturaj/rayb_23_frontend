"use client"

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Eye, EyeOff, Lock, Loader } from "lucide-react"
import { toast } from 'sonner'
import { useRouter, useSearchParams } from 'next/navigation'
import { resetPassword } from '@/app/actions/auth'

const resetPasswordSchema = z
    .object({
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
        confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default function ResetPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token") || ""


    if (!token) {
        router.push("/auth/login")
        return
    }

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
        setIsLoading(true)
        try {
            const res = await resetPassword({
                token,
                password: values.confirmPassword,
            });

            if (!res?.success) {
                toast.error(res.message)
            } else {
                toast.success(res.message)
                router.push("/auth/login")
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again later.")
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <section className="h-screen flex justify-center items-center">
            <div className="max-w-2xl mx-auto w-full px-4">
                <div className="text-center space-y-4 lg:pb-10">
                    <h2 className='lg:text-3xl font-bold'>Reset Password</h2>
                    <p className='text-[#485150] lg:text-base'>
                        Enter your new password below to reset your account.
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="lg:space-y-6 space-y-3">

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <Input
                                                className="pl-10 h-14 bg-[#F7F8F8] border border-[#E7E9E9] pr-10"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter new password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                onClick={() => setShowPassword(prev => !prev)}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <Input
                                                className="pl-10 h-14 bg-[#F7F8F8] border border-[#E7E9E9] pr-10"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Confirm password"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                onClick={() => setShowPassword(prev => !prev)}
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button disabled={isLoading} type="submit" className="w-full">
                            {isLoading && (
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}
