'use client'

import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Text from '@/components/ui-kit/Text'
import Button from '@/components/ui-kit/Button'
import { authStore } from '@/stores/global/AuthStore/AuthStore'
import { cartStore } from '@/stores/global/CartStore'
import styles from './ProfilePage.module.scss'

const ProfilePage = observer(() => {
  const router = useRouter()

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      router.push('/auth?next=/profile')
    }
  }, [router])

  if (!authStore.isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    authStore.logout()
    cartStore.cartItems = []
    router.push('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Text view="title" color="primary">
          Profile
        </Text>

        <div className={styles.info}>
          <div className={styles.row}>
            <Text view="p-14" color="secondary">
              Email
            </Text>
            <Text view="p-18" color="primary" weight="bold">
              {authStore.user?.email}
            </Text>
          </div>

          <div className={styles.row}>
            <Text view="p-14" color="secondary">
              Username
            </Text>
            <Text view="p-18" color="primary" weight="bold">
              {authStore.user?.username}
            </Text>
          </div>
        </div>

        <Button onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
})

export default ProfilePage
