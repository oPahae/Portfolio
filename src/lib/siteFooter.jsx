import { container, focusRing } from '../lib/classes';
import { siteConfig, socialLinks } from '../lib/portfolio';

const footerLinks = [
  { href: '#projets', label: 'Projects' },
  { href: '#documents', label: 'Documents' },
  { href: '#contact', label: 'Contact' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-line py-10 dark:border-line-dark">
      <div className={`${container} flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between`}>
        <div>
          <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
          <p className="text-sm text-muted dark:text-muted-dark">
            {siteConfig.role}. © 2026 {siteConfig.name}.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href} className={`rounded-sm py-1 hover:underline ${focusRing}`}>
              {link.label}
            </a>
          ))}
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.name} (new tab)`}
              className={`rounded-sm py-1 hover:underline ${focusRing}`}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
