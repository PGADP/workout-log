'use client'
import { supabase } from '@/lib/supabase-browser'

export default function LogoutBtn() {
  async function signOut() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }
  return (
    <button onClick={signOut} className="ml-2 border px-3 py-1 rounded">
      Logout
    </button>
  )
}
