import "@/styles/globals.css";
import Head from "next/head";
import { config } from "@/utils/constants";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const logo = config.logo;
  const domaine = config.domaine;

  const [focusing, setFocusing] = useState(true);
  const [blurTitle, setBlurTitle] = useState("Reviens vite ! 😥");
  const blurTitles = ["Reviens vite ! 😥", "Reviens !!! 😢", "NOOON 😭😭😭", "Reviens 😥😥", "Ne me laisse pas seul", "Reviens à moi 😭😭", "Je t'attends 💔", "Ne me quitte paaaas !"];

  useEffect(() => {
    window.onblur = () => setFocusing(false);
    window.onfocus = () => setFocusing(true);

    let i = 0;
    const interv = setInterval(() => {
      if(i >= blurTitles.length)
        i = 0;
      setBlurTitle(blurTitles[i++]);
    }, 400);

    return () => clearInterval(interv);
  }, []);

  return (
    <>
      <Head>
        <title>{focusing ? "LAMRISSI Bahaa-eddine | Portfolio Personnel" : blurTitle}</title>

        <meta
          name="description"
          content="Portfolio professionnel de LAMRISSI Bahaa-eddine — Ingénieur passionné par le développement web, la cybersécurité et les systèmes informatiques. Découvrez mes projets, mon parcours et mes compétences."
        />

        <meta
          name="keywords"
          content="LAMRISSI Bahaa-eddine, Bahaa Lamrissi, portfolio, ingénieur informatique, développeur web, Next.js, React, FST Settat, Maroc, réseaux et systèmes informatiques"
        />

        <meta name="author" content="LAMRISSI Bahaa-eddine" />

        <link rel="icon" href={logo} type="image/png" />

        <meta property="og:title" content="LAMRISSI Bahaa-eddine | Portfolio" />
        <meta
          property="og:description"
          content="Découvrez le portfolio professionnel de LAMRISSI Bahaa-eddine — Ingénieur spécialisé en Réseaux et Systèmes Informatiques."
        />
        <meta property="og:image" content={`${domaine}${logo}`} />
        <meta property="og:url" content={domaine} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LAMRISSI Bahaa-eddine | Portfolio" />
        <meta
          name="twitter:description"
          content="Portfolio professionnel de LAMRISSI Bahaa-eddine — Développeur et ingénieur informatique marocain."
        />
        <meta name="twitter:image" content={`${domaine}${logo}`} />

        <meta name="robots" content="index, follow" />
        <meta name="language" content="fr" />
        <meta name="revisit-after" content="7 days" />
        <meta name="theme-color" content="#003366" />

        <link rel="canonical" href={domaine} />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

