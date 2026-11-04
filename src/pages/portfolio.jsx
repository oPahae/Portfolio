import Head from 'next/head';
import { existsSync } from 'fs';
import path from 'path';
import SiteHeader from '../lib/siteHeader';
import HeroSection from '../lib/heroSection';
import AboutSection from '../lib/aboutSection';
import AchievementsSection from '../lib/achievementsSection';
import SkillsSection from '../lib/skillsSection';
import ProjectsSection from '../lib/projectsSection';
import DocumentsSection from '../lib/documentsSection';
import FeedbacksSection from '../lib/feedbacksSection';
import ContactSection from '../lib/contactSection';
import SiteFooter from '../lib/siteFooter';
import AiAssistant from '../lib/aiAssistant';
import { normalizeDocuments, siteConfig } from '../lib/portfolio';

export async function getStaticProps() {
  const documents = normalizeDocuments((file) =>
    existsSync(path.join(process.cwd(), 'public', file))
  );
  return { props: { documents } };
}

export default function Home({ documents }) {
  const cv = documents.find((doc) => doc.type === 'cv' && doc.available);
  const cvFile = cv ? cv.file : null;

  return (
    <>
      <Head>
        <title>{siteConfig.title}</title>
        <meta name="description" content={siteConfig.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteConfig.domain} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content={siteConfig.brand} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:url" content={siteConfig.domain} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
      </Head>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper dark:focus:bg-ink-dark dark:focus:text-paper-dark"
      >
        Aller au contenu
      </a>
      <SiteHeader cvFile={cvFile} />
      <main id="contenu">
        <HeroSection cvFile={cvFile} />
        <AboutSection />
        <AchievementsSection />
        <SkillsSection />
        <ProjectsSection />
        <DocumentsSection documents={documents} />
        <FeedbacksSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <AiAssistant />
    </>
  );
}
