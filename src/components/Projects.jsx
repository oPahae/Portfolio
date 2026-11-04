import { useState } from 'react'
import {
  Code2,
  User,
  Coins,
  ExternalLink,
  Github,
  Filter,
  Layers,
  Building2,
  FolderCode,
  Calendar,
  ArrowUpRight,
  FileCode2,
  FileText,
} from 'lucide-react'

import { projects } from '@/utils/constants'

const Projects = () => {
  const [filter, setFilter] = useState('tous')

  const filterTypes = [
    { id: 'tous', label: 'All Projects', icon: Layers, gradient: 'from-pink-500 to-purple-500' },
    { id: 'académique', label: 'Academic', icon: Code2, gradient: 'from-purple-500 to-cyan-500' },
    { id: 'stage', label: 'Internships', icon: Building2, gradient: 'from-cyan-500 to-pink-500' },
    { id: 'personnel', label: 'Personal', icon: User, gradient: 'from-orange-500 to-pink-500' },
    { id: 'freelance', label: 'Freelance', icon: Coins, gradient: 'from-pink-500 to-cyan-500' }
  ]

  const filteredProjects = filter === 'tous'
    ? projects
    : projects.filter(project => project.type === filter)

  const sortedProjects = [...filteredProjects].sort((a, b) => b.lvl - a.lvl)

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-20 text-slate-800 sm:px-6">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-pink-200/40 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-200/40 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200/40 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
            <FolderCode size={16} />
            Professional Portfolio
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            My Professional
            <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Discover my academic projects, professional experiences,
            personal developments, and freelance achievements.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-500 to-cyan-500" />
            <h2 className="text-2xl font-bold text-slate-900">
              My Projects Library
            </h2>
          </div>

          <div className="mb-5 flex items-center gap-2 text-slate-500">
            <Filter size={18} className="text-purple-500" />
            <span className="text-sm font-semibold">Filter by category</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {filterTypes.map(type => {
              const Icon = type.icon
              const isActive = filter === type.id

              return (
                <button
                  key={type.id}
                  onClick={() => setFilter(type.id)}
                  className={`flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold transition-all duration-300 hover:-translate-y-1 ${
                    isActive
                      ? `border-transparent bg-gradient-to-r ${type.gradient} text-white shadow-lg shadow-purple-500/10`
                      : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-600'
                  }`}
                >
                  <Icon size={18} />
                  {type.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {sortedProjects.length > 0 ? (
            sortedProjects.map((project, index) => (
              <div
                key={project._id ?? index}
                className="group relative pt-3 transition-all duration-500 hover:-translate-y-3"
              >

                {/* Second Paper */}
                <div className="absolute inset-x-3 bottom-0 top-5 rotate-3 rounded-xl border border-slate-200 bg-white transition-transform duration-500 group-hover:rotate-6" />

                {/* Main Paper */}
                <div className="relative flex min-h-[430px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-6 transition-all duration-500 group-hover:border-purple-200 group-hover:shadow-xl group-hover:shadow-purple-500/5">

                  {/* Paper Header */}
                  <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-4">

                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                        <FileCode2 size={18} />
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Project #{index + 1}
                      </span>
                    </div>

                    <span className="rounded-md bg-purple-50 px-2 py-1 text-[10px] font-bold uppercase text-purple-700">
                      {project.type}
                    </span>
                  </div>

                  {/* Paper Body */}
                  <div className="flex flex-1 flex-col py-6">

                    <div className="mb-5 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-purple-100 bg-gradient-to-br from-pink-50 to-purple-50 transition-transform duration-500 group-hover:scale-110">
                        <Code2 size={30} className="text-purple-600" />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-xl font-extrabold leading-snug text-slate-800">
                        {project.title}
                      </h3>

                      <div className="mx-auto my-4 h-1 w-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

                      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500">
                        <Layers size={15} className="shrink-0 text-purple-500" />
                        <span className="capitalize">{project.type}</span>
                      </div>
                    </div>

                    <p className="mt-5 text-center text-sm leading-6 text-slate-500">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mt-5">
                      <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <Code2 size={14} className="text-purple-500" />
                        Technologies
                      </div>

                      <div className="flex flex-wrap justify-center gap-2">
                        {project.technologies?.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="rounded-lg border border-purple-100 bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Paper Footer */}
                  <div className="mt-auto flex items-center justify-between border-t border-dashed border-slate-200 pt-4">

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <FileText size={14} className="text-purple-500" />
                      Project Documentation
                    </div>

                    <div className="flex items-center gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} source code`}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white transition-all duration-300 hover:scale-110 hover:from-purple-600 hover:to-cyan-600"
                        >
                          <Github size={18} />
                        </a>
                      )}

                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title} website`}
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-cyan-600 text-white transition-all duration-300 hover:scale-110 hover:from-pink-500 hover:to-purple-600"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Paper Corner */}
                  <div className="absolute right-0 top-0 h-10 w-10 overflow-hidden">
                    <div className="absolute -right-5 -top-5 h-10 w-10 rotate-45 bg-gradient-to-br from-pink-400 to-purple-500" />
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-slate-200 bg-white py-20 text-center">
              <FolderCode size={40} className="mx-auto mb-4 text-slate-300" />

              <p className="text-lg font-semibold text-slate-700">
                No projects found
              </p>

              <p className="mt-2 text-sm text-slate-400">
                This category does not contain any projects yet.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-20 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400" />

          <FolderCode size={18} className="text-purple-500" />

          <span className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
            Personal Project Collection
          </span>

          <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400" />
        </div>

      </div>
    </section>
  )
}

export default Projects