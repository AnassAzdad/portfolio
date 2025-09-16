import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
}

export default function ProjectCard({ title, description, link }: ProjectCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-md hover:shadow-cyan-500/30 transition p-6 flex flex-col">
      <h3 className="text-2xl font-semibold text-cyan-400 mb-3">{title}</h3>
      <p className="text-gray-400 flex-1">{description}</p>
      <Link
        href={link}
        className="mt-4 inline-block text-sm font-medium text-cyan-300 hover:text-cyan-200 transition"
      >
        Bekijk project →
      </Link>
    </div>
  );
}
