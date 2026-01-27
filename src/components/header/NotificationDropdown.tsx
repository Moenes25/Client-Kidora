import { useEffect, useMemo, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

type Notif = {
  id: string;
  user: string;
  avatar: string;
  title: string;
  context: string;
  time: string;
  unread: boolean;
  tone?: "success" | "warning" | "danger";
};

export default function NotificationDropdown() {
  const [items, setItems] = useState<Notif[]>([
    { id: "n1", user: "Terry Franci", avatar: "/images/user/user-02.jpg", title: "requests permission to change", context: "Project – Nganter App", time: "5 min", unread: true, tone: "success" },
    { id: "n2", user: "Alena Franci", avatar: "/images/user/user-03.jpg", title: "requests permission to change", context: "Project – Nganter App", time: "8 min", unread: true },
    { id: "n3", user: "Jocelyn Kenter", avatar: "/images/user/user-04.jpg", title: "requests permission to change", context: "Project – Nganter App", time: "15 min", unread: false },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = useMemo(
    () => Math.min(99, items.filter((i) => i.unread).length),
    [items]
  );

  function toggleDropdown() {
    setIsOpen((v) => !v);
  }
  function closeDropdown() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen || unreadCount === 0) return;
    const t = setTimeout(() => {
      setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    }, 250);
    return () => clearTimeout(t);
  }, [isOpen, unreadCount]);

  return (
    <div className="relative">
      {/* Bouton cloche */}
      <button
        onClick={toggleDropdown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={unreadCount ? `${unreadCount} notifications non lues` : "Notifications"}
        className={[
          "relative inline-grid place-items-center h-11 w-11 rounded-full",
          "bg-white/10 hover:bg-white/20 text-white",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
          "transition-colors"
        ].join(" ")}
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M10.75 2.29a.75.75 0 0 0-1.5 0v.54A6.25 6.25 0 0 0 3.63 9.17v5.29H3.33a.75.75 0 0 0 0 1.5H4.38h11.25h1.04a.75.75 0 0 0 0-1.5H16.38V9.17A6.25 6.25 0 0 0 10.75 2.83v-.54ZM14.88 14.46V9.17A4.88 4.88 0 0 0 10 4.29 4.88 4.88 0 0 0 5.12 9.17v5.29h9.76ZM8 17.71c0 .41.34.75.75.75h2.5a.75.75 0 0 0 0-1.5H8.75A.75.75 0 0 0 8 17.71Z" />
        </svg>

        {unreadCount > 0 && (
          <>
            <span
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full
                         bg-rose-500 px-1.5 text-[10px] font-bold leading-[18px] text-white"
              aria-live="polite"
            >
              {unreadCount}
            </span>
            <span className="absolute -top-1 -right-1 h-[18px] w-[18px] rounded-full bg-rose-500/40 animate-ping" aria-hidden="true" />
          </>
        )}
      </button>

      {/* Panneau */}
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className={[
          "absolute right-0  mt-3 flex w-[350px] max-h-[480px] flex-col rounded-2xl p-3 sm:w-[361px]",
          "bg-white/95 text-slate-900 border border-black/10 shadow-xl ring-1 ring-black/5 backdrop-blur-xl",
          "dark:bg-slate-900/95 dark:text-slate-100 dark:border-white/10 dark:ring-white/10"
        ].join(" ")}
      >
        {/* caret/flèche */}
        <span
          aria-hidden
          className={[
            "pointer-events-none absolute -top-2 right-8 block size-4 rotate-45",
            "bg-white/95 border-t border-l border-black/10",
            "dark:bg-slate-900/95 dark:border-white/10"
          ].join(" ")}
        />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-white/10">
          <h5 className="text-lg font-semibold">Notifications</h5>
          <span className="text-xs rounded-full bg-indigo-50 px-2 py-0.5 font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
            {items.length} total
          </span>
        </div>

        {/* Liste */}
        <ul className="flex flex-col overflow-y-auto" role="menu" aria-label="Notifications">
          {items.map((n) => (
            <li key={n.id} role="none">
              <DropdownItem
                role="menuitem"
                onItemClick={() =>
                  setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x)))
                }
                className={[
                  "flex gap-3 rounded-lg p-3 transition-colors",
                  "hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40",
                  n.unread ? "bg-indigo-50/60 dark:bg-indigo-500/10" : "bg-white dark:bg-transparent",
                  "dark:hover:bg-white/5"
                ].join(" ")}
              >
                <span className="relative inline-block h-10 w-10 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/10 shrink-0">
                  <img src={n.avatar} alt="" className="h-full w-full object-cover object-center" />
                  <span
                    className={[
                      "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-slate-900/95",
                      n.tone === "danger"
                        ? "bg-rose-500"
                        : n.tone === "warning"
                        ? "bg-amber-400"
                        : "bg-emerald-500",
                    ].join(" ")}
                  />
                </span>

                <div className="min-w-0">
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    <span className="font-semibold text-slate-900 dark:text-white">{n.user}</span>{" "}
                    {n.title}{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">{n.context}</span>
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>Projet</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                    <span>{n.time} ago</span>
                    {n.unread && (
                      <span className="ml-auto rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600 dark:bg-rose-400/10 dark:text-rose-300">
                        Nouveau
                      </span>
                    )}
                  </p>
                </div>
              </DropdownItem>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <button
          onClick={() => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))}
          className="mt-3 w-full rounded-lg border border-black/10 bg-white px-4 py-2 text-sm font-medium
                     text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40
                     dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 dark:border-white/10"
        >
          Marquer tout comme lu
        </button>
      </Dropdown>
    </div>
  );
}
