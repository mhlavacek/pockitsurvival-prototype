import Link from 'next/link'

type BreadcrumbItem = { label: string; href?: string }

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ padding: '0.6rem 0', marginBottom: '0.5rem' }}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
        <li>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>/</span>
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8125rem' }}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
