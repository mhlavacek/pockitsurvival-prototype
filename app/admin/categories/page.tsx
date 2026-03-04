'use client'

import { useState } from 'react'
import { useAdminContext } from '@/context/AdminContext'
import { Category } from '@/lib/data'
import Link from 'next/link'

let nextCatId = 200

export default function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdminContext()
  const [selectedTopId, setSelectedTopId] = useState<string | null>(null)
  const [addingTop, setAddingTop] = useState(false)
  const [addingSub, setAddingSub] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [toast, setToast] = useState('')

  const topCategories = categories.filter(c => !c.parentId)
  const subCategories = selectedTopId ? categories.filter(c => c.parentId === selectedTopId) : []

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const COLORS = ['#c60000','#4a7c59','#c65c00','#4a5c7c','#3a7c7c','#5c7c3a','#7c4a4a','#5c5c7c','#7c6a3a','#4a4a4a']

  function handleAddTop() {
    if (!newName.trim()) return
    const id = `cat-${nextCatId++}`
    addCategory({ id, slug: newName.toLowerCase().replace(/\s+/g, '-'), name: newName.trim(), color: COLORS[topCategories.length % COLORS.length] })
    setNewName(''); setAddingTop(false)
    showToast(`Category "${newName.trim()}" added`)
  }

  function handleAddSub() {
    if (!newName.trim() || !selectedTopId) return
    const id = `cat-${nextCatId++}`
    const parent = topCategories.find(c => c.id === selectedTopId)
    addCategory({ id, slug: newName.toLowerCase().replace(/\s+/g, '-'), name: newName.trim(), parentId: selectedTopId, color: parent?.color ?? '#555' })
    setNewName(''); setAddingSub(false)
    showToast(`Sub-category "${newName.trim()}" added`)
  }

  function handleRename(id: string) {
    if (!editName.trim()) return
    updateCategory(id, { name: editName.trim() })
    setEditingId(null)
    showToast('Category renamed')
  }

  function handleDelete(cat: Category) {
    if (!window.confirm(`Delete "${cat.name}"? Sub-categories will also be removed.`)) return
    // Delete sub-categories first
    if (!cat.parentId) categories.filter(c => c.parentId === cat.id).forEach(sub => deleteCategory(sub.id))
    deleteCategory(cat.id)
    if (selectedTopId === cat.id) setSelectedTopId(null)
    showToast('Category deleted')
  }

  const panelStyle: React.CSSProperties = { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.25rem', flex: 1, minWidth: '220px' }
  const itemStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.75rem', borderRadius: '6px', marginBottom: '0.35rem', cursor: 'pointer', transition: 'background 0.1s' }

  function CategoryItem({ cat, isSelected, onSelect }: { cat: Category; isSelected?: boolean; onSelect?: () => void }) {
    return (
      <div onClick={onSelect} style={{ ...itemStyle, background: isSelected ? 'rgba(198,0,0,0.15)' : 'rgba(255,255,255,0.03)', border: isSelected ? '1px solid rgba(198,0,0,0.4)' : '1px solid transparent' }}>
        {editingId === cat.id ? (
          <input autoFocus value={editName} onChange={e => setEditName(e.target.value)}
            onBlur={() => handleRename(cat.id)}
            onKeyDown={e => { if (e.key === 'Enter') handleRename(cat.id); if (e.key === 'Escape') setEditingId(null) }}
            onClick={e => e.stopPropagation()}
            style={{ background: '#222', border: '1px solid #c60000', color: '#fff', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.875rem', flex: 1 }} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{cat.name}</span>
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.25rem' }} onClick={e => e.stopPropagation()}>
          <button onClick={() => { setEditingId(cat.id); setEditName(cat.name) }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.75rem', padding: '2px 5px' }}>edit</button>
          <button onClick={() => handleDelete(cat)} style={{ background: 'none', border: 'none', color: '#c60000', cursor: 'pointer', fontSize: '0.75rem', padding: '2px 5px' }}>del</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: '#22c55e', color: '#000', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: 600, fontSize: '0.8125rem', zIndex: 200 }}>{toast}</div>
      )}

      <div className="proto-banner" style={{ borderRadius: '8px', marginBottom: '1.5rem' }}>
        PROTOTYPE -- Changes update local state. In production, the storefront nav updates instantly via shared context.
      </div>

      <Link href="/admin" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>&larr; Dashboard</Link>
      <h1 style={{ fontWeight: 800, fontSize: '1.25rem', margin: '0.25rem 0 0.5rem' }}>Category Management</h1>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
        Two-tier structure: top-level categories drive the nav. Select a top category to manage its sub-categories.
      </p>

      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
        {/* Top-level */}
        <div style={panelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>TOP-LEVEL CATEGORIES</h2>
            <button onClick={() => setAddingTop(t => !t)} style={{ background: '#c60000', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.3rem 0.7rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>+</button>
          </div>
          {topCategories.map(cat => (
            <CategoryItem key={cat.id} cat={cat} isSelected={selectedTopId === cat.id} onSelect={() => setSelectedTopId(cat.id)} />
          ))}
          {addingTop && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input autoFocus value={newName} onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddTop(); if (e.key === 'Escape') setAddingTop(false) }}
                placeholder="Category name..." style={{ flex: 1, background: '#222', border: '1px solid #c60000', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: '6px', fontSize: '0.875rem' }} />
              <button onClick={handleAddTop} style={{ background: '#c60000', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer' }}>Add</button>
            </div>
          )}
        </div>

        {/* Sub-categories */}
        <div style={panelStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>
              {selectedTopId ? `SUB-CATEGORIES OF "${topCategories.find(c => c.id === selectedTopId)?.name?.toUpperCase()}"` : 'SUB-CATEGORIES'}
            </h2>
            {selectedTopId && (
              <button onClick={() => setAddingSub(t => !t)} style={{ background: '#c60000', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.3rem 0.7rem', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>+</button>
            )}
          </div>
          {!selectedTopId ? (
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem' }}>Select a top-level category to manage its sub-categories.</p>
          ) : subCategories.length === 0 && !addingSub ? (
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8125rem' }}>No sub-categories yet. Click + to add one.</p>
          ) : (
            subCategories.map(cat => <CategoryItem key={cat.id} cat={cat} />)
          )}
          {addingSub && selectedTopId && (
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <input autoFocus value={newName} onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleAddSub(); if (e.key === 'Escape') setAddingSub(false) }}
                placeholder="Sub-category name..." style={{ flex: 1, background: '#222', border: '1px solid #c60000', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: '6px', fontSize: '0.875rem' }} />
              <button onClick={handleAddSub} style={{ background: '#c60000', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.8rem', cursor: 'pointer' }}>Add</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
