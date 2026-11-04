import Head from 'next/head';
import Link from 'next/link';
import { buttonPrimary, container } from '@/lib/classes';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Page introuvable – Pahae</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={`${container} flex min-h-screen flex-col items-start justify-center gap-6`}>
        <p className="font-display text-6xl font-semibold tracking-tight">404</p>
        <h1 className="font-display text-2xl font-semibold">Cette page n’existe pas.</h1>
        <p className="max-w-md text-muted dark:text-muted-dark">
          L’adresse saisie ne correspond à aucune page du portfolio. Retournez à l’accueil pour retrouver les projets, le parcours et les documents.
        </p>
        <Link href="/" className={buttonPrimary}>
          Retour à l’accueil
        </Link>
      </main>
    </>
  );
}