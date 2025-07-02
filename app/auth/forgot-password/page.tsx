import ForgotPassForm from '@/components/auth/forgot-password'
import React, { Suspense } from 'react'

export default function ForgotPasswordPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <ForgotPassForm />
            </Suspense>
        </main>
    )
}
