'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartContext } from '@/context/CartContext'
import { getTopLevelCategories } from '@/lib/data'

export default function Header() {
  const { itemCount, openDrawer } = useCartContext()
  const [mobileOpen, setMobileOpen] = useState(false)
  const topCategories = getTopLevelCategories()

  return (
    <header style={{ background: '#000', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
      {/* Utility nav */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0.35rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.25rem' }}>
          {['About', 'Gallery', 'Contact'].map(label => (
            <Link key={label} href={`/${label.toLowerCase()}`}
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem', letterSpacing: '0.06em', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
              {label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>

      {/* Logo + actions */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', fontWeight: 900, letterSpacing: '0.08em', color: '#fff' }}>
            <span style={{ color: '#c60000' }}>POCKIT</span> SURVIVAL
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Search icon */}
          <button aria-label="Search" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '0.25rem' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Cart */}
          <button onClick={openDrawer} aria-label="Open cart" style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.25rem', position: 'relative' }}>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {itemCount > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-6px',
                background: '#c60000', color: '#fff', borderRadius: '9999px',
                fontSize: '0.65rem', fontWeight: 700, minWidth: '18px', height: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px',
              }}>{itemCount}</span>
            )}
          </button>

          {/* Hamburger (mobile) */}
          <button onClick={() => setMobileOpen(o => !o)} aria-label="Menu"
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0.25rem', display: 'none' }}
            className="mobile-menu-btn">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
        <div className="container" style={{ display: 'flex', gap: 0 }}>
          {topCategories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.slug}`}
              style={{
                color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', fontWeight: 600,
                letterSpacing: '0.05em', textDecoration: 'none', whiteSpace: 'nowrap',
                padding: '0.65rem 0.9rem', display: 'block', borderBottom: '2px solid transparent',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderBottomColor = '#c60000' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderBottomColor = 'transparent' }}>
              {cat.name.toUpperCase()}
            </Link>
          ))}
          <Link href="/category/all"
            style={{
              color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600,
              letterSpacing: '0.05em', textDecoration: 'none', whiteSpace: 'nowrap',
              padding: '0.65rem 0.9rem', display: 'block', borderBottom: '2px solid transparent',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderBottomColor = '#c60000' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderBottomColor = 'transparent' }}>
            ALL PRODUCTS
          </Link>
        </div>
      </nav>
    </header>
  )
}
