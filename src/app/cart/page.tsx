import Cart from "@/components/pages/Cart"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Cart',
  description: 'Your shopping cart',
}

const СartPage = () => {
  return (
    <Cart/>
  )
}

export default СartPage