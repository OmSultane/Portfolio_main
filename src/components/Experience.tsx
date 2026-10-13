import React from 'react';
import { timelineData } from '../data/experience';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative bg-[#06080d]/60 border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-3">
            Milestones
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Experience & Learning
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
            My journey through practical industry exposure and academic foundations in Computer Engineering.
          </p>
          <div className="w-16 h-1 bg-indigo-500 rounded-full mt-4"></div>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-4 sm:pl-8 border-l border-white/[0.1] space-y-12 ml-2 sm:ml-4">
          {timelineData.map((item) => {
            const isWork = item.type === 'experience';
            return (
              <div key={item.id} className="relative group">
                
                {/* Timeline node icon */}
                <div className={`absolute -left-[25px] sm:-left-[41px] top-1 p-2 rounded-full border shadow-md transition-all ${
                  isWork
                    ? 'bg-[#0f1325] border-indigo-500 text-indigo-400 group-hover:scale-110'
                    : 'bg-[#101925] border-cyan-500 text-cyan-400 group-hover:scale-110'
                }`}>
                  {isWork ? <Briefcase className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                </div>

                {/* Card Container */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#0c0f1a] border border-white/[0.07] hover:border-indigo-500/30 transition-all shadow-sm">
                  
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {isWork ? 'Industry Internship' : 'Higher Education'}
                        </span>
                        {item.mode && (
                          <span className="text-[11px] font-mono text-slate-400">
                            ({item.mode})
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm font-semibold text-slate-300">
                        {item.organization}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 gap-1 mt-1 sm:mt-0">
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Bullet Points */}
                  {item.keyPoints && item.keyPoints.length > 0 && (
                    <div className="space-y-2 mb-5">
                      {item.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/80 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies Used */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="pt-4 border-t border-white/[0.05] flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono text-slate-400 mr-1">
                        Technologies:
                      </span>
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
