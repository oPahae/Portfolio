import SectionHeading from './sectionHeading';
import { container, sectionSpacing } from '@/lib/classes';

const builds = [
  {
    title: 'Web applications',
    text: 'Websites and platforms built with Next.js, React or PHP, from showcase sites to full management systems: Amaton, Nobough, Panorama Dades, Imperial Trail Tours.',
  },
  {
    title: 'Real-time communication',
    text: 'Messaging, audio and video calls, and video conferencing with Socket.IO and WebRTC: Obsidian, Assembler, Nobough, Vynora.',
  },
  {
    title: 'Mobile and desktop',
    text: 'Flutter, Electron.js or Java Spring Boot applications: GymFuel, PahaePoster, MES Performance, Tasky.',
  },
  {
    title: 'Deployment',
    text: 'Docker, Nginx and Linux are part of my toolkit, and several projects are deployed on VPS servers.',
  },
];

export default function AboutSection() {
  return (
    <section id="profil" aria-labelledby="titreProfil" className={`${sectionSpacing} border-t border-line dark:border-line-dark`}>
      <div className={container}>
        <SectionHeading
          id="titreProfil"
          title="Building complete applications, from interface to deployment"
        />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="max-w-prose space-y-5 text-lg lg:col-span-6">
            <p>
              I am a Full-Stack developer and a Master’s student in Computer Systems and Networks at FST Settat. After a baccalaureate in Physical Sciences, a DEUST in Mathematics, Physics and Computer Science, and then a bachelor’s degree in Computer Engineering, I steered my path toward software development.
            </p>
            <p>
              My work covers the frontend with React and Next.js, the backend with Node.js, Express, PHP or Spring Boot, MySQL, MongoDB and Firebase databases, as well as mobile and desktop applications with Flutter and Electron.js. I have completed academic projects, personal projects, freelance assignments and internship projects, several of which are available online.
            </p>
          </div>

          <dl className="divide-y divide-line border-y border-line dark:divide-line-dark dark:border-line-dark lg:col-span-6">
            {builds.map((item) => (
              <div key={item.title} className="grid gap-1 py-5 sm:grid-cols-3 sm:gap-6">
                <dt className="font-display text-lg font-semibold">{item.title}</dt>
                <dd className="text-muted dark:text-muted-dark sm:col-span-2">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
