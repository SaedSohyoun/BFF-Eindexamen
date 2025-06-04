import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects, onDelete, onEdit, onToggleFavorite }) => {
    return (
        <div className="project-list">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onToggleFavorite={onToggleFavorite}
                />
            ))}
        </div>
    );
};

export default ProjectList;
