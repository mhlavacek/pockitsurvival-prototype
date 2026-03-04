'use client'

import { useCartContext } from '@/context/CartContext'

export default function RewardProgress() {
  const { total, rewardStatus } = useCartContext()
  const { freeTin, freeShipping, nextThreshold, progressPercent } = rewardStatus

  if (freeShipping) {
    return (
      <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '0.6rem 0.75rem', fontSize: '0.8125rem', color: '#22c55e', textAlign: 'center' }}>
        Free tin + free shipping unlocked!
      </div>
    )
  }

  const label = !freeTin
    ? `Add $${(25 - total).toFixed(2)} more for a free tin`
    : `Add $${(75 - total).toFixed(2)} more for free shipping`

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.35rem' }}>{label}</div>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', height: '6px', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: '9999px', background: '#c60000',
          width: `${progressPercent}%`, transition: 'width 0.4s ease',
        }} />
      </div>
    </div>
  )
}
