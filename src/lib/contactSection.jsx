import { ArrowUpRight } from 'lucide-react';
import SectionHeading from './sectionHeading';
import { socialLinks } from '../lib/portfolio';
import { container, focusRing, sectionSpacing } from '../lib/classes';

const descriptions = {
  github: 'Source code of my projects',
  linkedin: 'Professional background and recommendations',
  whatsapp: 'Direct message',
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="titreContact"
      className={`${sectionSpacing} border-t border-line dark:border-line-dark`}
    >
      <div className={`${container} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-5">
          <SectionHeading
            id="titreContact"
            title="Contact"
            description="To discuss a project, an internship or an opportunity, choose the channel that suits you."
          />
        </div>
        <ul className="divide-y divide-line border-y border-line dark:divide-line-dark dark:border-line-dark lg:col-span-7 lg:self-start">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.name} : ${descriptions[link.id]} (new tab)`}
                  className={`group flex items-center justify-between gap-4 py-6 transition-colors hover:text-violet-400 dark:hover:text-violet-500 ${focusRing}`}
                >
                  <span className="flex items-center gap-4">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                    <span>
                      <span className="block font-display text-xl font-semibold">{link.name}</span>
                      <span className="block text-sm text-muted dark:text-muted-dark">
                        {descriptions[link.id]}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
