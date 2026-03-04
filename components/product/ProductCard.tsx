'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Product, getCategoryById } from '@/lib/data'
import { getPlaceholderImage } from '@/lib/placeholder'
import { useCartContext } from '@/context/CartContext'

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem, openDrawer } = useCartContext()
  const category = getCategoryById(product.categoryId)
  const imgSrc = product.imageUrl || (category ? getPlaceholderImage(category, product.name) : '')

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem(product)
    openDrawer()
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px',
          overflow: 'hidden', transition: 'transform 0.15s, box-shadow 0.15s',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.4)' : '6px 6px 9px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        }}>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden' }}>
          <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          {product.stockCount < 5 && product.stockCount > 0 && (
            <span style={{
              position: 'absolute', top: '8px', left: '8px',
              background: '#c60000', color: '#fff', fontSize: '0.65rem', fontWeight: 700,
              padding: '2px 7px', borderRadius: '9999px', letterSpacing: '0.05em',
            }}>LOW STOCK</span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '0.75rem' }}>
          <div style={{
            fontSize: '0.8125rem', fontWeight: 600, color: '#fff', marginBottom: '0.35rem',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            lineHeight: 1.4,
          }}>{product.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span style={{ color: '#c60000', fontWeight: 700, fontSize: '0.9375rem' }}>${product.price.toFixed(2)}</span>
            <button
              onClick={handleAdd}
              style={{
                background: added ? '#22c55e' : '#c60000', color: '#fff', border: 'none',
                borderRadius: '6px', padding: '0.3rem 0.65rem', fontSize: '0.7rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.04em', transition: 'background 0.2s',
              }}>
              {added ? 'ADDED' : '+ CART'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
