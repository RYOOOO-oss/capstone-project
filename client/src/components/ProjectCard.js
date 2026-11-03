import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded mb-4" />}
      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="flex space-x-4">
        {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Live Demo</a>}
      </div>
    </div>
  );
};

export default ProjectCard;
