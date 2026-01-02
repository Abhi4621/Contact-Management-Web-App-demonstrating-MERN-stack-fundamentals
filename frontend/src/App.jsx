import React, { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import { fetchContacts } from './services/api'

export default function App(){
  const [contacts, setContacts] = useState([])

  const loadContacts = async () => {
    const data = await fetchContacts()
    setContacts(data || [])
  }

  useEffect(() => { loadContacts() }, [])

  return (
    <div className="container">
      <h1>Contact Manager</h1>
      <div className="grid">
        <ContactForm onAdded={loadContacts} />
        <ContactList contacts={contacts} onDeleted={loadContacts} />
      </div>
    </div>
  )
}
