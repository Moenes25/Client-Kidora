// src/components/classes/AddClassModal.tsx
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface AddClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (formData: ClassFormData) => void;
}
interface ClassFormData {
  className: string;
  ageRange: string;
  capacity: number;
  educator: string;
  room: string;
  color: "blue" | "green" | "purple" | "orange" | "pink" | "indigo";
  description?: string;
}

const COLOR_CHIPS: {value: ClassFormData["color"]; bg:string; ring:string}[] = [
  { value: "blue",   bg: "bg-blue-500",   ring: "ring-blue-300" },
  { value: "green",  bg: "bg-emerald-500",ring: "ring-emerald-300" },
  { value: "purple", bg: "bg-violet-500", ring: "ring-violet-300" },
  { value: "orange", bg: "bg-amber-500",  ring: "ring-amber-300" },
  { value: "pink",   bg: "bg-pink-500",   ring: "ring-pink-300" },
  { value: "indigo", bg: "bg-indigo-500", ring: "ring-indigo-300" },
];

const AGE_OPTS = [
  { value: "2-3", label: "2-3 ans (Petits)" },
  { value: "3-4", label: "3-4 ans (Moyens)" },
  { value: "4-5", label: "4-5 ans (Grands)" },
  { value: "5-6", label: "5-6 ans (Pré-scolaire)" },
  { value: "6-7", label: "6-7 ans (CP)" },
  { value: "7-8", label: "7-8 ans (CE1)" },
];

export default function AddClassModal({ isOpen, onClose, onSave }: AddClassModalProps) {
  const [formData, setFormData] = useState<ClassFormData>({
    className: "",
    ageRange: "2-3",
    capacity: 20,
    educator: "",
    room: "",
    color: "blue",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "capacity" ? parseInt(value) || 0 : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.className.trim()) e.className = "Le nom de la classe est requis";
    if (!formData.educator.trim()) e.educator = "Le nom de l'éducateur est requis";
    if (formData.capacity < 1) e.capacity = "Capacité > 0";
    if (formData.capacity > 50) e.capacity = "Capacité max: 50";
    return e;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);
    onSave?.(formData);
    setFormData({ className: "", ageRange: "2-3", capacity: 20, educator: "", room: "", color: "blue", description: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100000]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-[100001] grid min-h-full place-items-center p-4">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-gray-900/80">
          {/* header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-white/10">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-600 text-white shadow">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Nouvelle Classe</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">Ajoutez un groupe avec sa capacité et sa couleur</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={submit}>
            <div className="max-h-[65vh] space-y-6 overflow-y-auto px-6 py-5">
              {/* ligne 1 */}
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                  <span className="text-2xl">🏫</span>
                </div>
                <div className="flex-1">
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Nom de la classe *</label>
                  <input
                    name="className"
                    value={formData.className}
                    onChange={onChange}
                    placeholder="Ex: Petits, Moyens, Grands"
                    className={[
                      "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                      errors.className
                        ? "border-rose-400 ring-rose-200"
                        : "border-gray-300 focus:ring-indigo-300 dark:border-white/10",
                      "dark:bg-gray-800 dark:text-white",
                    ].join(" ")}
                  />
                  {errors.className && <p className="mt-1 text-xs text-rose-500">{errors.className}</p>}
                </div>
              </div>

              {/* description */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Description (optionnelle)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 dark:border-white/10 dark:bg-gray-800 dark:text-white"
                  placeholder="Brève description de la classe…"
                />
              </div>

              {/* age / couleur */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Tranche d'âge *</label>
                  <select
                    name="ageRange"
                    value={formData.ageRange}
                    onChange={onChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 dark:border-white/10 dark:bg-gray-800 dark:text-white"
                  >
                    {AGE_OPTS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Couleur de la classe *</label>
                  <div className="grid grid-cols-6 gap-2">
                    {COLOR_CHIPS.map((c) => {
                      const active = formData.color === c.value;
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, color: c.value }))}
                          className={[
                            "h-9 rounded-lg ring-2 ring-transparent transition-shadow",
                            c.bg,
                            active ? c.ring : "ring-transparent hover:ring-white/40",
                          ].join(" ")}
                          title={c.value}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* capacité / éducateur */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Capacité maximale *</label>
                  <input
                    type="range"
                    name="capacity"
                    min={5}
                    max={50}
                    step={5}
                    value={formData.capacity}
                    onChange={onChange}
                    className="w-full"
                  />
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">5</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{formData.capacity} enfants</span>
                    <span className="text-gray-500 dark:text-gray-400">50</span>
                  </div>
                  {errors.capacity && <p className="mt-1 text-xs text-rose-500">{errors.capacity}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Éducateur principal *</label>
                  <input
                    name="educator"
                    value={formData.educator}
                    onChange={onChange}
                    placeholder="Nom de l'éducateur"
                    className={[
                      "w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2",
                      errors.educator
                        ? "border-rose-400 ring-rose-200"
                        : "border-gray-300 focus:ring-indigo-300 dark:border-white/10",
                      "dark:bg-gray-800 dark:text-white",
                    ].join(" ")}
                  />
                  {errors.educator && <p className="mt-1 text-xs text-rose-500">{errors.educator}</p>}
                </div>
              </div>

              {/* salle */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Salle / Local (optionnel)</label>
                <input
                  name="room"
                  value={formData.room}
                  onChange={onChange}
                  placeholder="Ex: Salle 1, Bâtiment A"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 dark:border-white/10 dark:bg-gray-800 dark:text-white"
                />
              </div>

              {/* aperçu */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-gray-800/50">
                <h4 className="mb-3 font-medium text-gray-900 dark:text-white">Aperçu</h4>
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-white shadow-sm dark:bg-gray-900">
                    <span className="text-xl">👶</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formData.className || "Nom de la classe"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {AGE_OPTS.find((a) => a.value === formData.ageRange)?.label} • {formData.capacity} places
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* actions */}
            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4 dark:border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Créer la classe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
