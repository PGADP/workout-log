'use client'
import { useEffect, useState } from 'react'
import { listWorkouts, addWorkout, deleteWorkout, updateWorkout } from '@/lib/workouts'
import { supabase } from '@/lib/supabase-browser'

export default function Dashboard(){
  const [items, setItems] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState<string>('')
  const [session, setSession] = useState<any>(null)

  useEffect(() => { supabase.auth.getSession().then(({ data }) => setSession(data.session)) }, [])
  useEffect(() => { if(session){ listWorkouts().then(setItems).catch(alert) } }, [session])

  async function onAdd(){
    await addWorkout({ title, notes, performed_at: date || undefined })
    setTitle(''); setNotes(''); setDate('')
    setItems(await listWorkouts())
  }

  if(!session){ return <div className="p-6"><a className="underline" href="/login">Se connecter</a></div> }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Mes séances</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <input className="border p-2" placeholder="Titre" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="border p-2 md:col-span-2" placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)} />
        <input className="border p-2" type="datetime-local" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      <button className="border px-3 py-2" onClick={onAdd}>Ajouter</button>

      <ul className="space-y-2">
        {items.map(w => (
          <li key={w.id} className="border p-3 rounded">
            <div className="font-medium">{w.title}</div>
            <div className="text-sm opacity-70">{new Date(w.performed_at).toLocaleString()}</div>
            {w.notes && <div className="text-sm">{w.notes}</div>}
            <div className="flex gap-2 mt-2">
              <button className="border px-2" onClick={async()=>{ await deleteWorkout(w.id); setItems(await listWorkouts()) }}>Supprimer</button>
              <button className="border px-2" onClick={async()=>{ const t = prompt('Nouveau titre', w.title) || w.title; await updateWorkout(w.id,{ title: t }); setItems(await listWorkouts()) }}>Renommer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}