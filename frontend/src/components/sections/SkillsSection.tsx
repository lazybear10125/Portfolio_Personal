import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { SKILLS_DATA } from '../../data/skillsData';
import {
  Coffee,
  Layers,
  ShieldCheck,
  Database,
  Atom,
  FileCode2,
  Braces,
  Palette,
  Code2,
  HardDrive,
  Server,
  GitBranch,
  Container,
  CheckCircle2,
  Cpu,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Coffee,
  Layers,
  ShieldCheck,
  Database,
  Atom,
  FileCode2,
  Braces,
  Palette,
  Code2,
  HardDrive,
  Server,
  GitBranch,
  Container,
  CheckCircle2,
};

type CategoryFilter = 'all' | 'backend' | 'frontend' | 'database' | 'devops';

const CATEGORIES: { label: string; value: CategoryFilter }[] = [
  { label: 'All Technologies', value: 'all' },
  { label: 'Backend Engineering', value: 'backend' },
  { label: 'Frontend & UI', value: 'frontend' },
  { label: 'Databases', value: 'database' },
  { label: 'DevOps & Tooling', value: 'devops' },
];

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredSkills =
    activeCategory === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="02. TECHNICAL SKILLS"
          title="Mastered Toolset &"
          highlightText="Core Capabilities"
          subtitle="Battle-tested technologies employed to build high-availability microservices, responsive web architectures, and rock-solid databases."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-cyan text-white shadow-neon-purple/40 border-transparent'
                    : 'bg-dark-surface/80 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredSkills.map((skill, index) => {
              const IconComponent = ICON_MAP[skill.icon] || Cpu;
              return (
                <motion.div
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden"
                >
                  {/* Subtle hover gradient bloom */}
                  <div
                    className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: skill.color }}
                  />

                  <div>
                    {/* Header: Icon & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-dark-surface border border-white/10 group-hover:border-primary/50 group-hover:scale-105 transition-all duration-300"
                        style={{ color: skill.color }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 text-slate-400 border border-white/5 tracking-wider">
                        {skill.category}
                      </span>
                    </div>

                    {/* Skill Name */}
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan transition-colors">
                      {skill.name}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {skill.description}
                    </p>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-slate-400">Proficiency</span>
                      <span className="font-semibold text-white">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-dark-surface rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, #8B5CF6, ${skill.color})`,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
