'use client'

import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Text from '@/components/ui-kit/Text'
import Button from '@/components/ui-kit/Button'
import { useI18n } from '@/components/providers/I18nProvider'
import { authStore } from '@/stores/global/AuthStore/AuthStore'
import { cartStore } from '@/stores/global/CartStore'
import styles from './ProfilePage.module.scss'

const ProfilePage = observer(() => {
  const router = useRouter()
  const { t } = useI18n()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (!authStore.isAuthenticated) {
      router.push('/auth?next=/profile')
    }
  }, [router])

  if (!isMounted || !authStore.isAuthenticated) {
    return null
  }

  const handleLogout = () => {
    authStore.logout()
    cartStore.clearCart()
    router.push('/')
  }

  const username = authStore.user?.username || t('profile.defaultUser')
  const email = authStore.user?.email || t('profile.defaultEmail')
  const initials = (username[0] || email[0] || 'U').toUpperCase()

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatar}>{initials}</div>
          <div className={styles.headerText}>
            <Text view="title" color="primary">
              {t('profile.title')}
            </Text>
            <Text view="p-16" color="secondary">
              {t('profile.subtitle')}
            </Text>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.row}>
            <Text view="p-14" color="secondary">
              {t('profile.field.email')}
            </Text>
            <Text view="p-18" color="primary" weight="bold" className={styles.value}>
              {email}
            </Text>
          </div>

          <div className={styles.row}>
            <Text view="p-14" color="secondary">
              {t('profile.field.username')}
            </Text>
            <Text view="p-18" color="primary" weight="bold" className={styles.value}>
              {username}
            </Text>
          </div>
        </div>

        <div className={styles.actions}>
          <Button onClick={handleLogout} className={styles.logoutBtn}>
            {t('profile.logout')}
          </Button>
        </div>
      </div>
    </div>
  )
})

export default ProfilePage
