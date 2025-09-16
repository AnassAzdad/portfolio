// contact/page.tsx

"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/xandzdvv", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("Bedankt! Je bericht is verzonden ✅");
      form.reset();
    } else {
      setStatus("Oeps... er ging iets mis ❌");
    }
  };

  return (
    <section className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Neem contact op</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-6 rounded-2xl shadow-lg"
      >
        <label className="flex flex-col">
          <span className="mb-1 text-gray-300">Naam</span>
          <input
            type="text"
            name="name"
            required
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-300">Email</span>
          <input
            type="email"
            name="email"
            required
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 text-gray-300">Bericht</span>
          <textarea
            name="message"
            rows={5}
            required
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </label>

   <button
  type="submit"
  className="mt-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg 
             transition-transform duration-200 hover:scale-105 active:scale-95"
>
  Verstuur
</button>

      </form>

      {status && (
        <p className="mt-4 text-center text-cyan-400 font-medium">{status}</p>
      )}
    </section>
  );
}

