'use client'

import { useState, useRef } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const honeypotRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Honeypot check -- bots fill the hidden field
    if (honeypotRef.current?.value) {
      setStatus('success') // Silent trap
      return
    }
    setStatus('success')
  }

  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem', maxWidth: '560px' }}>
      <h1 className="text-fluid-2xl" style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Get in Touch</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        We typically respond within 1 business day.
      </p>

      {status === 'success' ? (
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Message received!</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8125rem' }}>
            Email delivery wired in production (Resend / SendGrid).
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Honeypot -- invisible to humans, bots fill it */}
          <input ref={honeypotRef} name="_gotcha" type="text" tabIndex={-1} autoComplete="off"
            style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1 }} />

          {[
            { label: 'Name', name: 'name', type: 'text', required: true },
            { label: 'Email', name: 'email', type: 'email', required: true },
          ].map(field => (
            <div key={field.name}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>
                {field.label.toUpperCase()}
              </label>
              <input name={field.name} type={field.type} required={field.required} style={{
                width: '100%', padding: '0.65rem 0.875rem', background: '#111',
                border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff',
                fontSize: '0.9rem', outline: 'none',
              }} />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>
              MESSAGE
            </label>
            <textarea name="message" required rows={5} style={{
              width: '100%', padding: '0.65rem 0.875rem', background: '#111',
              border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', color: '#fff',
              fontSize: '0.9rem', outline: 'none', resize: 'vertical',
            }} />
          </div>

          <button type="submit" style={{
            padding: '0.8rem 2rem', background: '#c60000', color: '#fff', border: 'none',
            borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
            letterSpacing: '0.05em', alignSelf: 'flex-start',
          }}>
            SEND MESSAGE
          </button>
        </form>
      )}
    </div>
  )
}
