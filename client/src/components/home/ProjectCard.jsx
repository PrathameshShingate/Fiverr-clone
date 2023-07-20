import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link to="/gigs?project=dev">
      <div className="project-card w-[300px] h-[300px] mb-2 rounded-md">
        <img
          src={project.img}
          alt=""
          className="w-full h-3/4 object-cover object-center rounded-t-md hover:opacity-90 transition-all duration-300"
        />
        <div className="flex items-center gap-3 p-4">
          <img
            src={project.pp}
            alt=""
            className="w-10 h-10 rounded-full object-cover object-center"
          />
          <div>
            <h2 className="text-[#404145] text-sm font-semibold">
              {project.cat}
            </h2>
            <span className="text-[#95979d] text-sm">{project.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
