import ProfilePage from '@/components/pages/Profile/ProfilePage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Manage your account profile details',
}

export default function Profile() {
  return <ProfilePage />
}
