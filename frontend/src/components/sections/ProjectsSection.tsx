import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../common/SectionHeading';
import { PROJECTS_DATA } from '../../data/projectsData';
import type { ProjectItem } from '../../types';
import { ProjectDetailModal } from '../modals/ProjectDetailModal';
import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from '../common/BrandIcons';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();

    const mouseX = clientX - left;
    const mouseY = clientY - top;

    // 3D Tilt calculation (subtle and smooth)
    const rY = ((mouseX - width / 2) / (width / 2)) * 8; // -8 to 8 deg
    const rX = -((mouseY - height / 2) / (height / 2)) * 8; // -8 to 8 deg

    setRotateX(rX);
    setRotateY(rY);
    setSpotlightPos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        y: isHovered ? -8 : 0,
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.1 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className="relative rounded-3xl glass-card overflow-hidden flex flex-col justify-between group border border-white/10 hover:border-primary/50 transition-colors duration-300"
    >
      {/* Dynamic Cursor Spotlight Radial Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-50 transition-opacity duration-300 -z-10"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(139, 92, 246, 0.25), transparent 70%)`,
          }}
        />
      )}

      {/* Card Image Banner */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-dark-card">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/40 to-transparent" />

        {/* Featured Tag */}
        {project.featured && (
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-md text-white text-xs font-semibold shadow-neon-purple">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Case</span>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-dark-surface/80 backdrop-blur-md border border-white/10 text-cyan text-xs font-mono">
          {project.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
        <div>
          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-cyan transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-300 line-clamp-3 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-white/5 text-slate-400">
                +{project.tags.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(project)}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-cyan hover:text-white transition-colors cursor-pointer"
          >
            <span>View Architecture</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-dark-surface border border-white/5 text-slate-400 hover:text-white hover:border-cyan transition-colors cursor-pointer"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-dark-surface border border-white/5 text-slate-400 hover:text-cyan hover:border-cyan transition-colors cursor-pointer"
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Full-stack', 'Java & Spring', 'React & Frontend'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="03. FEATURED WORK"
          title="Engineered for"
          highlightText="Scale & Precision"
          subtitle="A selection of high-concurrency backend services and interactive web applications built with modern engineering standards."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-cyan text-white shadow-neon-purple/40 border-transparent'
                    : 'bg-dark-surface/80 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
};
