export default function About() {
  return (
    <section className="max-w-3xl mx-auto space-y-12 py-12">

      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-cyan-500 tracking-tight">
          Over mij
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Hey! Ik ben Anass, een software developer met interesse in moderne webtechnologieën zoals React, Next.js en Tailwind CSS. 
          Ik hou ervan om ideeën om te zetten in gebruiksvriendelijke en stijlvolle websites.
          <br /><br />
          Tijdens mijn projecten focus ik op clean code, gebruiksvriendelijkheid en responsive design, zodat elke website niet alleen mooi, maar ook functioneel is.
        </p>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
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
