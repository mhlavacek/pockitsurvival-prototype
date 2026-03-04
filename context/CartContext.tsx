'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useCart, Cart } from '@/lib/useCart'

type CartContextType = Cart & {
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <CartContext.Provider value={{
      ...cart,
      drawerOpen,
      openDrawer: () => setDrawerOpen(true),
      closeDrawer: () => setDrawerOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCartContext must be used within CartProvider')
  return ctx
}
