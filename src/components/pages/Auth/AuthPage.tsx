'use client'

import { observer } from 'mobx-react-lite'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Text from '@/components/ui-kit/Text'
import Input from '@/components/ui-kit/Input'
import Button from '@/components/ui-kit/Button'
import { useI18n } from '@/components/providers/I18nProvider'
import { authStore } from '@/stores/global/AuthStore/AuthStore'
import styles from './AuthPage.module.scss'

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
)

const AuthPage = observer(() => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useI18n()
  const nextUrl = searchParams?.get('next') || '/'

  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isRegister) {
      const result = await authStore.register({ email, username, password })
      if (result.success) router.push(nextUrl)
      return
    }

    const result = await authStore.login({ identifier: email, password })
    if (result.success) router.push(nextUrl)
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <Text view="title" color="primary">
              {isRegister ? t('auth.title.register') : t('auth.title.login')}
            </Text>
            <Text view="p-16" color="secondary">
              {isRegister ? t('auth.subtitle.register') : t('auth.subtitle.login')}
            </Text>
          </div>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          {isRegister && (
            <Input
              className={styles.authInput}
              value={username}
              onChange={setUsername}
              placeholder={t('auth.field.username')}
              disabled={authStore.isLoading}
            />
          )}
          <Input
            className={styles.authInput}
            value={email}
            onChange={setEmail}
            placeholder={t('auth.field.email')}
            disabled={authStore.isLoading}
          />
          <Input
            className={styles.authInput}
            value={password}
            onChange={setPassword}
            placeholder={t('auth.field.password')}
            type={showPassword ? 'text' : 'password'}
            disabled={authStore.isLoading}
            afterSlot={
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                <EyeIcon open={showPassword} />
              </button>
            }
          />

          {authStore.error && (
            <Text className={styles.error} view="p-14" color="accent">
              {authStore.error}
            </Text>
          )}

          <Button type="submit" disabled={authStore.isLoading} className={styles.submitBtn}>
            {authStore.isLoading
              ? t('auth.submit.loading')
              : isRegister
                ? t('auth.title.register')
                : t('auth.title.login')}
          </Button>
        </form>

        <div className={styles.footer}>
          <button
            className={styles.switch}
            type="button"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            <Text color="accent" view="p-14">
              {isRegister ? t('auth.switch.toLogin') : t('auth.switch.toRegister')}
            </Text>
          </button>
        </div>
      </div>
    </div>
  )
})

export default AuthPage
