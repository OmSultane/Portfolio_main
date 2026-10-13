import React from 'react';
import { portfolioConfig } from '../config/portfolio';
import { GithubIcon } from './Icons';
import { ExternalLink, GitBranch, Code, Terminal } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  const featuredRepos = [
    {
      name: "SpotOnJalgaon",
      description: "Local venue discovery and booking platform built with PHP and MySQL.",
      language: "PHP / JavaScript",
      url: "https://github.com/OmSultane/SpotOnJalgaon",
      tags: ["PHP", "MySQL", "Web App"]
    },
    {
      name: "Digital-Content-Organizer",
      description: "Centralized platform for organizing, categorizing, and searching digital media and documents.",
      language: "PHP / JavaScript",
      url: "https://github.com/OmSultane/Digital-Content-Organizer",
      tags: ["Content Management", "Asset Organizing"]
    },
    {
      name: "Java-DSA-Practice",
      description: "Collection of Java problem-solving implementations, algorithms, and data structures.",
      language: "Java",
      url: "https://github.com/OmSultane/Java-DSA-Practice",
      tags: ["Java", "DSA", "Problem Solving"]
    }
  ];

  return (
    <section className="py-20 relative bg-[#06080d]/60 border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-3">
              Open Source & Code
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Building, Learning, and Sharing
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              I document code, commit regularly, and maintain projects on GitHub as part of my learning journey.
            </p>
            <div className="w-16 h-1 bg-indigo-500 rounded-full mt-4"></div>
          </div>

          <a
            href={portfolioConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-white border border-white/[0.1] text-xs font-semibold transition-all hover:border-indigo-500/40 w-fit"
          >
            <GithubIcon className="w-4 h-4 text-indigo-400" />
            <span>Visit @OmSultane on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRepos.map((repo) => (
            <div
              key={repo.name}
              className="p-6 rounded-2xl bg-[#0c0f1a] border border-white/[0.07] hover:border-indigo-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <GitBranch className="w-4 h-4" />
                    <span className="text-xs font-mono text-slate-400">Public Repository</span>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-slate-400 hover:text-white"
                    aria-label={`Open ${repo.name}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {repo.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] border border-white/[0.06] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    {repo.language}
                  </span>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors text-[11px]"
                  >
                    View Code &rarr;
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Transparent Banner */}
        <div className="mt-8 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between flex-wrap gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Honest commit activity: No fabricated star counts or synthetic graph stats.</span>
          </div>
          <a
            href={portfolioConfig.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-300 hover:underline font-mono"
          >
            github.com/OmSultane
          </a>
        </div>

      </div>
    </section>
  );
};
