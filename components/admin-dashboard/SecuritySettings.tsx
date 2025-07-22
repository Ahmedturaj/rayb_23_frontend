// "use client"

// import * as React from "react"
// import { Lock, Eye, EyeOff } from "lucide-react"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Switch } from "@/components/ui/switch"
// import { useSession } from "next-auth/react"

// export function SecuritySettings() {
//   const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
//   const [showNewPassword, setShowNewPassword] = React.useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
//   const session=useSession()
//   const token = session.data?.user?.accessToken;


//   return (
//     <div className=" space-y-8">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-xl text-[#1D2020] font-semibold">Change Password</CardTitle>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <div className="grid gap-2">
//             <Label className="text-base text-[#485150] font-medium" htmlFor="currentPassword">Current Password</Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="currentPassword"
//                 type={showCurrentPassword ? "text" : "password"}
//                 placeholder="Enter your current password"
//                 className="pl-9 pr-9 h-[48px]"
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
//                 onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//               >
//                 {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
//               </Button>
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label className="text-base text-[#485150] font-medium" htmlFor="newPassword">New Password</Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="newPassword"
//                 type={showNewPassword ? "text" : "password"}
//                 placeholder="Enter new password"
//                 className="pl-9 pr-9 h-[48px]"
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
//                 onClick={() => setShowNewPassword(!showNewPassword)}
//               >
//                 {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
//               </Button>
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label className="text-base text-[#485150] font-medium" htmlFor="confirmNewPassword">Confirm New Password</Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 id="confirmNewPassword"
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm new password"
//                 className="pl-9 pr-9 h-[48px]"
//               />
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="icon"
//                 className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               >
//                 {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                 <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
//               </Button>
//             </div>
//           </div>
//           <p className="text-sm text-[#485150] font-normal">Use 8+ characters, uppercase, lowercase, number, and symbol.</p>
//           <Button className="bg-[#00998E] hover:bg-[#00998E]/90 text-white text-base w-[160px] h-[48px]">Change Password</Button>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-xl text-[#1D2020] font-semibold ">Verification & Security</CardTitle>
//         </CardHeader>
//         <CardContent className="grid gap-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-semibold text-base text-[#1D2020]">Verify Your Phone Number</h3>
//               <p className="text-sm text-[#485150] font-normal">
//                 Your phone number is not verified, please verify your phone number
//               </p>
//             </div>
//             <Button variant="outline" className="bg-[#00998E] hover:bg-[#00998E]/90 text-white hover:text-white">
//               Verify Now
//             </Button>
//           </div>
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-semibold text-base text-[#1D2020]">Two Factor Authentication</h3>
//               <p className="text-sm text-[#485150] font-normal">
//                 Verify your identity with a phone number or email every time you sign in — ensuring it&ldquo;s always you.
//               </p>
//             </div>
//             <Switch defaultChecked className="data-[state=checked]:bg-[#00998E]" />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client"

import * as React from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

type PasswordFormData = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  
  const session = useSession()
  const token = session.data?.user?.accessToken

  const { register, handleSubmit, reset } = useForm<PasswordFormData>()

  const changePasswordMutation = useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        })
      })

      if (!response.ok) {
        throw new Error('Failed to change password')
      }

      return response.json()
    },
    onSuccess: () => {
      toast.success("Password changed successfully")
      reset()
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to change password")
    }
  })

  const onSubmit = (data: PasswordFormData) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Passwords don't match")
      return
    }
    changePasswordMutation.mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-[#1D2020] font-semibold">Change Password</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label className="text-base text-[#485150] font-medium" htmlFor="currentPassword">
                Current Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  className="pl-9 pr-9 h-[48px]"
                  {...register("currentPassword", { required: true })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showCurrentPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-2 mt-4">
              <Label className="text-base text-[#485150] font-medium" htmlFor="newPassword">
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="pl-9 pr-9 h-[48px]"
                  {...register("newPassword", { required: true })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showNewPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-2 mt-4">
              <Label className="text-base text-[#485150] font-medium" htmlFor="confirmNewPassword">
                Confirm New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmNewPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="pl-9 pr-9 h-[48px]"
                  {...register("confirmNewPassword", { required: true })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="bg-[#00998E] hover:bg-[#00998E]/90 text-white text-base w-[160px] h-[48px] mt-4"
              disabled={changePasswordMutation.isPending}
            >
              {changePasswordMutation.isPending ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-[#1D2020] font-semibold">Verification & Security</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base text-[#1D2020]">Verify Your Phone Number</h3>
              <p className="text-sm text-[#485150] font-normal">
                Your phone number is not verified, please verify your phone number
              </p>
            </div>
            <Button variant="outline" className="bg-[#00998E] hover:bg-[#00998E]/90 text-white hover:text-white">
              Verify Now
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base text-[#1D2020]">Two Factor Authentication</h3>
              <p className="text-sm text-[#485150] font-normal">
                Verify your identity with a phone number or email every time you sign in — ensuring it&ldquo;s always you.
              </p>
            </div>
            <Switch defaultChecked className="data-[state=checked]:bg-[#00998E]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}