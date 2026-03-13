'use client'

import dynamic from 'next/dynamic'

const AuthPage = dynamic(() => import("@/components/pages/Auth"), {
  ssr: false,
})

const Auth = () => {
  return (
    <AuthPage/>
  )
}

export default Auth
