import { Link } from "react-router-dom";
import { FiArrowUpRight } from "./icons";
import type { ProjectInfo } from "../translations";
import "./ProjectCard.css";

type Props = {
  project: ProjectInfo;
  index: number;
  openLabel: string;
};

export default function ProjectCard({ project, index, openLabel }: Props) {
  return (
    <Link to={`/${project.slug}`} className="project-card">
      <div className="project-card-media">
        <img src={project.img} alt="" loading="lazy" />
      </div>
      <div className="project-card-body">
        <div className="project-card-meta">
          <span>P{String(index + 1).padStart(2, "0")}</span>
          <span>{project.kicker}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-card-foot">
          <ul className="tags">
            {project.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
          <span className="project-card-open">
            {openLabel} <FiArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
