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
        <div>
          <label>Sort: </label>
          <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
            <option value="date">Newest</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email || '-'}</td>
              <td>{c.phone}</td>
              <td>{c.message || '-'}</td>
              <td><button onClick={()=>handleDelete(c._id)} className="danger">Delete</button></td>
            </tr>
          ))}
          {sorted.length===0 && (
            <tr><td colSpan="5">No contacts yet</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
