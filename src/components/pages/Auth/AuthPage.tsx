'use client'

import { observer } from 'mobx-react-lite'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Text from '@/components/ui-kit/Text'
import Input from '@/components/ui-kit/Input'
import Button from '@/components/ui-kit/Button'
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
        <Text view="title" color="primary">
          {isRegister ? 'Register' : 'Login'}
        </Text>

        <form className={styles.form} onSubmit={onSubmit}>
          {isRegister && (
            <Input
              value={username}
              onChange={setUsername}
              placeholder="Username"
              disabled={authStore.isLoading}
            />
          )}
          <Input
            value={email}
            onChange={setEmail}
            placeholder="Email"
            disabled={authStore.isLoading}
          />
          <Input
            value={password}
            onChange={setPassword}
            placeholder="Password"
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

          <Button type="submit" disabled={authStore.isLoading}>
            {authStore.isLoading ? 'Loading...' : isRegister ? 'Register' : 'Login'}
          </Button>
        </form>

        <button
          className={styles.switch}
          type="button"
          onClick={() => setIsRegister((prev) => !prev)}
        >
          <Text color='accent' view='p-14'>{isRegister ? 'I already have an account' : 'Create an account'}</Text>
        </button>
      </div>
    </div>
  )
})

export default AuthPage
