import SectionHeading from './sectionHeading';
import { academicPath } from '../lib/portfolio';
import { chip, container } from '../lib/classes';

export default function AchievementsSection() {
  return (
    <section
      id="parcours"
      aria-labelledby="titreParcours"
      className="scroll-mt-16 border-t border-line py-14 dark:border-line-dark sm:py-20"
    >
      <div className={container}>
        <SectionHeading id="titreParcours" title="Academic background" />

        <ol className="relative space-y-7 border-l border-line pl-6 dark:border-line-dark sm:pl-8">
          {academicPath.map((step) => (
            <li key={step.id} className="relative grid gap-3 lg:grid-cols-12 lg:gap-8">
              <span
                aria-hidden="true"
                className={`absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full border-2 border-violet-400 dark:border-violet-500 sm:-left-[39px] ${
                  step.ongoing ? 'bg-paper dark:bg-paper-dark' : 'bg-violet-400 dark:bg-violet-500'
                }`}
              />
              <div className="lg:col-span-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{step.title}</h3>
                  {step.ongoing ? (
                    <span className={`${chip} border-violet-400 text-violet-400 dark:border-violet-500 dark:text-violet-500`}>
                      Ongoing
                    </span>
                  ) : (
                    <span className="text-sm text-muted dark:text-muted-dark">{step.date}</span>
                  )}
                </div>
                <p className="mt-0.5">{step.field}</p>
                <p className="text-sm text-muted dark:text-muted-dark">{step.institution}</p>
              </div>
              <dl className="flex flex-wrap content-start gap-2 lg:col-span-7">
                {step.points.map((point) => (
                  <div
                    key={point.semester}
                    className="inline-flex items-baseline gap-2 rounded-md bg-surface px-3 py-1.5 text-sm ring-1 ring-line dark:bg-surface-dark dark:ring-line-dark"
                  >
                    <dt className="text-muted dark:text-muted-dark">
                      <span aria-hidden="true">{point.short}</span>
                      <span className="sr-only">{point.semester}</span>
                    </dt>
                    <dd>
                      {point.grade ? (
                        <>
                          <span className="font-semibold tabular-nums">{point.grade}</span>{' '}
                          <span className="text-muted dark:text-muted-dark">{point.mention}</span>
                        </>
                      ) : (
                        <span className="text-muted dark:text-muted-dark">{point.status}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
