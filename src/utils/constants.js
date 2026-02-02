import { Github, Linkedin, MessageCircle } from 'lucide-react';

const socials = [
  { name: 'GitHub', url: 'https://github.com/oPahae', icon: Github, hover: "hover:bg-black" },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bahaa-eddine-lamrissi-81366528a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin, hover: "hover:bg-blue-600" },
  { name: 'Whatsapp', url: 'https://wa.me/212713947508', icon: MessageCircle, hover: "hover:bg-green-600" },
];

const achievements = [
  {
    title: ["Bacalauréat"],
    company_name: "Lycée Ibno Rochd - Berrechid",
    icon: "/ibno rochd.jpeg",
    iconBg: "#383E56",
    date: "Juillet 2021",
    points: ["Premier semestre", "Deuxième semestre", "Examen national", "Moyenne totale"],
    credential: [
      "Très Bien (17.84)",
      "Très Bien (18.24)",
      "Bien (14.75)",
      "Bien (15.10)",
    ],
  },
  {
    title: ["Diplôme d'Etudes Universitaires en Sciences et Techniques"],
    company_name: "FST Settat",
    icon: "fsts.png",
    iconBg: "#E6DEDD",
    date: "Juillet 2024",
    points: [
      "Premier semestre (Mathématique, Physique, Informatique)",
      "Deuxième semestre (Mathématique, Physique, Informatique)",
      "Troisième semestre (Mathématique, Physique, Informatique)",
      "Quatrième semestre (Mathématique, Physique, Informatique)",
    ],
    credential: [
      "Assez Bien (12.82)",
      "Assez Bien (13.15)",
      "Assez Bien (12.82)",
      "Assez Bien (13.31)",
    ],
  },
  {
    title: ["Licence en Sciences et Techniques"],
    company_name: "FST Settat",
    icon: "fsts.png",
    iconBg: "#E6DEDD",
    date: "Juillet 2025",
    points: [
      "Premier semestre (Génie Informatique)",
      "Deuxième semestre (Génie Informatique)"
    ],
    credential: [
      "Très Bien (15.63)",
      "Très Bien (16.89)",
    ],
  },
  {
    title: ["Master en Sciences et Techniques"],
    company_name: "FST Settat",
    icon: "fsts.png",
    iconBg: "#E6DEDD",
    date: "",
    points: [
      "Premier semestre (Systèmes Informatiques et Réseaux)",
    ],
    credential: [
      "",
    ],
  },
];

const SKILLS = {
  js: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription: "Un langage de script utilisé pour rendre les pages web interactives et dynamiques.",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  java: {
    id: 2,
    name: "java",
    label: "Java",
    shortDescription: "Un langage de programmation orienté objet utilisé pour créer des applications multiplateformes.",
    color: "#5382a1",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  html: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription: "Le langage de balisage standard utilisé pour structurer le contenu des pages web.",
    color: "#e34c26",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  css: {
    id: 4,
    name: "css",
    label: "CSS",
    shortDescription: "Un langage de feuille de style utilisé pour définir l'apparence visuelle des éléments HTML.",
    color: "#563d7c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  react: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription: "Une bibliothèque JavaScript pour créer des interfaces utilisateur rapides et réutilisables avec des composants.",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  php: {
    id: 6,
    name: "php",
    label: "PHP",
    shortDescription: "Un langage de programmation côté serveur utilisé pour créer des sites web dynamiques.",
    color: "#777bb3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  nextjs: {
    id: 7,
    name: "nextjs",
    label: "Next.js",
    shortDescription: "Un framework basé sur React pour créer des applications web full-stack avec rendu côté serveur.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  tailwind: {
    id: 8,
    name: "tailwind",
    label: "Tailwind",
    shortDescription: "Un framework CSS utilitaire pour construire rapidement des interfaces réactives et personnalisées.",
    color: "#38bdf8",
    icon: "https://cdn.simpleicons.org/tailwindcss/38BDF8",
  },
  nodejs: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription: "Un environnement d'exécution permettant d'exécuter JavaScript côté serveur.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  express: {
    id: 10,
    name: "express",
    label: "Express",
    shortDescription: "Un framework minimaliste pour créer des applications web et des APIs avec Node.js.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  mysql: {
    id: 11,
    name: "mysql",
    label: "MySQL",
    shortDescription: "Un système de gestion de base de données relationnelle open-source populaire et fiable.",
    color: "#00758f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  mongodb: {
    id: 12,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "Une base de données NoSQL qui stocke les données sous forme de documents JSON flexibles.",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  git: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription: "Un système de contrôle de version distribué pour suivre les modifications du code source.",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  github: {
    id: 14,
    name: "github",
    label: "GitHub",
    shortDescription: "Une plateforme pour héberger, gérer et collaborer sur du code avec Git.",
    color: "#000000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  npm: {
    id: 16,
    name: "npm",
    label: "NPM",
    shortDescription: "Le gestionnaire de paquets JavaScript utilisé pour installer des bibliothèques et gérer les dépendances.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  firebase: {
    id: 17,
    name: "firebase",
    label: "Firebase",
    shortDescription: "Une plateforme de Google offrant des services backend comme l'authentification, base de données et hébergement.",
    color: "#ffca28",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  c: {
    id: 18,
    name: "C",
    label: "C",
    shortDescription: "Un langage de programmation puissant utilisé pour le développement système et logiciel.",
    color: "#555555",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  gsap: {
    id: 19,
    name: "gsap",
    label: "GSAP",
    shortDescription: "Une bibliothèque JavaScript pour créer des animations performantes et fluides sur le web.",
    color: "#88ce02",
    icon: "https://cdn.simpleicons.org/greensock/8AC640",
  },
  socketIO: {
    id: 20,
    name: "socketIO",
    label: "Socket.IO",
    shortDescription: "Une bibliothèque pour la communication en temps réel entre le client et le serveur.",
    color: "#010101",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  },
  docker: {
    id: 21,
    name: "docker",
    label: "Docker",
    shortDescription: "Une plateforme pour développer, expédier et exécuter des applications dans des conteneurs isolés.",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  nginx: {
    id: 22,
    name: "nginx",
    label: "NginX",
    shortDescription: "Un serveur web performant et un reverse proxy utilisé pour servir du contenu statique et équilibrer la charge.",
    color: "#008000",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  linux: {
    id: 23,
    name: "linux",
    label: "Linux",
    shortDescription: "Un système d'exploitation open-source largement utilisé sur les serveurs et pour le développement.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  vercel: {
    id: 24,
    name: "vercel",
    label: "Vercel",
    shortDescription: "Une plateforme cloud pour déployer des applications front-end, optimisée pour Next.js.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
};

const feedbacks = [
  {
    name: "Personne 1",
    image: "/person1.jpg",
    description: "Senior Developer at Tech Corp",
    text: "Bahaa-eddine est un développeur exceptionnel avec une grande capacité d'adaptation. Son expertise technique et sa passion pour l'innovation font de lui un atout précieux pour toute équipe.",
    linkedin: "https://linkedin.com/in/test"
  },
  {
    name: "Personne 1",
    image: "/person2.jpg",
    description: "Product Manager chez StartupX",
    text: "J'ai eu le plaisir de collaborer avec Bahaa-eddine sur plusieurs projets. Sa créativité et son attention aux détails sont impressionnantes. Il livre toujours un travail de qualité exceptionnelle.",
    linkedin: "https://linkedin.com/in/test"
  },
  {
    name: "Personne 1",
    image: "/person3.jpg",
    description: "CTO @ Digital Agency",
    text: "Un professionnel très talentueux avec une excellente maîtrise des technologies modernes. Bahaa-eddine a démontré une capacité remarquable à résoudre des problèmes complexes avec élégance.",
    linkedin: "https://linkedin.com/in/test"
  }
];

let i = 0;
const projects = [
  {
    _id: ++i,
    title: "Mediahod",
    description:
      "Application web professionnelle dédiée à la vente de comptes de diverses plateformes numériques. Elle intègre un système sécurisé de gestion des transactions et une interface fluide pour les utilisateurs.",
    technologies: ["HTML", "CSS", "JS", "PHP"],
    type: "commercialisé",
    github: "https://github.com/oPahae/Mediahod",
    website: "",
    lvl: 4,
    createdAt: "24/08/2024",
  },
  {
    _id: ++i,
    title: "Motorola",
    description:
      "Simulateur complet du microprocesseur Motorola 6809, prenant en charge la majorité des instructions et modes d’adressage. Conçu pour l’apprentissage et l’expérimentation en architecture des ordinateurs.",
    technologies: ["Java"],
    type: "académique",
    github: "https://github.com/oPahae/Motorola",
    website: "",
    lvl: 10,
    createdAt: "08/01/2025",
  },
  {
    _id: ++i,
    title: "Amaton",
    description:
      "Plateforme e-commerce complète avec gestion intégrale des produits, catégories, clients et commandes. Le système garantit la cohérence et l’intégrité des données tout au long du processus de vente.",
    technologies: ["NextJS", "Express", "MongoDB"],
    type: "académique",
    github: "github.com/oPahae/Amaton",
    website: "",
    lvl: 20,
    createdAt: "21/01/2025",
  },
  {
    _id: ++i,
    title: "Obsidian",
    description:
      "Application web de communication en temps réel intégrant la messagerie instantanée, les appels vocaux et la gestion dynamique des salons (rooms). Optimisée pour la fluidité et la réactivité.",
    technologies: ["NextJS", "SocketIO", "MongoDB"],
    type: "académique",
    github: "https://github.com/oPahae/Obsidian",
    website: "",
    lvl: 40,
    createdAt: "05/02/2025",
  },
  {
    _id: ++i,
    title: "Assembler",
    description:
      "Plateforme collaborative permettant aux étudiants et enseignants de gérer efficacement leurs projets en équipe. Elle favorise la communication, le suivi d’avancement et le partage de ressources.",
    technologies: ["HTML", "TailwindCSS", "JS", "PHP"],
    type: "académique",
    github: "https://github.com/oPahae/Assembler",
    website: "",
    lvl: 30,
    createdAt: "22/03/2025",
  },
  {
    _id: ++i,
    title: "Nobough",
    description:
      "Solution web complète pour la digitalisation de l’Académie Nobough. Elle automatise la gestion administrative, les cours en ligne, les visioconférences et la consultation de documents et certifications.",
    technologies: ["NextJS", "TensorFlow", "SocketIO", "WebRTC"],
    type: "académique",
    github: "https://github.com/oPahae/Nobough",
    website: "https://dash.noboughacademy.com",
    lvl: 50,
    createdAt: "01/06/2025",
  },
  {
    _id: ++i,
    title: "KoraLive",
    description:
      "Plateforme web moderne permettant de suivre les scores des matchs en direct et de visionner des diffusions sportives en streaming de manière fluide et interactive.",
    technologies: ["NextJS", "Puppeteer"],
    type: "personnel",
    github: "https://github.com/oPahae/KoraLive",
    website: "",
    lvl: 25,
    createdAt: "28/09/2025",
  },
  {
    _id: ++i,
    title: "Casafibre",
    description:
      "Site web professionnel développé pour la société Casafibre à Nador, permettant la gestion complète des services, des clients et des demandes au sein de l’entreprise.",
    technologies: ["HTML", "TailwindCSS", "JS", "PHP"],
    type: "commercialisé",
    github: "",
    website: "https://casafibre-nador.com/admin/login.php",
    lvl: 5,
    createdAt: "15/02/2025",
  },
  {
    _id: ++i,
    title: "LuxDrive",
    description:
      "Plateforme en ligne de gestion d’entreprises spécialisées dans la location de voitures. Elle offre une interface claire pour la réservation, la gestion de flotte et le suivi administratif.",
    technologies: ["HTML", "TailwindCSS", "JS", "PHP"],
    type: "commercialisé",
    github: "",
    website: "https://location-autocar.com/auth/login.html",
    lvl: 8,
    createdAt: "29/02/2025",
  },
  {
    _id: ++i,
    title: "Portfolio",
    description:
      "Portfolio personnel moderne présentant mes projets, compétences, certifications et parcours académique, avec une mise en page claire et un design réactif.",
    technologies: ["HTML", "TailwindCSS", "JS", "PHP"],
    type: "personnel",
    github: "https://github.com/oPahae/Portfolio",
    website: "https://pahae.vercel.app",
    lvl: 0,
    createdAt: "29/02/2025",
  },
  {
    _id: ++i,
    title: "Club WORMZ",
    description:
      "Siteweb officiel du Club WORMZ de la FST Settat.",
    technologies: ["HTML", "TailwindCSS", "JS", "PHP"],
    type: "commercialisé",
    website: "https://wormz.vercel.app",
    lvl: 11,
    createdAt: "12/11/2025",
  },
  { 
    _id: ++i,
    title: "Tasky",
    description:
      "Application desktop de gestion de projets logiciels qui permet de gérer l’ensemble du cycle de vie d’un projet de la planification à la livraison finale.",
    technologies: ["Java", "SpringBoot", "Hibernate / JPA"],
    type: "académique",
    github: "https://github.com/oPahae/Tasky",
    website: "https://taskyx.vercel.app",
    lvl: 51,
    createdAt: "06/01/2026",
  },
  {
    _id: ++i,
    title: "Imperial Trail Tours",
    description:
      "Une plateforme dédiée aux touristes pour l’organisation de circuits et excursions au Maroc, offrant diverses fonctionnalités.",
    technologies: ["NextJS", "TailwindCSS"],
    type: "commercialisé",
    website: "https://www.imperialtrailtours.com",
    lvl: 52,
    createdAt: "30/01/2026",
  },
  {
    _id: ++i,
    title: "Panorama Dades",
    description:
      "Site web vitrine et administratif pour le Panorama Dades Hotel, mettant en valeur l’hôtel, ses chambres, ses services et la beauté de la vallée du Dadès afin d’attirer et informer les visiteurs. Avec gestion complète des reservations, factures, clients et agents.",
    technologies: ["NextJS", "TailwindCSS"],
    type: "commercialisé",
    website: "https://www.imperialtrailtours.com",
    lvl: 53,
    createdAt: "08/02/2026",
  },
];

const config = {
  logo: "/logo.png",
  domaine: "https://pahae.vercel.app",
};

let j = 0;
const media = [
  {
    id: ++j,
    type: 'video',
    name: 'Me in AOT\'s world',
    content: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/hoyt9s77oc.js" async type="module"></script><style>wistia-player[media-id='hoyt9s77oc']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/hoyt9s77oc/swatch'); display: block; filter: blur(5px); }</style> <wistia-player media-id="hoyt9s77oc" wistia-popover="true" aspect="2.0" style="width: 150px;height: 75px;"></wistia-player>`
  },
  {
    id: ++j,
    type: 'video',
    name: 'Soutenance de mon PFE',
    content: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/4yhf21rzrd.js" async type="module"></script><style>wistia-player[media-id='4yhf21rzrd']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/4yhf21rzrd/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }</style> <wistia-player media-id="4yhf21rzrd" aspect="1.7777777777777777"></wistia-player>`
  },
  {
    id: ++j,
    type: 'video',
    name: 'ألم يان للذين ءامنوا',
    content: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/vx5mblf79a.js" async type="module"></script><style>wistia-player[media-id='vx5mblf79a']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/vx5mblf79a/swatch'); display: block; filter: blur(5px); }</style> <wistia-player media-id="vx5mblf79a" wistia-popover="true" aspect="1.7777777777777777" style="width: 150px;height: 84px;"></wistia-player>`
  },
];

const voiceCommands = [
  { words: ["moi", "profil", "générale"], page: "Me" },
  { words: ["parcours", "achievement"], page: "Achievements" },
  { words: ["compétence", "skills"], page: "Skills" },
  { words: ["projet"], page: "Projects" },
  { words: ["document", "doc"], page: "Docs" },
  { words: ["avis", "feedback"], page: "Feedbacks" },
  { words: ["contact"], page: "Contact" },
  { words: ["pahae", "intelligence", "ia"], page: "Pahae AI" },

  { words: ["corbeille", "bin"], page: "Bin" },
  { words: ["chrome", "navigateur"], page: "Chrome" },
  { words: ["dossier"], page: "Folder" },
  { words: ["paint"], page: "Paint" },
  { words: ["ordinateur", "this pc", "pc", "paramètres", "settings"], page: "This PC" },

  { words: ["zoom"], page: "Infinite Zoom" },
  { words: ["pointeur", "pointer"], page: "Pointer" },
  { words: ["alchemy"], page: "Little Alchemy" },
  { words: ["univers", "espace"], page: "Universe" },

  { words: ["vidéo"], page: "Mes Vidéos" },
  { words: ["image"], page: "Mes Images" },
  { words: ["audio"], page: "Mes Audios" },

  { words: ["terminal", "cmd", "invite de commande"], page: "Terminal" },
  { words: ["ferme tout", "fermer", "clear", "ferme"], page: "" },
];


export { socials, achievements, SKILLS, feedbacks, projects, config, media, voiceCommands };
