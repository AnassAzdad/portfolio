import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Project1.css";

const daysOfWeek = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];

function Project1() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<{ date: string; title: string }[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [newEvent, setNewEvent] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  
  const handleAddEvent = (date: string) => {
    if (newEvent.trim() !== "") {
      const updatedEvents = [...events, { date, title: newEvent }];
      setEvents(updatedEvents);

      
      emailjs
        .send(
          "service_ammshpk", 
          "template_5w3hoi1", 
          {
            date: date,
            event: newEvent,
          },
          "kBJ0ovQsp0AOVFzz5" 
        )
        .then(
          () => {
            alert("📧 Email verstuurd!");
          },
          (error) => {
            console.error("EmailJS fout:", error);
            alert("Kon de email niet versturen.");
          }
        );

      setNewEvent("");
    }
  };

  
  const handleDeleteEvent = (date: string, index: number) => {
    setEvents(events.filter((e, i) => !(e.date === date && i === index)));
  };

  
  const toggleDateSelection = (dateString: string) => {
    if (selectedDates.includes(dateString)) {
      setSelectedDates(selectedDates.filter((d) => d !== dateString));
    } else {
      setSelectedDates([...selectedDates, dateString]);
    }
  };

  
  const renderDays = () => {
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = `${currentYear}-${currentMonth + 1}-${d}`;
      const dayEvents = events.filter((e) => e.date === dateString);
      const isSelected = selectedDates.includes(dateString);

      days.push(
        <div
          key={d}
          className={`day ${isSelected ? "selected" : ""}`}
          onClick={() => toggleDateSelection(dateString)}
        >
          <span>{d}</span>
          {dayEvents.map((e, i) => (
            <div key={i} className="event">
              {e.title}
              <button
                className="delete-btn"
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleDeleteEvent(dateString, i);
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    class Meteor {
      x: number;
      y: number;
      size: number;
      speed: number;
      ctx: CanvasRenderingContext2D;

      constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
        this.ctx = ctx;
        this.x = Math.random() * width;
        this.y = -10;
        this.size = Math.random() * 3 + 2;
        this.speed = Math.random() * 4 + 3;
      }

      update() {
        this.x += this.speed;
        this.y += this.speed;
      }

      draw() {
        const gradient = this.ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - 30,
          this.y - 30
        );
        gradient.addColorStop(0, "white");
        gradient.addColorStop(1, "transparent");
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    let meteors: Meteor[] = [];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      meteors.forEach((meteor, index) => {
        meteor.update();
        meteor.draw();
        if (meteor.y > canvas.height) meteors.splice(index, 1);
      });
      if (Math.random() < 0.02)
        meteors.push(new Meteor(ctx, canvas.width, canvas.height));
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div className="project1-container">
      <canvas ref={canvasRef} className="project1-background" />
      <div className="calendar-container">
        <h1>📅 Kalender & Planner</h1>
        <div className="calendar-header">
          <button onClick={prevMonth}>◀</button>
          <h2>
            {new Date(currentYear, currentMonth).toLocaleString("nl-NL", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={nextMonth}>▶</button>
        </div>

        <div className="days-header">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-name">
              {day}
            </div>
          ))}
        </div>

        <div className="days-grid">{renderDays()}</div>

        {selectedDates.length > 0 && (
          <div className="event-form">
            <h3>Nieuwe afspraak</h3>
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="Titel van afspraak..."
            />
            <button onClick={() => handleAddEvent(selectedDates[0])}>
              Toevoegen & Mailen
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project1;
