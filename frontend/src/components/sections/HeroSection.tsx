import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Code2, Download, Eye, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '../common/MagneticButton';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / 25;
    const y = (clientY - (top + height / 2)) / 25;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-primary/20 blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan/15 blur-[130px] pointer-events-none -z-10" />

      {/* Floating Geometric Abstract 3D Shapes */}
      <motion.div
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 180, 360],
          x: mouseOffset.x * 0.8,
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute top-24 left-[10%] w-20 h-20 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-md hidden lg:block pointer-events-none"
      />
      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [360, 180, 0],
          x: mouseOffset.x * -0.6,
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-32 right-[8%] w-16 h-16 rounded-full border border-cyan/40 bg-cyan/5 backdrop-blur-md hidden lg:block pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [0.9, 1.1, 0.9],
          rotate: [45, 90, 45],
          y: mouseOffset.y * 0.5,
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 right-[15%] w-12 h-12 border border-accent-purple/30 bg-purple-500/5 rotate-45 hidden xl:block pointer-events-none"
      />

      <motion.div
        style={{ y: heroParallax, opacity: heroOpacity }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Column: Hero Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Status Chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-card border border-primary/30 text-xs font-mono text-cyan mb-6 shadow-neon-purple/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-light" />
            <span className="text-slate-300">Available for Senior Full-stack Roles</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </motion.div>

          {/* Heading with Line-by-Line Stagger Reveal */}
          <div className="space-y-1 mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Architecting{' '}
              <span className="text-gradient-purple-cyan inline-block">High-Performance</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Enterprise Systems &
            </motion.h2>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gradient-cyan-purple leading-tight"
            >
              Fluid Motion Experiences.
            </motion.h2>
          </div>

          {/* Bio Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8"
          >
            Hi, I'm <strong className="text-white font-semibold">Alex Nguyen</strong> — a Senior Full-stack Developer passionate about high-concurrency <span className="text-cyan font-medium">Java 21 Spring Boot</span> architectures, resilient microservices, and fluid <span className="text-primary-light font-medium">React + TypeScript</span> interfaces.
          </motion.p>

          {/* Key Quick Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-4 sm:gap-6 mb-10 text-sm text-slate-400 font-mono"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Clean Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan" />
              <span>Sub-10ms REST APIs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary-light" />
              <span>60 FPS Motion UX</span>
            </div>
          </motion.div>

          {/* CTA Buttons with Magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <MagneticButton
              variant="primary"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-base px-7 py-3.5"
            >
              <Eye className="w-5 h-5" />
              <span>Explore Projects</span>
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              onClick={() => {
                window.open('#contact', '_self');
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-base px-6 py-3.5"
            >
              <Download className="w-5 h-5" />
              <span>Download CV / Resume</span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Column: 3D Floating Avatar & Visual Card */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mouseOffset.x * 0.4,
              y: mouseOffset.y * 0.4,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-72 sm:w-80 md:w-96 aspect-square"
          >
            {/* Outer Rotating Glowing Rings */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary via-cyan to-accent-pink opacity-30 blur-2xl animate-pulse-slow" />
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/60 via-transparent to-cyan/60 p-[2px] transition-all duration-300" />

            {/* Inner Glass Frame */}
            <div className="relative w-full h-full rounded-3xl glass-card overflow-hidden p-6 flex flex-col justify-between shadow-2xl">
              {/* Terminal Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono text-slate-400">developer@alex-core: ~</span>
              </div>

              {/* Developer Hologram / Tech Stack Avatar Graphic */}
              <div className="py-6 flex flex-col items-center justify-center relative">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/40 to-cyan/30 p-[2px] shadow-neon-purple mb-4 relative group">
                  <div className="w-full h-full bg-dark-card rounded-[14px] flex items-center justify-center overflow-hidden">
                    <Code2 className="w-16 h-16 text-cyan group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Floating active badge */}
                  <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-primary text-[10px] font-bold text-white uppercase shadow-md">
                    PRO
                  </span>
                </div>

                <div className="text-center space-y-1">
                  <p className="font-bold text-lg text-white">Alex Nguyen</p>
                  <p className="text-xs font-mono text-cyan">Senior Full-stack & Motion Engineer</p>
                </div>
              </div>

              {/* Terminal Snippet Box */}
              <div className="rounded-xl bg-dark-bg/80 border border-white/5 p-3 text-left font-mono text-xs text-slate-300 space-y-1">
                <p className="text-slate-400">
                  <span className="text-primary-light">const</span> stack = [
                  <span className="text-cyan">'Java 21'</span>, <span className="text-cyan">'Spring Boot'</span>, <span className="text-cyan">'React'</span>];
                </p>
                <p className="text-emerald-400 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 inline" /> SpringSecurity.authenticated(true);
                </p>
              </div>

              {/* Floating Floating Badges with independent animation */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 px-3 py-1.5 rounded-xl bg-dark-surface/90 border border-primary/50 text-xs font-mono text-white shadow-lg backdrop-blur-md flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span>Spring Boot 3</span>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 px-3 py-1.5 rounded-xl bg-dark-surface/90 border border-cyan/50 text-xs font-mono text-white shadow-lg backdrop-blur-md flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
                <span>React 19 / Vite</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 cursor-pointer hover:text-cyan transition-colors"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-cyan" />
        </motion.div>
      </motion.div>
    </section>
  );
};
