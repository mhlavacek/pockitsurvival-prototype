import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{ padding: '4rem 0 3rem', textAlign: 'center' }}>
      <div className="container">
        <p style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', color: '#c60000', marginBottom: '1rem' }}>
          EVERYDAY CARRY -- SURVIVAL ESSENTIALS
        </p>
        <h1 className="text-fluid-3xl" style={{ fontWeight: 900, lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.01em' }}>
          Build Your Pocket<br />Survival Kit
        </h1>
        <p className="text-fluid-lg" style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Pocket-sized tools and everyday survival essentials. Preparedness should be simple,
          compact, and effective -- gear that fits in your pocket and works when it matters most.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/category/tools" style={{
            background: '#c60000', color: '#fff', padding: '0.75rem 2rem',
            borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
            letterSpacing: '0.05em', transition: 'background 0.15s',
          }}>
            SHOP ALL PRODUCTS
          </Link>
          <Link href="#best-sellers" style={{
            background: 'transparent', color: '#fff', padding: '0.75rem 2rem',
            borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem',
            letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.2)',
          }}>
            VIEW BEST SELLERS
          </Link>
        </div>
      </div>
    </section>
  )
}
