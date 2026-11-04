import { useEffect, useState } from 'react';
import { ArrowDown, FileText, Mail } from 'lucide-react';
import {
  academicPath,
  portfolioProjects,
  siteConfig,
  socialLinks,
} from '../lib/portfolio';
import {
  buttonPrimary,
  buttonSecondary,
  container,
  focusRing,
  panel,
} from '../lib/classes';

const countBy = (category) => portfolioProjects.filter((project) => project.category === category).length;

const currentStudy = academicPath.find((step) => step.ongoing);

const heroLinks = socialLinks.filter((link) => link.id === 'github' || link.id === 'linkedin');

export default function HeroSection({ cvFile }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const reveal = `transition duration-700 ease-out motion-reduce:transition-none ${
    visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
  }`;

  return (
    <section id="accueil" aria-labelledby="titrePrincipal" className="scroll-mt-16 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className={`${container} grid items-center gap-14 lg:grid-cols-12`}>
        <div className={`lg:col-span-7 ${reveal}`}>
          <h1
            id="titrePrincipal"
            className="font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {siteConfig.name}
          </h1>
          <p className="mt-6 font-display text-xl font-medium text-violet-400 dark:text-violet-500 sm:text-2xl">
            {siteConfig.role}
          </p>
          <p className="mt-6 max-w-xl text-lg text-muted dark:text-muted-dark">
            As a Master’s student in Computer Systems and Networks at FST Settat, I design and build complete applications: React and Next.js interfaces, Node.js or Spring Boot APIs, databases, real-time features and Flutter mobile applications.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projets" className={buttonPrimary}>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
              Explore projects
            </a>
            {cvFile ? (
              <a href={cvFile} target="_blank" rel="noopener noreferrer" className={buttonSecondary}>
                <FileText className="h-4 w-4" aria-hidden="true" />
                View CV
              </a>
            ) : null}
            <a href="#contact" className={buttonSecondary}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact me
            </a>
          </div>

          <ul className="mt-8 flex items-center gap-2">
            {heroLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.name} (new tab)`}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink dark:text-muted-dark dark:hover:bg-ink-dark/10 dark:hover:text-ink-dark ${focusRing}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <aside
          aria-label="At a glance"
          className={`${panel} p-6 sm:p-8 lg:col-span-5 ${reveal} delay-150`}
        >
          <dl className="divide-y divide-line dark:divide-line-dark">
            <div className="pb-5">
              <dt className="text-sm font-medium text-muted dark:text-muted-dark">Current studies</dt>
              <dd className="mt-1.5 font-display text-lg font-semibold leading-snug">
                {currentStudy.title} in {currentStudy.field}
              </dd>
              <dd className="text-sm text-muted dark:text-muted-dark">{currentStudy.institution}</dd>
            </div>
            <div className="py-5">
              <dt className="text-sm font-medium text-muted dark:text-muted-dark">Main stack</dt>
              <dd className="mt-1.5">React, Next.js, Node.js, Express, Spring Boot, Flutter</dd>
            </div>
            <div className="pt-5">
              <dt className="text-sm font-medium text-muted dark:text-muted-dark">Achievements</dt>
              <dd className="mt-1.5">
                {portfolioProjects.length} projects: {countBy('academique')} academic, {countBy('personnel')} personal, {countBy('stage')} internship and {countBy('freelance')} freelance.
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
