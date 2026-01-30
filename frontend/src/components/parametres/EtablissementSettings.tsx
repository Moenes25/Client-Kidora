import { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  User2,
  Users,
  Clock,
  Pencil,
  Link2,
} from "lucide-react";

export default function EtablissementSettings() {
  const { isOpen, openModal, closeModal } = useModal();
  const [settings, setSettings] = useState({
    nomEtablissement: "KI DORA - Crèche & École Maternelle",
    typeEtablissement: "Crèche & École Maternelle",
    adresse: "123 Rue de l'Éducation, Sfax, Tunisie",
    telephone: "+216 74 123 456",
    email: "contact@kidora.tn",
    directeur: "Mohamed Beissagh",
    capaciteMaximale: 100,
    nombreClasses: 8,
    heureOuverture: "07:00",
    heureFermeture: "18:00",
    facebook: "https://www.facebook.com/KIDORATunisie",
    instagram: "https://instagram.com/KIDORA",
  });

  const onChange = (key: string, val: string | number) =>
    setSettings((s) => ({ ...s, [key]: val }));

  const handleSave = () => {
    console.log("Sauvegarde des paramètres:", settings);
    closeModal();
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Paramètres généraux</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Gérez les informations de votre établissement
            </p>
          </div>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-blue-700"
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </button>
        </div>

        {/* Infos principales */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoRow
            icon={<Building2 className="h-4 w-4" />}
            label="Nom de l’établissement"
            value={settings.nomEtablissement}
          />
          <InfoRow
            icon={<Users className="h-4 w-4" />}
            label="Type d’établissement"
            value={settings.typeEtablissement}
          />
          <InfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="Adresse"
            value={settings.adresse}
          />
          <InfoRow
            icon={<User2 className="h-4 w-4" />}
            label="Directeur"
            value={settings.directeur}
          />
          <InfoRow
            icon={<Phone className="h-4 w-4" />}
            label="Téléphone"
            value={settings.telephone}
          />
          <InfoRow
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={settings.email}
          />
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatChip title="Capacité maximale" value={`${settings.capaciteMaximale}`} hint="Enfants max" />
          <StatChip title="Nombre de classes" value={`${settings.nombreClasses}`} hint="Total" />
          <StatChip title="Horaires" value={`${settings.heureOuverture} - ${settings.heureFermeture}`} hint="Ouverture" icon={<Clock className="h-4 w-4" />} />
        </div>

        {/* Réseaux sociaux */}
        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-white/10">
          <h3 className="mb-3 text-sm font-medium text-gray-800 dark:text-gray-200">Réseaux sociaux</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href={settings.facebook}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300"
            >
              <Link2 className="h-4 w-4" />
              Facebook
            </a>
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-pink-200 bg-pink-50 px-3 py-2 text-sm font-medium text-pink-700 hover:bg-pink-100 dark:border-pink-900/40 dark:bg-pink-900/20 dark:text-pink-300"
            >
              <Link2 className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Modal d’édition */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-3xl p-0">
        {/* Header modal */}
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-semibold">Modifier les paramètres de l’établissement</h4>
              <p className="text-xs/relaxed text-white/80">Mettez à jour les informations principales</p>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Body */}
        <div className="grid gap-6 px-6 py-6 md:grid-cols-3 overflow-y-auto max-h-[70vh]">
          {/* Form */}
          <div className="md:col-span-2 space-y-5">
            <Field
              label="Nom de l’établissement"
              value={settings.nomEtablissement}
              onChange={(v) => onChange("nomEtablissement", v)}
            />
            <Field
              label="Type d’établissement"
              value={settings.typeEtablissement}
              onChange={(v) => onChange("typeEtablissement", v)}
            />
            <Field
              label="Adresse complète"
              value={settings.adresse}
              onChange={(v) => onChange("adresse", v)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Directeur" value={settings.directeur} onChange={(v) => onChange("directeur", v)} />
              <Field label="Téléphone" value={settings.telephone} onChange={(v) => onChange("telephone", v)} />
            </div>
            <Field label="Email" value={settings.email} onChange={(v) => onChange("email", v)} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Capacité maximale"
                type="number"
                value={String(settings.capaciteMaximale)}
                onChange={(v) => onChange("capaciteMaximale", Number(v))}
              />
              <Field
                label="Nombre de classes"
                type="number"
                value={String(settings.nombreClasses)}
                onChange={(v) => onChange("nombreClasses", Number(v))}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Heure d’ouverture" type="time" value={settings.heureOuverture} onChange={(v) => onChange("heureOuverture", v)} />
              <Field label="Heure de fermeture" type="time" value={settings.heureFermeture} onChange={(v) => onChange("heureFermeture", v)} />
            </div>
            <Field label="Lien Facebook" type="url" value={settings.facebook} onChange={(v) => onChange("facebook", v)} />
            <Field label="Lien Instagram" type="url" value={settings.instagram} onChange={(v) => onChange("instagram", v)} />
          </div>

          {/* Aperçu live */}
          <div className="md:col-span-1">
            <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
              <div className="mb-3 text-sm font-semibold text-gray-800 dark:text-gray-200">Aperçu</div>
              <div className="rounded-xl border border-gray-200 p-4 dark:border-white/10">
                <div className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Établissement</div>
                <div className="text-base font-semibold text-gray-900 dark:text-white">{settings.nomEtablissement}</div>
                <div className="text-xs text-gray-500">{settings.typeEtablissement}</div>
                <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <MapPin className="h-3.5 w-3.5" /> {settings.adresse}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Clock className="h-3.5 w-3.5" /> {settings.heureOuverture} - {settings.heureFermeture}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-indigo-50 px-2 py-1 text-center text-[11px] font-medium text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
                    Capacité: {settings.capaciteMaximale}
                  </div>
                  <div className="rounded-lg bg-emerald-50 px-2 py-1 text-center text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                    Classes: {settings.nombreClasses}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <a href={settings.facebook} target="_blank" rel="noreferrer" className="flex-1 rounded-lg border border-blue-200 bg-blue-50 px-2 py-1 text-center text-xs font-medium text-blue-700 hover:bg-blue-100 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300">
                  Facebook
                </a>
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="flex-1 rounded-lg border border-pink-200 bg-pink-50 px-2 py-1 text-center text-xs font-medium text-pink-700 hover:bg-pink-100 dark:border-pink-900/40 dark:bg-pink-900/20 dark:text-pink-300">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-gray-200 px-6 py-4 dark:border-white/10">
          <button
            onClick={closeModal}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-emerald-600 hover:to-green-700"
          >
            Sauvegarder les modifications
          </button>
        </div>
      </Modal>
    </>
  );
}

/* Petits sous-composants */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/60 p-4 dark:border-white/10 dark:bg-gray-900/50">
      <div className="mb-1 flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {icon}
        </span>
        {label}
      </div>
      <div className="text-sm font-semibold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}

function StatChip({
  title,
  value,
  hint,
  icon,
}: {
  title: string;
  value: string;
  hint?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white/60 p-4 dark:border-white/10 dark:bg-gray-900/50">
      <div className="mb-2 flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-100 text-indigo-600 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:ring-white/10">
          {icon ?? <Users className="h-4 w-4" />}
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400">{title}</div>
      </div>
      <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
      {hint && <div className="text-xs text-gray-500 dark:text-gray-400">{hint}</div>}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-gray-900 dark:text-white"
      />
    </label>
  );
}
