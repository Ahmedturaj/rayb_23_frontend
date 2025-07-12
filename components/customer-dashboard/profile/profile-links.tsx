import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ProfileLinks() {
    return (
        <div className='lg:p-8 p-4 rounded-md border space-y-5'>
            <div className="bg-[#F7F8F8] p-5 rounded-md">
                <Link href="/customer-dashboard/my-contributions" className='flex items-center justify-between'>
                    <div className="space-y-2">
                        <h3 className='text-lg font-semibold'>My Contributions</h3>
                        <p className='text-sm text-gray-600'>See your reviews, photos and business added.</p>
                    </div>
                    <ChevronRight className='h-5 w-5' />
                </Link>
            </div>
            <div className="bg-[#F7F8F8] p-5">
                <Link href="/customer-dashboard/saved" className='flex items-center justify-between'>
                    <div className="space-y-2">
                        <h3 className='text-lg font-semibold'>Saved</h3>
                        <p className='text-sm text-gray-600'>See the businesses you have saved.</p>
                    </div>
                    <ChevronRight className='h-5 w-5' />
                </Link>
            </div>
        </div>
    )
}
