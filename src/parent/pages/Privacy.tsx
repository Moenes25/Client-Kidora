import { Link } from "react-router";
import { Shield, Lock, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function Privacy() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-slate-900">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <Link to="/parent/profil" className="inline-flex items-center gap-2 text-sky-600 hover:underline">
              <ArrowLeft className="h-4 w-4" /> Retour au profil
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Confidentialité</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">Comment nous protégeons tes données et tes droits.</p>
          </div>
        </div>
      </section>

      {/* Sections */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="mb-2 flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <Shield className="h-5 w-5" /><h3 className="font-semibold">Engagement</h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Nous collectons uniquement les informations nécessaires au fonctionnement de Kidora
            (compte parent, informations de l’enfant, activités, évaluations). Aucune revente à des tiers.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Hébergement sécurisé dans l’UE</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Chiffrement en transit (HTTPS)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Accès limité par rôle</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="mb-2 flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <Lock className="h-5 w-5" /><h3 className="font-semibold">Tes contrôles</h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Depuis <b>Profil</b>, tu peux modifier tes données, choisir tes notifications,
            activer l’authentification à 2 facteurs et demander l’exportation/suppression.
          </p>
          <div className="mt-3 rounded-xl bg-slate-50 p-4 text-sm dark:bg-white/10">
            <div className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">Droit d’accès & d’effacement</div>
            Écris-nous à <span className="font-medium">privacy@kidora.app</span> pour toute demande RGPD.
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900">
          <div className="mb-2 flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <FileText className="h-5 w-5" /><h3 className="font-semibold">Conservation</h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Les données sont conservées tant que le compte est actif. En cas de clôture,
            nous les supprimons dans un délai raisonnable, sauf obligation légale contraire.
          </p>
          <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Dernière mise à jour : 2026-01-22
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-indigo-50 to-cyan-50 p-6 shadow-sm dark:border-white/10 dark:from-indigo-900/20 dark:to-cyan-900/20">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Une question sur la confidentialité ou une demande RGPD ?
          </p>
          <Link
            to="/parent/contact"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
          >
            Contacter le délégué
          </Link>
        </div>
      </div>
    </div>
  );
}
