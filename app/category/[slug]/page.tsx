'use client'

import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProductsByCategory, getSubCategories, products } from '@/lib/data'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProductCard from '@/components/product/ProductCard'

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const isAll = slug === 'all'
  const category = isAll ? null : getCategoryBySlug(slug)
  if (!isAll && !category) notFound()

  const categoryProducts = isAll ? products : getProductsByCategory(category!.id)
  const subCategories = category ? getSubCategories(category.id) : []
  const [activeSubCat, setActiveSubCat] = useState<string | null>(null)

  const displayed = activeSubCat
    ? categoryProducts.filter(p => p.categoryId === activeSubCat)
    : categoryProducts

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
      <Breadcrumb items={[{ label: isAll ? 'All Products' : category!.name }]} />

      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h1 className="text-fluid-xl" style={{ fontWeight: 800 }}>
          {isAll ? 'All Products' : category!.name}
        </h1>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem' }}>{displayed.length} items</span>
      </div>

      {subCategories.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <button onClick={() => setActiveSubCat(null)} style={{
            padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600,
            cursor: 'pointer', border: '1px solid',
            background: !activeSubCat ? '#c60000' : 'transparent',
            borderColor: !activeSubCat ? '#c60000' : 'rgba(255,255,255,0.2)',
            color: '#fff',
          }}>All</button>
          {subCategories.map(sub => (
            <button key={sub.id} onClick={() => setActiveSubCat(sub.id)} style={{
              padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600,
              cursor: 'pointer', border: '1px solid',
              background: activeSubCat === sub.id ? '#c60000' : 'transparent',
              borderColor: activeSubCat === sub.id ? '#c60000' : 'rgba(255,255,255,0.2)',
              color: '#fff',
            }}>{sub.name}</button>
          ))}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: '1rem' }}>
        {displayed.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {displayed.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'rgba(255,255,255,0.4)' }}>
          No products in this category yet.
        </div>
      )}
    </div>
  )
}
