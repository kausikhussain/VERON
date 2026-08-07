import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowDownRight, Crown, VolumeX, Volume2, ShieldCheck, Compass, Layers, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick: () => void;
  onAIStylistClick: () => void;
}

interface HeroStoryChapter {
  id: string;
  start: number; // 0 to 1
  end: number;   // 0 to 1
  badge: string;
  headline: string;
  highlightText: string;
  subtext: string;
  specs?: { label: string; value: string }[];
}

const HERO_CHAPTERS: HeroStoryChapter[] = [
  {
    id: 'ch-1',
    start: 0.0,
    end: 0.22,
    badge: 'AW26/27 PRE-COLLECTION • MAYFAIR',
    headline: 'The Architect of Form',
    highlightText: 'Architect',
    subtext: 'A masterclass in modern luxury. Sculpted in our Mayfair atelier from titanium-spun wool, raw charcoal silks, and certified Andean Vicuña fleece.',
    specs: [
      { label: 'Tailoring Heritage', value: 'Savile Row Est. 1846' },
      { label: 'Fiber Fineness', value: '12.5 Micron Vicuña' },
      { label: 'Craftsmanship', value: '120+ Atelier Hours' },
    ],
  },
  {
    id: 'ch-2',
    start: 0.26,
    end: 0.48,
    badge: 'CHAPTER II • RARE TEXTILE CANVASSING',
    headline: 'Floating Horsehair Canvas',
    highlightText: 'Floating Canvas',
    subtext: 'Hand-padded silk canvassing aligns seamlessly with natural body movement. Zero synthetic fusing, pure structural longevity.',
    specs: [
      { label: 'Structure', value: 'Full Horsehair Canvas' },
      { label: 'Stitch Density', value: '22 Stitches / Inch' },
      { label: 'Origin', value: 'Biella & Huddersfield' },
    ],
  },
  {
    id: 'ch-3',
    start: 0.52,
    end: 0.74,
    badge: 'CHAPTER III • ARCHITECTURAL SILHOUETTE',
    headline: 'Quiet Authority & Precision',
    highlightText: 'Quiet Authority',
    subtext: 'Designed for gala evenings, boardrooms, and global summits. Every peak lapel is hand-sculpted to command presence without volume.',
    specs: [
      { label: 'Silhouettes', value: 'Double-Breasted & Tuxedo' },
      { label: 'Buttons', value: 'Natural Horn & 18k Gold' },
      { label: 'Surgeon Cuffs', value: 'Functional Horn Hardware' },
    ],
  },
  {
    id: 'ch-4',
    start: 0.78,
    end: 1.0,
    badge: 'CHAPTER IV • YOUR BESPOKE LEGACY',
    headline: 'Own The Sovereign Perfection',
    highlightText: 'Sovereign',
    subtext: 'Reserve a private fitting with our Senior Stylist at your residence, hotel suite, or our Mayfair flagship atelier.',
    specs: [
      { label: 'Fitting Concierge', value: 'Worldwide Mayfair Suite' },
      { label: 'Delivery', value: 'Insured White-Glove Transit' },
    ],
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onAIStylistClick }) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(3800);

  // Dynamic scroll distance calculation based on screen height
  useEffect(() => {
    const updateDistance = () => {
      const h = window.innerHeight;
      setScrollDistance(Math.max(h * 3.5, 3200));
    };
    updateDistance();
    window.addEventListener('resize', updateDistance);
    return () => window.removeEventListener('resize', updateDistance);
  }, []);

  // Video metadata initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      video.pause();
      setIsLoaded(true);
      setHasVideoError(false);
    };

    const handleError = () => {
      console.warn('Hero: Video load failed, fallback active.');
      setHasVideoError(true);
      setIsLoaded(true);
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // GSAP ScrollTrigger Pinned Frame-Accurate Scrubbing
  useEffect(() => {
    if (!isLoaded) return;

    const trigger = triggerRef.current;
    const container = containerRef.current;
    const video = videoRef.current;

    if (!trigger || !container) return;

    let animationFrameId: number;
    let targetTime = 0;
    let currentTime = 0;

    // RAF smooth lerp seeking loop to guarantee 60 FPS stutter-free scrub
    const lerpSeekVideo = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        currentTime += (targetTime - currentTime) * 0.16;
        if (Math.abs(targetTime - currentTime) > 0.001) {
          video.currentTime = currentTime;
        } else {
          video.currentTime = targetTime;
        }
      }
      animationFrameId = requestAnimationFrame(lerpSeekVideo);
    };

    animationFrameId = requestAnimationFrame(lerpSeekVideo);

    const ctx = gsap.context(() => {
      // Main Pinning and Scrub Timeline
      ScrollTrigger.create({
        trigger: trigger,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: container,
        scrub: 0.3,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);

          if (video && video.duration && !isNaN(video.duration)) {
            targetTime = prog * video.duration;
          }

          // Active chapter index determination
          const idx = HERO_CHAPTERS.findIndex(
            (ch) => prog >= ch.start && prog <= ch.end
          );
          if (idx !== -1) {
            setActiveChapterIndex(idx);
          }
        },
      });
    }, triggerRef);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isLoaded, scrollDistance]);

  const currentChapter = HERO_CHAPTERS[activeChapterIndex] || HERO_CHAPTERS[0];

  return (
    <section
      ref={triggerRef}
      className="relative w-full bg-[#08080A] text-[#F8F9FA] selection:bg-[#C5A059] selection:text-[#08080A]"
      style={{
        minHeight: `${scrollDistance + 1000}px`,
      }}
    >
      {/* PINNED HERO CONTAINER */}
      <div
        ref={containerRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center z-10"
      >
        {/* CINEMATIC VIDEO / BACKDROP LAYER */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
          {!hasVideoError ? (
            <video
              ref={videoRef}
              src="/assets/videos/landing-video.mp4"
              poster="/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg"
              playsInline
              muted={isMuted}
              preload="auto"
              className="w-full h-full object-cover transform scale-105 transition-transform duration-700 ease-out will-change-transform"
              style={{
                filter: 'brightness(0.68) contrast(1.12)',
              }}
            />
          ) : (
            <img
              src="/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg"
              alt="Aurelius Luxury Editorial"
              className="w-full h-full object-cover filter brightness-50 scale-105"
            />
          )}

          {/* Luxury Editorial Vignette & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/30 to-[#08080A]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/85 via-transparent to-[#08080A]/85 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(197,160,89,0.15),transparent_65%)] pointer-events-none" />

          {/* Subtle Grid Texture Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#C5A059 1px, transparent 1px)`,
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        {/* SIDE VERTICAL WATERMARKS */}
        <div className="hidden xl:flex absolute left-4 top-0 bottom-0 z-20 flex-col justify-end items-center pb-16 border-r border-white/10 pr-4 pointer-events-none">
          <div className="vertical-text text-[9px] uppercase tracking-[0.4em] text-white/30 font-mono">
            L'ART DE LA COUTURE • MAYFAIR • EST. 1846
          </div>
        </div>

        <div className="hidden xl:block absolute -right-8 top-1/2 -translate-y-1/2 z-20 vertical-text text-[8px] uppercase tracking-[0.5em] text-white/15 pointer-events-none font-mono">
          ELEGANCE IS NOT STANDING OUT, BUT BEING REMEMBERED
        </div>

        {/* TOP BRANDING & CONTROLS HEADER */}
        <header className="relative z-20 w-full max-w-7xl px-6 lg:px-12 pt-28 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[10px] font-mono tracking-extra uppercase text-[#C5A059] glass-card px-3.5 py-1.5 rounded-full border border-[#C5A059]/30">
              {currentChapter.badge}
            </span>
          </div>

          {/* AUDIO & SCROLL INDICATOR */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="px-3.5 py-1.5 rounded-full border border-white/15 bg-black/50 hover:bg-black/80 text-xs font-mono tracking-widest text-white/80 transition-all flex items-center gap-2 backdrop-blur-md hover:border-[#C5A059]/50 cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-white/50" />
                  <span className="hidden sm:inline">MUTED</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                  <span className="hidden sm:inline text-[#C5A059]">AUDIO ON</span>
                </>
              )}
            </button>

            <div className="px-3.5 py-1.5 rounded-full border border-[#C5A059]/40 bg-black/60 text-[11px] font-mono text-[#C5A059] backdrop-blur-md">
              {(scrollProgress * 100).toFixed(0)}% SCROLLED
            </div>
          </div>
        </header>

        {/* MAIN DYNAMIC CHAPTER OVERLAY CONTENT */}
        <main className="relative z-20 w-full max-w-7xl px-6 lg:px-12 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pointer-events-none">
          {/* Left Main Editorial Text Block */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter.id}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-[1px] bg-[#C5A059]" />
                  <span className="text-[10px] uppercase tracking-extra font-mono text-[#C5A059]">
                    VOL. LXXXIV • FRAME-CONTROLLED CINEMATIC EXPERIENCE
                  </span>
                </div>

                <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#F8F9FA] font-normal leading-[0.92] uppercase">
                  {currentChapter.headline.split(currentChapter.highlightText)[0]}
                  {currentChapter.highlightText && (
                    <span className="italic font-light text-[#C5A059] lowercase font-serif pl-3 sm:pl-6 block sm:inline">
                      {currentChapter.highlightText}
                    </span>
                  )}
                  {currentChapter.headline.split(currentChapter.highlightText)[1]}
                </h1>

                <p className="text-sm sm:text-base font-light text-[#EFECE6]/85 leading-relaxed max-w-xl">
                  {currentChapter.subtext}
                </p>

                {/* Chapter Specs Grid */}
                {currentChapter.specs && currentChapter.specs.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 max-w-lg">
                    {currentChapter.specs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="bg-black/60 backdrop-blur-md p-3 rounded-lg border border-[#C5A059]/25 text-left"
                      >
                        <div className="text-[9px] font-mono text-white/50 uppercase tracking-wider mb-0.5">
                          {spec.label}
                        </div>
                        <div className="text-xs font-semibold text-[#C5A059] font-mono">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Action CTAs (Interactive pointer-events-auto) */}
            <div className="flex flex-wrap items-center gap-4 pt-4 pointer-events-auto">
              <MagneticButton
                onClick={onExploreClick}
                dataCursorText="EXPLORE"
                className="group px-8 py-4 bg-white text-black font-bold text-[10px] tracking-extra uppercase hover:bg-[#C5A059] transition-colors duration-300 flex items-center gap-3 shadow-2xl"
              >
                <span>Explore Catalog</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                onClick={onAIStylistClick}
                dataCursorText="AI STYLIST"
                className="glass-card px-8 py-4 border border-[#C5A059]/40 hover:border-[#C5A059] text-[#F8F9FA] hover:text-[#C5A059] font-light text-[10px] tracking-extra uppercase rounded transition-all duration-300 flex items-center gap-3"
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Consult AI Stylist</span>
              </MagneticButton>
            </div>
          </div>

          {/* Right Featured Piece Spec Card */}
          <div className="hidden lg:block lg:col-span-5 relative group pointer-events-auto">
            <div className="w-full aspect-[4/5] relative">
              <div className="absolute inset-0 suit-texture border border-[#C5A059]/20 transform -rotate-1 scale-105 shadow-2xl rounded" />
              <div className="absolute inset-4 overflow-hidden border border-white/10 rounded">
                <div className="w-full h-full bg-gradient-to-b from-neutral-900/50 via-black/80 to-black flex flex-col justify-between p-8 relative">
                  <div className="font-serif text-8xl text-white/5 leading-none absolute -left-6 top-2 select-none font-bold">
                    0{activeChapterIndex + 1}
                  </div>

                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-[#C5A059] text-[9px] uppercase tracking-extra font-mono border border-[#C5A059]/30 bg-[#08080A]/80 px-2.5 py-1 rounded">
                      HERITAGE CHAPTER 0{activeChapterIndex + 1}
                    </span>
                    <span className="text-white/40 text-[10px] font-mono">2026/27</span>
                  </div>

                  <div className="relative z-10 space-y-2 pt-24">
                    <div className="text-[#C5A059] text-[10px] uppercase tracking-extra font-mono">
                      CINEMATIC TIMELINE FRAME
                    </div>
                    <div className="font-serif text-2xl italic text-[#F8F9FA]">
                      {currentChapter.headline}
                    </div>
                    <p className="text-[11px] text-white/60 font-light leading-relaxed">
                      Scroll controls frame-accurate video scrub. Upward scroll reverses timeline.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-36 h-36 border-l border-b border-[#C5A059]/40 pointer-events-none" />
            </div>
          </div>
        </main>

        {/* FOOTER TIMELINE & PROGRESS BAR */}
        <footer className="relative z-20 w-full max-w-7xl px-6 lg:px-12 pb-6 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
          {/* Chapter Navigation Buttons */}
          <div className="flex items-center gap-2 bg-black/60 p-2 rounded-full border border-white/10 backdrop-blur-md">
            {HERO_CHAPTERS.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    if (!triggerRef.current) return;
                    const targetScroll = triggerRef.current.offsetTop + ch.start * scrollDistance;
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#C5A059] text-black font-bold shadow-md scale-105'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  title={ch.headline}
                >
                  <span>0{idx + 1}</span>
                  <span className={`hidden sm:inline ${isActive ? 'inline' : 'hidden'}`}>
                    {ch.headline.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Scroll Prompt Indicator */}
          <div className="flex items-center gap-3 text-xs tracking-widest text-white/60 font-mono">
            <div className="w-5 h-8 rounded-full border border-[#C5A059]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#C5A059] animate-bounce" />
            </div>
            <span>SCROLL DOWN TO SCRUB CINEMATIC VIDEO</span>
          </div>
        </footer>

        {/* BOTTOM GOLD PROGRESS TRACKING BAR */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
          <div
            className="h-full bg-gradient-to-r from-[#C5A059] via-[#E6C687] to-[#DFB56C] transition-all duration-75 ease-out shadow-[0_0_12px_#C5A059]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};
