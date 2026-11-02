import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { Code2, Cpu, ShieldCheck, Zap, Layers, Award, Coffee, GitPullRequest } from 'lucide-react';

const METRICS = [
  { label: 'Years of Experience', value: '4+', icon: Coffee, desc: 'Enterprise & startup software' },
  { label: 'Completed Projects', value: '25+', icon: Layers, desc: 'Production-ready solutions' },
  { label: 'Tech Stack Mastery', value: '14+', icon: Cpu, desc: 'Java, Spring, React, DevOps' },
  { label: 'Code Quality Rating', value: '99%', icon: Award, desc: 'Clean, tested & documented' },
];

const CORE_VALUES = [
  {
    icon: ShieldCheck,
    title: 'Robust Architecture',
    desc: 'Crafting fault-tolerant backend systems with Spring Boot, clean domain boundaries, and bulletproof security.',
  },
  {
    icon: Zap,
    title: 'High Performance & Velocity',
    desc: 'Optimized database queries, sub-10ms response latency, and hardware-accelerated frontend animations.',
  },
  {
    icon: Code2,
    title: 'Maintainable Clean Code',
    desc: 'Adhering to SOLID principles, design patterns, DRY, and thorough unit/integration test coverage.',
  },
  {
    icon: GitPullRequest,
    title: 'End-to-End Delivery',
    desc: 'From architectural brainstorming, schema design, to containerized CI/CD cloud deployment.',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="01. ABOUT ME"
          title="Engineering Systems with"
          highlightText="Precision & Passion"
          subtitle="Transforming complex business logic into high-throughput backend services and fluid, immersive user interfaces."
        />

        {/* Narrative & Career Objectives Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 text-slate-300 leading-relaxed text-base sm:text-lg">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Who I Am</span>
                <span className="w-12 h-[2px] bg-cyan inline-block rounded-full"></span>
              </h3>

              <p>
                I am a dedicated <strong className="text-white">Full-stack Engineer</strong> with a strong academic foundation in Computer Science and years of hands-on experience in building enterprise microservices and modern single-page applications.
              </p>

              <p>
                My backend philosophy centers on the Java ecosystem — leveraging the power of <strong className="text-cyan">Java 21 Virtual Threads</strong>, <strong className="text-cyan">Spring Boot 3</strong>, and <strong className="text-cyan">Spring Data JPA</strong> to craft resilient APIs that scale under high load.
              </p>

              <p>
                On the frontend, I obsess over the bridge between engineering and design. Using <strong className="text-primary-light">React, TypeScript, and Framer Motion</strong>, I construct responsive, accessible interfaces where every micro-interaction feels intentional and silky smooth.
              </p>
            </div>

            {/* Career Objective Box */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs font-mono text-cyan uppercase tracking-wider mb-2 font-semibold">
                Core Career Objective
              </p>
              <p className="text-sm sm:text-base text-slate-400 italic">
                "To continuously architect mission-critical systems that drive real business impact, cultivate engineering excellence across developer teams, and push the boundary of interactive web applications."
              </p>
            </div>
          </motion.div>

          {/* Core Values 2x2 Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-start group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan transition-all duration-300">
                    <Icon className="w-6 h-6 text-cyan group-hover:text-primary-light transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-base mb-2 group-hover:text-cyan transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Metric Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 text-center relative group overflow-hidden border border-white/5 hover:border-primary/40 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-10 h-10 rounded-full bg-dark-surface border border-white/10 flex items-center justify-center mx-auto mb-3 text-cyan group-hover:rotate-12 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight text-gradient-purple-cyan">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-slate-200 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-slate-400">
                  {metric.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
