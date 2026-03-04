'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { products as seedProducts, categories as seedCategories, Product, Category } from '@/lib/data'

type AdminContextType = {
  products: Product[]
  categories: Category[]
  updateProduct: (id: string, updates: Partial<Product>) => void
  addProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  addCategory: (category: Category) => void
  deleteCategory: (id: string) => void
}

const AdminContext = createContext<AdminContextType | null>(null)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts)
  const [categories, setCategories] = useState<Category[]>(seedCategories)

  const updateProduct = (id: string, updates: Partial<Product>) =>
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))

  const addProduct = (product: Product) =>
    setProducts(prev => [...prev, product])

  const deleteProduct = (id: string) =>
    setProducts(prev => prev.filter(p => p.id !== id))

  const updateCategory = (id: string, updates: Partial<Category>) =>
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))

  const addCategory = (category: Category) =>
    setCategories(prev => [...prev, category])

  const deleteCategory = (id: string) =>
    setCategories(prev => prev.filter(c => c.id !== id))

  return (
    <AdminContext.Provider value={{
      products, categories,
      updateProduct, addProduct, deleteProduct,
      updateCategory, addCategory, deleteCategory,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdminContext() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdminContext must be used within AdminProvider')
  return ctx
}
