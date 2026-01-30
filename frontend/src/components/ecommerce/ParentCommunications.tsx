// components/nursery/ParentCommunications.tsx
import { useMemo, useState } from "react";
import {
  MessageCircle,
  Mail,
  Bell,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react";

interface Communication {
  id: number;
  parent: string;
  child: string;
  type: "message" | "email" | "notification";
  content: string;
  time: string;
  status: "read" | "unread";
  priority: "high" | "medium" | "low";
}

const communicationsSeed: Communication[] = [
  { id: 1, parent: "Sophie Martin", child: "Emma Martin", type: "message", content: "Demande d'informations sur l'activité de demain", time: "Il y a 10 min", status: "unread", priority: "high" },
  { id: 2, parent: "Thomas Dubois", child: "Lucas Dubois", type: "email", content: "Autorisation sortie scolaire signée", time: "Il y a 1h", status: "read", priority: "medium" },
  { id: 3, parent: "Julie Bernard", child: "Chloé Bernard", type: "notification", content: "Paiement mensuel reçu", time: "Il y a 2h", status: "read", priority: "low" },
  { id: 4, parent: "Marc Laurent", child: "Hugo Laurent", type: "message", content: "Question sur le régime alimentaire", time: "Il y a 3h", status: "unread", priority: "high" },
];

const TypeIcon = ({ t }: { t: Communication["type"] }) =>
  t === "message" ? (
    <MessageCircle className="h-4.5 w-4.5" />
  ) : t === "email" ? (
    <Mail className="h-4.5 w-4.5" />
  ) : (
    <Bell className="h-4.5 w-4.5" />
  );

const priorityPill = (p: Communication["priority"]) =>
  p === "high"
    ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
    : p === "medium"
    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";

export default function ParentCommunications() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const unreadCount = useMemo(
    () => communicationsSeed.filter((c) => c.status === "unread").length,
    []
  );

  const list = communicationsSeed.filter((c) =>
    filter === "all" ? true : c.status === "unread"
  );

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Header dégradé + filtre */}
      <div className="relative bg-gradient-to-r from-sky-600 via-indigo-600 to-fuchsia-600 px-5 py-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold">Communications Parents</h3>
            <p className="text-xs text-white/85">Messages récents et à traiter</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 text-white transition hover:bg-white/20">
                <MessageCircle className="h-5 w-5" />
              </button>
              {unreadCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[11px] font-bold">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="hidden h-9 w-px bg-white/20 sm:block" />
            <div className="flex rounded-lg bg-white/15 p-1 backdrop-blur">
              <button
                onClick={() => setFilter("all")}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
                  filter === "all" ? "bg-white text-indigo-600" : "text-white/85 hover:bg-white/20"
                }`}
              >
                Tous
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition ${
                  filter === "unread" ? "bg-white text-indigo-600" : "text-white/85 hover:bg-white/20"
                }`}
              >
                Non lus
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Liste en mode “timeline” douce */}
      <div className="flex-1 space-y-4 p-4">
        {list.map((c, idx) => (
          <div
            key={c.id}
            className={`relative overflow-hidden rounded-xl border p-4 transition ${
              c.status === "unread"
                ? "border-indigo-200 bg-indigo-50 dark:border-indigo-900/40 dark:bg-indigo-900/20"
                : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800/70"
            }`}
          >
            {/* Ligne timeline */}
            <span className="pointer-events-none absolute left-2 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-400/60 to-transparent" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-1 items-start gap-3">
                <div
                  className={`grid h-9 w-9 place-items-center rounded-lg ${
                    c.status === "unread"
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  <TypeIcon t={c.type} />
                </div>

                <div className="min-w-0">
                  <div className="mb-0.5 flex flex-wrap items-center gap-2">
                    <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                      {c.parent}
                    </h4>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${priorityPill(c.priority)}`}>
                      {c.priority === "high" ? "Urgent" : c.priority === "medium" ? "Moyen" : "Bas"}
                    </span>
                    {c.status === "unread" && (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                        Non lu
                      </span>
                    )}
                  </div>

                  <p className="truncate text-xs text-gray-600 dark:text-gray-400">
                    Enfant : {c.child}
                  </p>
                  <p className="mt-1 text-gray-800 dark:text-gray-200">{c.content}</p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3.5 w-3.5" />
                  {c.time}
                </span>
                {c.status === "unread" ? (
                  <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    À traiter
                  </span>
                ) : (
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Traité
                  </span>
                )}
              </div>
            </div>

            {/* Actions si non lu */}
            {c.status === "unread" && (
              <div className="mt-4 border-t pt-3 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <button className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                    Répondre
                  </button>
                  <button className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                    Marquer comme lu
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {list.length === 0 && (
          <div className="grid min-h-[160px] place-items-center rounded-xl border border-dashed border-gray-300 p-6 text-center text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <div>
              <Filter className="mx-auto mb-2 h-6 w-6 opacity-70" />
              Aucune communication pour ce filtre
            </div>
          </div>
        )}
      </div>

      {/* Footer – KPI rapide */}
      <div className="border-t p-5 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Taux de réponse
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                94% des messages traités
              </p>
            </div>
          </div>
          <button className="text-sm font-semibold text-indigo-600 hover:underline dark:text-indigo-400">
            Voir toutes les communications →
          </button>
        </div>
      </div>
    </div>
  );
}
