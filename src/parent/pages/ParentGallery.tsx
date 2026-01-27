// pages/Parent/ParentGallery.tsx
import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

type MediaType = "photo" | "video";
type AlbumItem = {
  id: number;
  child: string;         // "Ahmed", "Sara", etc.
  type: MediaType;
  src: string;           // url image/vidéo
  takenAt: string;       // ISO date
  title?: string;
  tags?: string[];
};

// --- Démo : remplace par tes vraies données (API) ---
const childrenList = ["Ahmed", "Sara", "Mohamed", "Nour"];
const sampleAlbum: AlbumItem[] = [
  { id: 1, child: "Ahmed",   type: "photo", src: "/images/3-4_ans/enfant_1.jpg", takenAt: "2026-01-21T10:12:00Z", title: "Peinture libre", tags:["créativité","couleurs"] },
  { id: 2, child: "Sara",    type: "photo", src: "/images/3-4_ans/enfant_3.jpg", takenAt: "2026-01-21T11:30:00Z", title: "Lecture", tags:["concentration"] },
  { id: 3, child: "Mohamed", type: "photo", src: "/images/3-4_ans/enfant_6.jpg", takenAt: "2026-01-21T14:00:00Z", title: "Maths", tags:["logique"] },
  { id: 4, child: "Nour",    type: "photo", src: "/images/3-4_ans/enfant_4.jpg", takenAt: "2026-01-21T15:30:00Z", title: "Chant", tags:["rythme"] },
  // exemples vidéo (si tu as des mp4/webm)
  // { id: 5, child: "Ahmed", type: "video", src: "/medias/atelier_peinture.mp4", takenAt: "2026-01-21T10:25:00Z", title:"Mix des couleurs" },
];

export default function ParentGallery() {
  const params = useParams<{ child?: string }>();
  const [sp, setSp] = useSearchParams();

  // état ← initialisé depuis l’URL si présent
  const [child, setChild] = useState<string>(params.child || sp.get("child") || "__ALL__");
  const [mtype, setMtype]   = useState<"all" | MediaType>((sp.get("type") as any) || "all");
  const [q, setQ]           = useState(sp.get("q") || "");

  // met à jour l’URL (shareable)
  const pushSearch = (next: { child?: string; type?: string; q?: string }) => {
    const curr = new URLSearchParams(sp);
    if (next.child !== undefined) (next.child === "__ALL__" ? curr.delete("child") : curr.set("child", next.child));
    if (next.type  !== undefined) (next.type === "all" ? curr.delete("type") : curr.set("type", next.type));
    if (next.q     !== undefined) (next.q.trim() ? curr.set("q", next.q) : curr.delete("q"));
    setSp(curr, { replace: false });
  };

  const items = useMemo(() => {
    return sampleAlbum
      .filter(i => (child === "__ALL__" ? true : i.child === child))
      .filter(i => (mtype === "all" ? true : i.type === mtype))
      .filter(i => (q.trim() ? (i.title?.toLowerCase().includes(q.toLowerCase()) || i.tags?.some(t => t.toLowerCase().includes(q.toLowerCase()))) : true))
      .sort((a, b) => +new Date(b.takenAt) - +new Date(a.takenAt)); // récents d'abord
  }, [child, mtype, q]);

  // lightbox simple
  const [lb, setLb] = useState<{open:boolean; item?: AlbumItem}>({open:false});

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Album complet</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Souvenirs de la journée et des semaines récentes.</p>
        </div>
        <Link to="/parent" className="text-sm font-semibold text-indigo-600 hover:opacity-90 dark:text-indigo-300">
          ← Retour au tableau de bord
        </Link>
      </header>

      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-200 p-3 dark:border-white/10">
        <select
          value={child}
          onChange={(e) => { setChild(e.target.value); pushSearch({ child: e.target.value }); }}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs dark:border-white/15 dark:bg-white/5 dark:text-white"
        >
          <option value="__ALL__">Tous les enfants</option>
          {childrenList.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="flex items-center rounded-full bg-gray-100 p-1 text-xs dark:bg-white/10">
          {(["all","photo","video"] as const).map(k => (
            <button
              key={k}
              onClick={() => { setMtype(k); pushSearch({ type: k }); }}
              className={`px-3 py-1.5 rounded-full transition ${
                mtype === k ? "bg-white text-gray-900 shadow-sm dark:bg-white/90 dark:text-gray-900"
                            : "text-gray-600 dark:text-white/80"}`}
            >
              {k === "all" ? "Tous" : k === "photo" ? "Photos" : "Vidéos"}
            </button>
          ))}
        </div>

        <label className="relative ml-auto">
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); pushSearch({ q: e.target.value }); }}
            placeholder="Rechercher (titre, tag)…"
            className="w-56 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs outline-none
                       dark:border-white/15 dark:bg-white/5 dark:text-white"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">⌘K</span>
        </label>
      </div>

      {/* Grille créative (masonry-like simple) */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {items.map((it, idx) => {
          const tall = (idx % 7 === 0) || (idx % 7 === 3); // quelques cartes plus hautes pour un rendu dynamique
          return (
            <button
              key={it.id}
              onClick={() => setLb({open:true, item: it})}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03]
                         ${tall ? "aspect-[3/4]" : "aspect-square"}`}
            >
              {it.type === "photo" ? (
                <img src={it.src} alt={it.title || it.child} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
              ) : (
                <video src={it.src} className="h-full w-full object-cover" muted playsInline />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white opacity-0 transition-opacity group-hover:opacity-100">
                <div>
                  <div className="text-sm font-semibold">{it.child}</div>
                  {it.title && <div className="text-xs text-white/80">{it.title}</div>}
                </div>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold backdrop-blur">
                  {new Date(it.takenAt).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"})}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-sm text-gray-600 dark:text-gray-300">{items.length} élément(s)</div>
        <div className="flex gap-2">
          <button className="rounded-xl border px-3 py-2 text-sm dark:border-white/10 dark:text-white/80"
            onClick={() => alert("Fonction prochaine: téléchargement zip 🤗")}>
            ⬇️ Télécharger tout
          </button>
          <button className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-3 py-2 text-sm font-semibold text-white hover:opacity-95"
            onClick={() => alert("Fonction prochaine: partage d’album 📤")}>
            Partager l’album
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lb.open && lb.item && (
        <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/70 p-4" onClick={() => setLb({open:false})}>
          <figure className="max-w-5xl w-full">
            {lb.item.type === "photo" ? (
              <img src={lb.item.src} alt={lb.item.title} className="w-full rounded-2xl shadow-2xl" />
            ) : (
              <video src={lb.item.src} controls className="w-full rounded-2xl shadow-2xl" />
            )}
            <figcaption className="mt-3 text-center text-white/90">
              <span className="font-semibold">{lb.item.child}</span>
              {lb.item.title ? ` • ${lb.item.title}` : ""} — {new Date(lb.item.takenAt).toLocaleString()}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
