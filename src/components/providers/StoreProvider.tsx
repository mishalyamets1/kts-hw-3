'use client';

import React, { useEffect } from "react";
import { cartStore } from "@/stores/global/CartStore";

export default function StoreProvider({children}: {children: React.ReactNode}) {
    useEffect(() => {
        cartStore.fetchCart();
    }, []);
    return <>{children}</>
}