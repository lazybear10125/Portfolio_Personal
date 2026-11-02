import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Database, Server, Monitor } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';
import type { ProjectItem } from '../../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-dark-bg/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-primary/30 p-6 sm:p-8 z-10 shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-dark-surface border border-white/10 text-slate-400 hover:text-white hover:border-cyan transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-primary/20 text-cyan border border-primary/40 inline-block mb-3">
              {project.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-base text-cyan font-mono">
              {project.tagline}
            </p>
          </div>

          {/* Image Banner */}
          <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-white/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-80" />
          </div>

          {/* Detailed Narrative */}
          <div className="space-y-4 mb-8 text-slate-300 text-sm sm:text-base leading-relaxed">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Project Overview</span>
              <span className="w-8 h-[2px] bg-primary inline-block rounded-full"></span>
            </h4>
            <p>{project.longDescription}</p>
          </div>

          {/* Architecture Breakdown 4 Columns */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan" />
              <span>Full-Stack Architecture Breakdown</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Frontend */}
              <div className="rounded-xl bg-dark-surface/60 border border-white/5 p-4">
                <div className="flex items-center gap-2 text-cyan font-bold text-xs uppercase font-mono mb-2">
                  <Monitor className="w-4 h-4" />
                  Frontend Layer
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5">
                  {project.architecture.frontend.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-primary-light">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Backend */}
              <div className="rounded-xl bg-dark-surface/60 border border-white/5 p-4">
                <div className="flex items-center gap-2 text-primary-light font-bold text-xs uppercase font-mono mb-2">
                  <Server className="w-4 h-4" />
                  Backend Layer
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5">
                  {project.architecture.backend.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-cyan">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Database */}
              <div className="rounded-xl bg-dark-surface/60 border border-white/5 p-4">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase font-mono mb-2">
                  <Database className="w-4 h-4" />
                  Data Layer
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5">
                  {project.architecture.database.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deployment */}
              <div className="rounded-xl bg-dark-surface/60 border border-white/5 p-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase font-mono mb-2">
                  <Layers className="w-4 h-4" />
                  DevOps / CI-CD
                </div>
                <ul className="text-xs text-slate-400 space-y-1.5">
                  {project.architecture.deployment.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Key Engineering Highlights */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-white mb-3">Key Technical Highlights</h4>
            <div className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-dark-card border border-white/5 text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-surface border border-white/10 text-xs font-semibold text-white hover:border-cyan transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-cyan text-xs font-semibold text-white shadow-neon-purple hover:brightness-110 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
