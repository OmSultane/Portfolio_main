import React, { useState, useEffect } from 'react';
import { portfolioConfig } from '../config/portfolio';
import { GithubIcon, LinkedinIcon, LeetCodeIcon, CodeChefIcon } from './Icons';
import { ArrowRight, Mail, Terminal, Sparkles, Database, Layers, Coffee } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ROLES = [
  "Computer Engineering Student",
  "Aspiring Software Engineer",
  "Java & Backend Enthusiast",
  "Problem Solver & Tech Explorer"
];

export const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(() =>
    prefersReducedMotion ? portfolioConfig.personal.headline : ROLES[0]
  );
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const currentRole = ROLES[roleIndex];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText === currentRole) {
      // Pause at full word before deleting
      timeoutId = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === '') {
      // Finished deleting, brief pause before typing next role
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, 300);
    } else {
      // Typing or deleting characters
      const speed = isDeleting ? 28 : 65;
      timeoutId = setTimeout(() => {
        setDisplayedText((prev) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isDeleting, roleIndex, prefersReducedMotion]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden">
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[360px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-ambient-drift" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-ambient-drift" style={{ animationDelay: '-6s' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Introductions & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Availability Badge */}
            {portfolioConfig.personal.availability.isAvailable && (
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6 shadow-sm animate-hero-fade"
                style={{ animationDelay: '50ms' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{portfolioConfig.personal.availability.status}</span>
              </div>
            )}

            {/* Small Introduction */}
            <span 
              className="text-xs uppercase tracking-[0.25em] font-semibold text-indigo-400 mb-2 animate-hero-fade"
              style={{ animationDelay: '100ms' }}
            >
              HELLO, I'M
            </span>

            {/* Main Heading with Animated Gradient Text */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3 animate-hero-fade"
              style={{ animationDelay: '160ms' }}
            >
              <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-300 dark:from-white dark:via-indigo-200 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient-text inline-block">
                {portfolioConfig.personal.name}
              </span>
            </h1>

            {/* Animated Subtitle / Typewriter Role */}
            <div 
              className="text-lg sm:text-xl font-medium text-slate-300 mb-5 flex items-center gap-2 min-h-[32px] animate-hero-fade"
              style={{ animationDelay: '220ms' }}
              aria-live="polite"
            >
              <span className="text-indigo-400 font-mono text-base">&gt;</span>
              <span className="text-slate-200 font-mono text-sm sm:text-base">
                {displayedText}
              </span>
              {!prefersReducedMotion && (
                <span 
                  className="inline-block w-1.5 h-4.5 bg-indigo-400 animate-pulse ml-0.5 rounded-xs" 
                  aria-hidden="true" 
                />
              )}
              <span className="sr-only">{portfolioConfig.personal.headline}</span>
            </div>

            {/* Supporting Description */}
            <p 
              className="text-base text-slate-400 leading-relaxed max-w-xl mb-8 animate-hero-fade"
              style={{ animationDelay: '300ms' }}
            >
              {portfolioConfig.personal.bio}
            </p>

            {/* CTA Buttons with Staggered Delays */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={() => scrollTo('projects')}
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] animate-hero-fade cursor-pointer"
                style={{ animationDelay: '380ms' }}
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.09] text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] animate-hero-fade cursor-pointer"
                style={{ animationDelay: '460ms' }}
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Let's Connect</span>
              </button>
            </div>

            {/* Social Links & Location Quick Info */}
            <div 
              className="flex flex-wrap items-center gap-4 text-xs text-slate-400 animate-hero-fade"
              style={{ animationDelay: '520ms' }}
            >
              <span className="font-mono text-slate-400">Profiles:</span>
              <div className="flex items-center gap-2">
                <a
                  href={portfolioConfig.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={portfolioConfig.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-slate-300 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={portfolioConfig.contact.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-amber-400 hover:text-amber-300 hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors"
                  aria-label="LeetCode Profile"
                  title="LeetCode"
                >
                  <LeetCodeIcon className="w-4 h-4" />
                </a>
                <a
                  href={portfolioConfig.contact.codechef}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-amber-300 hover:text-amber-200 hover:border-amber-500/40 hover:bg-amber-500/10 transition-colors"
                  aria-label="CodeChef Profile"
                  title="CodeChef"
                >
                  <CodeChefIcon className="w-4 h-4" />
                </a>
              </div>
              <span className="text-slate-400">|</span>
              <span className="font-mono text-slate-400">{portfolioConfig.personal.collegeShort}</span>
            </div>

          </div>

          {/* Right Column: Abstract Developer Card */}
          <div className="lg:col-span-5 animate-hero-fade" style={{ animationDelay: '280ms' }}>
            <div className="relative mx-auto max-w-md lg:max-w-none animate-subtle-float">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-2xl bg-[#0d101d]/90 border border-white/[0.09] p-5 shadow-2xl backdrop-blur-md transition-shadow hover:shadow-indigo-500/10">
                
                {/* Header with mock window controls */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 font-mono text-[11px] text-slate-400">DeveloperProfile.java</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-400">
                    <Coffee className="w-3.5 h-3.5" />
                    <span className="font-mono text-[11px] text-indigo-300">Java 21</span>
                  </div>
                </div>

                {/* Developer Code Structure Preview */}
                <div className="font-mono text-xs leading-relaxed text-slate-300 space-y-1.5 overflow-x-auto py-1">
                  <p><span className="text-indigo-400">package</span> com.sultane.portfolio;</p>
                  <p className="text-slate-400">// Computer Engineering Student & Aspiring SDE</p>
                  <p><span className="text-violet-400">public class</span> <span className="text-amber-200">SoftwareEngineer</span> &#123;</p>
                  
                  <div className="pl-4 border-l border-white/[0.06] my-1 space-y-1">
                    <p><span className="text-slate-400">String</span> name = <span className="text-emerald-300">"Om Sultane"</span>;</p>
                    <p><span className="text-slate-400">String</span> institution = <span className="text-emerald-300">"RCPIT Shirpur"</span>;</p>
                    <p><span className="text-slate-400">String[]</span> primary = &#123; <span className="text-emerald-300">"Java"</span>, <span className="text-emerald-300">"MySQL"</span>, <span className="text-emerald-300">"PHP"</span> &#125;;</p>
                    <p><span className="text-slate-400">String[]</span> activeStudy = &#123; <span className="text-emerald-300">"DSA"</span>, <span className="text-emerald-300">"Spring Boot"</span> &#125;;</p>
                    <p><span className="text-slate-400">boolean</span> readyToContribute = <span className="text-amber-400">true</span>;</p>
                  </div>

                  <div className="pl-4 border-l border-white/[0.06] my-2 pt-1 text-slate-300">
                    <p><span className="text-violet-400">public void</span> <span className="text-blue-300">executeRoadmap</span>() &#123;</p>
                    <p className="pl-4 text-slate-400">System.out.println(<span className="text-emerald-300">"Building backend systems..."</span>);</p>
                    <p>&#125;</p>
                  </div>

                  <p>&#125;</p>
                </div>

                {/* Quick Stack Badges on Card Footer */}
                <div className="mt-4 pt-3.5 border-t border-white/[0.06] grid grid-cols-3 gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[11px] font-mono text-slate-300">OOP Core</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <Database className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[11px] font-mono text-slate-300">SQL & DB</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[11px] font-mono text-slate-300">Problem Solving</span>
                  </div>
                </div>

              </div>

              {/* Sub-card floating badge */}
              <div className="mt-3 flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#111424]/80 border border-white/[0.06] text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-mono text-slate-300 text-[11px]">Softanic Solutions Alum</span>
                </div>
                <span className="font-mono text-[11px] text-indigo-400">~3 Mo Web Intern</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
