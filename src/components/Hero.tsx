import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDownRight, Compass, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onAIStylistClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onAIStylistClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth - 0.5) * 20,
      y: (clientY / innerHeight - 0.5) * 20,
    });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center bg-[#08080A] text-[#F8F9FA] overflow-hidden pt-28 pb-12 select-none"
    >
      {/* Side Vertical Watermark (Left side) */}
      <div className="hidden xl:flex absolute left-4 top-0 bottom-0 z-20 flex-col justify-end items-center pb-16 border-r border-white/5 pr-4 pointer-events-none">
        <div className="vertical-text text-[9px] uppercase tracking-extra text-white/30 font-mono">
          L'ART DE LA COUTURE • MAYFAIR • EST. 1846
        </div>
      </div>

      {/* Right Side Vertical Watermark Quote */}
      <div className="hidden xl:block absolute -right-8 top-1/2 -translate-y-1/2 z-20 vertical-text text-[8px] uppercase tracking-[0.5em] text-white/10 pointer-events-none font-mono">
        ELEGANCE IS NOT STANDING OUT, BUT BEING REMEMBERED
      </div>

      {/* Background Editorial Visual with Mouse Parallax Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{
            x: mousePos.x,
            y: mousePos.y,
            scale: 1.05,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 20 }}
          className="w-full h-full relative"
        >
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2000"
            alt="Aurelius & Co. Luxury Editorial"
            className="w-full h-full object-cover object-top filter brightness-[0.38] contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/90 via-transparent to-[#08080A]/90" />
        </motion.div>
      </div>

      {/* Ambient Lighting Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.18),transparent_60%)]" />

      {/* Content Overlay Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col justify-between min-h-[82vh]">
        {/* Top Floating Badge */}
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[10px] font-mono tracking-extra uppercase text-[#C5A059] glass-card px-3.5 py-1.5 rounded-full border border-[#C5A059]/30">
              AW26/27 PRE-COLLECTION • THE ARCHITECT OF FORM
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden sm:flex glass-card px-4 py-1.5 rounded-full items-center space-x-3 text-[10px] uppercase tracking-extra text-white/70"
          >
            <div className="w-2 h-2 rounded-full gold-gradient animate-ping" />
            <span className="font-mono text-[#C5A059]">ATELIER CONCIERGE ACTIVE</span>
          </motion.div>
        </div>

        {/* Center Editorial Headlines & Featured Piece Composite */}
        <div className="my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Headline Block */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-[1px] bg-[#C5A059]" />
                <span className="text-[10px] uppercase tracking-extra font-mono text-[#C5A059]">
                  VOL. LXXXIV • HAUTE TAILORING
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F8F9FA] font-normal leading-[0.92] uppercase">
                The <br />
                <span className="italic font-light text-[#C5A059] lowercase font-serif pl-6">
                  Architect
                </span> <br />
                of Form.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-sm sm:text-base font-light text-[#EFECE6]/80 leading-relaxed max-w-xl"
            >
              A masterclass in modern tailoring. Sculpted in our Mayfair atelier from titanium-spun wool, raw charcoal silks, and certified Andean Vicuña fleece for those who command quiet authority.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-5 pt-2"
            >
              <button
                onClick={onExploreClick}
                className="group px-8 py-4 bg-white text-black font-bold text-[10px] tracking-extra uppercase hover:bg-[#C5A059] transition-colors duration-300 flex items-center gap-3 cursor-pointer shadow-2xl"
              >
                <span>View Experience</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={onAIStylistClick}
                className="glass-card px-8 py-4 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#F8F9FA] hover:text-[#C5A059] font-light text-[10px] tracking-extra uppercase rounded transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Consult AI Stylist</span>
              </button>

              <div className="hidden sm:flex flex-col gap-0.5 border-l border-white/10 pl-5">
                <span className="text-[9px] uppercase text-white/40 tracking-widest font-mono">
                  AVAILABILITY
                </span>
                <span className="font-serif italic text-base text-[#C5A059]">
                  Bespoke Only
                </span>
              </div>
            </motion.div>
          </div>

          {/* Featured Piece Card Frame (Right Side) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block lg:col-span-5 relative group"
          >
            <div className="w-full aspect-[4/5] relative">
              <div className="absolute inset-0 suit-texture border border-white/10 transform -rotate-1 scale-105 shadow-2xl rounded" />
              <div className="absolute inset-4 overflow-hidden border border-white/10 rounded">
                <div className="w-full h-full bg-gradient-to-b from-neutral-800/30 via-black/80 to-black flex flex-col justify-between p-8 relative">
                  <div className="font-serif text-8xl text-white/5 leading-none absolute -left-6 top-2 select-none font-bold">
                    Nº 01
                  </div>

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-gold text-[9px] uppercase tracking-extra font-mono border border-[#C5A059]/30 bg-[#08080A]/80 px-2.5 py-1 rounded">
                      HERITAGE PIECE
                    </span>
                    <span className="text-white/40 text-[10px] font-mono">2026/27</span>
                  </div>

                  <div className="relative z-10 space-y-2 pt-24">
                    <div className="text-gold text-[10px] uppercase tracking-extra font-mono">
                      FEATURED SILHOUETTE
                    </div>
                    <div className="font-serif text-2xl italic text-[#F8F9FA]">
                      Obsidian Peak Lapel Blazer
                    </div>
                    <p className="text-[11px] text-white/60 font-light leading-relaxed">
                      Hand-stitched silk canvas interior with 12.5 micron Vicuña fleece collar lining.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 border-l border-b border-[#C5A059]/40 pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* Bottom Hero Ticker Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 text-[10px] font-mono tracking-widest text-[#EFECE6]/80"
        >
          <div className="space-y-1">
            <p className="text-[#C5A059] text-[9px] uppercase tracking-extra">FLAGSHIP ATELIER</p>
            <p className="font-light text-white/80">42 SAVILE ROW, MAYFAIR</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#C5A059] text-[9px] uppercase tracking-extra">HANDCRAFTED TIME</p>
            <p className="font-light text-white/80">120+ HOURS / GARMENT</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#C5A059] text-[9px] uppercase tracking-extra">EXCLUSIVE WEAVE</p>
            <p className="font-light text-white/80">100% VICUÑA & SILK</p>
          </div>
          <div className="space-y-1">
            <p className="text-[#C5A059] text-[9px] uppercase tracking-extra">STOCKHOLM / PARIS / TOKYO</p>
            <p className="font-light text-white/80">INSURED EXPRESS COURIER</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

