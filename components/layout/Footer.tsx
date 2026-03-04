import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '4rem', padding: '2.5rem 0 1.5rem', background: '#000' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              <span style={{ color: '#c60000' }}>POCKIT</span> SURVIVAL
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8125rem', maxWidth: '280px', lineHeight: 1.6 }}>
              Pocket-sized tools and everyday survival essentials. Preparedness should be simple, compact, and effective.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>SHOP</div>
              {['All Products', 'Best Sellers', 'New Arrivals'].map(l => (
                <div key={l} style={{ marginBottom: '0.4rem' }}>
                  <Link href="/category/all" style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8125rem', textDecoration: 'none' }}>{l}</Link>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem' }}>INFO</div>
              {[['About', '/about'], ['Contact', '/contact'], ['Admin', '/admin']].map(([l, h]) => (
                <div key={l} style={{ marginBottom: '0.4rem' }}>
                  <Link href={h} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8125rem', textDecoration: 'none' }}>{l}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} PocKit Survival. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
