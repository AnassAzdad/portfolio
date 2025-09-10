import ProjectCard from "./ProjectCard";

export default function Projects() {
  const projects = [
    { title: "Project 1", description: "Beschrijving project 1" },
    { title: "Project 2", description: "Beschrijving project 2" },
    { title: "Project 3", description: "Beschrijving project 3" },
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Mijn Projecten</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} title={project.title} description={project.description} />
        ))}
      </div>
    </section>
  );
}
