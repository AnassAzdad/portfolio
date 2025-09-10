export default function Contact() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <section className="max-w-md w-full bg-white p-6 rounded-lg shadow">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact</h2>
        <p className="text-gray-700 mb-6 text-center">
          Stuur me een bericht via email of socials!
        </p>
        <form className="flex flex-col space-y-4">
          <input type="text" placeholder="Naam" className="border p-2 rounded" />
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <textarea placeholder="Bericht" className="border p-2 rounded" rows={4}></textarea>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
            Verstuur
          </button>
        </form>
      </section>
    </main>
  );
}
