import React from 'react';
import { skillCategories } from '../data/skills';
import { Code, Layout, Server, Sparkles, Wrench, CheckCircle } from 'lucide-react';

export const Skills: React.FC = () => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'languages':
        return <Code className="w-4 h-4 text-indigo-400" />;
      case 'frontend':
        return <Layout className="w-4 h-4 text-cyan-400" />;
      case 'backend':
        return <Server className="w-4 h-4 text-emerald-400" />;
      case 'learning':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'tools':
        return <Wrench className="w-4 h-4 text-violet-400" />;
      default:
        return <Code className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-[#06080d]/60 border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-3">
            Core Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Technical Skills
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            A transparent representation of the technologies, tools, and paradigms I utilize in practical application development and active studies.
          </p>
          <div className="w-16 h-1 bg-indigo-500 rounded-full mt-4"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const isLearning = cat.id === 'learning';
            const staggerClass = `stagger-${(idx % 4) + 1}`;
            return (
              <div
                key={cat.id}
                className={`reveal-on-scroll ${staggerClass} rounded-2xl p-6 transition-all duration-300 border hover:translate-y-[-2px] ${
                  isLearning
                    ? 'bg-gradient-to-b from-[#101426] to-[#0c0f1d] border-amber-500/20 md:col-span-2 lg:col-span-2 shadow-lg shadow-amber-950/10'
                    : 'bg-[#0c0f1a]/80 border-white/[0.07] hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-950/20'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {cat.title}
                    </h3>
                  </div>
                  {isLearning && (
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      In Active Study
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 mb-5">
                  {cat.subtitle}
                </p>

                {/* Skills Badges / Cards */}
                <div className="space-y-2.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-indigo-400 opacity-80" />
                          <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                        </div>
                        {skill.badge && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            {skill.badge}
                          </span>
                        )}
                      </div>
                      {skill.description && (
                        <p className="text-xs text-slate-400 mt-1 pl-5.5 leading-relaxed">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
