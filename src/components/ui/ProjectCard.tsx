import React from "react";
import { FaSquareGithub } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project & { date: string; color: string; num: string };
  infoRef: React.RefObject<HTMLDivElement>;
  imgRef: React.RefObject<HTMLDivElement>;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  infoRef,
  imgRef,
}) => {
  return (
    <div className="work-flex">
      <div className="work-box" ref={infoRef}>
        <div className="work-text-in">
          <span>Featured Project — {project.date}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="work-tags-container">
            {project.techStack.map((tagText, tagIdx) => (
              <span className="work-tags" key={`tag-${tagIdx}`}>
                {tagText}
              </span>
            ))}
          </div>
          <ul className="work-list">
            {project.features.map((featureText, featIdx) => (
              <li className="work-list-item" key={`feat-${featIdx}`}>
                {featureText}
              </li>
            ))}
          </ul>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              className="work-link-a"
              rel="noreferrer"
              data-cursor="disable"
            >
              <FaSquareGithub /> Code Repository <MdArrowOutward />
            </a>
          )}
        </div>
      </div>
      
      <div className="work-box" ref={imgRef}>
        <div className="work-img-in">
          <img
            src={project.image}
            alt={project.title}
          />
          <div
            className="work-img-hover"
            style={{ background: project.color }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
