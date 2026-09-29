import { useState } from "react";
import { FiSearch } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import ProjectShell from "../components/ProjectShell";
import "./Project2.css";

type GeoResult = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

type Weather = {
  temp: number;
  feels: number;
  humidity: number;
  wind: number;
  desc: string;
  icon: string;
};

const API_KEY = "0402f893d9e221b875a0033de355b8b4";

function Project2() {
  const { language } = useLanguage();
  const t = translations[language].project2;

  const [city, setCity] = useState("");
  const [place, setPlace] = useState<{ name: string; country: string; state?: string } | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setError(t.notFound);
        return;
      }

      const { name, lat, lon, country, state } = geoData[0];
      setPlace({ name, country, state });

      const wxRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=${t.lang}`
      );
      if (!wxRes.ok) throw new Error("Weerdata fout");
      const wx = await wxRes.json();

      setWeather({
        temp: wx.main?.temp,
        feels: wx.main?.feels_like,
        humidity: wx.main?.humidity,
        wind: wx.wind?.speed,
        desc: wx.weather?.[0]?.description ?? "",
        icon: wx.weather?.[0]?.icon ?? "01d",
      });
    } catch (err) {
      console.error(err);
      setError(t.failed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectShell slug="project2">
      <div className="weather">
        <form className="weather-search" onSubmit={handleSearch}>
          <div className="field">
            <label htmlFor="weather-city">{t.label}</label>
            <input
              id="weather-city"
              className="input"
              type="text"
              placeholder={t.placeholder}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <FiSearch aria-hidden="true" /> {t.search}
          </button>
        </form>

        {loading && <p className="status">{t.loading}</p>}
        {error && <p className="status is-bad">{error}</p>}

        {place && weather ? (
          <div className="weather-result">
            <div className="weather-main">
              <div>
                <p className="weather-place">
                  {place.name}
                  {place.state ? `, ${place.state}` : ""} · {place.country}
                </p>
                <p className="weather-temp">{Math.round(weather.temp)}°</p>
                <p className="weather-desc">{weather.desc}</p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt={weather.desc}
                width={128}
                height={128}
              />
            </div>
            <dl className="weather-stats">
              <div>
                <dt>{t.feels}</dt>
                <dd>{Math.round(weather.feels)}°C</dd>
              </div>
              <div>
                <dt>{t.humidity}</dt>
                <dd>{weather.humidity}%</dd>
              </div>
              <div>
                <dt>{t.wind}</dt>
                <dd>{Math.round(weather.wind * 3.6)} km/h</dd>
              </div>
            </dl>
          </div>
        ) : (
          !loading && !error && <p className="weather-empty">{t.empty}</p>
        )}
      </div>
    </ProjectShell>
  );
}

export default Project2;
