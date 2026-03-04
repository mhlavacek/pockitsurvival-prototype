'use client'

import { useEffect } from 'react'

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/)
  return match ? match[1] : null
}

type Props = { videoUrl: string; isOpen: boolean; onClose: () => void }

export default function VideoModal({ videoUrl, isOpen, onClose }: Props) {
  const videoId = getYouTubeId(videoUrl)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen || !videoId) return null

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '800px', position: 'relative' }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '-2.5rem', right: 0, background: 'none', border: 'none',
          color: '#fff', fontSize: '1.5rem', cursor: 'pointer', opacity: 0.7,
        }}>&times; Close</button>
        <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}
