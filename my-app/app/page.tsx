export default function Home() {
  return (
    <section className="space-y-24 text-center">

      {/* Hero Section */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-500 tracking-tight">
          Hallo, ik ben Anass
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Frontend Developer met een passie voor webontwikkeling, design en interactieve projecten.
        </p>
        <a
          href="#projects"
          className="inline-block mt-6 px-10 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-full shadow-md hover:bg-cyan-600 hover:shadow-lg transition transform hover:scale-105"
        >
          Bekijk mijn projecten
        </a>
      </div>

      {/* Skills Section */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-100 tracking-wide">Mijn vaardigheden</h2>
        <div className="flex justify-center flex-wrap gap-6 mt-4">
          <span className="bg-gray-700 px-6 py-3 rounded-lg font-semibold text-gray-100 shadow hover:bg-cyan-400 hover:text-gray-900 transition transform cursor-default">
            HTML
          </span>
          <span className="bg-gray-700 px-6 py-3 rounded-lg font-semibold text-gray-100 shadow hover:bg-cyan-400 hover:text-gray-900 transition transform cursor-default">
            CSS
          </span>
          <span className="bg-gray-700 px-6 py-3 rounded-lg font-semibold text-gray-100 shadow hover:bg-cyan-400 hover:text-gray-900 transition transform cursor-default">
            JS
          </span>
          <span className="bg-gray-700 px-6 py-3 rounded-lg font-semibold text-gray-100 shadow hover:bg-cyan-400 hover:text-gray-900 transition transform cursor-default">
            PHP
          </span>
        </div>
      </div>

      {/* Highlight Projects Section */}
      <div id="projects" className="space-y-12 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-wide">Uitgelichte Projecten</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((proj) => (
            <div
              key={proj}
              className="bg-gray-800 p-6 rounded-2xl shadow-md hover:scale-105 hover:shadow-cyan-400/50 transition-transform cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-cyan-500 mb-2">Project {proj}</h3>
              <p className="text-gray-400 text-sm">
                Korte beschrijving van het project. Wat het doet en welke technologieën ik gebruikte.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16">
        <a
          href="/contact"
          className="inline-block px-10 py-3 bg-cyan-500 text-gray-900 font-semibold rounded-full shadow-md hover:bg-cyan-600 hover:shadow-lg transition transform hover:scale-105"
        >
          Neem contact op
        </a>
      </div>
    </section>
  );
}
