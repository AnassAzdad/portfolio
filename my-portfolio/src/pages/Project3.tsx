import { useEffect, useState } from "react";
import { FiRepeat } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import ProjectShell from "../components/ProjectShell";
import "./Project3.css";

const FALLBACK_SYMBOLS = ["EUR", "USD", "GBP", "JPY", "CAD"];

function parseAmount(input: string): number {
  if (input == null) return NaN;
  const normalized = String(input).trim().replace(",", ".");
  const num = Number(normalized);
  return Number.isFinite(num) ? num : NaN;
}

function Project3() {
  const { language } = useLanguage();
  const t = translations[language].project3;

  const [amountStr, setAmountStr] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("EUR");
  const [toCurrency, setToCurrency] = useState<string>("USD");

  const [symbols, setSymbols] = useState<string[]>(FALLBACK_SYMBOLS);
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<"" | "noResult" | "failed">("");

  // Haal currency lijst op
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

  // Converteer bedrag
  useEffect(() => {
    const amt = parseAmount(amountStr);
    if (!Number.isFinite(amt) || amt <= 0) {
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

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const url = `https://api.frankfurter.app/latest?amount=${amt}&from=${fromCurrency}&to=${toCurrency}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("fetch");
        const data = await res.json();
        if (cancelled) return;

        const toAmount = data?.rates?.[toCurrency];
        if (toAmount !== undefined) {
          setResult(toAmount);
          setRate(toAmount / amt);
        } else {
          setResult(null);
          setRate(null);
          setError("noResult");
        }
      } catch {
        if (cancelled) return;
        setResult(null);
        setRate(null);
        setError("failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [amountStr, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const amount = parseAmount(amountStr) || 0;
  const fmt = (n: number, digits = 2) =>
    n.toLocaleString(language === "nl" ? "nl-NL" : "en-GB", { maximumFractionDigits: digits });

  return (
    <ProjectShell slug="project3">
      <div className="converter">
        <div className="converter-row">
          <div className="field">
            <label htmlFor="fx-amount">{t.amount}</label>
            <input
              id="fx-amount"
              className="input"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="fx-from">{t.from}</label>
            <select
              id="fx-from"
              className="input"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {symbols.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className="icon-btn swap-btn"
            onClick={swapCurrencies}
            aria-label={t.swap}
            title={t.swap}
          >
            <FiRepeat />
          </button>

          <div className="field">
            <label htmlFor="fx-to">{t.to}</label>
            <select
              id="fx-to"
              className="input"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {symbols.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="fx-result" aria-live="polite">
          <p className="fx-from">
            {fmt(amount)} {fromCurrency} =
          </p>
          <p className="fx-to">
            {result !== null ? fmt(result) : "—"} <span>{toCurrency}</span>
          </p>
          <div className="fx-meta">
            {rate !== null && (
              <span>
                {t.rate}: 1 {fromCurrency} = {fmt(rate, 6)} {toCurrency}
              </span>
            )}
            <span>{t.source}</span>
          </div>
        </div>

        {loading && <p className="status">{t.loading}</p>}
        {error && <p className="status is-bad">{t[error]}</p>}
      </div>
    </ProjectShell>
  );
}

export default Project3;
