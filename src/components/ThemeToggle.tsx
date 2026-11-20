import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={!isLight}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border transition-all duration-150 cursor-pointer select-none shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D5C46] dark:focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950 ${
        isLight
          ? 'bg-white hover:bg-emerald-50/70 border-slate-200 hover:border-[#0D5C46]/40 text-slate-700 hover:text-[#0D5C46] shadow-xs'
          : 'bg-neutral-900 hover:bg-neutral-800 border-neutral-800 hover:border-emerald-500/50 text-amber-300 hover:text-amber-200 shadow-xs'
      } ${className}`}
    >
      {isLight ? (
        <Moon className="w-4 h-4 stroke-[2.2]" />
      ) : (
        <Sun className="w-4 h-4 stroke-[2.2]" />
      )}
    </button>
  );
}
