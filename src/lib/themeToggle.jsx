import { Moon, Sun } from 'lucide-react';
import { focusRing } from '../lib/classes';

export default function ThemeToggle() {
  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    root.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch {
      return;
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between light and dark theme"
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-violet-400 hover:text-violet-400 dark:border-line-dark dark:text-ink-dark dark:hover:border-violet-500 dark:hover:text-violet-500 ${focusRing}`}
    >
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}
