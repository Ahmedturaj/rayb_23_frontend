"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  deactivateAccount,
  getUserProfile,
  updateUserProfile,
} from "@/lib/api";
import { User, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

// ✅ Zod schema
const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email"),
  bio: z.string().max(500).optional(),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function UserProfileForm() {
  const [deactivationReason, setDeactivationReason] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { name: "", email: "", bio: "", phone: "" },
  });

  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    select: (data) => data?.data,
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name || "",
        email: userProfile.email || "",
        bio: userProfile.bio || "",
        phone: "",
      });
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  }, [userProfile, form]);

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("bio", data.bio || "");
    formData.append("phone", data.phone || "");
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    updateProfileMutation.mutate(formData);
  };

  const handleImageEdit = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleCancel = () => {
    if (userProfile) {
      form.reset({
        name: userProfile.name || "",
        email: userProfile.email || "",
        bio: userProfile.bio || "",
        phone: "",
      });
    }
    setPreviewUrl(null);
    setSelectedFile(null);
  };

  const { mutate: deactivateAccountMutation } = useMutation({
    mutationFn: () =>
      deactivateAccount({ deactivedReason: deactivationReason }),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["userData"] });
    },
    onError: (error) => {
      if (error instanceof Error) toast.error(error.message);
    },
  });

  const handleDeactivateAccount = () => {
    deactivateAccountMutation();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading profile data
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 border-b pb-4">
            Account Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <div className="flex items-center justify-between">
              <div className="relative">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={previewUrl || userProfile?.imageLink}
                    alt={userProfile?.name || "Profile"}
                  />
                  <AvatarFallback className="bg-gray-100">
                    {userProfile?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <Button
                onClick={handleImageEdit}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6"
              >
                Edit
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                          placeholder="Enter your full name"
                          disabled={updateProfileMutation.isPending}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white"
                          placeholder="Enter your email"
                          disabled
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Bio (max 300 characters)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-gray-50 border-gray-200 focus:bg-white min-h-[80px] resize-none"
                        placeholder="Write about yourself"
                        maxLength={300}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <>
                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="bg-teal-600 hover:bg-teal-700 text-white w-full sm:w-auto"
                  >
                    {updateProfileMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="w-full sm:w-auto bg-transparent"
                  >
                    Cancel
                  </Button>
                </>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Account Deactivation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Account Deactivation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              What Happens When You Deactivate Your Account?
            </h3>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>
                You can reactivate your account within 30 days by logging back
                in.
              </li>
              <li>
                Your profile and messages will be hidden, but any businesses or
                contributions you&apos;ve added will remain visible on the
                platform.
              </li>
              <li>
                After 30 days, your account will be permanently deleted and
                cannot be recovered.
              </li>
            </ol>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                I&apos;m Leaving Because ...
              </label>
              <Select
                value={deactivationReason}
                onValueChange={setDeactivationReason}
              >
                <SelectTrigger className="bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Choose a Reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-useful">Not useful anymore</SelectItem>
                  <SelectItem value="privacy-concerns">
                    Privacy concerns
                  </SelectItem>
                  <SelectItem value="found-alternative">
                    Found an alternative
                  </SelectItem>
                  <SelectItem value="other">I don&apos;t feel safe</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="secondary"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-full sm:w-auto"
              disabled={!deactivationReason}
              onClick={handleDeactivateAccount}
            >
              Deactivate Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
