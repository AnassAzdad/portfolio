import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiChevronLeft, FiChevronRight, FiX } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import ProjectShell from "../components/ProjectShell";
import "./Project1.css";

type CalendarEvent = { id: number; date: string; title: string };

function Project1() {
  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const { language } = useLanguage();
  const t = translations[language].project1;

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState("");
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || newEvent.trim() === "") return;
    const title = newEvent.trim();
    setEvents((prev) => [...prev, { id: Date.now(), date: selectedDate, title }]);
    setNewEvent("");

    emailjs
      .send("service_ammshpk", "template_5w3hoi1", { date: selectedDate, event: title }, "kBJ0ovQsp0AOVFzz5")
      .then(() => setStatus({ ok: true, text: t.mailed }))
      .catch((error) => {
        console.error("EmailJS fout:", error);
        setStatus({ ok: false, text: t.mailFailed });
      });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const formatDate = (dateString: string) => {
    const [y, m, d] = dateString.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(t.locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="cal-day is-empty" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateString = `${currentYear}-${currentMonth + 1}-${d}`;
    const dayEvents = events.filter((e) => e.date === dateString);
    const classes = [
      "cal-day",
      selectedDate === dateString ? "is-selected" : "",
      todayString === dateString ? "is-today" : "",
    ].join(" ");

    cells.push(
      <div
        key={d}
        className={classes}
        role="button"
        tabIndex={0}
        aria-pressed={selectedDate === dateString}
        onClick={() => setSelectedDate(selectedDate === dateString ? null : dateString)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedDate(selectedDate === dateString ? null : dateString);
          }
        }}
      >
        <span className="cal-num">{d}</span>
        {dayEvents.map((ev) => (
          <div key={ev.id} className="cal-event">
            <span>{ev.title}</span>
            <button
              type="button"
              aria-label={`${t.remove}: ${ev.title}`}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteEvent(ev.id);
              }}
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ProjectShell slug="project1">
      <div className="calendar">
        <div className="cal-header">
          <h2>
            {new Date(currentYear, currentMonth).toLocaleString(t.locale, {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <div className="cal-nav">
            <button type="button" className="icon-btn" onClick={prevMonth} aria-label={t.prev}>
              <FiChevronLeft />
            </button>
            <button type="button" className="icon-btn" onClick={nextMonth} aria-label={t.next}>
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="cal-scroll">
          <div className="cal-grid cal-weekdays">
            {t.days.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="cal-grid">{cells}</div>
        </div>

        {selectedDate ? (
          <form className="cal-form" onSubmit={handleAddEvent}>
            <div className="field">
              <label htmlFor="cal-title">
                {t.newEvent} {t.on} {formatDate(selectedDate)}
              </label>
              <input
                id="cal-title"
                className="input"
                type="text"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                placeholder={t.placeholder}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={!newEvent.trim()}>
              {t.add}
            </button>
          </form>
        ) : (
          <p className="status">{t.hint}</p>
        )}
        {status && <p className={`status ${status.ok ? "is-ok" : "is-bad"}`}>{status.text}</p>}
      </div>
    </ProjectShell>
  );
}

export default Project1;
