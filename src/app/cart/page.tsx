'use client'

import dynamic from 'next/dynamic'

const Cart = dynamic(() => import("@/components/pages/Cart"), {
  ssr: false,
})

const CartPage = () => {
  return (
    <Cart/>
  )
}

export default CartPage
