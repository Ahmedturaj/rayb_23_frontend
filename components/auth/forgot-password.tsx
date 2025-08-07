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
import { Mail, Loader } from "lucide-react"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { forgotPassword } from '@/app/actions/auth'

const signUpFormSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
})

export default function ForgotPassForm() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
        setIsLoading(true)
        try {
            const res = await forgotPassword(values.email)

            console.log(res)

            if (!res?.success) {
                toast.error(res.message)
            } else {
                toast.success(res.message)
                router.push(`/auth/verify-email?token=${res?.token}&type=forget-password`)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="lg:py-20 py-10 flex justify-center items-center">
            <div className="max-w-2xl mx-auto w-full px-4">
                <div className="text-center space-y-4 lg:pb-10">
                    <h2 className='lg:text-3xl font-bold'>Forgot Password?</h2>
                    <p className='text-[#485150] lg:text-base'>Enter your email address below, and we&apos;ll email instructions
                        for setting a new one.</p>
                </div>
                <Form {...signUpForm}>
                    <form onSubmit={signUpForm.handleSubmit(onSubmit)} className="lg:space-y-6 space-y-3">

                        {/* Email */}
                        <FormField
                            control={signUpForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <Input className="pl-10 h-14 bg-[#F7F8F8] border border-[#E7E9E9]" placeholder="Enter your email" {...field} />
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
                            Send OTP
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    )
}
