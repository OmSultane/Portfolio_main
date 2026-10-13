import React, { useState } from 'react';
import { projectsData } from '../data/projects';
import type { Project } from '../data/projects';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';
import { ExternalLink, Info, MapPin, FolderSearch, Binary } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getProjectGraphic = (id: string) => {
    switch (id) {
      case 'spot-on-jalgaon':
        return (
          <div className="h-44 w-full bg-gradient-to-br from-indigo-950/60 via-[#0d1020] to-[#0a0c16] rounded-t-2xl p-5 border-b border-white/[0.06] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-indigo-300">
                <MapPin className="w-3 h-3 text-indigo-400" />
                <span>Jalgaon Local Venues</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">PHP + MySQL</span>
            </div>

            {/* Visual venue grid simulation */}
            <div className="grid grid-cols-4 gap-2 my-auto">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="block text-sm">🏟️</span>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">Turfs</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="block text-sm">📚</span>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">Libraries</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="block text-sm">🎮</span>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">Gaming</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-center">
                <span className="block text-sm">🏛️</span>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">Halls</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="text-emerald-400 flex items-center gap-1">● Venue Discovery & Booking</span>
              <span>Relational DB</span>
            </div>
          </div>
        );

      case 'digital-content-organizer':
        return (
          <div className="h-44 w-full bg-gradient-to-br from-cyan-950/40 via-[#0d121c] to-[#0a0c16] rounded-t-2xl p-5 border-b border-white/[0.06] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-cyan-300">
                <FolderSearch className="w-3 h-3 text-cyan-400" />
                <span>Asset Repository</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">Categorization</span>
            </div>

            {/* Content tags preview */}
            <div className="flex flex-wrap gap-1.5 my-auto">
              <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">📄 Docs</span>
              <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">🖼️ Images</span>
              <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">🎬 Media</span>
              <span className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">📝 Notes</span>
              <span className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-300">★ Favorites</span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="text-cyan-400 flex items-center gap-1">● Centralized File Management</span>
              <span>Search & Tags</span>
            </div>
          </div>
        );

      case 'java-dsa-practice':
        return (
          <div className="h-44 w-full bg-gradient-to-br from-amber-950/40 via-[#13111e] to-[#0a0c16] rounded-t-2xl p-5 border-b border-white/[0.06] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-amber-300">
                <Binary className="w-3 h-3 text-amber-400" />
                <span>Algorithms & Structures</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">Java Solutions</span>
            </div>

            {/* Tree and algorithm pattern simulation */}
            <div className="font-mono text-[11px] text-slate-300 my-auto bg-black/30 p-2.5 rounded-lg border border-white/[0.05]">
              <span className="text-amber-400">O(log N)</span> Binary Search &bull; Trees &bull; Stacks &bull; Two Pointers
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="text-amber-400 flex items-center gap-1">● Algorithmic Problem Solving</span>
              <span>Clean OOP</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-3">
            Portfolio Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Practical web applications and algorithmic problem solving developed with focus on clean code, relational databases, and functionality.
          </p>
          <div className="w-16 h-1 bg-indigo-500 rounded-full mt-4"></div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#0c0f1a] border border-white/[0.07] hover:border-indigo-500/40 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/20"
            >
              <div>
                {/* Visual Header */}
                {getProjectGraphic(project.id)}

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
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors ml-auto"
                >
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Details</span>
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
