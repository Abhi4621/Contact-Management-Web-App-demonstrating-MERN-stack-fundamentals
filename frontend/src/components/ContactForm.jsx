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
      setTimeout(() => setStatus(null), 2200)
    } else {
      setStatus('error')
    }
  }

  const isValid = () => {
    return form.name.trim() && form.phone.trim() && (!form.email || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
  }

  return (
    <form className="card contact-form" onSubmit={handleSubmit} noValidate>
      <h2>Get in touch</h2>

      <div className="form-row">
        <label htmlFor="name">Name *</label>
        <div className="input">
          <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Full name" aria-required="true" />
        </div>
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="row">
        <div className="form-row flex">
          <label htmlFor="email">Email</label>
          <div className="input">
            <input id="email" name="email" value={form.email} onChange={handleChange} type="email" placeholder="name@example.com" />
          </div>
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-row flex">
          <label htmlFor="phone">Phone *</label>
          <div className="input">
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 555-5555" />
          </div>
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="message">Message</label>
        <div className="input">
          <textarea id="message" name="message" value={form.message} onChange={handleChange} placeholder="Optional message or note" />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={!isValid() || status === 'loading'}>
          {status === 'loading' ? 'Saving...' : 'Save contact'}
        </button>

        <button type="button" className="btn btn-ghost" onClick={() => setForm({ name: '', email: '', phone: '', message: '' })}>
          Reset
        </button>

        {status === 'success' && <div className="status success">Saved ✅</div>}
        {status === 'error' && <div className="status error">Failed to save</div>}
      </div>

      <div className="helper">Tip: Use a phone number so you can be reached quickly.</div>
    </form>
  )
}
