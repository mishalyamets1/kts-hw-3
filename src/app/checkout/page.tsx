import Checkout from "@/components/pages/Checkout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase',
};

export const dynamic = 'force-dynamic';

const CheckoutPage = () => {
  return (
    <Checkout />
  )
}

export default CheckoutPage
