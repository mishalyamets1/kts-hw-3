import Cart from "@/components/pages/Cart"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cart',
  description: 'View and manage items in your cart',
}

const CartPage = () => {
  return (
    <Cart/>
  )
}

export default CartPage
