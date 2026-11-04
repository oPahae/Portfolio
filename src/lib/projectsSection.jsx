import { useMemo, useState } from 'react';
import { Briefcase, Building2, ExternalLink, GraduationCap, Github, User } from 'lucide-react';
import SectionHeading from './sectionHeading';
import { portfolioProjects, projectCategories } from '../lib/portfolio';
import { chip, container, focusRing, panel, sectionSpacing, textLink } from '../lib/classes';

const categoryIcons = {
  academique: GraduationCap,
  personnel: User,
  stage: Briefcase,
  freelance: Building2,
};

const categoryLabels = Object.fromEntries(projectCategories.map((item) => [item.id, item.label]));

const filters = [{ id: 'all', label: 'All' }, ...projectCategories];

const countFor = (id) =>
  id === 'all' ? portfolioProjects.length : portfolioProjects.filter((project) => project.category === id).length;

function ProjectCard({ project, wide }) {
  const Icon = categoryIcons[project.category];

  return (
    <article
      className={`${panel} flex flex-col gap-6 p-6 transition-colors hover:border-violet-400/50 dark:hover:border-violet-500/40 sm:p-8 ${
        wide ? 'md:col-span-2 md:grid md:grid-cols-5 md:gap-12' : ''
      }`}
    >
      <div className={wide ? 'md:col-span-3' : ''}>
        <div className="flex items-center justify-between gap-4 text-sm text-muted dark:text-muted-dark">
          <span className="inline-flex items-center gap-2">
            <Icon className="h-4 w-4" aria-hidden="true" />
            {categoryLabels[project.category]}
          </span>
          <span className="capitalize">{project.dateLabel}</span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{project.title}</h3>
        {project.description ? (
          <p className="mt-3 text-muted dark:text-muted-dark">{project.description}</p>
        ) : null}
      </div>

      <div className={`mt-auto flex flex-col gap-5 ${wide ? 'md:col-span-2 md:mt-0 md:justify-end' : ''}`}>
        <ul className="flex flex-wrap gap-2" aria-label={`Technologies of ${project.title}`}>
          {project.technologies.map((name) => (
            <li key={name} className={chip}>
              {name}
            </li>
          ))}
        </ul>
        {project.github || project.website ? (
          <div className="flex flex-wrap gap-x-5">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Source code of ${project.title} on GitHub (new tab)`}
                className={textLink}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                Source code
              </a>
            ) : null}
            {project.website ? (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit the ${project.title} website (new tab)`}
                className={textLink}
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Visit website
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState('all');

  const visible = useMemo(
    () =>
      active === 'all'
        ? portfolioProjects
        : portfolioProjects.filter((project) => project.category === active),
    [active]
  );

  return (
    <section
      id="projets"
      aria-labelledby="titreProjets"
      className={`${sectionSpacing} border-t border-line dark:border-line-dark`}
    >
      <div className={container}>
        <SectionHeading
          id="titreProjets"
          title="Projects"
          description="Academic, personal and internship projects and freelance assignments, ranked by level."
        />

        <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const selected = active === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActive(filter.id)}
                aria-pressed={selected}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${focusRing} ${
                  selected
                    ? 'border-ink bg-ink text-paper dark:border-ink-dark dark:bg-ink-dark dark:text-paper-dark'
                    : 'border-line text-muted hover:border-violet-400 hover:text-ink dark:border-line-dark dark:text-muted-dark dark:hover:border-violet-500 dark:hover:text-ink-dark'
                }`}
              >
                {filter.label}
                <span className="tabular-nums opacity-70">{countFor(filter.id)}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} projects shown
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} wide={index % 3 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
