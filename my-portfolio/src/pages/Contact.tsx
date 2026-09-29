import { useState } from "react";
import { FiArrowRight, FiDownload, FiGithub, FiMapPin } from "../components/icons";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/LanguageContext";
import { GITHUB_URL, translations } from "../translations";
import "./Contact.css";

type Status = { kind: "idle" | "sending" | "ok" | "bad"; text: string };

function Contact() {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ kind: "sending", text: t.sending });

    emailjs
      .send("service_xxx", "template_xxx", form, "publicKey_xxx")
      .then(() => {
        setStatus({ kind: "ok", text: t.sent });
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus({ kind: "bad", text: t.failed }));
  };

  return (
    <div className="page">
      <section className="container contact-layout">
        <div className="contact-intro">
          <span className="eyebrow rise">{t.eyebrow}</span>
          <h1 className="page-title rise rise-2">{t.title}</h1>
          <p className="lead rise rise-3">{t.description}</p>

          <ul className="contact-facts rise rise-4">
            <li>
              <FiMapPin aria-hidden="true" /> {t.location}
            </li>
            <li>
              <FiGithub aria-hidden="true" />
              <a href={GITHUB_URL} target="_blank" rel="noreferrer">
                github.com/AnassAzdad
              </a>
            </li>
          </ul>

          <div className="cv-card rise rise-4">
            <div>
              <h2>{t.cvTitle}</h2>
              <p>{t.cvText}</p>
            </div>
            <a href="/CV_Anass_Azdad.pdf" download className="btn">
              <FiDownload aria-hidden="true" /> {t.cv}
            </a>
          </div>
        </div>

        <form className="contact-form rise rise-3" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="contact-name">{t.name}</label>
            <input
              id="contact-name"
              className="input"
              type="text"
              autoComplete="name"
              placeholder={t.namePh}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="contact-email">{t.email}</label>
            <input
              id="contact-email"
              className="input"
              type="email"
              autoComplete="email"
              placeholder={t.emailPh}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="contact-message">{t.message}</label>
            <textarea
              id="contact-message"
              className="input"
              placeholder={t.messagePh}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <div className="form-foot">
            <button type="submit" className="btn btn-primary" disabled={status.kind === "sending"}>
              {status.kind === "sending" ? t.sending : t.send} <FiArrowRight aria-hidden="true" />
            </button>
            {status.kind !== "idle" && status.kind !== "sending" && (
              <p className={`status is-${status.kind}`} role="status">
                {status.text}
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}

export default Contact;
