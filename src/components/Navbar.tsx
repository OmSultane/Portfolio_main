import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../config/portfolio';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodeChefIcon } from './Icons';
import { Menu, X, FileDown, Code2 } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 text-white font-semibold tracking-tight hover:opacity-95 transition-opacity"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:border-indigo-400 group-hover:bg-indigo-600/30 transition-all">
            <span className="font-mono text-sm font-bold tracking-normal">{portfolioConfig.personal.initials}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide text-slate-100 group-hover:text-indigo-300 transition-colors">
              {portfolioConfig.personal.name}
            </span>
            <span className="text-[11px] font-mono text-slate-400 -mt-0.5">
              dev.portfolio
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#101422]/70 border border-white/[0.06] rounded-full px-3 py-1.5 backdrop-blur-sm">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions & Socials */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={portfolioConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="w-8.5 h-8.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 flex items-center justify-center transition-all"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={portfolioConfig.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="w-8.5 h-8.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 flex items-center justify-center transition-all"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={portfolioConfig.contact.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            title="LeetCode Profile"
            className="w-8.5 h-8.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-amber-400 hover:text-amber-300 hover:border-amber-500/40 hover:bg-amber-500/10 flex items-center justify-center transition-all"
            aria-label="LeetCode Profile"
          >
            <LeetCodeIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={portfolioConfig.contact.codechef}
            target="_blank"
            rel="noopener noreferrer"
            title="CodeChef Profile"
            className="w-8.5 h-8.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-amber-300 hover:text-amber-200 hover:border-amber-500/40 hover:bg-amber-500/10 flex items-center justify-center transition-all"
            aria-label="CodeChef Profile"
          >
            <CodeChefIcon className="w-3.5 h-3.5" />
          </a>

          {portfolioConfig.resume.available && (
            <a
              href={portfolioConfig.resume.url}
              download
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors ml-1"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] border border-white/[0.08]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-5 bg-[#0a0d17]/95 backdrop-blur-xl border-b border-white/[0.08]">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={portfolioConfig.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioConfig.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] text-slate-300 hover:text-white"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioConfig.contact.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] text-amber-400 hover:text-amber-300"
                aria-label="LeetCode"
              >
                <LeetCodeIcon className="w-4 h-4" />
              </a>
              <a
                href={portfolioConfig.contact.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/[0.04] text-amber-300 hover:text-amber-200"
                aria-label="CodeChef"
              >
                <CodeChefIcon className="w-4 h-4" />
              </a>
            </div>

            {portfolioConfig.resume.available ? (
              <a
                href={portfolioConfig.resume.url}
                download
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            ) : (
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.06] text-slate-300 hover:text-white"
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Get in Touch</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
