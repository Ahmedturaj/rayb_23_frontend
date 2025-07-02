import VerifyOTPPage from '@/components/auth/verify-email'
import React, { Suspense } from 'react'

export default function VerifyEmailPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyOTPPage />
            </Suspense>
        </main>
    )
}
