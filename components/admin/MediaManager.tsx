'use client'

import { useState } from 'react'
import { MediaItem, Product, getYouTubeId, isYouTubeUrl } from '@/lib/data'

type Props = {
  product: Product
  onUpdate: (media: MediaItem[]) => void
  onClose: () => void
}

export default function MediaManager({ product, onUpdate, onClose }: Props) {
  const [items, setItems] = useState<MediaItem[]>(product.media ?? [])
  const [urlInput, setUrlInput] = useState('')
  const [error, setError] = useState('')

  function getYouTubeThumbnail(url: string) {
    const id = getYouTubeId(url)
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null
  }

  function detectType(url: string): 'image' | 'video' {
    return isYouTubeUrl(url) ? 'video' : 'image'
  }

  function handleAdd() {
    const url = urlInput.trim()
    if (!url) return
    try { new URL(url) } catch {
      setError('Please enter a valid URL.')
      return
    }
    const type = detectType(url)
    const next = [...items, { type, url }]
    setItems(next)
    setUrlInput('')
    setError('')
  }

  function handleRemove(idx: number) {
    setItems(items.filter((_, i) => i !== idx))
  }

  function handleMoveUp(idx: number) {
    if (idx === 0) return
    const next = [...items]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    setItems(next)
  }

  function handleMoveDown(idx: number) {
    if (idx === items.length - 1) return
    const next = [...items]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    setItems(next)
  }

  function handleSave() {
    onUpdate(items)
    onClose()
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, padding: '1rem',
  }

  const modalStyle: React.CSSProperties = {
    background: '#111', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px', padding: '1.5rem', width: '100%', maxWidth: '540px',
    maxHeight: '80vh', display: 'flex', flexDirection: 'column', gap: '1rem',
  }

  return (
    <div style={overlayStyle} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Media Gallery</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.2rem' }}>
              {product.name}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1 }}>x</button>
        </div>

        {/* Item list */}
        <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.length === 0 && (
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem', textAlign: 'center', padding: '1.5rem 0' }}>
              No media yet. Add an image or YouTube URL below.
            </p>
          )}
          {items.map((item, i) => {
            const thumb = item.type === 'video'
              ? getYouTubeThumbnail(item.url)
              : item.url
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '0.5rem 0.75rem',
              }}>
                {/* Thumbnail */}
                <div style={{ width: '48px', height: '48px', borderRadius: '4px', overflow: 'hidden', flexShrink: 0, background: '#222', position: 'relative' }}>
                  {thumb && <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                  {item.type === 'video' && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                      <svg width="14" height="14" fill="#c60000" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" /></svg>
                    </div>
                  )}
                </div>

                {/* Type badge + URL */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                    color: item.type === 'video' ? '#c60000' : '#22c55e',
                    background: item.type === 'video' ? 'rgba(198,0,0,0.15)' : 'rgba(34,197,94,0.15)',
                    padding: '1px 6px', borderRadius: '4px', marginRight: '0.5rem',
                  }}>{item.type.toUpperCase()}</span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', wordBreak: 'break-all' }}>
                    {item.url.length > 50 ? item.url.slice(0, 50) + '...' : item.url}
                  </span>
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '0.25rem', flexShrink: 0 }}>
                  <button onClick={() => handleMoveUp(i)} disabled={i === 0}
                    title="Move up" style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', borderRadius: '4px', width: '24px', height: '24px', cursor: i === 0 ? 'default' : 'pointer', fontSize: '0.7rem', opacity: i === 0 ? 0.3 : 1 }}>^</button>
                  <button onClick={() => handleMoveDown(i)} disabled={i === items.length - 1}
                    title="Move down" style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', borderRadius: '4px', width: '24px', height: '24px', cursor: i === items.length - 1 ? 'default' : 'pointer', fontSize: '0.7rem', opacity: i === items.length - 1 ? 0.3 : 1 }}>v</button>
                  <button onClick={() => handleRemove(i)}
                    title="Remove" style={{ background: 'none', border: '1px solid rgba(198,0,0,0.4)', color: '#c60000', borderRadius: '4px', width: '24px', height: '24px', cursor: 'pointer', fontSize: '0.75rem' }}>x</button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Add URL input */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '0.4rem', letterSpacing: '0.06em' }}>
            ADD MEDIA -- paste image URL or YouTube link
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              value={urlInput}
              onChange={e => { setUrlInput(e.target.value); setError('') }}
              onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
              placeholder="https://..."
              style={{ flex: 1, background: '#1a1a1a', border: `1px solid ${error ? '#c60000' : 'rgba(255,255,255,0.15)'}`, color: '#fff', padding: '0.45rem 0.65rem', borderRadius: '6px', fontSize: '0.8125rem' }}
            />
            <button onClick={handleAdd} style={{ background: '#c60000', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.45rem 1rem', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
              Add
            </button>
          </div>
          {error && <div style={{ fontSize: '0.75rem', color: '#c60000', marginTop: '0.3rem' }}>{error}</div>}
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.3rem' }}>
            YouTube URLs are auto-detected as video. All other URLs are treated as images.
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', borderRadius: '6px', padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.8rem' }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ background: '#c60000', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.25rem', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>
            Save Media
          </button>
        </div>
      </div>
    </div>
  )
}
