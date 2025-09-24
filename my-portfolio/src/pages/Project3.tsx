import { useEffect, useRef, useState } from "react";
import "./Project3.css";

type SymbolsMap = Record<string, { description: string; code: string }>;

const FALLBACK_SYMBOLS = ["EUR", "USD", "MAD", "GBP", "JPY", "CAD"];

// Kleine helper om bedrag veilig te parsen (ondersteunt ook komma’s)
function parseAmount(input: string): number {
  if (input == null) return NaN;
  // spaties eruit; NL komma → punt
  const normalized = String(input).trim().replace(",", ".");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : NaN;
}

function Project3() {
  // Houd de raw string aan (voorkomt rare jumps tijdens typen)
  const [amountStr, setAmountStr] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("EUR");
  const [toCurrency, setToCurrency] = useState<string>("USD");

  const [symbols, setSymbols] = useState<string[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1) Laad alle valuta’s één keer
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://api.exchangerate.host/symbols");
        if (!res.ok) throw new Error("Kon valuta-symbolen niet laden.");
        const data = (await res.json()) as { symbols?: SymbolsMap };
        const list = data.symbols ? Object.keys(data.symbols) : [];
        if (!cancelled) setSymbols(list.length ? list : FALLBACK_SYMBOLS);
      } catch {
        if (!cancelled) setSymbols(FALLBACK_SYMBOLS);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2) Converteer automatisch bij wijzigingen
  useEffect(() => {
    const amt = parseAmount(amountStr);

    // Lege of invalide input → toon geen error, gewoon geen resultaat
    if (!Number.isFinite(amt) || amt < 0) {
      setResult(null);
      setRate(null);
      setError("");
      return;
    }

    // Zelfde valuta → direct 1:1
    if (fromCurrency === toCurrency) {
      setResult(amt);
      setRate(1);
      setError("");
      return;
    }

    let aborted = false;
    const controller = new AbortController();

    const convert = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `https://api.exchangerate.host/convert?from=${encodeURIComponent(
          fromCurrency
        )}&to=${encodeURIComponent(toCurrency)}&amount=${encodeURIComponent(
          amt
        )}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error("Kon koersen niet ophalen.");
        const data = await res.json();

        // Sterkere checks (sommige responses geven result:null bij fout)
        if (data?.success && typeof data.result === "number") {
          if (!aborted) {
            setResult(data.result);
            setRate(typeof data.info?.rate === "number" ? data.info.rate : null);
            setError("");
          }
        } else {
          if (!aborted) {
            setResult(null);
            setRate(null);
            setError(`Kon ${fromCurrency} → ${toCurrency} niet converteren.`);
          }
        }
      } catch (e: any) {
        if (!aborted) {
          if (e?.name === "AbortError") return; // genegeerd
          setResult(null);
          setRate(null);
          setError(e?.message || "Er ging iets mis met de conversie.");
        }
      } finally {
        if (!aborted) setLoading(false);
      }
    };

    convert();

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [amountStr, fromCurrency, toCurrency]);

  // 3) Swap-knop
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // 4) Meteoren achtergrond (zoals je andere pagina’s)
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

  const amount = Number.isFinite(parseAmount(amountStr))
    ? parseAmount(amountStr)
    : 0;

  // Zorg dat dropdowns altijd de huidige keuzes tonen, ook als symbols nog laden
  const options = Array.from(
    new Set([...(symbols.length ? symbols : FALLBACK_SYMBOLS), fromCurrency, toCurrency])
  );

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
              onBlur={(e) => {
                // bij verlaten veld: mooi normaliseren
                const n = parseAmount(e.target.value);
                if (Number.isFinite(n)) setAmountStr(String(n));
              }}
            />
          </div>

          <div className="field">
            <label>Van</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {options.map((c) => (
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
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {options.map((c) => (
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
            1 {fromCurrency} = <strong>{rate.toLocaleString(undefined, { maximumFractionDigits: 6 })}</strong> {toCurrency}
          </div>
        )}
        </div>

        {!loading && !error && result === null && (
          <p className="muted">Voer een bedrag in om te converteren.</p>
        )}

        {!loading && !error && result !== null && (
          <p className="muted">
            Live rates via <strong>exchangerate.host</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default Project3;
