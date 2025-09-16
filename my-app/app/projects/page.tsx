import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "To-Do App",
    description: "Een simpele takenlijst waarin je taken kan toevoegen en verwijderen.",
    link: "https://github.com/jouwnaam/todo-app", 
  },
  {
    title: "Calculator",
    description: "Een rekenmachine-app gebouwd met React en eenvoudige state-logica.",
    link: "https://github.com/jouwnaam/calculator",
  },
  {
    title: "Color Palette Generator",
    description: "Een app die random kleuren genereert en kopieerbare hex-codes toont.",
    link: "https://github.com/jouwnaam/color-palette-generator",
  },
];



export default function Projects() {
  return (
    <section className="min-h-screen px-6 py-12">
      <h2 className="text-4xl font-bold text-cyan-400 mb-12 text-center">
        Mijn Projecten
      </h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
}
