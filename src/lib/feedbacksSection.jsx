import { Linkedin } from 'lucide-react';
import SectionHeading from './sectionHeading';
import { testimonials } from '../lib/portfolio';
import { container, panel, sectionSpacing, textLink } from '../lib/classes';

export default function FeedbacksSection() {
  return (
    <section
      id="temoignages"
      aria-labelledby="titreTemoignages"
      className={`${sectionSpacing} border-t border-line dark:border-line-dark`}
    >
      <div className={container}>
        <SectionHeading
          id="titreTemoignages"
          title="Testimonials"
          description="Feedback from people I have worked with or who have followed my work."
        />

        <ul className="gap-5 space-y-5 md:columns-2 lg:columns-3">
          {testimonials.map((item) => (
            <li key={item.id} className="break-inside-avoid">
              <figure className={`${panel} p-6 sm:p-7`}>
                <blockquote className="text-lg leading-relaxed">
                  <p>{item.text}</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5 dark:border-line-dark">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-400 text-sm font-semibold text-white dark:bg-violet-500 dark:text-paper-dark"
                  >
                    {item.initials}
                  </span>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted dark:text-muted-dark">{item.role}</p>
                    {item.linkedin ? (
                      <a
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn profile of ${item.name} (new tab)`}
                        className={textLink}
                      >
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                        LinkedIn profile
                      </a>
                    ) : null}
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
