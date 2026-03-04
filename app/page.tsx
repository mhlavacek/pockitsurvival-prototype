import { getTopLevelCategories, getProductsByCategory, getBestSellers, getNewProducts } from '@/lib/data'
import HeroSection from '@/components/home/HeroSection'
import PromoBanner from '@/components/home/PromoBanner'
import CategorySection from '@/components/home/CategorySection'
import ProductCard from '@/components/product/ProductCard'

export default function HomePage() {
  const topCategories = getTopLevelCategories()
  const bestSellers = getBestSellers(12)
  const newProducts = getNewProducts(12)

  return (
    <>
      <HeroSection />
      <div className="container">
        <PromoBanner />

        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em' }}>NEW PRODUCTS</h2>
          </div>
          <div className="scroll-row">
            {newProducts.map(p => (
              <div key={p.id} style={{ width: '180px' }}><ProductCard product={p} /></div>
            ))}
          </div>
        </section>

        <section id="best-sellers" style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em' }}>BEST SELLERS</h2>
          </div>
          <div className="scroll-row">
            {bestSellers.map(p => (
              <div key={p.id} style={{ width: '180px' }}><ProductCard product={p} /></div>
            ))}
          </div>
        </section>

        {topCategories.map(cat => (
          <CategorySection key={cat.id} category={cat} products={getProductsByCategory(cat.id)} />
        ))}
      </div>
    </>
  )
}
