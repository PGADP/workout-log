'use client'
import { useEffect, useState } from 'react'
import { listWorkouts, addWorkout, deleteWorkout, updateWorkout } from '@/lib/workouts'
import { supabase } from '@/lib/supabase-browser'

type Workout = {
  id: string
  title: string
  notes?: string | null
  performed_at: string
}

export default function Dashboard() {
  const [items, setItems] = useState<Workout[]>([])
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [date, setDate] = useState<string>('')
  const [ready, setReady] = useState(false)

  // Auth guard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/login'
      else setReady(true)
    })
  }, [])

  // Load workouts
  useEffect(() => {
    if (!ready) return
    listWorkouts().then(setItems).catch(e => alert(e.message))
  }, [ready])

  // Add workout
  async function onAdd() {
    if (!title.trim()) return alert('Titre requis')
    await addWorkout({ title, notes, performed_at: date || undefined })
    setTitle('')
    setNotes('')
    setDate('')
    setItems(await listWorkouts())
  }

  // PDF Export (pdf-lib)
  async function onExportPdf() {
    try {
      const res = await fetch('/api/export/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      if (!res.ok) throw new Error('Export PDF: erreur serveur')

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'workouts.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (e:any) {
      alert(e?.message || 'Erreur PDF')
    }
  }

  if (!ready) return <div className="p-6">Chargement…</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes séances</h1>
            <p className="text-gray-600">Suivez vos entraînements et votre progression</p>
          </div>

          {/* PDF button */}
          <button
            className="inline-flex items-center px-3 py-2 border text-sm rounded-md bg-white hover:bg-gray-50"
            onClick={onExportPdf}
          >
            Exporter PDF
          </button>
        </div>

        {/* Add form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input className="col-span-1 border rounded p-2"
              placeholder="Titre"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <input className="col-span-2 border rounded p-2"
              placeholder="Notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <input className="border rounded p-2"
              type="datetime-local"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            onClick={onAdd}
          >
            Ajouter la séance
          </button>
        </div>

        {/* List */}
        <div className="bg-white rounded-lg shadow-sm">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              Aucune séance enregistrée
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map(w => (
                <li key={w.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{w.title}</h3>
                      <small className="text-gray-500">
                        {new Date(w.performed_at).toLocaleString('fr-FR')}
                      </small>
                      {w.notes && <p className="mt-2 text-sm">{w.notes}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-2 py-1 text-sm border rounded"
                        onClick={async () => {
                          const t = prompt('Nouveau titre', w.title) || w.title
                          await updateWorkout(w.id, { title: t })
                          setItems(await listWorkouts())
                        }}>
                        Modifier
                      </button>
                      <button
                        className="px-2 py-1 text-sm border rounded text-red-600"
                        onClick={async () => {
                          if (confirm('Supprimer ?')) {
                            await deleteWorkout(w.id)
                            setItems(await listWorkouts())
                          }
                        }}>
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  )
}
