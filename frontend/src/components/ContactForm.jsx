import React, { useState } from 'react'
import { postContact } from '../services/api'

export default function ContactForm({ onAdded }){
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Invalid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (ev) =>{
    ev.preventDefault()
    if (!validate()) return
    setStatus('loading')
    const res = await postContact(form)
    if (res && res._id){
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
      onAdded && onAdded()
      setTimeout(() => setStatus(null), 2000)
    } else {
      setStatus('error')
    }
  }

  const isValid = () => {
    return form.name.trim() && form.phone.trim() && (!form.email || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
  }

  return (
    <form className="card" onSubmit={handleSubmit} noValidate>
      <h2>Contact Form</h2>
      <label>Name *</label>
      <input name="name" value={form.name} onChange={handleChange} />
      {errors.name && <div className="error">{errors.name}</div>}

      <label>Email</label>
      <input name="email" value={form.email} onChange={handleChange} />
      {errors.email && <div className="error">{errors.email}</div>}

      <label>Phone *</label>
      <input name="phone" value={form.phone} onChange={handleChange} />
      {errors.phone && <div className="error">{errors.phone}</div>}

      <label>Message</label>
      <textarea name="message" value={form.message} onChange={handleChange} />

      <button type="submit" disabled={!isValid() || status === 'loading'}>
        {status === 'loading' ? 'Saving...' : 'Submit'}
      </button>

      {status === 'success' && <div className="success">Contact saved ✅</div>}
      {status === 'error' && <div className="error">Error saving contact</div>}
    </form>
  )
}
