import {
  socials,
  achievements,
  SKILLS,
  feedbacks,
  projects,
  documents,
  config,
} from '@/utils/constants';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const textFixes = [
  ['Bacalauréat', 'Baccalauréat'],
  ['convevoir', 'concevoir'],
  ['pertinantes', 'pertinentes'],
  ['Etudiante', 'Étudiante'],
];

const fixText = (value) =>
  typeof value === 'string'
    ? textFixes.reduce((text, [from, to]) => text.split(from).join(to), value)
    : value;

const ensureUrl = (value) => {
  if (!value) return null;
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
};

const stripQuery = (value) => {
  try {
    const url = new URL(value);
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return value;
  }
};

export const siteConfig = {
  name: 'Bahaa-eddine Lamrissi',
  brand: 'Pahae',
  role: 'Full-Stack Developer',
  domain: config.domaine,
  title: 'Bahaa-eddine Lamrissi – Full-Stack Developer',
  description:
    'Portfolio of Bahaa-eddine Lamrissi, Full-Stack developer: web, mobile and desktop projects, academic background, skills and documents.',
};

export const socialLinks = socials.map((social) => ({
  id: social.name.toLowerCase(),
  name: social.name === 'Whatsapp' ? 'WhatsApp' : social.name,
  url: social.name === 'LinkedIn' ? stripQuery(social.url) : social.url,
  icon: social.icon,
}));

const degreeTitles = {
  LST: 'Bachelor’s Degree (LST)',
  MST: 'Master’s Degree (MST)',
};

const mentionLabels = {
  'T. Bien': 'Very good',
  'A. Bien': 'Fairly good',
  Bien: 'Good',
};

const gradePattern = /^(.*?)\s*\((\d+(?:\.\d+)?)\)\s*$/;

const semesterShort = {
  'Premier semestre': 'S1',
  'Deuxième semestre': 'S2',
  'Troisième semestre': 'S3',
  'Quatrième semestre': 'S4',
};

const semesterLabels = {
  'Premier semestre': 'First semester',
  'Deuxième semestre': 'Second semester',
  'Troisième semestre': 'Third semester',
  'Quatrième semestre': 'Fourth semester',
};

const parsePoint = (point) => {
  const match = gradePattern.exec(point.credential);
  const short = semesterShort[point.semester] ?? point.semester;
  const semester = semesterLabels[point.semester] ?? point.semester;
  if (!match) {
    return {
      semester,
      short,
      mention: null,
      grade: null,
      status: point.credential.replace(/\.+$/, ''),
    };
  }
  const rawMention = match[1].trim();
  return {
    semester,
    short,
    mention: mentionLabels[rawMention] ?? rawMention,
    grade: match[2],
    status: null,
  };
};

export const academicPath = achievements
  .map((item, index) => {
    const title = fixText(item.title);
    return {
      id: index + 1,
      title: degreeTitles[title] ?? title,
      institution: item.company_name,
      field: item.filliere,
      date: item.date,
      ongoing: item.date === '',
      points: item.points.map(parsePoint),
    };
  })
  .reverse();

export const projectCategories = [
  { id: 'academique', label: 'Academic' },
  { id: 'personnel', label: 'Personal' },
  { id: 'stage', label: 'Internships' },
  { id: 'freelance', label: 'Freelance and commercial' },
];

const projectTypeMap = {
  académique: 'academique',
  personnel: 'personnel',
  personel: 'personnel',
  stage: 'stage',
  freelance: 'freelance',
};

const technologyLabels = {
  Javascript: 'JavaScript',
  NextJS: 'Next.js',
  TailwindCSS: 'Tailwind CSS',
  SocketIO: 'Socket.IO',
  SpringBoot: 'Spring Boot',
  ThreeJS: 'Three.js',
  ElectronJS: 'Electron.js',
  xTermJS: 'xterm.js',
};

const projectOverrides = {
  'MES Performace': { title: 'MES Performance', description: null, github: null },
  'Club WORMZ': { description: 'Official website of the WORMZ Club at FST Settat.' },
};

const parseProjectDate = (value) => {
  const [day, month, year] = value.split('/').map(Number);
  return {
    sortKey: year * 10000 + month * 100 + day,
    label: `${monthNames[month - 1]} ${year}`,
  };
};

export const portfolioProjects = projects
  .map((project) => {
    const override = projectOverrides[project.title] ?? {};
    const merged = { ...project, ...override };
    const date = parseProjectDate(project.createdAt);
    return {
      id: project._id,
      title: merged.title,
      description: merged.description ?? null,
      technologies: merged.technologies.map((name) => technologyLabels[name] ?? name),
      category: projectTypeMap[merged.type],
      github: ensureUrl(merged.github),
      website: ensureUrl(merged.website),
      dateLabel: date.label,
      sortKey: date.sortKey,
      lvl: project.lvl,
    };
  })
  .sort((a, b) => b.lvl - a.lvl || b.sortKey - a.sortKey);

export const documentTypes = [
  { id: 'cv', label: 'CV' },
  { id: 'diplome', label: 'Diplomas and certificates' },
  { id: 'releve', label: 'Transcripts' },
  { id: 'certificat', label: 'Certifications' },
  { id: 'langue', label: 'Language tests' },
  { id: 'stage', label: 'Internship certificates' },
];

const languageTestPattern = /\b(IELTS|TCF)\b/;

const providerOverrides = {
  'Diplôme du Bacalauréat': null,
};

const ordinal = (day) => {
  if (day % 100 >= 11 && day % 100 <= 13) return `${day}th`;
  return `${day}${{ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] ?? 'th'}`;
};

const formatIsoDate = (value) => {
  const [year, month, day] = value.split('-').map(Number);
  return `${ordinal(day)} ${monthNames[month - 1]} ${year}`;
};

export const normalizeDocuments = (isAvailable) =>
  documents
    .map((doc) => {
      const provider =
        doc.title in providerOverrides ? providerOverrides[doc.title] : doc.provider ?? null;
      return {
        id: doc.id,
        type: languageTestPattern.test(doc.title) ? 'langue' : doc.type,
        title: fixText(doc.title),
        description: doc.description ?? null,
        provider,
        date: doc.date,
        dateLabel: formatIsoDate(doc.date),
        file: doc.file,
        available: isAvailable(doc.file),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export const testimonials = feedbacks.map((item, index) => ({
  id: index + 1,
  name: item.name,
  role: fixText(item.description),
  text: fixText(item.text),
  linkedin: item.linkedin ?? null,
  initials: item.name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase(),
}));

const pick = (keys) => keys.map((key) => SKILLS[key]);

export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Interactive and responsive web interfaces.',
    skills: pick(['html', 'css', 'js', 'react', 'nextjs', 'tailwind', 'gsap']),
    extras: [{ label: 'Three.js', icon: '/missing_icons/threejs.svg' }],
  },
  {
    id: 'backend',
    label: 'Backend and languages',
    description: 'APIs and server-side logic, from Node.js to Spring Boot.',
    skills: pick(['nodejs', 'express', 'php', 'java', 'springboot', 'c']),
    extras: [
      { label: 'Hibernate / JPA', icon: '/missing_icons/hibernate.svg' },
      { label: 'Puppeteer', icon: '/missing_icons/puppeteer.svg' },
      { label: 'TensorFlow', icon: '/missing_icons/tensorflow.svg' },
      { label: 'OpenRouter', icon: '/missing_icons/openrouter.svg' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    description: 'Relational storage, documents and managed services.',
    skills: pick(['mysql', 'mongodb', 'firebase']),
    extras: [],
  },
  {
    id: 'mobile',
    label: 'Mobile and desktop',
    description: 'Cross-platform applications.',
    skills: pick(['flutter', 'dart']),
    extras: [
      { label: 'Electron.js', icon: '/missing_icons/electron.svg' },
      { label: 'xterm.js', icon: '/missing_icons/xterm.svg' },
    ],
  },
  {
    id: 'realtime',
    label: 'Real-time communication',
    description: 'Instant exchanges between clients and server.',
    skills: pick(['socketIO']),
    extras: [{ label: 'WebRTC', icon: '/missing_icons/webrtc.svg' }],
  },
  {
    id: 'devops',
    label: 'DevOps and infrastructure',
    description: 'Containers, servers and deployment.',
    skills: pick(['docker', 'nginx', 'linux', 'vercel']),
    extras: [],
  },
  {
    id: 'tools',
    label: 'Development tools',
    description: 'Version control and dependency management.',
    skills: pick(['git', 'github', 'npm']),
    extras: [],
  },
];
