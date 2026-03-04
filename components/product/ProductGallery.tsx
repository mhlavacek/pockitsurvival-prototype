'use client'

import { useState } from 'react'
import { Product, getCategoryById } from '@/lib/data'
import { getPlaceholderImage } from '@/lib/placeholder'
import VideoModal from '@/components/ui/VideoModal'

export default function ProductGallery({ product }: { product: Product }) {
  const category = getCategoryById(product.categoryId)
  const imgSrc = product.imageUrl || (category ? getPlaceholderImage(category, product.name) : '')
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image')
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <div>
      {/* Main view */}
      <div style={{
        background: '#111', borderRadius: '12px', overflow: 'hidden',
        aspectRatio: '1', marginBottom: '0.75rem', position: 'relative',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {activeTab === 'image' ? (
          <img src={imgSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div onClick={() => setVideoOpen(true)} style={{ width: '100%', height: '100%', cursor: 'pointer', position: 'relative' }}>
            <img src={`https://img.youtube.com/vi/${product.videoUrl?.split('v=')[1]}/maxresdefault.jpg`}
              alt="Video thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { (e.currentTarget as HTMLImageElement).src = imgSrc }} />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.3)',
            }}>
              <div style={{
                width: '64px', height: '64px', background: '#c60000', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" fill="#fff" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setActiveTab('image')} style={{
          width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', padding: 0,
          border: activeTab === 'image' ? '2px solid #c60000' : '2px solid rgba(255,255,255,0.1)',
          cursor: 'pointer', background: 'none',
        }}>
          <img src={imgSrc} alt="Main" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>

        {product.videoUrl && (
          <button onClick={() => setActiveTab('video')} style={{
            width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', padding: 0,
            border: activeTab === 'video' ? '2px solid #c60000' : '2px solid rgba(255,255,255,0.1)',
            cursor: 'pointer', background: '#111', position: 'relative',
          }}>
            <img src={imgSrc} alt="Video" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" fill="#c60000" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
            </div>
          </button>
        )}
      </div>

      {product.videoUrl && (
        <VideoModal videoUrl={product.videoUrl} isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
      )}
    </div>
  )
}
