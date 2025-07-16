import React from 'react'
import UserData from './user-data'
import ProfileLinks from './profile-links'

export default function ProfilePage() {
    return (
        <main>
            <div className='container'>
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Profile Information */}
                    <div className="lg:col-span-1">
                        <UserData />
                    </div>
                    <div className="lg:col-span-2">
                        <ProfileLinks />
                    </div>
                </div>
            </div>
        </main>
    )
}
