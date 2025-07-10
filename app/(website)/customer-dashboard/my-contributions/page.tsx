import ContributionTabs from '@/components/customer-dashboard/contributions/contribution-tabs'
import React from 'react'

export default function MyContributionsPage() {
  return (
    <main>
      <div className="container py-8 lg:py-20">
        <div className="py-5">
          <h2 className='text-2xl font-semibold'>My Contributions</h2>
          <p>Here you can see your reviews, photos and businesses added</p>
        </div>
        <ContributionTabs />
      </div>
    </main>
  )
}
