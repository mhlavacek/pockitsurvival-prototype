'use client'

import { useCartContext } from '@/context/CartContext'
import RewardProgress from './RewardProgress'

export default function CartDrawer() {
  const { items, total, drawerOpen, closeDrawer, removeItem, updateQty } = useCartContext()

  return (
    <>
      {/* Overlay */}
      {drawerOpen && (
        <div onClick={closeDrawer} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 90,
          animation: 'fadeIn 0.15s ease',
        }} />
      )}

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px, 100vw)',
        background: '#111', borderLeft: '1px solid rgba(255,255,255,0.1)',
        zIndex: 100, display: 'flex', flexDirection: 'column',
        transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '0.05em' }}>YOUR CART</h2>
          <button onClick={closeDrawer} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1 }}>
            &times;
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {items.length === 0 ? (
            <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem' }}>
              Your cart is empty
            </div>
          ) : (
            items.map(item => (
              <div key={item.productId} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</div>
                  <div style={{ color: '#c60000', fontWeight: 700, fontSize: '0.875rem' }}>${item.price.toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => updateQty(item.productId, item.qty - 1)}
                    style={{ width: '28px', height: '28px', background: '#222', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>-</button>
                  <span style={{ minWidth: '20px', textAlign: 'center', fontSize: '0.875rem' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.productId, item.qty + 1)}
                    style={{ width: '28px', height: '28px', background: '#222', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                </div>
                <button onClick={() => removeItem(item.productId)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: '1rem' }}>
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <RewardProgress />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 0.75rem' }}>
              <span style={{ fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>${total.toFixed(2)}</span>
            </div>
            <button style={{
              width: '100%', padding: '0.875rem', background: '#c60000', color: '#fff',
              border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.9375rem',
              cursor: 'pointer', letterSpacing: '0.05em',
            }}
              onClick={() => alert('Checkout flow wired in production (Stripe integration)')}>
              CHECKOUT
            </button>
            <button onClick={closeDrawer} style={{
              width: '100%', padding: '0.6rem', background: 'none', color: 'rgba(255,255,255,0.5)',
              border: 'none', cursor: 'pointer', fontSize: '0.8125rem', marginTop: '0.5rem',
            }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
