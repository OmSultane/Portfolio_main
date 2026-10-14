import React from 'react';
import { portfolioConfig } from '../config/portfolio';
import { GraduationCap, Code2, Target, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-3">
            Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            A Little About Me
          </h2>
          <div className="w-16 h-1 bg-indigo-500 rounded-full mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Story / Description Column */}
          <div className="lg:col-span-7 space-y-4 text-slate-300 text-base leading-relaxed reveal-on-scroll stagger-1">
            {portfolioConfig.personal.aboutText.map((paragraph, index) => (
              <p key={index} className="text-slate-300">
                {paragraph}
              </p>
            ))}

            <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Problem Solver
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Backend Enthusiast
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Clean Code Advocate
              </span>
            </div>
          </div>

          {/* Three Small Information Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            
            {/* Card 1: Education */}
            <div className="p-5 rounded-xl bg-[#0f121e]/80 border border-white/[0.08] hover:border-indigo-500/30 transition-all reveal-on-scroll stagger-1 hover:translate-y-[-2px]">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono text-indigo-300">
                    Education
                  </h3>
                  <p className="text-base font-medium text-slate-100 mt-1">
                    Computer Engineering
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    R.C. Patel Institute of Technology, Shirpur
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Development Experience */}
            <div className="p-5 rounded-xl bg-[#0f121e]/80 border border-white/[0.08] hover:border-indigo-500/30 transition-all reveal-on-scroll stagger-2 hover:translate-y-[-2px]">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono text-cyan-300">
                    Development
                  </h3>
                  <p className="text-base font-medium text-slate-100 mt-1">
                    Web Development Experience
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Frontend and backend fundamentals (HTML, CSS, JS, PHP, MySQL)
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Current Focus */}
            <div className="p-5 rounded-xl bg-[#0f121e]/80 border border-white/[0.08] hover:border-indigo-500/30 transition-all reveal-on-scroll stagger-3 hover:translate-y-[-2px]">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono text-violet-300">
                    Current Focus
                  </h3>
                  <p className="text-base font-medium text-slate-100 mt-1">
                    Java & Backend Engineering
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {["Java", "DSA", "Spring Boot", "Backend Systems"].map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-white/[0.05] border border-white/[0.08] text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
