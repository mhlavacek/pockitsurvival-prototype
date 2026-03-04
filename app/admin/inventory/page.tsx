'use client'

import { useState } from 'react'
import { useAdminContext } from '@/context/AdminContext'
import { Product, getCategoryById } from '@/lib/data'
import Link from 'next/link'

type EditingCell = { id: string; field: keyof Product } | null

let nextId = 100

export default function AdminInventory() {
  const { products, updateProduct, addProduct, deleteProduct, categories } = useAdminContext()
  const [editingCell, setEditingCell] = useState<EditingCell>(null)
  const [editValue, setEditValue] = useState('')
  const [toast, setToast] = useState('')
  const [refreshing, setRefreshing] = useState<string | null>(null)
  const [sortField, setSortField] = useState<keyof Product>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [lastAddedId, setLastAddedId] = useState<string | null>(null)

  const topCategories = categories.filter(c => !c.parentId)

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  function startEdit(id: string, field: keyof Product, value: unknown) {
    setEditingCell({ id, field })
    setEditValue(String(value ?? ''))
  }

  function commitEdit() {
    if (!editingCell) return
    const { id, field } = editingCell
    let val: unknown = editValue
    if (field === 'price' || field === 'stockCount' || field === 'competitorPrice') val = parseFloat(editValue) || 0
    updateProduct(id, { [field]: val })
    setEditingCell(null)
    showToast('Saved! (In production this persists to your database)')
  }

  function handleRefreshCompetitor(id: string) {
    setRefreshing(id)
    setTimeout(() => {
      const mockPrices = [7.99, 11.49, 14.99, 9.50, 18.99, 3.49, 22.00]
      const price = mockPrices[Math.floor(Math.random() * mockPrices.length)]
      updateProduct(id, { competitorPrice: price })
      setRefreshing(null)
      showToast('Competitor price refreshed (mock -- real impl queries price comparison API)')
    }, 1500)
  }

  function handleSort(field: keyof Product) {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortField(field); setSortDir('asc') }
  }

  function handleAddProduct() {
    const id = String(nextId++)
    addProduct({
      id, slug: `new-product-${id}`, name: 'New Product', price: 0,
      categoryId: topCategories[0]?.id ?? 'tools',
      description: '', keywords: [], stockCount: 0,
      isBestSeller: false, isNewProduct: true,
    })
    setLastAddedId(id)
    showToast('New product row added -- click cells to edit')
  }

  const sorted = [...products].sort((a, b) => {
    const av = a[sortField], bv = b[sortField]
    if (av === bv) return 0
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true })
    return sortDir === 'asc' ? cmp : -cmp
  })
  const pinnedRow = lastAddedId ? sorted.find(p => p.id === lastAddedId) : null
  const displayRows = pinnedRow ? [pinnedRow, ...sorted.filter(p => p.id !== lastAddedId)] : sorted

  const cellStyle: React.CSSProperties = {
    padding: '0.6rem 0.75rem', borderRight: '1px solid rgba(255,255,255,0.05)',
    fontSize: '0.8125rem', verticalAlign: 'middle', whiteSpace: 'nowrap',
  }

  const thStyle: React.CSSProperties = {
    ...cellStyle, fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.5)', background: '#0a0a0a', cursor: 'pointer',
    userSelect: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)',
  }

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: '#22c55e',
          color: '#000', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: 600,
          fontSize: '0.8125rem', zIndex: 200, maxWidth: '340px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        }}>{toast}</div>
      )}

      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <div className="proto-banner" style={{ borderRadius: '8px', marginBottom: '1.5rem' }}>
          PROTOTYPE -- Edits update local state only. In production, changes persist to the database.
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <Link href="/admin" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', textDecoration: 'none' }}>&larr; Dashboard</Link>
            <h1 style={{ fontWeight: 800, fontSize: '1.25rem', marginTop: '0.25rem' }}>Product Inventory</h1>
          </div>
          <button onClick={handleAddProduct} style={{
            background: '#c60000', color: '#fff', border: 'none', borderRadius: '8px',
            padding: '0.6rem 1.25rem', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer', letterSpacing: '0.05em',
          }}>+ ADD PRODUCT</button>
        </div>
      </div>

      {/* Scrollable table */}
      <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
        <div style={{ minWidth: '900px', padding: '0 1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#111', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <thead>
              <tr>
                {[
                  { label: '#', field: 'id' as keyof Product },
                  { label: 'NAME', field: 'name' as keyof Product },
                  { label: 'CATEGORY', field: 'categoryId' as keyof Product },
                  { label: 'PRICE', field: 'price' as keyof Product },
                  { label: 'COMPETITOR $', field: 'competitorPrice' as keyof Product },
                  { label: 'STOCK', field: 'stockCount' as keyof Product },
                  { label: 'KEYWORDS', field: 'keywords' as keyof Product },
                  { label: 'ACTIONS', field: 'id' as keyof Product },
                ].map((col, i) => (
                  <th key={i} onClick={() => col.label !== 'ACTIONS' && handleSort(col.field)} style={thStyle}>
                    {col.label} {sortField === col.field ? (sortDir === 'asc' ? ' ^' : ' v') : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayRows.map((p, rowIdx) => {
                const cat = getCategoryById(p.categoryId)
                const isEditing = (field: keyof Product) => editingCell?.id === p.id && editingCell?.field === field
                const rowBg = rowIdx % 2 === 0 ? '#111' : '#0d0d0d'

                function EditableCell({ field, value }: { field: keyof Product; value: unknown }) {
                  return isEditing(field) ? (
                    <input
                      autoFocus
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={commitEdit}
                      onKeyDown={e => { if (e.key === 'Enter') commitEdit(); if (e.key === 'Escape') setEditingCell(null) }}
                      style={{ background: '#222', border: '1px solid #c60000', color: '#fff', padding: '0.25rem 0.4rem', borderRadius: '4px', width: '100%', fontSize: '0.8125rem' }}
                    />
                  ) : (
                    <span onClick={() => startEdit(p.id, field, value)}
                      style={{ cursor: 'text', display: 'block', minWidth: '60px', padding: '2px 4px', borderRadius: '3px' }}
                      title="Click to edit"
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(198,0,0,0.15)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      {String(value ?? '--')}
                    </span>
                  )
                }

                return (
                  <tr key={p.id} style={{ background: rowBg, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ ...cellStyle, color: 'rgba(255,255,255,0.3)', width: '40px' }}>{rowIdx + 1}</td>
                    <td style={{ ...cellStyle, minWidth: '180px' }}><EditableCell field="name" value={p.name} /></td>
                    <td style={{ ...cellStyle, minWidth: '130px' }}>
                      {isEditing('categoryId') ? (
                        <select autoFocus value={editValue} onChange={e => setEditValue(e.target.value)}
                          onBlur={commitEdit}
                          style={{ background: '#222', border: '1px solid #c60000', color: '#fff', padding: '0.25rem', borderRadius: '4px', fontSize: '0.8125rem' }}>
                          {topCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      ) : (
                        <span onClick={() => startEdit(p.id, 'categoryId', p.categoryId)} style={{ cursor: 'text' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(198,0,0,0.15)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <span style={{ background: `${cat?.color ?? '#333'}33`, color: cat?.color ?? '#fff', padding: '2px 8px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600 }}>
                            {cat?.name ?? p.categoryId}
                          </span>
                        </span>
                      )}
                    </td>
                    <td style={cellStyle}><EditableCell field="price" value={`$${Number(p.price).toFixed(2)}`} /></td>
                    <td style={{ ...cellStyle, minWidth: '160px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                          {p.competitorPrice ? `$${p.competitorPrice.toFixed(2)} Amazon` : 'N/A'}
                        </span>
                        <button onClick={() => handleRefreshCompetitor(p.id)}
                          title="Refresh competitor price (mock -- real impl queries price API)"
                          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {refreshing === p.id ? (
                            <span style={{ animation: 'spin 0.8s linear infinite', display: 'inline-block' }}>{'\u21BB'}</span>
                          ) : '\u21BB'}
                        </button>
                      </div>
                    </td>
                    <td style={cellStyle}><EditableCell field="stockCount" value={p.stockCount} /></td>
                    <td style={{ ...cellStyle, minWidth: '140px' }}>
                      <EditableCell field="keywords" value={Array.isArray(p.keywords) ? p.keywords.join(', ') : p.keywords} />
                    </td>
                    <td style={cellStyle}>
                      <button onClick={() => { if (window.confirm(`Delete "${p.name}"?`)) { deleteProduct(p.id); showToast('Product deleted') } }}
                        style={{ background: 'none', border: '1px solid rgba(198,0,0,0.4)', color: '#c60000', borderRadius: '6px', padding: '0.25rem 0.5rem', cursor: 'pointer', fontSize: '0.75rem' }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
