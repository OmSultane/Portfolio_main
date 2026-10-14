import React, { useRef } from 'react';
import type { Project } from '../data/projects';
import { GithubIcon } from './Icons';
import { ExternalLink, Info } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ProjectCardProps {
  project: Project;
  graphic: React.ReactNode;
  staggerIndex: number;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  graphic,
  staggerIndex,
  onOpenDetails,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const canTilt = !prefersReducedMotion && (typeof window !== 'undefined' ? window.matchMedia('(hover: hover) and (pointer: fine)').matches : false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set coordinates for spotlight border glow
    cardRef.current.style.setProperty('--card-mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--card-mouse-y', `${y}px`);

    if (!canTilt) return;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Subtle, restrained tilt (max 6 degrees)
    const rotateX = -normY * 6;
    const rotateY = normX * 6;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
  };

  const handlePointerLeave = () => {
    if (!cardRef.current) return;
    // Smooth reset
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
  };

  const staggerClass = `stagger-${Math.min(staggerIndex + 1, 5)}`;

  return (
    <div className={`tilt-card-container reveal-on-scroll ${staggerClass}`}>
      <div
        ref={cardRef}
        id={`project-${project.id}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="tilt-card spotlight-card group rounded-2xl bg-[#0c0f1a] border border-white/[0.07] hover:border-indigo-500/50 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-950/30 scroll-mt-28 h-full"
      >
        <div>
          {/* Visual Header */}
          {graphic}

          {/* Body Content */}
          <div className="p-6">
            
            {/* Category & Badge */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[11px] font-mono font-medium text-indigo-400">
                {project.category}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                {project.statusBadge}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
              {project.title}
            </h3>

            {/* Short Description */}
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
              {project.description}
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/[0.03] border border-white/[0.06] text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 pb-6 pt-2 border-t border-white/[0.05] flex items-center justify-between gap-2">
          
          {/* GitHub Link */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          {/* Optional Live Demo Link */}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo</span>
            </a>
          )}

          {/* View Details Modal Trigger */}
          <button
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors ml-auto cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span>Details</span>
          </button>

        </div>

      </div>
    </div>
  );
};
