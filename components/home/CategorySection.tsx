import Link from 'next/link'
import { Category, Product } from '@/lib/data'
import ProductCard from '@/components/product/ProductCard'

type Props = { category: Category; products: Product[] }

export default function CategorySection({ category, products }: Props) {
  if (products.length === 0) return null
  const shown = products.slice(0, 6)

  return (
    <section style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.9)' }}>
          {category.name.toUpperCase()}
        </h2>
        <Link href={`/category/${category.slug}`} style={{
          fontSize: '0.75rem', color: '#c60000', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.05em',
        }}>
          VIEW ALL &rarr;
        </Link>
      </div>
      <div className="scroll-row">
        {shown.map(p => (
          <div key={p.id} style={{ width: '180px' }}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  )
}
