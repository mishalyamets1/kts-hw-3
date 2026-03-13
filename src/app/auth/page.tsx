import AuthPage from "@/components/pages/Auth"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'login or register to your account',
};

const Auth = () => {
  return (
    <AuthPage/>
  )
}

export default Auth