'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-browser'
import type { Session } from '@supabase/supabase-js'

export default function Header() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Récupérer la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Écouter les changements de session
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <header className="border-b p-4 flex gap-4">
      <a href="/">Accueil</a>

      {session ? (
        <>
          <a href="/dashboard">Dashboard</a>
          <button
            onClick={handleLogout}
            className="ml-auto border px-3 py-1 rounded"
          >
            Logout
          </button>
        </>
      ) : (
        <a href="/login" className="ml-auto">Login</a>
      )}
    </header>
  )
}
