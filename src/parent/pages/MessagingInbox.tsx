// src/parent/pages/MessagingInbox.tsx
import { useMemo, useState, useEffect, useRef } from "react";
import {
  Send,
  Star,
  StarOff,
  Archive,
  Paperclip,
  Search as SearchIcon,
  MoreVertical,
  ChevronLeft,
  Smile,
  Paperclip as Clip,
  Trash2,
  MailOpen,
  Mail as MailClosed,
  Plus,
  Inbox,
  Bookmark,
  FolderArchive,
  MessagesSquare,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ----------------------------- Types ----------------------------- */
type SenderRole = "educatrice" | "direction" | "systeme";
type Message = {
  id: string;
  threadId: string;
  from: string;
  role: SenderRole;
  subject: string;
  snippet: string;
  sentAt: string; // ISO
  attachments?: { name: string; size: string }[];
};
type Thread = {
  id: string;
  participants: string[]; // ex: ["Mme Amina", "Parent (vous)"]
  unread: boolean;
  starred: boolean;
  archived: boolean;
  last: Message;
  messages: Message[];
};
type Contact = { id: string; name: string; role: SenderRole };

/* ----------------------------- Demo data ----------------------------- */
const CONTACTS: Contact[] = [
  { id: "amina", name: "Mme Amina", role: "educatrice" },
  { id: "karim", name: "M. Karim", role: "educatrice" },
  { id: "direction", name: "Direction Kidora", role: "direction" },
];

const DEMO_THREADS: Thread[] = [
  {
    id: "t1",
    participants: ["Mme Amina", "Parent (vous)"],
    unread: true,
    starred: true,
    archived: false,
    last: {
      id: "m4",
      threadId: "t1",
      from: "Mme Amina",
      role: "educatrice",
      subject: "Compte rendu d’aujourd’hui (Sara & Nour)",
      snippet:
        "Très bonne participation de Sara en lecture guidée. Nour a adoré l’atelier peinture 🎨",
      sentAt: "2026-01-22T16:12:00Z",
      attachments: [{ name: "atelier-photos.zip", size: "4.2 MB" }],
    },
    messages: [
      {
        id: "m1",
        threadId: "t1",
        from: "Parent (vous)",
        role: "systeme",
        subject: "Re: Compte rendu d’aujourd’hui (Sara & Nour)",
        snippet: "Merci pour le suivi ! On regardera les photos ce soir 😊",
        sentAt: "2026-01-22T16:02:00Z",
      },
      {
        id: "m2",
        threadId: "t1",
        from: "Mme Amina",
        role: "educatrice",
        subject: "Compte rendu d’aujourd’hui (Sara & Nour)",
        snippet:
          "Très bonne participation de Sara en lecture guidée. Nour a adoré l’atelier peinture 🎨",
        sentAt: "2026-01-22T16:12:00Z",
        attachments: [{ name: "atelier-photos.zip", size: "4.2 MB" }],
      },
      {
        id: "m3",
        threadId: "t1",
        from: "Parent (vous)",
        role: "systeme",
        subject: "Petite question cantine",
        snippet: "Sara a-t-elle bien mangé à midi ?",
        sentAt: "2026-01-22T14:20:00Z",
      },
      {
        id: "m4",
        threadId: "t1",
        from: "Mme Amina",
        role: "educatrice",
        subject: "Re: Petite question cantine",
        snippet: "Oui, tout s’est bien passé 👍",
        sentAt: "2026-01-22T14:35:00Z",
      },
    ],
  },
  {
    id: "t2",
    participants: ["Direction Kidora", "Parent (vous)"],
    unread: false,
    starred: false,
    archived: false,
    last: {
      id: "m5",
      threadId: "t2",
      from: "Direction",
      role: "direction",
      subject: "Rappel: réunion parents d’élèves",
      snippet: "Vendredi 17h30, salle polyvalente. Bienvenue !",
      sentAt: "2026-01-20T08:10:00Z",
    },
    messages: [
      {
        id: "m5",
        threadId: "t2",
        from: "Direction",
        role: "direction",
        subject: "Rappel: réunion parents d’élèves",
        snippet: "Vendredi 17h30, salle polyvalente. Bienvenue !",
        sentAt: "2026-01-20T08:10:00Z",
      },
    ],
  },
  {
    id: "t3",
    participants: ["M. Karim", "Parent (vous)"],
    unread: false,
    starred: false,
    archived: true,
    last: {
      id: "m6",
      threadId: "t3",
      from: "M. Karim",
      role: "educatrice",
      subject: "Planning sport – trimestre 2",
      snippet: "PDF joint avec les séances et le matériel requis.",
      sentAt: "2025-12-19T10:00:00Z",
      attachments: [{ name: "planning-sport.pdf", size: "231 KB" }],
    },
    messages: [
      {
        id: "m6",
        threadId: "t3",
        from: "M. Karim",
        role: "educatrice",
        subject: "Planning sport – trimestre 2",
        snippet: "PDF joint avec les séances et le matériel requis.",
        sentAt: "2025-12-19T10:00:00Z",
        attachments: [{ name: "planning-sport.pdf", size: "231 KB" }],
      },
    ],
  },
];

/* ----------------------------- Utils ----------------------------- */
const you = "Parent (vous)";
const otherOf = (t: Thread) => t.participants.find((p) => p !== you) || "";

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
}

/* ----------------------------- Simple dropdown ----------------------------- */
function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  return { open, setOpen, ref };
}

/* ------------------------------ Page ------------------------------ */
export default function ParentMessagingInbox() {
  const [threads, setThreads] = useState<Thread[]>(DEMO_THREADS);
  const [activeId, setActiveId] = useState<string>(DEMO_THREADS[0]?.id || "");
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<"inbox" | "unread" | "starred" | "archived">(
    "inbox"
  );

  // Composer mode
  const [composeMode, setComposeMode] = useState<"reply" | "new">("reply");
  const [composeTo, setComposeTo] = useState<string>(otherOf(DEMO_THREADS[0]));
  const [composeSubject, setComposeSubject] = useState<string>("");

  // compteurs pour les pills du header
  const counters = useMemo(
    () => ({
      inbox: threads.filter((t) => !t.archived).length,
      unread: threads.filter((t) => t.unread && !t.archived).length,
      starred: threads.filter((t) => t.starred && !t.archived).length,
      archived: threads.filter((t) => t.archived).length,
    }),
    [threads]
  );

  // liste filtrée (onglet + recherche)
  const filtered = useMemo(() => {
    return threads
      .filter((t) => {
        if (tab === "unread" && !t.unread) return false;
        if (tab === "starred" && !t.starred) return false;
        if (tab === "archived" && !t.archived) return false;
        if (tab === "inbox" && t.archived) return false;
        if (!q.trim()) return true;
        const blob = (
          t.last.subject +
          " " +
          t.last.snippet +
          " " +
          t.participants.join(" ")
        ).toLowerCase();
        return blob.includes(q.toLowerCase());
      })
      .sort(
        (a, b) =>
          new Date(b.last.sentAt).getTime() - new Date(a.last.sentAt).getTime()
      );
  }, [threads, q, tab]);

  const active = threads.find((t) => t.id === activeId) || filtered[0];

  // sync composer destinataire quand on change de thread
  useEffect(() => {
    if (active && composeMode === "reply") {
      setComposeTo(otherOf(active));
    }
  }, [active?.id, composeMode]);

  // si on change d’onglet/recherche et que le thread actif disparaît, on sélectionne le 1er
  useEffect(() => {
    if (!filtered.find((t) => t.id === activeId) && filtered.length) {
      setActiveId(filtered[0].id);
    }
  }, [tab, q]); // eslint-disable-line

  /* ------------------------------ Actions ------------------------------ */
  const markRead = (id: string, value = true) =>
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: !value ? true : false } : t))
    );

  const toggleStar = (id: string) =>
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t))
    );

  const toggleArchive = (id: string) =>
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, archived: !t.archived } : t))
    );

  const deleteThread = (id: string) =>
    setThreads((prev) => prev.filter((t) => t.id !== id));

  const markAllFilteredRead = () =>
    setThreads((prev) =>
      prev.map((t) =>
        filtered.some((f) => f.id === t.id) ? { ...t, unread: false } : t
      )
    );

  const sendReply = (text: string, files: File[]) => {
    if (!active) return;
    const reply: Message = {
      id: Math.random().toString(36).slice(2),
      threadId: active.id,
      from: you,
      role: "systeme",
      subject: `Re: ${active.last.subject}`,
      snippet: text,
      sentAt: new Date().toISOString(),
      attachments: files.length
        ? Array.from(files).map((f) => ({
            name: f.name,
            size: `${Math.max(1, Math.round(f.size / 1024))} KB`,
          }))
        : undefined,
    };
    setThreads((prev) =>
      prev.map((t) =>
        t.id === active.id
          ? {
              ...t,
              unread: false,
              archived: false,
              last: reply,
              messages: [...t.messages, reply],
            }
          : t
      )
    );
  };

  const sendNew = (toName: string, subject: string, text: string, files: File[]) => {
    if (!toName || !subject.trim() || (!text.trim() && files.length === 0)) return;

    const contact = CONTACTS.find((c) => c.name === toName) || {
      name: toName,
      role: "educatrice" as SenderRole,
    };

    const threadId = "t" + Math.random().toString(36).slice(2, 7);
    const msg: Message = {
      id: Math.random().toString(36).slice(2),
      threadId,
      from: you,
      role: "systeme",
      subject,
      snippet: text,
      sentAt: new Date().toISOString(),
      attachments: files.length
        ? files.map((f) => ({
            name: f.name,
            size: `${Math.max(1, Math.round(f.size / 1024))} KB`,
          }))
        : undefined,
    };

    const newThread: Thread = {
      id: threadId,
      participants: [contact.name, you],
      unread: false,
      starred: false,
      archived: false,
      last: msg,
      messages: [msg],
    };

    setThreads((prev) => [newThread, ...prev]);
    setActiveId(threadId);
    setComposeMode("reply");
    setComposeSubject("");
  };

  /* ------------------------------ UI ------------------------------ */
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* ====== HEADER CRÉATIF ====== */}
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-lg">
        <span aria-hidden className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-10 h-80 w-80 rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative z-10 p-5 sm:p-6 lg:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* back + titre */}
            <div className="flex items-start gap-3">
              <Link
                to="/parent"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-white/95 ring-1 ring-white/20 hover:bg-white/15"
                title="Retour à l’accueil"
              >
                <ChevronLeft className="h-4 w-4" />
                Accueil
              </Link>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Boîte de réception</h1>
                <p className="mt-1 text-sm text-white/85">
                  Messagerie & communication avec l’équipe éducative
                </p>
              </div>
            </div>

            {/* recherche + actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              <label
                className="group relative w-full sm:w-[320px]"
                aria-label="Rechercher un message"
                title="Rechercher dans vos messages"
              >
                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-80" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher un message…"
                  className="w-full rounded-xl border border-white/20 bg-white/15 pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-white/75 outline-none focus:ring-2 focus:ring-white/40"
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden
                  style={{
                    boxShadow:
                      "0 0 0 2px rgba(255,255,255,.06) inset, 0 10px 30px rgba(0,0,0,.12)",
                  }}
                />
              </label>

              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/20"
                  onClick={markAllFilteredRead}
                  title="Marquer comme lus les conversations affichées"
                >
                  ✓ Tout marquer lu
                </button>
   
              </div>
            </div>
          </div>

          {/* sous-nav sticky (onglets) */}
          <div className="sticky top-[64px] z-10 mt-5 -mb-3 overflow-x-auto rounded-xl bg-white/10 p-1 backdrop-blur-lg ring-1 ring-white/15">
            <div className="flex min-w-max gap-2">
              <TabButton icon={<Inbox className="h-4 w-4" />} label="Boîte de réception" active={tab === "inbox"} onClick={() => setTab("inbox")} count={counters.inbox} />
              <TabButton icon={<MailOpen className="h-4 w-4" />} label="Non lus" active={tab === "unread"} onClick={() => setTab("unread")} count={counters.unread} />
              <TabButton icon={<Bookmark className="h-4 w-4" />} label="Favoris" active={tab === "starred"} onClick={() => setTab("starred")} count={counters.starred} />
              <TabButton icon={<FolderArchive className="h-4 w-4" />} label="Archivés" active={tab === "archived"} onClick={() => setTab("archived")} count={counters.archived} />
            </div>
          </div>
        </div>
      </section>

      {/* ====== CONTENT ====== */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-[320px,1fr]">
        {/* Sidebar / threads */}
        <aside className="rounded-2xl border border-slate-200 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/5">
          <SectionHeading icon={<MessagesSquare className="h-4 w-4" />} title="Conversations" subtitle="Tous vos échanges regroupés par fil" />

          {/* recherche mobile */}
          <div className="border-b border-slate-200/70 px-3 py-2 dark:border-white/10 md:hidden">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Rechercher…"
                className="w-full rounded-lg bg-slate-100/60 pl-9 pr-3 py-2 text-sm dark:bg-white/10"
                aria-label="Rechercher"
              />
            </div>
          </div>

          <ul className="max-h-[calc(100vh-300px)] overflow-auto p-2">
            {filtered.length === 0 && (
              <li className="p-6 text-center text-sm text-slate-500 dark:text-white/60">
                Aucun message.
              </li>
            )}

            {filtered.map((t) => (
              <ThreadListItem
                key={t.id}
                thread={t}
                active={active?.id === t.id}
                onOpen={() => {
                  setActiveId(t.id);
                  markRead(t.id, true);
                  setComposeMode("reply");
                }}
                onStar={() => toggleStar(t.id)}
                onArchive={() => toggleArchive(t.id)}
                onToggleRead={() => markRead(t.id, !t.unread)}
                onDelete={() => deleteThread(t.id)}
              />
            ))}
          </ul>
        </aside>

        {/* Reader pane */}
        {!active ? (
          <section className="grid place-items-center rounded-2xl border border-dashed border-slate-300 p-10 text-slate-500 dark:border-white/10 dark:text-white/50">
            Sélectionnez un message à droite.
          </section>
        ) : (
          <section className="flex min-h-[60vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-white/5">
            {/* En-tête du thread avec dropdown */}
            <ThreadHeader
              thread={active}
              onStar={() => toggleStar(active.id)}
              onArchive={() => toggleArchive(active.id)}
              onToggleRead={() => markRead(active.id, !active.unread)}
              onDelete={() => deleteThread(active.id)}
            />

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-auto p-4">
              <SectionMini title="Messages du fil" />
              {active.messages
                .slice()
                .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
                .map((m) => {
                  const incoming = m.from !== you;
                  return (
                    <article
                      key={m.id}
                      className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/5"
                      title={`${incoming ? "Message reçu de" : "Message envoyé à"} ${m.from} — ${formatTime(m.sentAt)}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-white ${
                              m.role === "educatrice"
                                ? "bg-indigo-500"
                                : m.role === "direction"
                                ? "bg-fuchsia-500"
                                : "bg-slate-500"
                            }`}
                            title={m.from}
                          >
                            {m.from.slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                                {m.from}
                              </div>
                              <BadgePill
                                tone={incoming ? "green" : "slate"}
                                title={incoming ? "Message reçu" : "Message envoyé"}
                                label={incoming ? "Reçu" : "Envoyé"}
                              />
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {formatTime(m.sentAt)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-800 dark:text-white/90">
                        {m.snippet}
                      </p>

                      {m.attachments?.length ? (
                        <>
                          <SectionMini className="mt-3" title="Pièces jointes" small />
                          <div className="mt-1 flex flex-wrap gap-2">
                            {m.attachments.map((a, i) => (
                              <a
                                key={i}
                                href="#"
                                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/10 dark:text-white/80"
                                title={`${a.name} — ${a.size}`}
                              >
                                <Paperclip className="h-4 w-4" />
                                {a.name}
                                <span className="text-slate-400">· {a.size}</span>
                              </a>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </article>
                  );
                })}
            </div>

            {/* Composer : reply ou new */}
            <SectionHeading
              className="px-4 pt-3"
              tight
              title={composeMode === "reply" ? "Répondre au message" : "Composer un nouveau message"}
              subtitle={composeMode === "reply" ? "Votre réponse sera envoyée au destinataire du fil" : "Choisissez un destinataire et un sujet"}
            />
            {composeMode === "reply" ? (
              <Composer
                mode="reply"
                to={composeTo}
                subject={`Re: ${active.last.subject}`}
                onSend={(text, files) => sendReply(text, files)}
              />
            ) : (
              <Composer
                mode="new"
                to={composeTo}
                subject={composeSubject}
                onChangeTo={setComposeTo}
                onChangeSubject={setComposeSubject}
                onSend={(text, files) => sendNew(composeTo, composeSubject, text, files)}
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
}

/* --------------------------- Subcomponents --------------------------- */
function SectionHeading({
  title,
  subtitle,
  icon,
  className,
  tight,
}: {
  title: string;
  subtitle?: string;
  icon?: JSX.Element;
  className?: string;
  tight?: boolean;
}) {
  return (
    <div className={["border-b border-slate-200/70 dark:border-white/10 px-3", tight ? "pb-2" : "py-3", className || ""].join(" ")}>
      <div className="flex items-center gap-2">
        {icon ? icon : null}
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      </div>
      {subtitle ? <p className="mt-0.5 text-xs text-slate-500 dark:text-white/60">{subtitle}</p> : null}
    </div>
  );
}

function SectionMini({
  title,
  className,
  small,
}: {
  title: string;
  className?: string;
  small?: boolean;
}) {
  return (
    <div className={["flex items-center gap-2", className || ""].join(" ")}>
      <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
      <span className={["text-slate-500 dark:text-white/60", small ? "text-[11px]" : "text-xs font-medium"].join(" ")}>
        {title}
      </span>
      <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
    </div>
  );
}

function BadgePill({
  label,
  tone = "slate",
  title,
}: {
  label: string;
  tone?: "green" | "slate" | "amber";
  title?: string;
}) {
  const tones: Record<string, string> = {
    green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200",
    slate: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-white/80",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
  };
  return (
    <span
      className={["inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold", tones[tone]].join(" ")}
      title={title || label}
    >
      {label}
    </span>
  );
}

function TabButton({
  label,
  active,
  onClick,
  count,
  icon,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  count?: number;
  icon?: JSX.Element;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition",
        active ? "bg-white text-indigo-700 shadow-sm" : "text-white/90 hover:bg-white/10",
      ].join(" ")}
      title={label}
    >
      {icon ? <span>{icon}</span> : null}
      <span>{label}</span>
      {typeof count === "number" && (
        <span
          className={[
            "ml-1 inline-flex min-w-[1.5rem] items-center justify-center rounded-full px-1.5 text-[11px]",
            active ? "bg-indigo-50 text-indigo-700" : "bg-white/20 text-white",
          ].join(" ")}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function ThreadListItem({
  thread,
  active,
  onOpen,
  onStar,
  onArchive,
  onToggleRead,
  onDelete,
}: {
  thread: Thread;
  active: boolean;
  onOpen: () => void;
  onStar: () => void;
  onArchive: () => void;
  onToggleRead: () => void;
  onDelete: () => void;
}) {
  const dd = useDropdown();

  return (
    <li>
      <div
        className={[
          "group w-full rounded-xl border p-3 transition",
          active
            ? "border-indigo-200 bg-indigo-50 dark:border-white/10 dark:bg-white/10"
            : "border-slate-200 bg-white hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 hover:dark:bg-white/10",
        ].join(" ")}
        title={`${thread.last.subject} — ${thread.participants.join(" • ")}`}
      >
        <div className="flex items-start gap-2">
          <button onClick={onOpen} className="flex-1 text-left min-w-0" title="Ouvrir la conversation">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                {thread.last.subject}
              </span>
              {thread.unread && (
                <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  NEW
                </span>
              )}
              {thread.starred && <Star className="h-3.5 w-3.5 text-amber-500" title="Favori" />}
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs text-slate-600 dark:text-white/70">
              {thread.last.snippet}
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              {thread.participants.join(" • ")}
            </p>
          </button>

          <div ref={dd.ref} className="relative">
            <button
              onClick={() => dd.setOpen((v) => !v)}
              className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10"
              aria-haspopup="menu"
              aria-expanded={dd.open}
              title="Actions"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {dd.open && (
              <div
                className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-slate-800"
                role="menu"
              >
                <MenuItem onClick={onToggleRead} icon={thread.unread ? MailOpen : MailClosed}>
                  {thread.unread ? "Marquer comme lu" : "Marquer comme non lu"}
                </MenuItem>
                <MenuItem onClick={onStar} icon={thread.starred ? StarOff : Star}>
                  {thread.starred ? "Retirer des favoris" : "Ajouter aux favoris"}
                </MenuItem>
                <MenuItem onClick={onArchive} icon={Archive}>
                  {thread.archived ? "Désarchiver" : "Archiver"}
                </MenuItem>
                <div className="my-1 h-px bg-slate-200 dark:bg-white/10" />
                <MenuItem onClick={onDelete} icon={Trash2} danger>
                  Supprimer
                </MenuItem>
              </div>
            )}
          </div>
        </div>

        <div className="mt-1 text-right text-[11px] text-slate-400">
          {formatTime(thread.last.sentAt)}
        </div>
      </div>
    </li>
  );
}

function ThreadHeader({
  thread,
  onStar,
  onArchive,
  onToggleRead,
  onDelete,
}: {
  thread: Thread;
  onStar: () => void;
  onArchive: () => void;
  onToggleRead: () => void;
  onDelete: () => void;
}) {
  const dd = useDropdown();

  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-200/70 p-3 dark:border-white/10">
      <div className="min-w-0">
        <h2 className="truncate text-base font-semibold text-slate-900 dark:text-white">
          Détails du fil — {thread.last.subject}
        </h2>
        <p className="text-xs text-slate-500 dark:text-white/60">
          Participants : {thread.participants.join(" • ")}
        </p>
      </div>

      <div ref={dd.ref} className="relative">
        <button
          onClick={() => dd.setOpen((v) => !v)}
          className="rounded-lg px-2 py-1.5 text-slate-600 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10"
          title="Actions du fil"
        >
          <MoreVertical className="h-5 w-5" />
        </button>

        {dd.open && (
          <div className="absolute right-0 z-20 mt-1 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-slate-800">
            <MenuItem onClick={onToggleRead} icon={thread.unread ? MailOpen : MailClosed}>
              {thread.unread ? "Marquer comme lu" : "Marquer comme non lu"}
            </MenuItem>
            <MenuItem onClick={onStar} icon={thread.starred ? StarOff : Star}>
              {thread.starred ? "Retirer des favoris" : "Ajouter aux favoris"}
            </MenuItem>
            <MenuItem onClick={onArchive} icon={Archive}>
              {thread.archived ? "Désarchiver" : "Archiver"}
            </MenuItem>
            <div className="my-1 h-px bg-slate-200 dark:bg-white/10" />
            <MenuItem onClick={onDelete} icon={Trash2} danger>
              Supprimer le fil
            </MenuItem>
          </div>
        )}
      </div>
    </div>
  );
}

function MenuItem({
  children,
  onClick,
  icon: Icon,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon: React.ComponentType<any>;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex w-full items-center gap-2 px-3 py-2 text-sm",
        danger
          ? "text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
          : "text-slate-700 hover:bg-slate-50 dark:text-white/80 dark:hover:bg-white/10",
      ].join(" ")}
      role="menuitem"
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </button>
  );
}

/* --------------------------- Composer --------------------------- */
function Composer({
  mode,
  to,
  subject,
  onChangeTo,
  onChangeSubject,
  onSend,
}: {
  mode: "reply" | "new";
  to: string;
  subject: string;
  onChangeTo?: (v: string) => void;
  onChangeSubject?: (v: string) => void;
  onSend: (t: string, f: File[]) => void;
}) {
  const [val, setVal] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const pickFiles = () => fileRef.current?.click();

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      doSend();
    }
  };

  const doSend = () => {
    if (!val.trim() && files.length === 0) return;
    onSend(val.trim(), files);
    setVal("");
    setFiles([]);
  };

  return (
    <div className="border-t border-slate-200/70 bg-white/70 p-3 backdrop-blur dark:border-white/10 dark:bg-white/5" aria-live="polite">
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-white/5">
        {/* Destinataire / Sujet */}
        <div className="flex flex-col gap-2 px-2 pb-2">
          <div className="grid gap-2 sm:grid-cols-[auto,1fr] sm:items-center">
            <label className="text-xs font-semibold text-slate-500">Destinataire</label>
            {mode === "reply" ? (
              <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-white/10" title="Le message sera envoyé à ce destinataire">
                {to}
              </div>
            ) : (
              <select
                value={to}
                onChange={(e) => onChangeTo?.(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5"
                title="Choisir un destinataire"
              >
                {CONTACTS.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="grid gap-2 sm:grid-cols-[auto,1fr] sm:items-center">
            <label className="text-xs font-semibold text-slate-500">Sujet</label>
            {mode === "reply" ? (
              <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-white/10" title="Sujet de la réponse">
                {subject}
              </div>
            ) : (
              <input
                value={subject}
                onChange={(e) => onChangeSubject?.(e.target.value)}
                placeholder="Sujet…"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/5"
                title="Saisir le sujet du message"
              />
            )}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 px-1 py-1">
          <button
            onClick={() => setVal((v) => v + " 🙂")}
            className="rounded-lg px-2 py-1.5 text-slate-600 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10"
            title="Insérer un emoji"
          >
            <Smile className="h-5 w-5" />
          </button>
          <button
            onClick={pickFiles}
            className="rounded-lg px-2 py-1.5 text-slate-600 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/10"
            title="Joindre un fichier"
          >
            <Clip className="h-5 w-5" />
          </button>
          <span className="ml-auto text-[11px] text-slate-400" title="Raccourci clavier">
            Ctrl/⌘ + Entrée pour envoyer
          </span>
        </div>

        {/* Zone de texte */}
        <label className="sr-only" htmlFor="composer-textarea">
          Corps du message
        </label>
        <textarea
          id="composer-textarea"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={onKeyDown}
          rows={3}
          placeholder="Votre message…"
          className="w-full resize-y rounded-xl border-0 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400"
          title="Corps du message"
        />

        {/* Fichiers */}
        {files.length > 0 && (
          <>
            <SectionMini className="px-2" title="Pièces jointes ajoutées" small />
            <div className="mt-1 flex flex-wrap gap-2 px-2 pb-2">
              {files.map((f, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs dark:border-white/10 dark:bg-white/10"
                  title={f.name}
                >
                  <Paperclip className="h-3.5 w-3.5" />
                  <span className="max-w-[180px] truncate">{f.name}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between px-2 pb-1">
          <input
            ref={fileRef}
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            type="file"
            className="hidden"
          />
          <div />
          <button
            onClick={doSend}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
            title={mode === "reply" ? "Envoyer la réponse" : "Envoyer le message"}
          >
            <Send className="h-4 w-4" />
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
