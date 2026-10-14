import React from 'react';
import { Target } from 'lucide-react';

export interface LearningItem {
  title: string;
  category: string;
  description: string;
  status: 'In Progress' | 'Active Daily' | 'Next Up';
}

export const activeLearningItems: LearningItem[] = [
  {
    title: "Java Programming Fundamentals & OOP",
    category: "Core Language",
    description: "Deepening concepts of encapsulation, polymorphism, inheritance, exception handling, and Java collections framework.",
    status: "Active Daily"
  },
  {
    title: "Data Structures & Algorithms",
    category: "Problem Solving",
    description: "Practicing time & space complexity optimization, arrays, two-pointer techniques, recursion, and tree traversals.",
    status: "Active Daily"
  },
  {
    title: "Spring Boot & Backend Architecture",
    category: "Frameworks & APIs",
    description: "Understanding RESTful endpoints, dependency injection, and building structured server-side services.",
    status: "In Progress"
  },
  {
    title: "Relational Database Optimization",
    category: "Data Layer",
    description: "Writing clean SQL queries, indexing, and understanding relational data normalization with MySQL.",
    status: "In Progress"
  },
  {
    title: "Project Development & GitHub Maintenance",
    category: "Practical Engineering",
    description: "Shipping well-documented repositories, writing clean commits, and structuring maintainable codebases.",
    status: "Active Daily"
  }
];

export const LearningJourney: React.FC = () => {
  return (
    <section id="learning" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-3">
            Roadmap
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            What I'm Working On
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            Continuous technical growth is a daily habit. Here are my current learning milestones and architectural topics under active study.
          </p>
          <div className="w-16 h-1 bg-indigo-500 rounded-full mt-4"></div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeLearningItems.map((item, index) => {
            const staggerClass = `stagger-${(index % 4) + 1}`;
            return (
              <div
                key={index}
                className={`reveal-on-scroll ${staggerClass} p-6 rounded-2xl bg-[#0c0f1a] border border-white/[0.07] hover:border-indigo-500/30 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-indigo-950/20 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-indigo-400 font-medium">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px]">Milestone #{index + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-indigo-500/60 group-hover:bg-indigo-400 transition-colors"></span>
                </div>
              </div>
            );
          })}

          {/* Callout Card */}
          <div className="reveal-on-scroll stagger-3 p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-[#0e1222] to-[#0a0c16] border border-indigo-500/30 flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Engineering Philosophy
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Understanding fundamental concepts deeply is superior to memorizing syntaxes. Code quality, deliberate problem solving, and persistence create strong software engineers."
              </p>
            </div>
            <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[11px] font-mono text-indigo-300">
              Consistency &bull; Practice &bull; Curiosity
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
