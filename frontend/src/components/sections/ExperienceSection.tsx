import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { EXPERIENCES_DATA } from '../../data/experienceData';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'work' | 'education'>('all');

  const filteredItems =
    activeTab === 'all'
      ? EXPERIENCES_DATA
      : EXPERIENCES_DATA.filter((item) => item.type === activeTab);

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="04. JOURNEY & MILESTONES"
          title="Experience &"
          highlightText="Academic Foundation"
          subtitle="Continuous growth across enterprise production engineering, distributed systems, and collaborative development."
        />

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-14">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary text-white shadow-neon-purple'
                : 'bg-dark-surface/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setActiveTab('work')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'work'
                ? 'bg-primary text-white shadow-neon-purple'
                : 'bg-dark-surface/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4 text-cyan" />
            <span>Work History</span>
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'education'
                ? 'bg-primary text-white shadow-neon-purple'
                : 'bg-dark-surface/80 text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-cyan" />
            <span>Education</span>
          </button>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 md:ml-32 space-y-12">
          {filteredItems.map((item, index) => {
            const isWork = item.type === 'work';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-6 sm:pl-10"
              >
                {/* Glowing Node on Timeline */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-dark-bg border-2 border-primary flex items-center justify-center shadow-neon-purple">
                  {isWork ? (
                    <Briefcase className="w-3.5 h-3.5 text-cyan" />
                  ) : (
                    <GraduationCap className="w-3.5 h-3.5 text-primary-light" />
                  )}
                </div>

                {/* Period Badge for Desktop (Left Floating) */}
                <div className="hidden md:block absolute -left-36 top-2 text-right w-24">
                  <span className="text-xs font-mono font-semibold text-cyan">
                    {item.period}
                  </span>
                </div>

                {/* Card Container */}
                <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8">
                  {/* Period for Mobile */}
                  <div className="md:hidden flex items-center gap-1.5 text-xs font-mono text-cyan mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period}</span>
                  </div>

                  {/* Title & Organization */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <h3 className="text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-primary-light" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-cyan/90 mb-4">
                    {item.organization}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  {item.achievements.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {item.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-dark-card border border-white/5 text-slate-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
