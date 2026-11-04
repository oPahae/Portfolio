import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './themeToggle';
import { container, focusRing } from '../lib/classes';
import { siteConfig } from '../lib/portfolio';
import Link from 'next/link';

const navItems = [
  { id: 'profil', label: 'Profile' },
  { id: 'parcours', label: 'Background' },
  { id: 'competences', label: 'Skills' },
  { id: 'projets', label: 'Projects' },
  { id: 'documents', label: 'Documents' },
  { id: 'temoignages', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
];

const observedIds = ['accueil', ...navItems.map((item) => item.id)];

export default function SiteHeader({ cvFile }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const elements = observedIds.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id === 'accueil' ? '' : entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const cvProps = cvFile
    ? { href: cvFile, target: '_blank', rel: 'noopener noreferrer' }
    : { href: '#documents' };

  const linkClass = (id) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors ${focusRing} ${
      active === id
        ? 'bg-ink/5 text-ink dark:bg-ink-dark/10 dark:text-ink-dark'
        : 'text-muted hover:text-ink dark:text-muted-dark dark:hover:text-ink-dark'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur dark:border-line-dark dark:bg-paper-dark/90">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <div className={`rounded-md font-display text-xl font-semibold tracking-tight ${focusRing}`}>
          <Link href="#acceuil" className='hover:text-violet-500 duration-200'>{siteConfig.brand}</Link>
          {' | '}
          <Link href="/" className='hover:text-violet-500 duration-200'>{siteConfig.brand}OS</Link>
        </div>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={linkClass(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            {...cvProps}
            className={`hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:text-white hover:bg-violet-400 dark:bg-ink-dark dark:text-paper-dark dark:hover:bg-violet-400 sm:inline-flex ${focusRing}`}
          >
            CV
          </a>
          {/* <ThemeToggle /> */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menuMobile"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink dark:border-line-dark dark:text-ink-dark lg:hidden ${focusRing}`}
          >
            {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="menuMobile"
          aria-label="Mobile navigation"
          className="border-t border-line bg-paper dark:border-line-dark dark:bg-paper-dark lg:hidden"
        >
          <ul className={`${container} flex flex-col py-3`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'location' : undefined}
                  className={`block py-3 text-base font-medium ${focusRing} ${
                    active === item.id ? 'text-violet-400 dark:text-violet-500' : ''
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <a
                {...cvProps}
                onClick={() => setOpen(false)}
                className={`inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper dark:bg-ink-dark dark:text-paper-dark ${focusRing}`}
              >
                CV
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
