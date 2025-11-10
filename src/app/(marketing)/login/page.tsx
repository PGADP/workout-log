'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.href = '/dashboard'
      }
    })
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({
  email,
  options: { emailRedirectTo: `${window.location.origin}/dashboard` }
})
    if (error) alert(error.message)
    else setSent(true)
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>
      {sent ? (
        <p>Vérifie ton email.</p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="border p-2 w-full"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <button className="border px-3 py-2" type="submit">
            Envoyer le lien
          </button>
        </form>
      )}
    </div>
  )
}
