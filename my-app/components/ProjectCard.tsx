export default function ProjectCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg hover:scale-105 transition-transform">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
