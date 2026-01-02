const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function fetchContacts(){
  try{
    const res = await fetch(`${API}/api/contacts`)
    return await res.json()
  }catch(e){
    console.error(e)
    return []
  }
}

export async function postContact(payload){
  try{
    const res = await fetch(`${API}/api/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) return null
    return await res.json()
  }catch(e){
    console.error(e)
    return null
  }
}

export async function deleteContact(id){
  try{
    await fetch(`${API}/api/contacts/${id}`, { method: 'DELETE' })
  }catch(e){ console.error(e) }
}
