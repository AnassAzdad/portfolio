import ProjectCard from "../../components/ProjectCard";

const projects = [
  {
    title: "Portfolio Website",
    description: "Mijn persoonlijke portfolio gebouwd met Next.js en Tailwind CSS.",
    link: "#",
  },
  {
    title: "React ToDo App",
    description: "Een eenvoudige ToDo applicatie in React.",
    link: "#",
  },
];

export default function Projects() {
  return (
    <main className="min-h-screen p-8">
      <h2 className="text-4xl font-bold text-center mb-8">Mijn Projecten</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </main>
  );
  <body className="flex flex-col min-h-screen">
  <Navbar />
  <main className="flex-1">{children}</main>
  <Footer />
</body>

}
