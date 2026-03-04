import { Product, getRelatedProducts } from '@/lib/data'
import ProductCard from './ProductCard'

export default function RelatedProducts({ product }: { product: Product }) {
  const related = getRelatedProducts(product, 4)
  if (related.length === 0) return null

  return (
    <section style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.06em', marginBottom: '1.25rem', color: 'rgba(255,255,255,0.85)' }}>
        RELATED PRODUCTS
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem' }}>
        {related.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
