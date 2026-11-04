export const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 dark:focus-visible:outline-violet-500';

export const container = 'mx-auto w-full max-w-6xl px-5 sm:px-8';

export const sectionSpacing = 'scroll-mt-16 py-20 sm:py-28';

export const panel =
  'rounded-xl border border-line bg-surface dark:border-line-dark dark:bg-surface-dark';

export const mutedText = 'text-muted dark:text-muted-dark';

export const accentText = 'text-violet-400 dark:text-violet-500';

export const chip =
  'inline-flex items-center rounded-full border border-line bg-paper px-2.5 py-0.5 text-xs font-medium text-muted dark:border-line-dark dark:bg-paper-dark dark:text-muted-dark';

const buttonBase = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${focusRing}`;

export const buttonPrimary = `${buttonBase} bg-ink text-paper hover:bg-violet-400 dark:bg-ink-dark dark:text-paper-dark dark:hover:bg-violet-400`;

export const buttonSecondary = `${buttonBase} border border-line text-ink hover:border-violet-400 hover:text-violet-400 dark:border-line-dark dark:text-ink-dark dark:hover:border-violet-500 dark:hover:text-violet-500`;

export const textLink = `inline-flex items-center gap-1.5 py-1.5 text-sm font-medium text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-violet-400 dark:text-ink-dark dark:decoration-line-dark dark:hover:decoration-violet-500 ${focusRing}`;
