'use client'

import { useState } from 'react'
import { Product, getCategoryById, getYouTubeId } from '@/lib/data'
import { getPlaceholderImage } from '@/lib/placeholder'

export default function ProductGallery({ product }: { product: Product }) {
  const category = getCategoryById(product.categoryId)
  const placeholder = category ? getPlaceholderImage(category, product.name) : ''
  const media = product.media?.length ? product.media : [{ type: 'image' as const, url: placeholder }]
  const [activeIdx, setActiveIdx] = useState(0)
  const active = media[activeIdx]

  function getYouTubeThumbnail(url: string) {
    const id = getYouTubeId(url)
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : placeholder
  }

  function getEmbedUrl(url: string) {
    const id = getYouTubeId(url)
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : url
  }

  function getThumbnailSrc(item: typeof media[number]) {
    return item.type === 'video' ? getYouTubeThumbnail(item.url) : item.url
  }

  return (
    <div>
      {/* Main view */}
      <div style={{
        background: '#111', borderRadius: '12px', overflow: 'hidden',
        aspectRatio: '1', marginBottom: '0.75rem', position: 'relative',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {active.type === 'image' ? (
          <img src={active.url} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { (e.currentTarget as HTMLImageElement).src = placeholder }} />
        ) : (
          <iframe
            src={getEmbedUrl(active.url)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        )}
      </div>

      {/* Thumbnails -- only show if more than 1 item */}
      {media.length > 1 && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {media.map((item, i) => (
            <button key={i} onClick={() => setActiveIdx(i)} style={{
              width: '60px', height: '60px', borderRadius: '6px', overflow: 'hidden', padding: 0,
              border: activeIdx === i ? '2px solid #c60000' : '2px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', background: '#111', position: 'relative', flexShrink: 0,
            }}>
              <img src={getThumbnailSrc(item)} alt={`Media ${i + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: item.type === 'video' ? 0.7 : 1 }}
                onError={e => { (e.currentTarget as HTMLImageElement).src = placeholder }} />
              {item.type === 'video' && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" fill="#c60000" viewBox="0 0 24 24">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
