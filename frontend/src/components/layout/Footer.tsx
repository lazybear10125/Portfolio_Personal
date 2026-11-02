import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, MessageSquare, Heart, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/BrandIcons';

const SOCIAL_LINKS = [
  { name: 'GitHub', url: 'https://github.com', icon: GithubIcon },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: LinkedinIcon },
  { name: 'Twitter/X', url: 'https://twitter.com', icon: TwitterIcon },
  { name: 'Discord', url: 'https://discord.com', icon: MessageSquare },
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-dark-surface to-dark-bg pt-16 pb-12 overflow-hidden">
      {/* Top subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-primary/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-cyan p-[1.5px]">
                <div className="w-full h-full bg-dark-surface rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-cyan" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Alex Nguyen
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Senior Full-stack Developer passionate about high-availability Java Spring Boot architectures and modern fluid motion UI experiences.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl bg-dark-card border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-primary/40 hover:shadow-neon-purple/40 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-cyan transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Spec Stack Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase text-slate-300 tracking-wider">
              Architecture Spec
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-dark-card border border-white/5">Java 21</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-card border border-white/5">Spring Boot 3</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-card border border-white/5">Spring Security</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-card border border-white/5">MySQL 8.0</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-card border border-white/5">React 19</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-card border border-white/5">TypeScript</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-card border border-white/5">Tailwind CSS</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-card border border-white/5">Framer Motion</span>
            </div>
            <p className="text-xs text-slate-400 pt-2">
              Designed with glassmorphism, responsive CSS grid, and strict semantic HTML5.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Alex Nguyen. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>and modern engineering standards.</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-cyan transition-colors cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
