'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Product } from './data'

export type CartItem = {
  productId: string
  name: string
  price: number
  qty: number
}

export type RewardStatus = {
  freeTin: boolean
  freeShipping: boolean
  nextThreshold: number | null
  progressPercent: number
}

export type Cart = {
  items: CartItem[]
  total: number
  itemCount: number
  rewardStatus: RewardStatus
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
}

const STORAGE_KEY = 'pockit-cart'

function computeRewardStatus(total: number): RewardStatus {
  const freeTin = total >= 25
  const freeShipping = total >= 75
  let nextThreshold: number | null = null
  let progressPercent = 0

  if (!freeTin) {
    nextThreshold = 25
    progressPercent = Math.min((total / 25) * 100, 100)
  } else if (!freeShipping) {
    nextThreshold = 75
    progressPercent = Math.min(((total - 25) / 50) * 100, 100)
  } else {
    progressPercent = 100
  }

  return { freeTin, freeShipping, nextThreshold, progressPercent }
}

export function useCart(): Cart {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items, hydrated])

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === product.id)
      if (existing) {
        return prev.map(i =>
          i.productId === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { productId: product.id, name: product.name, price: product.price, qty: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.productId !== productId))
  }, [])

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.productId !== productId))
    } else {
      setItems(prev => prev.map(i => i.productId === productId ? { ...i, qty } : i))
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)

  return {
    items,
    total,
    itemCount,
    rewardStatus: computeRewardStatus(total),
    addItem,
    removeItem,
    updateQty,
    clearCart,
  }
}
