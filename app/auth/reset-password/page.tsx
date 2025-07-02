import ResetPasswordForm from '@/components/auth/reset-password'
import React, { Suspense } from 'react'

export default function ResetPasswordPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </main>
    )
}
