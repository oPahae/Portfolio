import { useMemo, useState } from "react";
import {
  Search,
  Layers,
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
  X,
} from "lucide-react";
import { SKILLS } from "../utils/constants";

const CATEGORIES = [
  {
    id: "langages",
    label: "Languages",
    icon: Code2,
    gradient: "from-pink-500 to-purple-500",
    keys: ["js", "java", "php", "dart", "c", "html", "css"],
  },
  {
    id: "frontend",
    label: "Frontend & Mobile",
    icon: Layout,
    gradient: "from-purple-500 to-cyan-500",
    keys: ["react", "nextjs", "tailwind", "gsap", "flutter"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    gradient: "from-cyan-500 to-pink-500",
    keys: ["nodejs", "express", "springboot", "socketIO"],
  },
  {
    id: "data",
    label: "Databases",
    icon: Database,
    gradient: "from-pink-500 to-cyan-500",
    keys: ["mysql", "mongodb", "firebase"],
  },
  {
    id: "devops",
    label: "DevOps & Tools",
    icon: Wrench,
    gradient: "from-purple-500 to-pink-500",
    keys: ["git", "github", "npm", "docker", "nginx", "linux", "vercel"],
  },
];

const normalize = (s = "") =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const SkillCard = ({ skill }) => (
  <article className="group relative flex h-full gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-purple-300 sm:p-5">
    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 p-2 sm:h-14 sm:w-14">
      <img
        src={skill.icon}
        alt={skill.label}
        loading="lazy"
        draggable="false"
        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
      />
    </div>

    <div className="min-w-0 flex-1">
      <h3 className="truncate text-base font-bold text-slate-900 sm:text-lg">
        {skill.label}
      </h3>

      <p className="mt-1 text-sm leading-relaxed text-slate-500">
        {skill.shortDescription}
      </p>
    </div>
  </article>
);

const Skills = () => {
  const [active, setActive] = useState("tous");
  const [query, setQuery] = useState("");

  const groups = useMemo(() => {
    const entries = Object.entries(SKILLS);
    const used = new Set();

    const result = CATEGORIES.map((cat) => {
      const items = cat.keys
        .filter((key) => SKILLS[key])
        .map((key) => {
          used.add(key);
          return SKILLS[key];
        });

      return { ...cat, items };
    });

    const others = entries
      .filter(([key]) => !used.has(key))
      .map(([, value]) => value);

    if (others.length) {
      result.push({
        id: "autres",
        label: "Others",
        icon: Layers,
        gradient: "from-pink-500 to-purple-500",
        items: others,
      });
    }

    return result;
  }, []);

  const total = useMemo(
    () => groups.reduce((n, group) => n + group.items.length, 0),
    [groups]
  );

  const visibleGroups = useMemo(() => {
    const q = normalize(query.trim());

    return groups
      .filter((group) => active === "tous" || group.id === active)
      .map((group) => ({
        ...group,
        items: q
          ? group.items.filter((skill) =>
              normalize(
                `${skill.label} ${skill.shortDescription}`
              ).includes(q)
            )
          : group.items,
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, active, query]);

  const visibleCount = visibleGroups.reduce(
    (n, group) => n + group.items.length,
    0
  );

  const filters = [
    {
      id: "tous",
      label: "All",
      icon: Layers,
      gradient: "from-pink-500 via-purple-500 to-cyan-500",
    },
    ...groups,
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-12 text-slate-800 sm:px-6 sm:py-20">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-pink-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium tracking-wide text-purple-600">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
            MY EXPERTISE
          </span>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Technical
            <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Skills
            </span>
          </h1>

          <div className="mx-auto mb-5 h-1 w-32 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            The technologies and tools I master to build reliable
            and modern solutions.
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-400">
            <span className="text-purple-600">{total}</span> technologies
            <span className="mx-2 text-slate-300">·</span>
            <span className="text-purple-600">{groups.length}</span> areas
          </p>
        </header>

        {/* Search Bar */}
        <div className="relative mx-auto mb-6 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a technology..."
            aria-label="Search for a technology"
            className="w-full rounded-full border border-slate-200 bg-white py-3 pl-12 pr-11 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-purple-400"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-purple-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {filters.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-5 sm:py-3 ${
                  isActive
                    ? `border-transparent bg-gradient-to-r ${cat.gradient} text-white`
                    : "border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-600"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Sections */}
        {visibleCount === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 px-6 py-16 text-center">
            <Search className="mx-auto mb-4 h-10 w-10 text-slate-300" />

            <p className="text-lg font-semibold text-slate-700">
              No technology found
            </p>

            <p className="mt-2 text-sm text-slate-400">
              No technology matches "{query}".
            </p>

            <button
              onClick={() => {
                setQuery("");
                setActive("tous");
              }}
              className="mt-5 text-sm font-semibold text-purple-600 transition-colors hover:text-pink-500"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {visibleGroups.map((group) => {
              const Icon = group.icon;

              return (
                <section key={group.id}>
                  {/* Category Header */}
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${group.gradient}`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                      {group.label}
                    </h2>

                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                      {group.items.length}
                    </span>

                    <div className="ml-2 hidden h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent sm:block" />
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((skill) => (
                      <SkillCard key={skill.id} skill={skill} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;