'use client'

import { useCartContext } from '@/context/CartContext'

export default function PromoBanner() {
  const { total } = useCartContext()
  const freeTinPct = Math.min((total / 25) * 100, 100)
  const freeShipPct = Math.min((total / 75) * 100, 100)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.08)', margin: '0 0 3rem' }}>
      {[
        { label: 'Free PocKit Survival Tin', sub: 'on orders $25+', pct: freeTinPct, threshold: 25, met: total >= 25 },
        { label: 'Free Shipping', sub: 'on orders $75+', pct: freeShipPct, threshold: 75, met: total >= 75 },
      ].map(promo => (
        <div key={promo.label} style={{ background: '#0a0a0a', padding: '1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '1rem' }}>{promo.met ? '✅' : '🎁'}</span>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: promo.met ? '#22c55e' : '#fff' }}>
                {promo.label}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginLeft: '0.4rem' }}>{promo.sub}</span>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', height: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: '9999px',
              background: promo.met ? '#22c55e' : '#c60000',
              width: `${promo.pct}%`, transition: 'width 0.4s ease',
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}
