import React from 'react';
import { portfolioConfig } from '../config/portfolio';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodeChefIcon } from './Icons';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#05060a] border-t border-white/[0.06] pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/[0.05]">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono text-xs font-bold">
                {portfolioConfig.personal.initials}
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {portfolioConfig.personal.name}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {portfolioConfig.meta.tagline}
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-2.5">
            <a
              href={portfolioConfig.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06] transition-colors"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={portfolioConfig.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.06] transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={portfolioConfig.contact.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-amber-400 border border-white/[0.06] transition-colors"
              aria-label="LeetCode Profile"
              title="LeetCode"
            >
              <LeetCodeIcon className="w-4 h-4" />
            </a>

            <a
              href={portfolioConfig.contact.codechef}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-amber-300 border border-white/[0.06] transition-colors"
              aria-label="CodeChef Profile"
              title="CodeChef"
            >
              <CodeChefIcon className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 transition-colors ml-2"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <p>
            &copy; {currentYear} {portfolioConfig.personal.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-slate-400">
            Computer Engineering &bull; RCPIT Shirpur
          </p>
        </div>

      </div>
    </footer>
  );
};
