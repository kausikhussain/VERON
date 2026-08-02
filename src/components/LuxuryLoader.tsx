import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LuxuryLoaderProps {
  onComplete: () => void;
}

export const LuxuryLoader: React.FC<LuxuryLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#08080A] text-[#F8F9FA] px-6 py-12 select-none overflow-hidden"
        >
          {/* Subtle Ambient Background Gradient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

          {/* Top Crest / Brand Mark */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-2 mt-8"
          >
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#C5A059] font-mono">
              EST. 1846 • MAYFAIR LONDON
            </span>
            <div className="w-8 h-[1px] bg-[#C5A059]/40" />
          </motion.div>

          {/* Center Main Typography Reveal */}
          <div className="flex flex-col items-center text-center max-w-2xl z-10 my-auto">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-widest text-[#F8F9FA] uppercase leading-tight"
            >
              Aurelius & Co.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#EFECE6] font-light mt-4"
            >
              Haute Couture & Bespoke Tailoring
            </motion.p>

            {/* Progress Bar & Numeric Indicator */}
            <div className="w-64 sm:w-80 mt-12 space-y-3">
              <div className="relative w-full h-[2px] bg-[#1F2128] overflow-hidden rounded-full">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#C5A059] via-[#EFECE6] to-[#C5A059]"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              
              <div className="flex items-center justify-between text-[11px] font-mono text-[#C5A059]/80 tracking-widest">
                <span>INITIALIZING ATELIER</span>
                <span>{Math.min(progress, 100)}%</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-between w-full max-w-6xl text-[10px] tracking-widest text-[#EFECE6]/60 font-mono border-t border-[#1F2128] pt-6"
          >
            <span>LONDON • PARIS • NEW YORK • TOKYO</span>
            <span className="hidden sm:inline">AUTUMN / WINTER AW 26/27</span>
            <span>VOL. LXXXIV</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
