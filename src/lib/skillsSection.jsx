import SectionHeading from './sectionHeading';
import { skillCategories } from '../lib/portfolio';
import { container, sectionSpacing } from '../lib/classes';

const iconTile =
  'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-white dark:border-line-dark';

export default function SkillsSection() {
  return (
    <section
      id="competences"
      aria-labelledby="titreCompetences"
      className={`${sectionSpacing} border-t border-line dark:border-line-dark`}
    >
      <div className={container}>
        <SectionHeading
          id="titreCompetences"
          title="Technical skills"
          description="The technologies I use, grouped by domain. Those marked “Used in project” appear in my work."
        />

        <div className="divide-y divide-line dark:divide-line-dark">
          {skillCategories.map((category) => (
            <div key={category.id} className="grid gap-6 py-10 first:pt-0 last:pb-0 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <h3 className="font-display text-xl font-semibold tracking-tight">{category.label}</h3>
                <p className="mt-2 text-sm text-muted dark:text-muted-dark">{category.description}</p>
              </div>
              <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:col-span-9 xl:grid-cols-3">
                {category.skills.map((skill) => (
                  <li key={skill.id} className="flex items-start gap-3">
                    <span className={iconTile}>
                      <img
                        src={skill.icon}
                        alt=""
                        width={24}
                        height={24}
                        loading="lazy"
                        decoding="async"
                        className="h-6 w-6 object-contain"
                      />
                    </span>
                    <div>
                      <p className="font-medium">{skill.label}</p>
                      <p className="mt-0.5 text-sm text-muted dark:text-muted-dark">
                        {skill.shortDescription}
                      </p>
                    </div>
                  </li>
                ))}
                {category.extras.map((extra) => (
                  <li key={extra.label} className="flex items-start gap-3">
                    <span className={iconTile}>
                      <img
                        src={extra.icon}
                        alt=""
                        width={24}
                        height={24}
                        loading="lazy"
                        decoding="async"
                        className="h-6 w-6 object-contain"
                      />
                    </span>
                    <div>
                      <p className="font-medium">{extra.label}</p>
                      <p className="mt-0.5 text-sm text-muted dark:text-muted-dark">Used in project</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
