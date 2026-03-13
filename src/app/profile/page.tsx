'use client'

import dynamic from 'next/dynamic'

const ProfilePage = dynamic(() => import('@/components/pages/Profile/ProfilePage'), {
  ssr: false,
})

export default function Profile() {
  return <ProfilePage />
}
