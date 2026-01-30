import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Mail, Phone, MessageSquareText, CheckCircle2 } from "lucide-react";

export default function ContactSupport() {
  const [form, setForm] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);

  const canSend = form.name && form.email && form.subject && form.message.length >= 10;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    // 👉 ici tu brancheras ton appel API
    setSent(true);
  };

  if (sent) {
    return (
      <div className="space-y-6 animate-fade-in">
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/parent/profil" className="inline-flex items-center gap-2 text-sky-600 hover:underline">
                <ArrowLeft className="h-4 w-4" /> Retour au profil
              </Link>
              <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Contact support</h1>
            </div>
          </div>
        </section>

        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-white/10 dark:bg-slate-900">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
          <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">Message envoyé ✔</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-300">Notre équipe te répondra rapidement sur ton email.</p>
          <Link to="/parent/help" className="mt-4 inline-flex rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white/80">
            Retour au centre d’aide
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-rose-400/20 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <Link to="/parent/profil" className="inline-flex items-center gap-2 text-sky-600 hover:underline">
              <ArrowLeft className="h-4 w-4" /> Retour au profil
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Contact support</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Explique ton besoin, on revient vers toi rapidement.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Infos */}
        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">Contact direct</h3>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Mail className="h-4 w-4" /> support@kidora.app
            </p>
            <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <Phone className="h-4 w-4" /> +33 1 23 45 67 89
            </p>
            <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <MessageSquareText className="h-4 w-4" /> Lun–Ven • 9h–18h
            </p>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 p-4 text-sm dark:from-emerald-900/20 dark:to-green-900/20">
            <div className="mb-1 font-semibold text-slate-700 dark:text-slate-200">Astuce</div>
            <p className="text-slate-600 dark:text-slate-300">
              Ajoute des captures d’écran et précise la page concernée pour accélérer le diagnostic.
            </p>
          </div>
        </aside>

        {/* Formulaire */}
        <form onSubmit={onSubmit} className="lg:col-span-2 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Nom complet</label>
              <input
                value={form.name}
                onChange={(e)=>setForm({...form, name:e.target.value})}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e)=>setForm({...form, email:e.target.value})}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Objet</label>
            <input
              value={form.subject}
              onChange={(e)=>setForm({...form, subject:e.target.value})}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
            <textarea
              value={form.message}
              onChange={(e)=>setForm({...form, message:e.target.value})}
              rows={6}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500 dark:border-white/10 dark:bg-white/10 dark:text-white"
              placeholder="Décris le problème, la page concernée, et les étapes pour le reproduire…"
            />
            <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{form.message.length}/1000</div>
          </div>

          <div className="flex items-center justify-between">
            <Link to="/parent/help" className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white/80">
              Centre d’aide
            </Link>
            <button
              disabled={!canSend}
              className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow transition dark:bg-slate-700
              ${canSend ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:brightness-110" : "bg-slate-400 cursor-not-allowed"}`}
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
