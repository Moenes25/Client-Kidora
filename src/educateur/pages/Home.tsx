import PageMeta from "../../components/common/PageMeta";
import Metrics from "../components/Dashboard/Metrics";
import ClassesSummary from "../components/Dashboard/ClassesSummary";
import RecentActivities from "../components/Dashboard/RecentActivities";
import WeeklySchedule from "../components/Dashboard/WeeklySchedule";
import ChildrenToday from "../components/Dashboard/ChildrenToday";
import React, { useState, useEffect, useMemo } from "react";
import { UserIcon, CheckCircleIcon, CloseIcon, PlusIcon } from "../../icons";

/** ----------------------------------------------------------
 *  Home Éducateur – version améliorée
 *  ----------------------------------------------------------
 *  - Hero créatif + sous-titres
 *  - Grille simple 8/4
 *  - Modals (présences / activité / observation IA)
 *  - Styles harmonisés avec les widgets
 * ---------------------------------------------------------*/
/* ===================== Quick Notes (localStorage) ===================== */


/* -------------------------- TagInput pour chips -------------------------- */



function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState("");
  const add = (t: string) => {
    const v = t.trim();
    if (!v) return;
    if (!value.includes(v)) onChange([...value, v]);
    setDraft("");
  };
  return (
    <div className="rounded-lg border border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap gap-2">
        {value.map((t) => (
          <span key={t} className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            {t}
            <button
              className="ml-1 text-indigo-500 hover:text-indigo-700"
              onClick={() => onChange(value.filter((x) => x !== t))}
              aria-label="Supprimer"
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
              e.preventDefault();
              add(draft);
            } else if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          placeholder={placeholder}
          className="flex-1 min-w-[160px] bg-transparent px-2 py-1 text-sm outline-none placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}

/* -------------------------- Modal Activité amélioré -------------------------- */
function ActiviteModal({
  open,
  onClose,
  nouvelleActivite,
  setNouvelleActivite,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  nouvelleActivite: {
    titre: string;
    description: string;
    type: string;
    duree: number;
    date: string;
    heure: string;
    classe: string;
    enfantsMax: number;
    materiel: string[];
    objectifs: string[];
  };
  setNouvelleActivite: (v: any) => void;
  onCreate: () => void;
}) {
  const char = (n: number) => `${n}/280`;
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Ajouter une activité"
      subtitle="Créez une nouvelle activité éducative"
      width="max-w-4xl"
      footer={
        <>
          <button
            onClick={onCreate}
            className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Créer l’activité
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Annuler
          </button>
        </>
      }
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium dark:text-gray-300">Titre *</label>
            <input
              value={nouvelleActivite.titre}
              onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, titre: e.target.value })}
              placeholder="Ex: Atelier Peinture Libre"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium dark:text-gray-300">Type *</label>
              <select
                value={nouvelleActivite.type}
                onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, type: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
              >
                <option value="creatif">Créatif</option>
                <option value="sportif">Sportif</option>
                <option value="educatif">Éducatif</option>
                <option value="musical">Musical</option>
                <option value="nature">Nature</option>
                <option value="social">Social</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium dark:text-gray-300">Classe *</label>
              <select
                value={nouvelleActivite.classe}
                onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, classe: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
              >
                {["(3-4) ans","(4-5) ans","(6-7) ans","(8-9) ans","(10-11) ans","12 ans","Toutes classes"].map((c)=>(
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium dark:text-gray-300">Description *</label>
            <textarea
              value={nouvelleActivite.description}
              maxLength={280}
              onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, description: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
              placeholder="Décrivez l'activité…"
            />
            <div className="mt-1 text-right text-xs text-gray-400">{char(nouvelleActivite.description.length)}</div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium dark:text-gray-300">Date *</label>
              <input
                type="date"
                value={nouvelleActivite.date}
                onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, date: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium dark:text-gray-300">Heure *</label>
              <input
                type="time"
                value={nouvelleActivite.heure}
                onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, heure: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium dark:text-gray-300">Durée (min) *</label>
              <input
                type="range"
                min={15}
                max={240}
                step={15}
                value={nouvelleActivite.duree}
                onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, duree: parseInt(e.target.value) || 0 })}
                className="w-full dark:text-gray-300"
              />
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">{nouvelleActivite.duree} min</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium dark:text-gray-300">Objectifs</label>
              <TagInput
                value={nouvelleActivite.objectifs}
                onChange={(v) => setNouvelleActivite({ ...nouvelleActivite, objectifs: v })}
                placeholder="Ex: créativité, motricité…"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium dark:text-gray-300">Matériel</label>
              <TagInput
                value={nouvelleActivite.materiel}
                onChange={(v) => setNouvelleActivite({ ...nouvelleActivite, materiel: v })}
                placeholder="Ex: peinture, pinceaux…"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium dark:text-gray-300">Capacité max *</label>
              <input
                type="number"
                min={1}
                max={30}
                value={nouvelleActivite.enfantsMax}
                onChange={(e) => setNouvelleActivite({ ...nouvelleActivite, enfantsMax: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
              />
            </div>
            <div className="flex items-end">
              <div className="w-full rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                Conseil : précisez 2–3 objectifs max pour rester focalisé.
              </div>
            </div>
          </div>
        </div>

        {/* Preview carte */}
        <div className="space-y-3">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900/40 dark:bg-indigo-900/20">
            <h4 className="mb-1 text-sm font-semibold text-indigo-700 dark:text-indigo-300">Prévisualisation</h4>
            <div className="rounded-lg border border-white/50 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-gray-900">
              <div className="mb-1 text-xs text-gray-500">{nouvelleActivite.date} • {nouvelleActivite.heure} • {nouvelleActivite.duree} min</div>
              <div className="text-lg font-bold dark:text-gray-300">{nouvelleActivite.titre || "Titre de l’activité"}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{nouvelleActivite.description || "Description…"}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">{nouvelleActivite.type}</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">{nouvelleActivite.classe}</span>
              </div>
              {!!nouvelleActivite.objectifs.length && (
                <div className="mt-3">
                  <div className="text-xs font-medium text-gray-500">Objectifs</div>
                  <ul className="mt-1 list-inside list-disc text-sm text-gray-700 dark:text-gray-200">
                    {nouvelleActivite.objectifs.map((o, i) => <li key={i}>{o}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

/* -------------------------- Modal Observation IA amélioré -------------------------- */
function ObservationModal({
  open,
  onClose,
  enfants,
  classes,
  domainesObservation,
  sentimentsOptions,
  contextesRapides,
  intensitesOptions,
  nouvelleObservation,
  setNouvelleObservation,
  observationGeneree,
  onGenerate,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  enfants: { id:number; nom:string; classe?:string }[];
  classes: string[];
  domainesObservation: { value:string; label:string; icon?:string }[];
  sentimentsOptions: { value:string; label:string; color:string }[];
  contextesRapides: { value:string; label:string }[];
  intensitesOptions: { value:string; label:string }[];
  nouvelleObservation: any;
  setNouvelleObservation: (v:any) => void;
  observationGeneree: string;
  onGenerate: () => void;
  onSave: () => void;
}) {
  const disabled = !nouvelleObservation.cibleId || !nouvelleObservation.descriptionRapide;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Ajouter une observation"
      subtitle="Saisie rapide (avec aide IA)"
      width="max-w-5xl"
      footer={
        <>
          <button
            onClick={onSave}
            disabled={!observationGeneree}
            className={`rounded-lg px-4 py-2 font-medium text-white ${observationGeneree ? "bg-green-600 hover:bg-green-700" : "cursor-not-allowed bg-gray-300 dark:bg-gray-700"}`}
          >
            Enregistrer
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Fermer
          </button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        {/* Formulaire */}
        <div className="space-y-6">
          {/* Cible */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-900/20">
            <h4 className="mb-3 text-sm font-semibold text-blue-800 dark:text-blue-300">Cible de l’observation</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setNouvelleObservation({ ...nouvelleObservation, typeCible: "enfant", cibleId: "" })}
                    className={`flex-1 rounded-lg border px-3 py-2 text-left ${nouvelleObservation.typeCible === "enfant" ? "border-blue-500 bg-white dark:bg-gray-900" : "border-gray-300 dark:border-gray-700"}`}
                  >
                    👤 Individuelle
                  </button>
                  <button
                    type="button"
                    onClick={() => setNouvelleObservation({ ...nouvelleObservation, typeCible: "classe", cibleId: "" })}
                    className={`flex-1 rounded-lg border px-3 py-2 text-left ${nouvelleObservation.typeCible === "classe" ? "border-purple-500 bg-white dark:bg-gray-900" : "border-gray-300 dark:border-gray-700"}`}
                  >
                    👥 Classe
                  </button>
                </div>
              </div>
              <div>
                {nouvelleObservation.typeCible === "enfant" ? (
                  <select
                    required
                    value={nouvelleObservation.cibleId}
                    onChange={(e) => setNouvelleObservation({ ...nouvelleObservation, cibleId: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <option value="">Sélectionnez un enfant…</option>
                    {enfants.map((e) => (
                      <option key={e.id} value={e.nom}>{e.nom} ({e.classe})</option>
                    ))}
                  </select>
                ) : (
                  <select
                    required
                    value={nouvelleObservation.cibleId}
                    onChange={(e) => setNouvelleObservation({ ...nouvelleObservation, cibleId: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <option value="">Sélectionnez une classe…</option>
                    {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                )}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <input
                type="date"
                value={nouvelleObservation.date}
                onChange={(e) => setNouvelleObservation({ ...nouvelleObservation, date: e.target.value })}
                className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              />
              <input
                type="time"
                value={nouvelleObservation.heure}
                onChange={(e) => setNouvelleObservation({ ...nouvelleObservation, heure: e.target.value })}
                className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Domaine + Sentiment */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-900/20">
            <h4 className="mb-3 text-sm font-semibold text-green-800 dark:text-green-300">Analyse</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Domaine *</label>
                <div className="grid grid-cols-3 gap-2">
                  {domainesObservation.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setNouvelleObservation({ ...nouvelleObservation, domaine: d.value })}
                      className={`rounded-lg border px-2 py-2 text-sm ${nouvelleObservation.domaine === d.value ? "border-blue-500 bg-white dark:bg-gray-900" : "border-gray-300 dark:border-gray-700"}`}
                    >
                      <span className="mr-1">{d.icon || "🏷️"}</span>{d.label.split(" ")[1]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-600 dark:text-gray-300">Impression *</label>
                <div className="space-y-2">
                  {sentimentsOptions.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setNouvelleObservation({ ...nouvelleObservation, sentiment: s.value })}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm ${nouvelleObservation.sentiment === s.value ? "ring-2 ring-blue-500" : "border-gray-300 dark:border-gray-700"}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${s.color.split(" ")[0]}`} />
                        {s.label}
                      </span>
                      <span className="text-xs text-gray-500">choisir</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Détails */}
          <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 dark:border-purple-900/40 dark:bg-purple-900/20">
            <h4 className="mb-3 text-sm font-semibold text-purple-800 dark:text-purple-300">Détails</h4>
            <label className="mb-1 block text-sm font-medium">Note rapide (1–2 phrases) *</label>
            <textarea
              value={nouvelleObservation.descriptionRapide}
              onChange={(e) => setNouvelleObservation({ ...nouvelleObservation, descriptionRapide: e.target.value })}
              rows={3}
              placeholder="Ex : a aidé un camarade, a demandé de l’aide calmement…"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
            />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Moment</label>
                <select
                  value={nouvelleObservation.contexte}
                  onChange={(e) => setNouvelleObservation({ ...nouvelleObservation, contexte: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                >
                  <option value="">Non spécifié</option>
                  {contextesRapides.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Intensité</label>
                <select
                  value={nouvelleObservation.intensite}
                  onChange={(e) => setNouvelleObservation({ ...nouvelleObservation, intensite: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-800"
                >
                  {intensitesOptions.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}
                </select>
              </div>
            </div>

            {/* Templates rapides */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "a collaboré avec enthousiasme",
                "a montré de la persévérance",
                "a eu besoin d’un temps calme",
                "a guidé un pair avec bienveillance",
              ].map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    setNouvelleObservation({
                      ...nouvelleObservation,
                      descriptionRapide: (nouvelleObservation.descriptionRapide || "") + (nouvelleObservation.descriptionRapide ? " " : "") + t + ".",
                    })
                  }
                  className="rounded-full bg-white px-3 py-1 text-xs shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:ring-gray-700"
                >
                  + {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onGenerate}
              disabled={disabled}
              className={`rounded-lg px-4 py-2 font-medium text-white ${disabled ? "cursor-not-allowed bg-gray-300 dark:bg-gray-700" : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"}`}
            >
              🤖 Générer avec IA
            </button>
            {observationGeneree && (
              <button
                onClick={() => navigator.clipboard.writeText(observationGeneree)}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Copier le texte
              </button>
            )}
          </div>
        </div>

        {/* Preview IA */}
        <div className="space-y-3">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800/50 dark:bg-amber-900/20">
            <h4 className="mb-2 text-sm font-semibold text-amber-800 dark:text-amber-300">Prévisualisation IA</h4>
            {observationGeneree ? (
              <div className="max-h-[360px] overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 text-sm dark:border-gray-700 dark:bg-gray-900">
                <pre className="whitespace-pre-wrap">{observationGeneree}</pre>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-amber-300 p-6 text-sm text-amber-700 dark:border-amber-700 dark:text-amber-300">
                Renseigne la cible + la note rapide puis clique “Générer avec IA”.
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

/* ===================== Anniversaires de la semaine ===================== */
function BirthdaysPanel({
  enfants = [],
}: {
  enfants?: { nom: string; classe?: string; anniversaire?: string; photo?: string }[];
}) {
  // Démo : si pas fourni par le parent, on crée une petite liste à partir de la page
  const sample =
    enfants.length > 0
      ? enfants
      : [
          { nom: "Emma Dubois", classe: "(3-4) ans", anniversaire: "2026-01-25" },
          { nom: "Lucas Martin", classe: "(6-7) ans", anniversaire: "2026-01-27" },
          { nom: "Fatima Zahra", classe: "12 ans", anniversaire: "2026-01-29" },
        ];

  // Garde uniquement ceux dont l’anniversaire tombe cette semaine
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay()); // dimanche (ou ajuste selon locale)
  const end = new Date(start);
  end.setDate(start.getDate() + 7);

  const inWeek = sample.filter((e) => {
    if (!e.anniversaire) return false;
    const d = new Date(e.anniversaire);
    return d >= start && d < end;
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-5 pt-5 pb-4">
        <h3 className="text-lg font-semibold">Anniversaires (cette semaine)</h3>
      </div>
      <div className="p-5">
        {inWeek.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Aucun anniversaire prévu cette semaine 🎈
          </p>
        ) : (
          <ul className="space-y-2">
            {inWeek.map((e, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {e.nom}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{e.classe}</p>
                </div>
                <span className="text-xs rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 px-2 py-1">
                  {new Date(e.anniversaire!).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


type ActiviteType = 'creatif' | 'sportif' | 'educatif' | 'musical' | 'nature' | 'social';

interface Enfant {
  id: number;
  nom: string;
  present: boolean;
  classe: string;
  heureArrivee?: string;
  raison?: string;
  photo?: string;
}

export default function HomeEducateur() {
  // --- DEMO photos
  const photosParClasse: Record<string, string[]> = {
    "(3-4) ans": [
      "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    ],
    "(4-5) ans": [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507591064344-4c6ce005-128b-97dc7697c36?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face",
    ],
    "(6-7) ans": [
      "https://images.unsplash.com/photo-1545696968-1a5245650b36?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    ],
    "(8-9) ans": [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    ],
    "(10-11) ans": [
      "https://images.unsplash.com/photo-1494790108755-2616c113a1c1?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    ],
    "12 ans": [
      "https://images.unsplash.com/photo-1546552352-2e8e2a723b4d?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    ],
  };

  const defaultEnfants: Enfant[] = [
    { id: 1, nom: "Emma Dubois", present: true, heureArrivee: "08:30", classe: "(3-4) ans", photo: photosParClasse["(3-4) ans"][0] },
    { id: 2, nom: "Lucas Martin", present: true, heureArrivee: "08:45", classe: "(6-7) ans", photo: photosParClasse["(6-7) ans"][0] },
    { id: 3, nom: "Fatima Zahra", present: true, heureArrivee: "09:00", classe: "12 ans", photo: photosParClasse["12 ans"][0] },
    { id: 4, nom: "Alain Voussez", present: false, raison: "Maladie", classe: "(8-9) ans", photo: photosParClasse["(8-9) ans"][0] },
    { id: 5, nom: "Chloé Petit", present: true, heureArrivee: "08:15", classe: "(3-4) ans", photo: photosParClasse["(3-4) ans"][1] },
    { id: 6, nom: "Mohamed Ali", present: false, raison: "Rdv médical", classe: "(6-7) ans", photo: photosParClasse["(6-7) ans"][1] },
    { id: 7, nom: "Léa Bernard", present: true, heureArrivee: "08:50", classe: "12 ans", photo: photosParClasse["12 ans"][1] },
    { id: 8, nom: "Thomas Leroy", present: true, heureArrivee: "09:05", classe: "(8-9) ans", photo: photosParClasse["(8-9) ans"][1] },
  ];


  // --- États
  const [showGestionPresence, setShowGestionPresence] = useState(false);
  const [enfants, setEnfants] = useState<Enfant[]>(defaultEnfants);
  const [showAjouterActivite, setShowAjouterActivite] = useState(false);
  const [showAjouterObservation, setShowAjouterObservation] = useState(false);

  // ---- Observation (état et listes) ----
const [nouvelleObservation, setNouvelleObservation] = useState({
  typeCible: "enfant", // "enfant" | "classe"
  cibleId: "",
  date: new Date().toISOString().split("T")[0],
  heure: "09:00",
  domaine: "",
  sentiment: "",
  descriptionRapide: "",
  contexte: "",
  intensite: "moyenne",
});

const domainesObservation = [
  { value: "social",    label: "Domaine social",    icon: "🤝" },
  { value: "cognitif",  label: "Domaine cognitif",  icon: "🧠" },
  { value: "moteur",    label: "Domaine moteur",    icon: "🏃"  },
];

const sentimentsOptions = [
  { value: "positif",  label: "Positif",  color: "bg-green-500" },
  { value: "neutre",   label: "Neutre",   color: "bg-gray-500"  },
  { value: "negatif",  label: "Négatif",  color: "bg-red-500"   },
];

const contextesRapides = [
  { value: "atelier", label: "Atelier" },
  { value: "recreation", label: "Récréation" },
  { value: "repas", label: "Repas" },
];

const intensitesOptions = [
  { value: "faible",  label: "Faible"  },
  { value: "moyenne", label: "Moyenne" },
  { value: "forte",   label: "Forte"   },
];

function sauvegarderObservation() {
  // branchement backend ici
  alert("Observation enregistrée !");
  setShowAjouterObservation(false);
}

  // --- Activité (simple demo)
  const [nouvelleActivite, setNouvelleActivite] = useState({
    titre: "",
    description: "",
    type: "creatif" as ActiviteType,
    duree: 60,
    date: new Date().toISOString().split("T")[0],
    heure: "09:00",
    classe: "(3-4) ans",
    enfantsMax: 12,
    materiel: [] as string[],
    objectifs: [] as string[],
  });

  // --- Observation IA (mini démo)
  const [observationGeneree, setObservationGeneree] = useState("");

  // --- Helpers
  const togglePresence = (id: number) => {
    setEnfants(prev =>
      prev.map(e =>
        e.id === id
          ? {
              ...e,
              present: !e.present,
              heureArrivee: !e.present
                ? new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
                : undefined,
              raison: e.present ? (e.raison || "Absence non spécifiée") : undefined,
            }
          : e
      )
    );
  };
  const nbTotal = enfants.length;
const nbPresents = enfants.filter(e => e.present).length;
const enfantsAbsents = nbTotal - nbPresents;
const presentPct = nbTotal ? Math.round((nbPresents / nbTotal) * 100) : 0;
  const sauvegarderPresences = () => {
    // plug backend ici
    setShowGestionPresence(false);
    alert("Présences sauvegardées !");
  };

  const ajouterActivite = () => {
    if (!nouvelleActivite.titre.trim()) return alert("Saisis un titre.");
    // plug backend ici
    setShowAjouterActivite(false);
    setNouvelleActivite({
      titre: "",
      description: "",
      type: "creatif",
      duree: 60,
      date: new Date().toISOString().split("T")[0],
      heure: "09:00",
      classe: "(3-4) ans",
      enfantsMax: 12,
      materiel: [],
      objectifs: [],
    });
    alert("Activité créée !");
  };

  const genererObservationIA = () => {
    // démo courte
    setObservationGeneree(
      "📝 OBSERVATION\n• Lucas a montré une participation active pendant l’atelier dirigé.\n• Intensité: moyenne.\n• Note: a encouragé ses camarades."
    );
  };

  return (
    <>
      <PageMeta
        title="Tableau de bord éducateur"
        description="Suivi des classes, activités, présences et observations."
      />

      {/* HERO */}
      <section className="relative mb-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="relative z-10 p-6">
          <h1 className="text-2xl font-bold tracking-tight">Bonjour 👋</h1>
          <p className="mt-1 text-white/90">
            Voici le récapitulatif de votre journée d’éducateur.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setShowGestionPresence(true)}
              className="rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/20 hover:bg-white/20"
              title="Gérer les présences"
            >
              Gérer les présences
            </button>
            <button
              onClick={() => setShowAjouterActivite(true)}
              className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-white/90"
              title="Créer une activité"
            >
              <span className="inline-block -mt-0.5 pr-1">＋</span> Nouvelle activité
            </button>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <div className="mb-6">
        <Metrics />
      </div>

      {/* GRILLE 8/4 */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <ClassesSummary />
          <WeeklySchedule />
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <RecentActivities onAjouterObservation={() => setShowAjouterObservation(true)} />
          {/* Actions rapides */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 pt-5 pb-4">
              <h3 className="text-lg font-semibold">Actions rapides</h3>
            </div>
            <div className="p-5 space-y-3">
              
         <button
             onClick={() => setShowGestionPresence(true)}
             className="w-full flex items-center justify-between p-3 rounded-lg 
             bg-gradient-to-r from-blue-500 to-blue-600 text-white 
             hover:from-blue-600 hover:to-blue-700"
          >
           <span className="font-medium">Gérer présence</span>

         <span className="bg-blue-500 p-1.5 rounded flex items-center justify-center dark:text-white-300 text-white-900">
          <svg
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 640 640"
             width="18"
             height="18"
             fill="currentColor">
             <path d="M439.4 96L448 96C483.3 96 512 124.7 512 160L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 160C128 124.7 156.7 96 192 96L200.6 96C211.6 76.9 232.3 64 256 64L384 64C407.7 64 428.4 76.9 439.4 96zM376 176C389.3 176 400 165.3 400 152C400 138.7 389.3 128 376 128L264 128C250.7 128 240 138.7 240 152C240 165.3 250.7 176 264 176L376 176zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM288 320C288 333.3 298.7 344 312 344L424 344C437.3 344 448 333.3 448 320C448 306.7 437.3 296 424 296L312 296C298.7 296 288 306.7 288 320zM288 448C288 461.3 298.7 472 312 472L424 472C437.3 472 448 461.3 448 448C448 434.7 437.3 424 424 424L312 424C298.7 424 288 434.7 288 448zM224 480C241.7 480 256 465.7 256 448C256 430.3 241.7 416 224 416C206.3 416 192 430.3 192 448C192 465.7 206.3 480 224 480z"/>
          </svg>
        </span>
         </button>
              <button
                onClick={() => setShowAjouterActivite(true)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">
                <span className="font-medium">Ajouter activité</span>


                <span className="bg-green-500 p-1.5 rounded flex items-center justify-center dark:text-white-300 text-white-900">
                <svg 
                 xmlns="http://www.w3.org/2000/svg" 
                 viewBox="0 0 640 640"
                 width="18"
                 height="18"
                 fill="currentColor">
                 <path d="M288 64C323.3 64 352 85.5 352 112C352 122.4 347.6 132 340 139.9C333.4 146.8 328 155.2 328 164.8C328 179.8 340.2 192 355.2 192L400 192C426.5 192 448 213.5 448 240L448 284.8C448 299.8 460.2 312 475.2 312C484.7 312 493.2 306.6 500.1 300C508 292.5 517.6 288 528 288C554.5 288 576 316.7 576 352C576 387.3 554.5 416 528 416C517.6 416 507.9 411.6 500.1 404C493.2 397.4 484.8 392 475.2 392C460.2 392 448 404.2 448 419.2L448 528C448 554.5 426.5 576 400 576L343.2 576C330.4 576 320 565.6 320 552.8C320 543.6 325.8 535.5 333.2 530C344.8 521.3 352 509.3 352 496C352 469.5 323.3 448 288 448C252.7 448 224 469.5 224 496C224 509.3 231.2 521.3 242.8 530C250.2 535.5 256 543.5 256 552.8C256 565.6 245.6 576 232.8 576L112 576C85.5 576 64 554.5 64 528L64 407.2C64 394.4 74.4 384 87.2 384C96.4 384 104.5 389.8 110 397.2C118.7 408.8 130.7 416 144 416C170.5 416 192 387.3 192 352C192 316.7 170.5 288 144 288C130.7 288 118.7 295.2 110 306.8C104.5 314.2 96.5 320 87.2 320C74.4 320 64 309.6 64 296.8L64 240C64 213.5 85.5 192 112 192L220.8 192C235.8 192 248 179.8 248 164.8C248 155.3 242.6 146.8 236 139.9C228.5 132 224 122.4 224 112C224 85.5 252.7 64 288 64z"/>
                </svg>
                </span>
              </button>
              <button
                onClick={() => setShowAjouterObservation(true)}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
              >
                <span className="font-medium">Ajouter observation</span>
                <span className="bg-purple-500 p-1.5 rounded flex items-center justify-center dark:text-white-300 text-white-900">
                 <svg xmlns="http://www.w3.org/2000/svg" 
                 viewBox="0 0 640 640"
                 width="18"
                 height="18"
                 fill="currentColor"
                 >
                 <path d="M320 544C461.4 544 576 436.5 576 304C576 171.5 461.4 64 320 64C178.6 64 64 171.5 64 304C64 358.3 83.2 408.3 115.6 448.5L66.8 540.8C62 549.8 63.5 560.8 70.4 568.3C77.3 575.8 88.2 578.1 97.5 574.1L215.9 523.4C247.7 536.6 282.9 544 320 544zM192 272C209.7 272 224 286.3 224 304C224 321.7 209.7 336 192 336C174.3 336 160 321.7 160 304C160 286.3 174.3 272 192 272zM320 272C337.7 272 352 286.3 352 304C352 321.7 337.7 336 320 336C302.3 336 288 321.7 288 304C288 286.3 302.3 272 320 272zM416 304C416 286.3 430.3 272 448 272C465.7 272 480 286.3 480 304C480 321.7 465.7 336 448 336C430.3 336 416 321.7 416 304z"/>
                 </svg>


                </span>
              </button>
            </div>
          </div>
        </div>

        {/* LIGNE SUIVANTE */}
        <div className="col-span-12 lg:col-span-8">
          <ChildrenToday enfants={enfants} />
        </div>
      <div className="col-span-12 lg:col-span-4 space-y-6">
<div className="col-span-12 lg:col-span-4 space-y-6">
  {/* Aujourd’hui */}
  <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
    <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-5 pt-5 pb-4">
      <h3 className="text-lg font-semibold">Aujourd’hui</h3>
    </div>
    <div className="p-5 space-y-3">
      <StatRow label="Heures d’activités" value="4h 30m" tone="gray" />
      <StatRow label="Enfants présents" value={`${presentPct}%`} tone="green" />
      <StatRow label="Tâches terminées" value="12/15" tone="blue" />
      <StatRow label="Observations" value="8" tone="purple" />
      <StatRow label="Absents" value={`${enfantsAbsents}`} tone="amber" />
    </div>
  </div>

  <BirthdaysPanel />
</div>



</div>

      </div>

  {/* Modal – Gestion des présences (remplace ton bloc actuel) */}
<PresenceModal
  open={showGestionPresence}
  onClose={() => setShowGestionPresence(false)}
  enfants={enfants}
  onTogglePresence={(id) => togglePresence(id)}
  onSave={() => sauvegarderPresences()}
/>

{/* Modal – Ajouter une activité (remplace ton bloc actuel) */}
<ActiviteModal
  open={showAjouterActivite}
  onClose={() => setShowAjouterActivite(false)}
  nouvelleActivite={nouvelleActivite}
  setNouvelleActivite={setNouvelleActivite}
  onCreate={() => ajouterActivite()}
/>

{/* Modal – Observation IA (remplace ton bloc actuel) */}
<ObservationModal
  open={showAjouterObservation}
  onClose={() => setShowAjouterObservation(false)}
  enfants={enfants}
  classes={["(3-4) ans","(4-5) ans","(6-7) ans","(8-9) ans","(10-11) ans","12 ans"]}
  domainesObservation={domainesObservation}
  sentimentsOptions={sentimentsOptions}
  contextesRapides={contextesRapides}
  intensitesOptions={intensitesOptions}
  nouvelleObservation={nouvelleObservation}
  setNouvelleObservation={setNouvelleObservation}
  observationGeneree={observationGeneree}
  onGenerate={() => genererObservationIA()}
  onSave={() => sauvegarderObservation()}
/>

    </>
  );
}

/* ---------- petits sous-composants locaux ---------- */
function StatRow({ label, value, tone }:{label:string; value:string; tone:"gray"|"green"|"blue"|"purple"|"amber"}) {
  const tones: Record<string,string> = {
    gray: "from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300",
    green:"from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300",
    blue: "from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300",
    purple:"from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-700 dark:text-purple-300",
    amber:"from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 text-amber-700 dark:text-amber-300",
  };
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg bg-gradient-to-r ${tones[tone]}`}>
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
function MiniKpi({ icon, value, label, tone }:{icon:React.ReactNode; value:string; label:string; tone:"green"|"red"}) {
  const bg = tone==="green" ? "bg-green-50 dark:bg-green-900/30" : "bg-red-50 dark:bg-red-900/30";
  const text = tone==="green" ? "text-green-600 dark:text-green-300" : "text-red-600 dark:text-red-300";
  return (
    <div className={`p-4 rounded-lg flex items-center ${bg}`}>
      <div className="mr-3">{icon}</div>
      <div>
        <div className={`text-xl font-bold ${text}`}>{value}</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );
}
/* -------------------------- Modal Shell réutilisable -------------------------- */
function ModalShell({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = "max-w-3xl",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string; // ex: max-w-2xl / max-w-4xl
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100000]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-10 mb-10 w-full px-4">
        <div className={`mx-auto ${width} overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900`}>
          {/* Header sticky */}
          <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 px-6 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body scrollable */}
          <div className="max-h-[70vh] overflow-y-auto px-6 py-4">{children}</div>

          {/* Footer sticky */}
          {footer && (
            <div className="sticky bottom-0 z-10 border-t border-gray-200 bg-white/90 px-6 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/90">
              <div className="flex items-center justify-end gap-3">{footer}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------- Modal Présences amélioré -------------------------- */
function PresenceModal({
  open,
  onClose,
  enfants,
  onTogglePresence,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  enfants: { id: number; nom: string; present: boolean; classe?: string; heureArrivee?: string; raison?: string }[];
  onTogglePresence: (id: number) => void;
  onSave: () => void;
}) {
  const [q, setQ] = React.useState("");
  const [tab, setTab] = React.useState<"all" | "present" | "absent">("all");
  const classes = React.useMemo(
    () => Array.from(new Set(enfants.map((e) => e.classe || "Inconnu"))),
    [enfants]
  );
  const [classe, setClasse] = React.useState<string>("Toutes");

  const filtered = enfants.filter((e) => {
    if (tab === "present" && !e.present) return false;
    if (tab === "absent" && e.present) return false;
    if (classe !== "Toutes" && e.classe !== classe) return false;
    if (q.trim()) {
      const blob = (e.nom + " " + (e.classe || "")).toLowerCase();
      if (!blob.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  const countPresent = enfants.filter((e) => e.present).length;
  const countAbsent = enfants.length - countPresent;

  const setAll = (value: boolean) => {
    // Applique sur la liste filtrée seulement (UX rapide)
    filtered.forEach((e) => {
      if (e.present !== value) onTogglePresence(e.id);
    });
  };

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Gérer les présences"
      subtitle={new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
      width="max-w-4xl"
      footer={
        <>
          <button
            onClick={onSave}
            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Sauvegarder les présences
          </button>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Annuler
          </button>
        </>
      }
    >
      {/* Toolbar filtre */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Recherche */}
        <div className="relative flex-1 min-w-[200px] h-10">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher…"
            className="w-full h-full rounded-lg border border-gray-300 px-3 pl-9 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          />
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">🔎</span>
        </div>

        {/* Filtres boutons */}

      <div className="flex gap-3 h-10 "> 
          {(["all", "present", "absent"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 min-w-[90px] h-full rounded-lg px-3 text-sm font-medium transition-all ${
                tab === t
                  ? "bg-indigo-600 text-white shadow-md ring-2 ring-indigo-300 dark:ring-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {t === "all" ? "Tous" : t === "present" ? "Présents" : "Absents"}
            </button>
          ))}
        </div>

        {/* Dropdown animée */}
        <div className="relative group hover:scale-105 focus-within:animate-pulse transition-transform duration-300 ease-out h-10 text-gray-600 dark:text-gray-300">          <select
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            className="w-full rounded-lg   border border-gray-300 px-3 py-2 pr-10 shadow-sm appearance-none transition-all duration-200  hover:border-gray-400 hover:bg-gray-50  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:bg-gradient-to-r dark:from-blue-900/50 dark:to-purple-900/50 dark:focus:ring-blue-400 dark:focus:shadow-blue-500/50" >
            <option>Toutes</option>
            {classes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
    <svg
      className=" w-4 h-4 text-gray-400 dark:text-gray-500  transition-all duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110 group-focus-within:rotate-180 group-focus-within:animate-bounce"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Quick KPI + actions groupées */}
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Kpi color="green" label="Présents" value={countPresent.toString()} />
        <Kpi color="rose" label="Absents" value={countAbsent.toString()} />
        <button
          onClick={() => setAll(true)}
          className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Tout marquer présent (filtre)
        </button>
        <button
          onClick={() => setAll(false)}
          className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700"
        >
          Tout marquer absent (filtre)
        </button>
      </div>

      {/* Liste */}
      {/*<ul className="space-y-2">
        {filtered.map((enfant) => (
          <li
            key={enfant.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <div
                className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${
                  enfant.present
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                }`}
              >
                {enfant.nom.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{enfant.nom}</div>
                <div className="text-xs text-gray-500">{enfant.classe}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {enfant.present && enfant.heureArrivee && (
                <span className="text-xs text-green-600 dark:text-green-400">Arrivé·e à {enfant.heureArrivee}</span>
              )}
              {!enfant.present && enfant.raison && (
                <span className="text-xs text-rose-600 dark:text-rose-400">{enfant.raison}</span>
              )}
              <button
                onClick={() => onTogglePresence(enfant.id)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  enfant.present
                    ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-300"
                    : "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300"
                }`}
              >
                {enfant.present ? "Marquer absent" : "Marquer présent"}
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700">
            Aucun résultat
          </li>
        )}
      </ul>
 */}
        { /*************************************************  Liste v2   ************************/}
 <ul className="space-y-2">
        {filtered.map((enfant) => (
          <li
            key={enfant.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <div className="flex items-center gap-3">
              <div
                className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${
                  enfant.present
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                }`}
              >
                {enfant.nom.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{enfant.nom}</div>
                <div className="text-xs text-gray-500">{enfant.classe}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {enfant.present && enfant.heureArrivee && (
                <span className="text-xs text-green-600 dark:text-green-400">Arrivé·e à {enfant.heureArrivee}</span>
              )}
              {!enfant.present && enfant.raison && (
                <span className="text-xs text-rose-600 dark:text-rose-400">{enfant.raison}</span>
              )}

              <button
                onClick={() => onTogglePresence(enfant.id)}
                className={`h-10 w-10 rounded-full font-bold text-white text-sm flex items-center justify-center transition-all ${
                  enfant.present
                    ? "bg-green-500 hover:bg-green-600 ring-2 ring-green-200"
                    : "bg-red-500 hover:bg-red-600 ring-2 ring-red-200"
                }`}
                title={enfant.present ? "Cliquer pour marquer absent" : "Cliquer pour marquer présent"}
              >
                {enfant.present ? "P" : "A"}
              </button>
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700">
            Aucun résultat
          </li>
        )}
      </ul>




    </ModalShell>
  );
}

function Kpi({ color, label, value }:{ color:"green"|"rose"|"sky"|"amber"; label:string; value:string }) {
  const map = {
    green: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    rose: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    sky: "bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  } as const;
  return (
    <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${map[color]}`}>
      <span className="text-sm">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
}

