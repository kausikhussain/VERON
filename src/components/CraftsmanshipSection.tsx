import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feather, Sparkles, X, ShieldCheck, RefreshCw } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FabricInfo {
  name: string;
  subtitle: string;
  micron: string;
  origin: string;
  image: string;
  description: string;
}

const FABRICS: FabricInfo[] = [
  {
    name: "Andean Vicuña Fleece",
    subtitle: "The Fiber of the Gods",
    micron: "12.5 Microns",
    origin: "High Andes, Peru",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800",
    description: "Sheared only once every two years from wild vicuñas. Softness beyond human perception."
  },
  {
    name: "Super 180s Cashmere & Silk",
    subtitle: "Loro Piana Masterweave",
    micron: "14.2 Microns",
    origin: "Biella, Piedmont, Italy",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800",
    description: "Blended with 30% mulberry silk for an ethereal subtle sheen and wrinkle resilience."
  },
  {
    name: "Giza 87 Sea Island Cotton",
    subtitle: "Swiss Double-Poplin",
    micron: "200s Two-Ply",
    origin: "Barbados & St. Gallen",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=800",
    description: "Longest staple cotton fibers known to textile science. Unmatched silky hand feel."
  },
  {
    name: "Hand-Glazed Porosus Crocodile",
    subtitle: "Couture Leatherwork",
    micron: "Flawless Grade 1",
    origin: "Florence & Paris",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800",
    description: "Hand-polished with agate stone to achieve a deep glass-like sheen."
  }
];

export const CraftsmanshipSection: React.FC = () => {
  const [activeFabric, setActiveFabric] = useState<FabricInfo | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Scroll velocity depth tilt effect across fabric cards
        ScrollTrigger.create({
          trigger: gridRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const vel = self.getVelocity();
            const tilt = Math.max(Math.min(vel / 250, 8), -8);
            if (gridRef.current) {
              Array.from(gridRef.current.children).forEach((child, i) => {
                gsap.to(child as Element, {
                  y: (i % 2 === 0 ? 1 : -1) * tilt * 1.5,
                  duration: 0.4,
                  overwrite: 'auto',
                });
              });
            }
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInspectFabric = async (fabric: FabricInfo) => {
    setActiveFabric(fabric);
    setLoadingAi(true);
    setAiAnalysis(null);

    try {
      const res = await fetch('/api/fabric-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fabricName: fabric.name }),
      });
      const data = await res.json();
      setAiAnalysis(data);
    } catch (err) {
      console.error(err);
      setAiAnalysis({
        history: "A fiber revered by European Royalty and global connoisseurs.",
        tactileFeel: "Unrivaled featherlight softness with high insulation.",
        durabilityGrade: "Exquisite heirloom grade.",
        recommendedCare: "Professional eco-friendly dry clean only.",
        quote: "Purity of texture is the highest form of elegance."
      });
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <section id="craftsmanship" ref={containerRef} className="py-24 bg-[#08080A] text-[#F8F9FA] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-extra uppercase text-[#C5A059]">
              TEXTILE SCIENCE & WEAVE PROVENANCE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#F8F9FA] mt-2 font-normal">
              Rare Fibers & <br />
              <span className="italic font-light text-[#C5A059] font-serif">Masterful Weaves</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-light text-[#EFECE6]/70 max-w-md leading-relaxed">
            Click any textile below to invoke our server-side Gemini Textile Intelligence engine for microscopic weave analysis and heritage breakdown.
          </p>
        </div>

        {/* 4 Fabric Cards Grid with GSAP ScrollTrigger Entrance */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FABRICS.map((fabric, idx) => (
            <div
              key={idx}
              data-cursor-text="INSPECT"
              className="group glass-card border border-white/10 hover:border-[#C5A059]/60 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={fabric.image}
                  alt={fabric.name}
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#08080A]/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-[10px] font-mono text-[#C5A059] uppercase">
                  {fabric.micron}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                    {fabric.origin}
                  </span>
                  <h3 className="font-serif text-lg text-[#F8F9FA] mt-1 group-hover:text-[#C5A059] transition-colors">
                    {fabric.name}
                  </h3>
                  <p className="text-xs font-light text-[#EFECE6]/70 mt-2 leading-relaxed">
                    {fabric.description}
                  </p>
                </div>

                <button
                  onClick={() => handleInspectFabric(fabric)}
                  className="w-full py-2.5 bg-white/5 hover:bg-[#C5A059] text-[#EFECE6] hover:text-[#08080A] font-mono text-[10px] uppercase tracking-[0.2em] rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-white/10 hover:border-[#C5A059]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#08080A]" />
                  <span>AI Fabric Analysis</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fabric Inspection AI Drawer / Modal */}
      <AnimatePresence>
        {activeFabric && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08080A]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121316] border border-[#C5A059]/40 rounded-xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6"
            >
              <button
                onClick={() => setActiveFabric(null)}
                className="absolute top-6 right-6 p-2 text-[#EFECE6]/60 hover:text-[#F8F9FA] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <Feather className="w-5 h-5 text-[#C5A059]" />
                <span className="text-xs font-mono tracking-[0.25em] text-[#C5A059] uppercase">
                  AI TEXTILE INTELLIGENCE REPORT
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#F8F9FA] uppercase">
                  {activeFabric.name}
                </h3>
                <p className="text-xs font-mono text-[#EFECE6]/60 mt-1">
                  Origin: {activeFabric.origin} • Grade: {activeFabric.micron}
                </p>
              </div>

              {loadingAi ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <RefreshCw className="w-8 h-8 text-[#C5A059] animate-spin" />
                  <span className="text-xs font-mono tracking-widest text-[#EFECE6]/70 uppercase">
                    Analyzing Microscopic Weave & Tactile Profile...
                  </span>
                </div>
              ) : (
                aiAnalysis && (
                  <div className="space-y-4 text-xs font-light text-[#EFECE6] border-t border-white/10 pt-4">
                    <blockquote className="p-4 bg-[#08080A] border-l-2 border-[#C5A059] italic text-[#C5A059] font-serif text-sm">
                      "{aiAnalysis.quote}"
                    </blockquote>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-3 bg-[#08080A] border border-white/10 rounded">
                        <p className="text-[10px] font-mono text-[#C5A059] uppercase">HISTORICAL HERITAGE</p>
                        <p className="mt-1 text-[#EFECE6]/80">{aiAnalysis.history}</p>
                      </div>

                      <div className="p-3 bg-[#08080A] border border-white/10 rounded">
                        <p className="text-[10px] font-mono text-[#C5A059] uppercase">TACTILE DENSITY</p>
                        <p className="mt-1 text-[#EFECE6]/80">{aiAnalysis.tactileFeel}</p>
                      </div>

                      <div className="p-3 bg-[#08080A] border border-white/10 rounded">
                        <p className="text-[10px] font-mono text-[#C5A059] uppercase">DURABILITY RATING</p>
                        <p className="mt-1 text-[#EFECE6]/80">{aiAnalysis.durabilityGrade}</p>
                      </div>

                      <div className="p-3 bg-[#08080A] border border-white/10 rounded">
                        <p className="text-[10px] font-mono text-[#C5A059] uppercase">RECOMMENDED PRESERVATION</p>
                        <p className="mt-1 text-[#EFECE6]/80">{aiAnalysis.recommendedCare}</p>
                      </div>
                    </div>
                  </div>
                )
              )}

              <button
                onClick={() => setActiveFabric(null)}
                className="w-full py-3 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-[0.2em] uppercase rounded cursor-pointer hover:bg-white transition-colors"
              >
                Close Report
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
