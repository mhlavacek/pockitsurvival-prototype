'use client'

import Link from 'next/link'
import { useAdminContext } from '@/context/AdminContext'

export default function AdminDashboard() {
  const { products, categories } = useAdminContext()
  const topCats = categories.filter(c => !c.parentId)

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="proto-banner" style={{ borderRadius: '8px', marginBottom: '2rem' }}>
        PROTOTYPE -- Admin area is open. Auth (login/session) would be required in production.
      </div>

      <h1 className="text-fluid-2xl" style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Admin Dashboard</h1>
      <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2.5rem', fontSize: '0.875rem' }}>
        Manage your products, categories, and view orders.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {[
          { title: 'Product Inventory', href: '/admin/inventory', count: products.length, label: 'products', icon: '📦', desc: 'Add, edit, and manage products inline without navigating away.' },
          { title: 'Category Management', href: '/admin/categories', count: topCats.length, label: 'top-level categories', icon: '🗂️', desc: 'Manage 2-tier category structure that drives the storefront navigation.' },
          { title: 'Orders', href: '#', count: 0, label: 'orders (coming soon)', icon: '🧾', desc: 'View and manage customer orders, process refunds.' },
          { title: 'Contact Messages', href: '#', count: 0, label: 'messages (coming soon)', icon: '✉️', desc: 'View messages submitted via the contact form.' },
        ].map(card => (
          <Link key={card.title} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px',
              padding: '1.5rem', cursor: 'pointer', transition: 'border-color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#c60000')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{card.title}</div>
              <div style={{ color: '#c60000', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.25rem' }}>{card.count}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', marginBottom: '0.75rem' }}>{card.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', lineHeight: 1.5 }}>{card.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
