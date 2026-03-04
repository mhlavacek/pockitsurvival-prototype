import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AdminProvider } from '@/context/AdminContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'PocKit Survival -- Pocket-Sized Survival Gear',
  description: 'Build your own pocket survival kit. Compact, high-quality EDC and survival tools selected for real-world use.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AdminProvider>
          <CartProvider>
            <Header />
            <main style={{ minHeight: '60vh' }}>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
