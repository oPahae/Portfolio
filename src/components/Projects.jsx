import { useState, useEffect } from 'react';
import { Code2, User, Coins, ExternalLink, Github, Filter, Layers } from 'lucide-react';
import { projects } from '@/utils/constants';

const Projects = () => {
  const [filter, setFilter] = useState('tous');

  const filterTypes = [
    { id: 'tous', label: 'Tous les Projets', icon: Layers },
    { id: 'académique', label: 'Académiques', icon: Code2 },
    { id: 'personnel', label: 'Personnels', icon: User },
    { id: 'commercialisé', label: 'Commercialisés', icon: Coins }
  ];

  const filteredProjects = filter === 'tous'
    ? projects
    : projects.filter(project => project.type === filter);

  const sortedProjects = [...filteredProjects].sort((a, b) => b.lvl - a.lvl);

  return (
    <div className="min-h-screen bg-black/80 backdrop-blur-sm text-white flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-cyan-500 to-cyan-500 bg-clip-text text-transparent mb-4">
            Mes Projets
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full mx-auto"></div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-gray-400 mb-4">
            <Filter className="w-5 h-5" />
            <span className="font-semibold">Filtrer par Type</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filterTypes.map((type, index) => (
              <button
                key={`${type.id}-${index}`}
                onClick={() => setFilter(type.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  filter === type.id
                    ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white'
                    : 'bg-gray-900 text-gray-300 hover:text-white'
                }`}
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <div
              key={project._id}
              className="relative overflow-hidden rounded-3xl backdrop-blur-3xl p-[2px] transform transition-all duration-300"
            >
              <div className="backdrop-blur-sm rounded-3xl p-6 h-full flex flex-col bg-black/50">
                {/* Project Header */}
                <div className="mb-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                      {project.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold">
                      {project.type}
                    </span>
                  </div>
                  <div className="h-0.5 w-16 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full"></div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs rounded-lg border border-pink-500 bg-gray-900 text-gray-300 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 text-sm font-medium hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 text-sm font-medium hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:text-white transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Site
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedProjects.length === 0 && (
          <div className="text-center py-20 col-span-full">
            <p className="text-gray-400 text-lg">Aucun projet trouvé pour cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default Projects;
