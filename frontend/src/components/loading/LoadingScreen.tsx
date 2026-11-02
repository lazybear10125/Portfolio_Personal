import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400); // smooth exit
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 8;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-dark-bg select-none"
      >
        {/* Ambient radial glow */}
        <div className="absolute w-96 h-96 rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute w-64 h-64 rounded-full bg-cyan/15 blur-[90px] translate-x-20 -translate-y-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
          {/* Logo Brand Reveal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-cyan p-[2px] shadow-neon-purple mb-6"
          >
            <div className="w-full h-full bg-dark-surface rounded-[14px] flex items-center justify-center">
              <Terminal className="w-8 h-8 text-cyan animate-pulse" />
            </div>
          </motion.div>

          {/* Reveal Name */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-1 mb-8"
          >
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
              Alex Nguyen <span className="text-xs px-2 py-0.5 rounded-full bg-cyan/10 text-cyan border border-cyan/30">v2.5</span>
            </h1>
            <p className="text-sm font-mono text-slate-400">
              Initializing Full-stack Architecture...
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-full bg-dark-card border border-dark-border rounded-full h-2 overflow-hidden p-[1px] relative shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-cyan to-accent-pink rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          {/* Progress Counter & Terminal Status */}
          <div className="w-full flex justify-between items-center mt-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              {progress < 40 ? 'Loading Assets...' : progress < 80 ? 'Connecting Services...' : 'Ready.'}
            </span>
            <span className="font-semibold text-white">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
