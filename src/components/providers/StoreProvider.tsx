'use client';

import React, { useEffect } from "react";
import { reaction } from "mobx";
import { cartStore } from "@/stores/global/CartStore";
import { authStore } from "@/stores/global/AuthStore/AuthStore";

export default function StoreProvider({children}: {children: React.ReactNode}) {
    useEffect(() => {
        if (authStore.isAuthenticated) {
            cartStore.fetchCart();
        }

        const dispose = reaction(
            () => authStore.token,
            (token) => {
                if (token) {
                    cartStore.fetchCart();
                } else {
                    cartStore.cartItems = [];
                }
            }
        );

        return () => dispose();
    }, []);
    return <>{children}</>
}
