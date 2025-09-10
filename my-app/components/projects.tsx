import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 dark:bg-black">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
        Mijn Projecten
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <ProjectCard
          title="Portfolio Website"
          description="Een moderne persoonlijke portfolio site met Next.js en Tailwind."
          image="/project1.jpg"
        />
        <ProjectCard
          title="To-do App"
          description="Een simpele maar strakke React to-do app."
          image="/project2.jpg"
        />
        <ProjectCard
          title="Game UI"
          description="Interface voor een kleine game met React."
          image="/project3.jpg"
        />
      </div>
    </section>
  );
}
