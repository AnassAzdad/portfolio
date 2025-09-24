import { useEffect, useRef, useState } from "react";
import "./Project3.css";

const FALLBACK_SYMBOLS = ["EUR", "USD", "MAD", "GBP", "JPY", "CAD"];


function parseAmount(input: string): number {
  if (input == null) return NaN;
  const normalized = String(input).trim().replace(",", ".");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : NaN;
}

function Project3() {
  const [amountStr, setAmountStr] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("EUR");
  const [toCurrency, setToCurrency] = useState<string>("USD");

  const [symbols, setSymbols] = useState<string[]>(FALLBACK_SYMBOLS);
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        const data = await res.json();
        setSymbols(Object.keys(data));
      } catch {
        setSymbols(FALLBACK_SYMBOLS);
      }
    })();
  }, []);

  
  useEffect(() => {
    const amt = parseAmount(amountStr);
    if (!Number.isFinite(amt) || amt < 0) {
      setResult(null);
      setRate(null);
      setError("");
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(amt);
      setRate(1);
      setError("");
      return;
    }

    (async () => {
      setLoading(true);
      setError("");
      try {
        const url = `https://api.frankfurter.app/latest?amount=${amt}&from=${fromCurrency}&to=${toCurrency}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Kon koersen niet ophalen.");
        const data = await res.json();

        if (data.rates && data.rates[toCurrency]) {
          const r = data.rates[toCurrency];
          setResult(r);
          setRate(r / amt);
        } else {
          setResult(null);
          setRate(null);
          setError("Geen resultaat voor dit valutapaar.");
        }
      } catch (e: any) {
        setResult(null);
        setRate(null);
        setError(e?.message || "Er ging iets mis.");
      } finally {
        setLoading(false);
      }
    })();
  }, [amountStr, fromCurrency, toCurrency]);

  
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
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
      constructor(c: CanvasRenderingContext2D, w: number, h: number) {
        this.ctx = c;
        this.x = Math.random() * w;
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
    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      meteors.forEach((m, i) => {
        m.update();
        m.draw();
        if (m.y > canvas.height) meteors.splice(i, 1);
      });
      if (Math.random() < 0.02) meteors.push(new Meteor(ctx, canvas.width, canvas.height));
      raf = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(raf);
    };
  }, []);

  const amount = parseAmount(amountStr) || 0;

  return (
    <div className="project3-container">
      <canvas ref={canvasRef} className="project3-background" />
      <div className="converter-box">
        <h1>💱 Currency Converter</h1>

        <div className="converter-row">
          <div className="field">
            <label>Bedrag</label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Van</label>
            <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              {symbols.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button className="swap" onClick={swapCurrencies} title="Wissel">
            ↔︎
          </button>

          <div className="field">
            <label>Naar</label>
            <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              {symbols.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading && <p className="muted">Koersen laden…</p>}
        {error && <p className="error">{error}</p>}

        <div className="result-card">
          <div className="line">
            <span>
              {amount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {fromCurrency}
            </span>
            <span className="arrow">=</span>
            <span className="highlight">
              {result !== null
                ? result.toLocaleString(undefined, { maximumFractionDigits: 2 })
                : "–"}{" "}
              {toCurrency}
            </span>
          </div>

          {rate !== null && (
            <div className="rate">
              1 {fromCurrency} ={" "}
              <strong>{rate.toLocaleString(undefined, { maximumFractionDigits: 6 })}</strong>{" "}
              {toCurrency}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Project3;
