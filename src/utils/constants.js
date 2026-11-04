import { Github, Linkedin, MessageCircle } from 'lucide-react';

const socials = [
  { name: 'GitHub', url: 'https://github.com/oPahae', icon: Github, hover: "hover:bg-black" },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/bahaa-eddine-lamrissi-81366588a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin, hover: "hover:bg-blue-600" },
  { name: 'Whatsapp', url: 'https://wa.me/212713947508', icon: MessageCircle, hover: "hover:bg-green-600" },
];

const achievements = [
  {
    title: "Baccalaureat",
    company_name: "Lycée Ibno Rochd - Berrechid",
    filliere: "Physics Sciences",
    icon: "/ibno rochd.jpeg",
    iconBg: "#383E56",
    date: "July 2021",
    points: [
      { semester: "First semester", credential: "Very Good (17.84)" },
      { semester: "Second semester", credential: "Very Good (18.24)" },
      { semester: "National exam", credential: "Good (14.75)" },
      { semester: "Overall average", credential: "Good (15.10)" },
    ],
  },
  {
    title: "DEUST",
    company_name: "FST Settat",
    filliere: "Mathematics, Physics, Computer Science",
    icon: "fsts.png",
    iconBg: "#E6DEDD",
    date: "July 2024",
    points: [
      { semester: "First semester", credential: "Fairly Good (12.82)" },
      { semester: "Second semester", credential: "Fairly Good (13.15)" },
      { semester: "Third semester", credential: "Fairly Good (12.82)" },
      { semester: "Fourth semester", credential: "Fairly Good (13.31)" },
    ],
  },
  {
    title: "LST",
    company_name: "FST Settat",
    filliere: "Computer Engineering",
    icon: "fsts.png",
    iconBg: "#E6DEDD",
    date: "July 2025",
    points: [
      { semester: "First semester", credential: "Very Good (15.63)" },
      { semester: "Second semester", credential: "Very Good (16.89)" },
    ],
  },
  {
    title: "MST",
    company_name: "FST Settat",
    filliere: "Computer Systems and Networks",
    icon: "fsts.png",
    iconBg: "#E6DEDD",
    date: "",
    points: [
      { semester: "First semester", credential: "Very Good (17.01)" },
      { semester: "Second semester", credential: "Very Good (16.52)" },
      { semester: "Third semester", credential: "Ongoing..." },
    ],
  },
];

const SKILLS = {
  js: { id: 1, name: "js", label: "JavaScript", shortDescription: "A scripting language used to make web pages interactive and dynamic.", color: "#f0db4f", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  java: { id: 2, name: "java", label: "Java", shortDescription: "An object-oriented programming language used to build cross-platform applications.", color: "#5382a1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  html: { id: 3, name: "html", label: "HTML", shortDescription: "The standard markup language used to structure the content of web pages.", color: "#e34c26", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  css: { id: 4, name: "css", label: "CSS", shortDescription: "A style sheet language used to define the visual appearance of HTML elements.", color: "#563d7c", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  php: { id: 6, name: "php", label: "PHP", shortDescription: "A server-side programming language used to build dynamic websites.", color: "#777bb3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  react: { id: 5, name: "react", label: "React", shortDescription: "A JavaScript library for building fast, reusable user interfaces with components.", color: "#61dafb", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  nextjs: { id: 7, name: "nextjs", label: "Next.js", shortDescription: "A React-based framework for building full-stack web applications with server-side rendering.", color: "#fff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  springboot: { id: 25, name: "springboot", label: "Spring Boot", shortDescription: "A powerful Java framework for quickly building robust backend applications and APIs.", color: "#6db33f", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  dart: { id: 26, name: "dart", label: "Dart", shortDescription: "A programming language optimized for building fast cross-platform applications.", color: "#0175c2", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  flutter: { id: 27, name: "flutter", label: "Flutter", shortDescription: "A UI framework from Google for building mobile, web and desktop applications from a single codebase.", color: "#02569b", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  tailwind: { id: 8, name: "tailwind", label: "Tailwind", shortDescription: "A utility-first CSS framework for quickly building responsive, custom interfaces.", color: "#38bdf8", icon: "https://cdn.simpleicons.org/tailwindcss/38BDF8" },
  nodejs: { id: 9, name: "nodejs", label: "Node.js", shortDescription: "A runtime environment that allows JavaScript to run on the server side.", color: "#6cc24a", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  express: { id: 10, name: "express", label: "Express", shortDescription: "A minimalist framework for building web applications and APIs with Node.js.", color: "#fff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  mysql: { id: 11, name: "mysql", label: "MySQL", shortDescription: "A popular, reliable open-source relational database management system.", color: "#00758f", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  mongodb: { id: 12, name: "mongodb", label: "MongoDB", shortDescription: "A NoSQL database that stores data as flexible JSON-like documents.", color: "#336791", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  git: { id: 13, name: "git", label: "Git", shortDescription: "A distributed version control system for tracking changes to source code.", color: "#f1502f", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  github: { id: 14, name: "github", label: "GitHub", shortDescription: "A platform for hosting, managing and collaborating on code with Git.", color: "#000000", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  npm: { id: 16, name: "npm", label: "NPM", shortDescription: "The JavaScript package manager used to install libraries and manage dependencies.", color: "#fff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
  firebase: { id: 17, name: "firebase", label: "Firebase", shortDescription: "A Google platform offering backend services such as authentication, database and hosting.", color: "#ffca28", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  c: { id: 18, name: "C", label: "C", shortDescription: "A powerful programming language used for system and software development.", color: "#555555", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  gsap: { id: 19, name: "gsap", label: "GSAP", shortDescription: "A JavaScript library for creating high-performance, smooth animations on the web.", color: "#88ce02", icon: "https://cdn.simpleicons.org/greensock/8AC640" },
  socketIO: { id: 20, name: "socketIO", label: "Socket.IO", shortDescription: "A library for real-time communication between client and server.", color: "#010101", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
  docker: { id: 21, name: "docker", label: "Docker", shortDescription: "A platform for developing, shipping and running applications in isolated containers.", color: "#2496ed", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  nginx: { id: 22, name: "nginx", label: "NginX", shortDescription: "A high-performance web server and reverse proxy used to serve static content and balance load.", color: "#008000", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  linux: { id: 23, name: "linux", label: "Linux", shortDescription: "An open-source operating system widely used on servers and for development.", color: "#fff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  vercel: { id: 24, name: "vercel", label: "Vercel", shortDescription: "A cloud platform for deploying front-end applications, optimized for Next.js.", color: "#6cc24a", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" },
};

const feedbacks = [
  {
    name: "Nassir Aziz",
    image: "/linkedin.webp",
    description: "Director of CeliaFlex",
    text: "A very talented professional with an excellent command of modern technologies. Bahaa-eddine has demonstrated a remarkable ability to solve complex problems elegantly, and to design and deliver relevant, innovative solutions.",
    linkedin: "https://www.linkedin.com/in/aziz-nasyr-b166785a"
  },
  {
    name: "Sofia El Amoury",
    image: "/linkedin.webp",
    description: "Professor at FST Settat",
    text: "All my congratulations on the excellent work you have accomplished and the effort you have put in.",
    linkedin: null
  },
  {
    name: "Tayef Jihane",
    image: "/linkedin.webp",
    description: "Master's Student in Computer Systems and Networks",
    text: "I had the pleasure of collaborating with Bahaa-eddine on several projects. His creativity and attention to detail are impressive. He always delivers exceptionally high-quality work.",
    linkedin: "https://www.linkedin.com/in/tayef-jihane-2a9a10273/"
  },
];

let i = 0;
const projects = [
  {
    _id: ++i,
    title: "Mediahod",
    description:
      "A professional web application dedicated to selling accounts for various digital platforms. It features a secure transaction management system and a smooth user interface.",
    technologies: ["HTML", "CSS", "Javascript", "PHP"],
    type: "freelance",
    // github: "https://github.com/oPahae/Mediahod",
    lvl: 4,
    createdAt: "24/08/2024",
  },
  {
    _id: ++i,
    title: "Motorola",
    description:
      "A complete simulator of the Motorola 6809 microprocessor, supporting most instructions and addressing modes. Designed for learning and experimentation in computer architecture.",
    technologies: ["Java"],
    type: "académique",
    github: "https://github.com/oPahae/Motorola",
    lvl: 10,
    createdAt: "08/01/2025",
  },
  {
    _id: ++i,
    title: "Amaton",
    description:
      "A complete e-commerce platform with full management of products, categories, customers, and orders. The system ensures data consistency and integrity throughout the sales process.",
    technologies: ["NextJS", "Express", "MongoDB"],
    type: "académique",
    github: "github.com/oPahae/Amaton",
    lvl: 20,
    createdAt: "21/01/2025",
  },
  {
    _id: ++i,
    title: "Obsidian",
    description:
      "A real-time communication web application featuring instant messaging, voice calls, and dynamic room management. Optimized for smoothness and responsiveness.",
    technologies: ["NextJS", "SocketIO", "MongoDB"],
    type: "académique",
    github: "https://github.com/oPahae/Obsidian",
    lvl: 40,
    createdAt: "05/02/2025",
  },
  {
    _id: ++i,
    title: "Assembler",
    description:
      "A collaborative platform allowing students and teachers to efficiently manage their team projects. It promotes communication, progress tracking, and resource sharing.",
    technologies: ["HTML", "TailwindCSS", "Javascript", "PHP", "WebRTC"],
    type: "académique",
    github: "https://github.com/oPahae/Assembler",
    lvl: 30,
    createdAt: "22/03/2025",
  },
  {
    _id: ++i,
    title: "Nobough",
    description:
      "A complete web solution for the digitalization of the Nobough Academy. It automates administrative management, online courses, video conferencing, and access to documents and certifications.",
    technologies: ["NextJS", "TensorFlow", "SocketIO", "WebRTC"],
    type: "stage",
    github: "https://github.com/oPahae/Nobough",
    website: "https://dash.noboughacademy.com",
    lvl: 50,
    createdAt: "01/06/2025",
  },
  {
    _id: ++i,
    title: "KoraLive",
    description:
      "A modern web platform for following live match scores and watching sports broadcasts in a smooth and interactive way.",
    technologies: ["NextJS", "Puppeteer"],
    type: "personnel",
    github: "https://github.com/oPahae/KoraLive",
    lvl: 25,
    createdAt: "28/09/2025",
  },
  {
    _id: ++i,
    title: "Casafibre",
    description:
      "A professional website developed for the Casafibre company in Nador, enabling complete management of services, customers, and requests within the company.",
    technologies: ["HTML", "TailwindCSS", "Javascript", "PHP"],
    type: "freelance",
    // website: "https://casafibre-nador.com/admin/login.php",
    lvl: 5,
    createdAt: "15/02/2025",
  },
  {
    _id: ++i,
    title: "LuxDrive",
    description:
      "An online platform for managing car rental businesses. It offers a clear interface for booking, fleet management, and administrative tracking.",
    technologies: ["HTML", "TailwindCSS", "Javascript", "PHP"],
    type: "freelance",
    // website: "https://location-autocar.com/auth/login.html",
    lvl: 8,
    createdAt: "29/02/2025",
  },
  {
    _id: ++i,
    title: "Portfolio",
    description:
      "A modern personal portfolio showcasing my projects, skills, certifications, and academic background, with a clean layout and responsive design.",
    technologies: ["ThreeJS", "NextJS"],
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
      "Official website of the WORMZ Club at FST Settat.",
    technologies: ["React", "Express", "MongoDB"],
    type: "freelance",
    // website: "https://wormz.vercel.app/classement",
    lvl: 11,
    createdAt: "12/11/2025",
  },
  {
    _id: ++i,
    title: "AOTWIKI",
    description:
      "An information hub for the anime series Attack on Titan.",
    technologies: ["NextJS"],
    type: "personnel",
    website: "https://aotwiki.vercel.app",
    github: "https://github.com/oPahae/AOTWIKI",
    lvl: 50,
    createdAt: "11/06/2026",
  },
  {
    _id: ++i,
    title: "Tasky",
    description:
      "A desktop application for managing software projects, handling the entire project lifecycle from planning to final delivery.",
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
      "A platform dedicated to tourists for organizing tours and excursions in Morocco, offering a variety of features.",
    technologies: ["NextJS", "TailwindCSS"],
    type: "stage",
    website: "https://www.imperialtrailtours.com",
    lvl: 58,
    createdAt: "30/01/2026",
  },
  {
    _id: ++i,
    title: "Panorama Dades",
    description:
      "A showcase and administrative website for the Panorama Dades Hotel, highlighting the hotel, its rooms, its services, and the beauty of the Dades Valley to attract and inform visitors. Includes complete management of reservations, invoices, customers, and agents.",
    technologies: ["NextJS", "TailwindCSS"],
    type: "stage",
    website: "https://www.panoramadades.com",
    lvl: 59,
    createdAt: "08/02/2026",
  },
  {
    _id: ++i,
    title: "GymFuel",
    description:
      "A mobile application for creating workout programs, tracking weight, managing nutrition, browsing exercise tutorials, and communicating with coaches.",
    technologies: ["Express", "Flutter"],
    type: "académique",
    website: "https://gymfuel-landing.vercel.app",
    github: "https://github.com/oPahae/GymApp",
    lvl: 54,
    createdAt: "15/05/2026",
  },
  {
    _id: ++i,
    title: "MES Performace",
    description:
      "A mobile application for creating workout programs, tracking weight, managing nutrition, browsing exercise tutorials, and communicating with coaches.",
    technologies: ["NextJS", "OpenRouter", "ElectronJS", "Flutter"],
    type: "stage",
    website: "https://mesperformance.vercel.app",
    github: "https://github.com/oPahae/GymApp",
    lvl: 55,
    createdAt: "14/07/2026",
  },
  {
    _id: ++i,
    title: "PahaePoster",
    description:
      "A DevToolKits desktop app bringing together five developer tools: Databaser (database management), API Poster (API testing), SSHer (server and VM management), Classer (class diagram generator), and Sharer (shared storage space).",
    technologies: ["ElectronJS", "xTermJS", "NextJS"],
    type: "personel",
    github: "https://github.com/oPahae/PahaePoster",
    lvl: 56,
    createdAt: "16/08/2026",
  },
  {
    _id: ++i,
    title: "Vynora",
    description:
      "A full-stack social network: news feed, reels, stories, real-time messaging, audio/video calls, community servers, premium, and administration.",
    technologies: ["NextJS", "WebRTC"],
    type: "personel",
    github: "https://github.com/oPahae/Vynora",
    lvl: 57,
    createdAt: "31/10/2026",
  },
];
let k = 0;

const documents = [
  {
    id: ++k,
    type: 'cv',
    title: "Curriculum Vitae",
    description: "My professional CV",
    date: "2026-10-31",
    file: "/docs/cv.pdf",
  },
  {
    id: ++k,
    type: 'diplome',
    title: "Certificate of Achievement – Bachelor's Degree in Computer Engineering",
    description: "Degree obtained with Very Good honors",
    provider: 'Faculty of Science and Technology Settat',
    date: "2025-12-25",
    file: "/docs/lst.pdf",
  },
  {
    id: ++k,
    type: 'releve',
    title: "Transcript – S6 GI",
    description: "Sixth semester – Bachelor's Degree in Computer Engineering",
    provider: 'Faculty of Science and Technology Settat',
    date: "2025-06-20",
    file: "/docs/s6.pdf",
  },
  {
    id: ++k,
    type: 'releve',
    title: "Transcript – S5 GI",
    description: "Fifth semester – Bachelor's Degree in Computer Engineering",
    provider: 'Faculty of Science and Technology Settat',
    date: "2025-06-18",
    file: "/docs/s5.pdf",
  },
  {
    id: ++k,
    type: 'diplome',
    title: "Certificate of Achievement – DEUST MIP",
    description: "Degree obtained with Fairly Good honors",
    provider: 'Faculty of Science and Technology Settat',
    date: "2024-12-25",
    file: "/docs/deust.pdf",
  },
  {
    id: ++k,
    type: 'releve',
    title: "Transcript – S4 MIP",
    description: "Fourth semester – Mathematics, Computer Science and Physics",
    provider: 'Faculty of Science and Technology Settat',
    date: "2025-06-18",
    file: "/docs/s4.pdf",
  },
  {
    id: ++k,
    type: 'releve',
    title: "Transcript – S3 MIP",
    description: "Third semester – Mathematics, Computer Science and Physics",
    provider: 'Faculty of Science and Technology Settat',
    date: "2025-06-18",
    file: "/docs/s3.pdf",
  },
  {
    id: ++k,
    type: 'releve',
    title: "Transcript – S2 MIP",
    description: "Second semester – DEUST Mathematics, Computer Science and Physics",
    provider: 'Faculty of Science and Technology Settat',
    date: "2025-06-18",
    file: "/docs/s2.pdf",
  },
  {
    id: ++k,
    type: 'releve',
    title: "Transcript – S1 MIP",
    description: "First semester – DEUST Mathematics, Computer Science and Physics",
    provider: 'Faculty of Science and Technology Settat',
    date: "2025-06-18",
    file: "/docs/s1.pdf",
  },
  {
    id: ++k,
    type: 'diplome',
    title: "Baccalaureate Diploma",
    description: "Diploma obtained with Good honors",
    provider: 'Faculty of Science and Technology Settat',
    date: "2021-07-25",
    file: "/docs/bac.pdf",
  },
  {
    id: ++k,
    type: 'certificat',
    title: "Linux Unhatched",
    description: "Certificate of achievement attesting to theoretical and practical knowledge of Linux.",
    provider: "Cisco Networking Academy",
    date: "2024-11-02",
    file: "/docs/certificats/linux.pdf",
  },
  {
    id: ++k,
    type: 'certificat',
    title: "Python Developer",
    description: "Certificate of achievement attesting to theoretical and practical skills in Python development.",
    provider: "SoloLearn",
    date: "2024-10-08",
    file: "/docs/certificats/python.pdf",
  },
  {
    id: ++k,
    type: 'certificat',
    title: "Java Intermediate",
    description: "Certificate of achievement attesting to theoretical and practical skills in intermediate Java.",
    provider: "SoloLearn",
    date: "2024-09-29",
    file: "/docs/certificats/java.pdf",
  },
  {
    id: ++k,
    type: 'certificat',
    title: "IELTS Result",
    description: "Official English proficiency assessment test.",
    provider: "IELTS",
    date: "2025-01-11",
    file: "/docs/ielts.pdf",
  },
  {
    id: ++k,
    type: 'certificat',
    title: "TCF Result",
    description: "French knowledge test – Assessment of French proficiency level.",
    provider: "France Éducation international",
    date: "2026-01-19",
    file: "/docs/tcf.pdf",
  },
  {
    id: ++k,
    type: 'stage',
    title: "Internship Certificate – International Central University",
    description: "Certificate confirming the completion of an internship at the International Central University in Casablanca.",
    provider: "International Central University – Casablanca",
    date: "2026-10-02",
    file: "/docs/stages/uic.pdf",
  },
  {
    id: ++k,
    type: 'stage',
    title: "Internship Certificate – Nobough Academy",
    description: "Certificate confirming the completion of an internship at Nobough Academy.",
    provider: "Nobough Academy",
    date: "2025-06-10",
    file: "/docs/stages/nobough.pdf",
  },
];

const config = {
  logo: "/logo.png",
  domaine: "https://www.pahae.online",
};

let j = 0;
const media = [
  {
    id: ++j,
    type: 'video',
    name: "Me in AOT's world",
    content: `<script src="https://fast.wistia.com/player.js" async></script><script src="https://fast.wistia.com/embed/hoyt9s77oc.js" async type="module"></script><style>wistia-player[media-id='hoyt9s77oc']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/hoyt9s77oc/swatch'); display: block; filter: blur(5px); }</style> <wistia-player media-id="hoyt9s77oc" wistia-popover="true" aspect="2.0" style="width: 150px;height: 75px;"></wistia-player>`
  },
  {
    id: ++j,
    type: 'video',
    name: "My Final Year Project Defense",
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
  { words: ["me", "profile", "general"], page: "Me" },
  { words: ["background", "achievement"], page: "Achievements" },
  { words: ["skill", "skills"], page: "Skills" },
  { words: ["project"], page: "Projects" },
  { words: ["document", "doc"], page: "Docs" },
  { words: ["review", "feedback"], page: "Feedbacks" },
  { words: ["contact"], page: "Contact" },
  { words: ["pahae", "intelligence", "ai"], page: "Pahae AI" },

  { words: ["trash", "bin"], page: "Bin" },
  { words: ["chrome", "browser"], page: "Chrome" },
  { words: ["folder"], page: "Folder" },
  { words: ["paint"], page: "Paint" },
  { words: ["computer", "this pc", "pc", "settings"], page: "This PC" },

  { words: ["zoom"], page: "Infinite Zoom" },
  { words: ["pointer"], page: "Pointer" },
  { words: ["alchemy"], page: "Little Alchemy" },
  { words: ["universe", "space"], page: "Universe" },

  { words: ["video"], page: "My Videos" },
  { words: ["image"], page: "My Images" },
  { words: ["audio"], page: "My Audios" },

  { words: ["terminal", "cmd", "command prompt"], page: "Terminal" },
  { words: ["close all", "close", "clear"], page: "" },
];


export { socials, achievements, SKILLS, feedbacks, projects, documents, config, media, voiceCommands };