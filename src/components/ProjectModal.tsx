import React, { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';
import { portfolioConfig } from '../config/portfolio';
import { GithubIcon, LeetCodeIcon, CodeChefIcon } from './Icons';
import { X, ExternalLink, Check, Layers, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);

      // Focus the close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0e111d] border border-white/[0.1] shadow-2xl p-6 sm:p-8 animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Status */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            {project.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/[0.05] text-slate-300 border border-white/[0.08]">
            {project.statusBadge}
          </span>
        </div>

        {/* Title */}
        <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-indigo-400 mb-6">
          {project.tagline}
        </p>

        {/* Deep Dive Description */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Project Overview
          </h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.longDescription}
          </p>
        </div>

        {/* Key Features List */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Key Features & Architecture
          </h4>
          <ul className="space-y-2">
            {project.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used */}
        <div className="mb-8">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] border border-white/[0.08] text-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.08]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>

          {project.id === 'java-dsa-practice' && (
            <>
              <a
                href={portfolioConfig.contact.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-xs font-medium transition-colors"
              >
                <LeetCodeIcon className="w-3.5 h-3.5" />
                <span>LeetCode Profile</span>
              </a>
              <a
                href={portfolioConfig.contact.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 border border-amber-500/20 text-xs font-medium transition-colors"
              >
                <CodeChefIcon className="w-3.5 h-3.5" />
                <span>CodeChef Profile</span>
              </a>
            </>
          )}

          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-medium border border-white/[0.1] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demonstration</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
