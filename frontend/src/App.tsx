import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/loading/LoadingScreen';
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgress } from './components/common/ScrollProgress';
import { BackToTop } from './components/common/BackToTop';
import { FloatingCanvas } from './components/3d/FloatingCanvas';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-dark-bg text-slate-100 overflow-x-hidden selection:bg-primary/30 selection:text-cyan">
      {/* Initial Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Interactive Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating 3D Starfield Canvas */}
      <FloatingCanvas />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </motion.main>

      {/* Footer */}
      <Footer />

      {/* Floating Back to Top Control */}
      <BackToTop />
    </div>
  );
}
