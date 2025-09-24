import { useState, useEffect, useRef } from "react";
import "./Project2.css";

type GeoResult = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

function Project2() {
  const [city, setCity] = useState("");
  const [place, setPlace] = useState<{ name: string; country: string; state?: string } | null>(null);
  const [weather, setWeather] = useState<{ temp: number; desc: string; icon: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const API_KEY = "0402f893d9e221b875a0033de355b8b4"; 

  const handleSearch = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);
    setPlace(null);

    try {
      
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
      );
      if (!geoRes.ok) throw new Error("Geocoding fout");
      const geoData: GeoResult[] = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        setError("❌ Stad niet gevonden. Controleer spelling.");
        setLoading(false);
        return;
      }

      const { name, lat, lon, country, state } = geoData[0];
      setPlace({ name, country, state });

      
      const wxRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=nl`
      );
      if (!wxRes.ok) throw new Error("Weerdata fout");
      const wx = await wxRes.json();

      setWeather({
        temp: wx.main?.temp,
        desc: wx.weather?.[0]?.description ?? "onbekend",
        icon: wx.weather?.[0]?.icon ?? "01d",
      });
    } catch (err) {
      console.error(err);
      setError("❌ Er ging iets mis bij het ophalen van het weer.");
    } finally {
      setLoading(false);
    }
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
        const g = this.ctx.createLinearGradient(this.x, this.y, this.x - 30, this.y - 30);
        g.addColorStop(0, "white");
        g.addColorStop(1, "transparent");
        this.ctx.fillStyle = g;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    let meteors: Meteor[] = [];
    let rafId = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      meteors.forEach((m, i) => {
        m.update();
        m.draw();
        if (m.y > canvas.height) meteors.splice(i, 1);
      });
      if (Math.random() < 0.02) meteors.push(new Meteor(ctx, canvas.width, canvas.height));
      rafId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="project2-container">
      <canvas ref={canvasRef} className="project2-background" />

      <div className="weather-box">
        <h1>🌤️ Weather App</h1>
        <p>Typ een stad (wereldwijd) en check het weer.</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Bijv. Amsterdam, Paris, Tokyo..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Zoek</button>
        </div>

        {loading && <p>⏳ Laden...</p>}
        {error && <p className="error">{error}</p>}

        {place && weather && (
          <div className="weather-card">
            <h2>
              {place.name}
              {place.state ? `, ${place.state}` : ""} ({place.country})
            </h2>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt={weather.desc}
            />
            <p className="temp">{Math.round(weather.temp)}°C</p>
            <p className="desc">{weather.desc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Project2;
