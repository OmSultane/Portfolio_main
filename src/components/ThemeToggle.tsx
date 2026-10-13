import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`group relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 cursor-pointer border ${
        isDark
          ? 'bg-white/[0.04] hover:bg-white/[0.08] text-amber-400 border-white/[0.1] hover:border-amber-400/40 shadow-sm'
          : 'bg-slate-100 hover:bg-slate-200 text-indigo-600 border-slate-300/80 hover:border-indigo-500/40 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 text-indigo-600" />
        )}
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-medium">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
