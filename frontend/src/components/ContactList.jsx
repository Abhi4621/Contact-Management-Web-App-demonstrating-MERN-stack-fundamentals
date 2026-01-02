import React, { useState } from 'react'
import { deleteContact } from '../services/api'

export default function ContactList({ contacts, onDeleted }){
  const [sortBy, setSortBy] = useState('date')

  const handleDelete = async (id) =>{
    if (!confirm('Delete this contact?')) return
    await deleteContact(id)
    onDeleted && onDeleted()
  }

  const sorted = [...contacts].sort((a,b)=>{
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <div className="card list">
      <div className="list-header">
        <h2>Contacts</h2>
        <div className="controls">
          <label htmlFor="sort">Sort:</label>
          <select id="sort" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="date">Newest</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="empty">No contacts yet — add your first contact.</div>
      ) : (
        <div className="contacts-grid">
          {sorted.map(c => (
            <article key={c._id} className="contact-card">
              <div>
                <h3>{c.name}</h3>
                <div className="meta">{c.email || '-'} • {c.phone}</div>
                {c.message && <div className="message">{c.message}</div>}
              </div>

              <div className="contact-actions">
                {/* Delete button */}
                <button aria-label={`Delete ${c.name}`} title="Delete" onClick={()=>handleDelete(c._id)} className="btn-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6l1-2h6l1 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
