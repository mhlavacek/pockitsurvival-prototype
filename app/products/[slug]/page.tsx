'use client'

import { useState, use } from 'react'
import { notFound } from 'next/navigation'
import { getProductBySlug, getCategoryById } from '@/lib/data'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ProductGallery from '@/components/product/ProductGallery'
import RelatedProducts from '@/components/product/RelatedProducts'
import { useCartContext } from '@/context/CartContext'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const productResult = getProductBySlug(slug)
  if (!productResult) notFound()
  const product = productResult!

  const category = getCategoryById(product.categoryId)
  const { addItem, openDrawer } = useCartContext()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addItem(product)
    openDrawer()
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="container" style={{ paddingTop: '1rem', paddingBottom: '3rem' }}>
      <Breadcrumb items={[
        ...(category ? [{ label: category.name, href: `/category/${category.slug}` }] : []),
        { label: product.name },
      ]} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Two-col layout on md+ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {/* Gallery */}
          <ProductGallery product={product} />

          {/* Product info */}
          <div>
            {category && (
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', color: '#c60000', marginBottom: '0.5rem' }}>
                {category.name.toUpperCase()}
              </div>
            )}
            <h1 className="text-fluid-xl" style={{ fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#c60000' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.competitorPrice && (
                <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through' }}>
                  Amazon: ${product.competitorPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              {product.stockCount > 5 ? (
                <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>In Stock ({product.stockCount} available)</span>
              ) : product.stockCount > 0 ? (
                <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>Low Stock -- only {product.stockCount} left!</span>
              ) : (
                <span style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 600 }}>Out of Stock</span>
              )}
            </div>

            <button onClick={handleAdd} disabled={product.stockCount === 0}
              style={{
                width: '100%', padding: '0.9rem 1.5rem', background: added ? '#22c55e' : '#c60000',
                color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700,
                fontSize: '0.9375rem', letterSpacing: '0.05em', cursor: 'pointer',
                transition: 'background 0.2s', marginBottom: '1.5rem',
                opacity: product.stockCount === 0 ? 0.5 : 1,
              }}>
              {added ? 'ADDED TO CART' : 'ADD TO CART'}
            </button>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                {product.description}
              </p>
            </div>

            {product.keywords.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {product.keywords.map(kw => (
                  <span key={kw} style={{
                    fontSize: '0.7rem', padding: '0.25rem 0.6rem',
                    background: 'rgba(255,255,255,0.07)', borderRadius: '9999px',
                    color: 'rgba(255,255,255,0.55)', fontWeight: 600, letterSpacing: '0.05em',
                  }}>{kw}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <RelatedProducts product={product} />
      </div>
    </div>
  )
}
