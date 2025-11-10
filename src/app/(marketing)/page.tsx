export default function Home(){
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Carnet d’entraînements</h1>
      <p>Enregistre tes séances. Connecte‑toi et commence.</p>
    </main>
  )
}export default function Home(){
  return (
    <main className="min-h-[80vh]">
      {/* Hero */}
      <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Carnet d’entraînements
          </h1>
          <p className="mt-4 text-slate-600 text-base md:text-lg">
            Enregistre tes séances, garde l’historique, et suis ta progression.
            Auth sécurisée par email. Données stockées sur Supabase.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="/login" className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-100">
              Se connecter
            </a>
            <a href="/dashboard" className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90">
              Ouvrir le dashboard
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="rounded-2xl border p-5 bg-white">
            <h3 className="font-semibold">Auth par email</h3>
            <p className="mt-2 text-sm text-slate-600">Connexion sans mot de passe via lien magique. RLS pour isoler tes données.</p>
          </div>
          <div className="rounded-2xl border p-5 bg-white">
            <h3 className="font-semibold">CRUD rapide</h3>
            <p className="mt-2 text-sm text-slate-600">Ajoute un titre, des notes et une date. Modifie ou supprime en un clic.</p>
          </div>
          <div className="rounded-2xl border p-5 bg-white">
            <h3 className="font-semibold">Export CSV</h3>
            <p className="mt-2 text-sm text-slate-600">Récupère tes séances pour Excel ou Google Sheets en un bouton.</p>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto rounded-2xl border p-6 text-center bg-white">
          <h2 className="text-xl md:text-2xl font-semibold">Prêt à enregistrer ta prochaine séance ?</h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a href="/login" className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-100">
              Se connecter
            </a>
            <a href="/dashboard" className="inline-flex items-center justify-center rounded-xl bg-black text-white px-4 py-2 text-sm font-medium hover:opacity-90">
              Accéder au dashboard
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}