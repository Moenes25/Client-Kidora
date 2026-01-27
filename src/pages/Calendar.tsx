// src/pages/Calendar.tsx (ou où se trouve ton composant)
import { useEffect, useMemo, useRef, useState } from "react";
import FullCalendar, { EventInput, DateSelectArg, EventClickArg, EventContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import PageMeta from "../components/common/PageMeta";
import { Modal } from "../components/ui/modal";
import {
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Plus,
  Palette,
  Clock,
  Save,
  Trash2,
} from "lucide-react";

type LevelKey = "Danger" | "Success" | "Primary" | "Warning";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: LevelKey;
    notes?: string;
  };
}

const LEVELS: Record<LevelKey, { label: string; dot: string; bg: string; ring: string; pill: string }> = {
  Danger:  { label: "Important",    dot: "bg-rose-500",    bg: "bg-rose-50",    ring: "ring-rose-200",    pill: "bg-gradient-to-r from-rose-500 to-red-500" },
  Success: { label: "Confirmé",     dot: "bg-emerald-500", bg: "bg-emerald-50", ring: "ring-emerald-200", pill: "bg-gradient-to-r from-emerald-500 to-green-500" },
  Primary: { label: "Par défaut",   dot: "bg-indigo-500",  bg: "bg-indigo-50",  ring: "ring-indigo-200",  pill: "bg-gradient-to-r from-indigo-500 to-blue-500" },
  Warning: { label: "À valider",    dot: "bg-amber-500",   bg: "bg-amber-50",   ring: "ring-amber-200",   pill: "bg-gradient-to-r from-amber-500 to-orange-500" },
};

export default function CalendarPage() {
  const calendarRef = useRef<FullCalendar | null>(null);

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // champs modal
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [eventLevel, setEventLevel] = useState<LevelKey>("Primary");
  const [eventAllDay, setEventAllDay] = useState(true);
  const [eventNotes, setEventNotes] = useState("");

  // init exemples
  useEffect(() => {
    const today = new Date();
    const addDays = (d: number) => new Date(today.getTime() + d * 86400000);
    setEvents([
      {
        id: "1",
        title: "Réunion parents",
        start: today.toISOString().split("T")[0],
        allDay: true,
        extendedProps: { calendar: "Danger", notes: "Salle A — 10h00" },
      },
      {
        id: "2",
        title: "Atelier dessin",
        start: addDays(1).toISOString().split("T")[0],
        allDay: true,
        extendedProps: { calendar: "Success", notes: "Prévoir feuilles A3" },
      },
      {
        id: "3",
        title: "Sortie parc",
        start: addDays(2).toISOString().split("T")[0],
        end: addDays(3).toISOString().split("T")[0],
        allDay: true,
        extendedProps: { calendar: "Primary", notes: "Autorisation signée requise" },
      },
    ]);
  }, []);

  const api = () => calendarRef.current?.getApi();

  // header actions
  const goPrev = () => api()?.prev();
  const goNext = () => api()?.next();
  const goToday = () => api()?.today();
  const setView = (view: "dayGridMonth" | "timeGridWeek" | "timeGridDay") => api()?.changeView(view);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    resetFields();
  };

  const resetFields = () => {
    setSelectedEvent(null);
    setEventTitle("");
    setEventStart("");
    setEventEnd("");
    setEventLevel("Primary");
    setEventAllDay(true);
    setEventNotes("");
  };

  // sélection sur la grille
  const handleDateSelect = (sel: DateSelectArg) => {
    resetFields();
    setEventStart(sel.startStr);
    setEventEnd(sel.endStr || sel.startStr);
    setEventAllDay(true);
    openModal();
  };

  // click event
  const handleEventClick = (clickInfo: EventClickArg) => {
    const ev = clickInfo.event;
    const ext = ev.extendedProps as CalendarEvent["extendedProps"];
    setSelectedEvent({
      id: ev.id,
      title: ev.title,
      start: ev.start!,
      end: ev.end ?? undefined,
      allDay: ev.allDay,
      extendedProps: { calendar: (ext?.calendar as LevelKey) || "Primary", notes: ext?.notes || "" },
    });
    setEventTitle(ev.title);
    setEventStart(formatDateInput(ev.start));
    setEventEnd(ev.end ? formatDateInput(ev.end) : formatDateInput(ev.start));
    setEventAllDay(ev.allDay);
    setEventLevel(((ext?.calendar as LevelKey) || "Primary"));
    setEventNotes(ext?.notes || "");
    openModal();
  };

  const handleSave = () => {
    if (!eventTitle.trim() || !eventStart) {
      return; // tu peux afficher une validation si tu veux
    }

    if (selectedEvent?.id) {
      // update
      setEvents(prev =>
        prev.map(e =>
          e.id === selectedEvent.id
            ? {
                ...e,
                title: eventTitle.trim(),
                start: eventStart,
                end: eventEnd || undefined,
                allDay: eventAllDay,
                extendedProps: { calendar: eventLevel, notes: eventNotes },
              }
            : e
        )
      );
    } else {
      // add
      const newEvent: CalendarEvent = {
        id: String(Date.now()),
        title: eventTitle.trim(),
        start: eventStart,
        end: eventEnd || undefined,
        allDay: eventAllDay,
        extendedProps: { calendar: eventLevel, notes: eventNotes },
      };
      setEvents(prev => [...prev, newEvent]);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (!selectedEvent?.id) return;
    setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
    closeModal();
  };

  // style des events via classNames
  const eventClassNames = (arg: any) => {
    const key = (arg.event.extendedProps?.calendar || "Primary") as LevelKey;
    return [
      "rounded-md",
      "px-1.5",
      "py-1.5",
      "text-[11px]",
      "font-medium",
      "shadow-lg",
      "backdrop-blur",
      LEVELS[key].pill,
    ];
  };

  const eventContent = (arg: EventContentArg) => {
    const key = (arg.event.extendedProps?.calendar || "Primary") as LevelKey;
    const label = LEVELS[key].label;
    return (
      <div className="flex items-center gap-1 text-white">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/90" />
        <span className="truncate">{arg.event.title}</span>
        <span className="ml-1 rounded-full bg-white/20 px-1 text-[10px]">{label}</span>
      </div>
    );
  };

  const headerTitle = useMemo(() => {
    const title = api()?.view?.title ?? "";
    return title;
  }, [events]); // re-calc sometimes; FullCalendar gère son propre re-render

  return (
    <>
      <PageMeta
        title="Calendrier - KI DORA"
        description="Planification d’événements, réunions et ateliers"
      />

      <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-gray-900/60">
        {/* HEADER CUSTOM */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-100 text-indigo-600 ring-1 ring-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:ring-white/10">
              <CalendarRange className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Calendrier</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Gérez vos événements & disponibilités</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-white/10 dark:bg-gray-800">
              <button onClick={goPrev} className="px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-700" title="Précédent">
                <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
              <div className="px-3 py-2 text-sm font-semibold text-gray-800 dark:text-gray-200 min-w-[170px] text-center">
                {api()?.view?.title || headerTitle}
              </div>
              <button onClick={goNext} className="px-2 py-2 hover:bg-gray-50 dark:hover:bg-gray-700" title="Suivant">
                <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <button
              onClick={goToday}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Aujourd’hui
            </button>

            <div className="flex rounded-lg bg-gray-100 p-1 dark:bg-gray-700/50">
              {[
                { id: "dayGridMonth", label: "Mois" },
                { id: "timeGridWeek", label: "Semaine" },
                { id: "timeGridDay", label: "Jour" },
              ].map(v => (
                <button
                  key={v.id}
                  onClick={() => setView(v.id as any)}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-600/60"
                >
                  {v.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                resetFields();
                openModal();
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:from-indigo-600 hover:to-blue-700"
            >
              <Plus className="h-4 w-4" />
              Nouvel évènement
            </button>
          </div>
        </div>

        {/* LÉGENDE */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {(
            Object.keys(LEVELS) as LevelKey[]
          ).map(k => (
            <span key={k} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-white/10 dark:bg-gray-800 dark:text-gray-300">
              <span className={`h-2.5 w-2.5 rounded-full ${LEVELS[k].dot}`} />
              {LEVELS[k].label}
            </span>
          ))}
        </div>

        {/* CALENDRIER */}
        <div className="overflow-hidden rounded-xl border border-gray-200 ring-1 ring-black/0 dark:border-white/10">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            locale={frLocale}
            initialView="dayGridMonth"
            headerToolbar={false} // on gère notre header custom
            height="auto"
            events={events}
            selectable
            selectMirror
            dayMaxEvents
            editable
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventClassNames={eventClassNames}
            eventContent={eventContent}
            // petit plus UX
            firstDay={1}
            expandRows
          />
        </div>
      </div>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-2xl p-0">
        {/* header modal */}
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/25">
                <CalendarRange className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold">
                  {selectedEvent ? "Modifier l’évènement" : "Créer un évènement"}
                </h3>
                <p className="text-xs/relaxed text-white/80">Planifier, colorer, noter — simple et clair</p>
              </div>
            </div>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px]">{eventAllDay ? "Journée entière" : "Plage horaire"}</span>
          </div>

          {/* halos déco */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* body */}
        <div className="space-y-5 px-6 py-6">
          {/* Titre */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Titre</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="ex : Réunion d’équipe"
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Couleur + AllDay */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Couleur</label>
              <div className="flex flex-wrap items-center gap-2">
                {(Object.keys(LEVELS) as LevelKey[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setEventLevel(k)}
                    className={[
                      "inline-flex items-center gap-2 rounded-lg border px-2.5 py-2 text-xs font-semibold transition",
                      eventLevel === k
                        ? "border-indigo-500 ring-2 ring-indigo-500/20"
                        : "border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800",
                    ].join(" ")}
                  >
                    <span className={`h-3.5 w-3.5 rounded-full ${LEVELS[k].dot}`} />
                    {LEVELS[k].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEventAllDay(true)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${eventAllDay ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-gray-300 dark:border-gray-700"}`}
                >
                  <Clock className="h-4 w-4" />
                  Journée entière
                </button>
                <button
                  type="button"
                  onClick={() => setEventAllDay(false)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm ${!eventAllDay ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-gray-300 dark:border-gray-700"}`}
                >
                  <Clock className="h-4 w-4" />
                  Horaire
                </button>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Début</label>
              <input
                type={eventAllDay ? "date" : "datetime-local"}
                value={eventStart}
                onChange={(e) => setEventStart(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Fin</label>
              <input
                type={eventAllDay ? "date" : "datetime-local"}
                value={eventEnd}
                onChange={(e) => setEventEnd(e.target.value)}
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Notes</label>
            <textarea
              rows={3}
              value={eventNotes}
              onChange={(e) => setEventNotes(e.target.value)}
              placeholder="Détails, salle, matériel, etc."
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Footer actions */}
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            {selectedEvent && (
              <button
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-800/40 dark:bg-rose-900/20 dark:text-rose-300"
              >
                <Trash2 className="h-4 w-4" />
                Supprimer
              </button>
            )}
            <button
              onClick={closeModal}
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-emerald-600 hover:to-green-700"
            >
              <Save className="h-4 w-4" />
              {selectedEvent ? "Enregistrer" : "Créer l’évènement"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

/* utils */
function formatDateInput(d?: Date | null) {
  if (!d) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mm = pad(d.getMinutes());
  // on retourne date simple, FullCalendar gère allDay; si besoin d'heure, on passera en datetime-local
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}
