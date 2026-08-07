import React, { useEffect, useRef, useState, useId } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  Crown, 
  ArrowRight, 
  Layers, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Compass, 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  Pause 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export interface StoryChapter {
  id: string;
  start: number; // 0 to 1
  end: number;   // 0 to 1
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  alignment: 'left' | 'center' | 'right';
  badge?: string;
  specs?: { label: string; value: string }[];
  accentColor?: string;
}

export interface ScrollVideoStoryProps {
  /** Video file URL (.mp4, .webm) */
  videoSrc?: string;
  /** Fallback static image if video fails or reduced-motion is active */
  fallbackImage?: string;
  /** Height in pixels of virtual scroll pin distance */
  scrollDistance?: number;
  /** Storyline chapters mapped to 0-1 video scrub progress */
  chapters?: StoryChapter[];
  /** Callback when main CTA is clicked */
  onCtaClick?: () => void;
  /** Additional wrapper CSS classes */
  className?: string;
}

// Default luxury video provided by organized public assets
const DEFAULT_VIDEO_SRC = '/assets/videos/landing-video.mp4';
const FALLBACK_IMAGE_SRC =
  '/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg';

const DEFAULT_CHAPTERS: StoryChapter[] = [
  {
    id: 'ch-1',
    start: 0.0,
    end: 0.18,
    tag: 'MAYFAIR HERITAGE',
    title: 'THE ART OF BESPOKE',
    subtitle: 'Chapter I • Genesis of Structure',
    description:
      'Where century-old English craftsmanship meets modern architectural precision. Every stitch begins with hand-picked Vicuña and worsted wool.',
    alignment: 'center',
    badge: '100% Bespoke Canvassing',
    accentColor: '#C5A059',
  },
  {
    id: 'ch-2',
    start: 0.22,
    end: 0.42,
    tag: 'RARE TEXTILES',
    title: '12.5 MICRON FLEECE',
    subtitle: 'Chapter II • Andean Perfection',
    description:
      'Harvested under strict conservation protocols in the Peruvian highlands. Lighter than cashmere, softer than silk, and resilient across generations.',
    alignment: 'left',
    badge: 'Inca Royalty Grade',
    specs: [
      { label: 'Fleece Fineness', value: '12.5 Microns' },
      { label: 'Insulation Index', value: '3.4x Cashmere' },
      { label: 'Origin', value: 'Peruvian Andes' },
    ],
    accentColor: '#D4AF37',
  },
  {
    id: 'ch-3',
    start: 0.46,
    end: 0.68,
    tag: 'ATELIER MASTERY',
    title: '120 HOURS OF PRECISION',
    subtitle: 'Chapter III • Hand-Welting & Horn Buttons',
    description:
      '120 dedicated hours of hand cutting, floating canvas alignment, and real 18k gold thread detailing by master tailors in Mayfair.',
    alignment: 'right',
    badge: 'Savile Row Guild Certified',
    specs: [
      { label: 'Master Tailor Hours', value: '120+ Hours' },
      { label: 'Button Material', value: 'Natural Horn & Gold' },
      { label: 'Canvas Type', value: 'Full Floating Horsehair' },
    ],
    accentColor: '#E6C687',
  },
  {
    id: 'ch-4',
    start: 0.72,
    end: 0.88,
    tag: 'TAILORED SILHOUETTE',
    title: 'QUIET AUTHORITY',
    subtitle: 'Chapter IV • The Sovereign Overcoat',
    description:
      'A masterpiece of structure and drape. Designed to command room presence with invisible weight and flawless movement.',
    alignment: 'left',
    badge: 'Limited Edition 1 of 25',
    accentColor: '#C5A059',
  },
  {
    id: 'ch-5',
    start: 0.9,
    end: 1.0,
    tag: 'PRIVATE FITTING',
    title: 'OWN THE LEGACY',
    subtitle: 'Chapter V • Your Bespoke Journey',
    description:
      'Schedule a private appointment with our Senior Stylist at your residence, hotel suite, or our Mayfair flagship atelier.',
    alignment: 'center',
    badge: 'VIP Fitting Service',
    accentColor: '#DFB56C',
  },
];

export const ScrollVideoStory: React.FC<ScrollVideoStoryProps> = ({
  videoSrc = DEFAULT_VIDEO_SRC,
  fallbackImage = FALLBACK_IMAGE_SRC,
  scrollDistance = 4000,
  chapters = DEFAULT_CHAPTERS,
  onCtaClick,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  // Check accessibility motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Video initialization and metadata loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration || 1);
      setIsLoaded(true);
      setHasError(false);
    };

    const handleError = () => {
      console.warn('ScrollVideoStory: Video failed to load, degrading gracefully.');
      setHasError(true);
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
  }, [videoSrc]);

  // GSAP ScrollTrigger Setup & Smooth Timeline scrubbing
  useEffect(() => {
    if (!isLoaded || prefersReducedMotion) return;

    const video = videoRef.current;
    const trigger = triggerRef.current;
    const container = containerRef.current;
    if (!trigger || !container) return;

    let animationFrameId: number;
    let targetTime = 0;
    let currentTime = 0;

    // Smoothed interpolation function to prevent seeking stutter on browsers
    const renderVideoFrame = () => {
      if (video && video.duration) {
        // Soft lerp for smooth 60 FPS video scrubbing
        currentTime += (targetTime - currentTime) * 0.18;
        if (Math.abs(targetTime - currentTime) > 0.001) {
          video.currentTime = currentTime;
        } else {
          video.currentTime = targetTime;
        }
      }
      animationFrameId = requestAnimationFrame(renderVideoFrame);
    };

    animationFrameId = requestAnimationFrame(renderVideoFrame);

    const ctx = gsap.context(() => {
      // Main Pinning and Video Seek ScrollTrigger
      const st = ScrollTrigger.create({
        trigger: trigger,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: container,
        scrub: 0.4, // Smooth scrub inertia
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const currentProgress = self.progress;
          setProgress(currentProgress);

          if (video && video.duration) {
            targetTime = currentProgress * video.duration;
          }

          // Determine current active chapter
          const activeIdx = chapters.findIndex(
            (ch) => currentProgress >= ch.start && currentProgress <= ch.end
          );
          if (activeIdx !== -1) {
            setActiveChapterIndex(activeIdx);
          }
        },
      });

      // Chapter-specific Entrance and Exit Animations
      chapters.forEach((chapter, index) => {
        const cardEl = chapterCardsRef.current[index];
        if (!cardEl) return;

        const startPct = chapter.start * 100;
        const endPct = chapter.end * 100;
        const midPct = ((chapter.start + chapter.end) / 2) * 100;

        // Animate elements inside the chapter card
        const cardTitle = cardEl.querySelector('.story-title');
        const cardSubtitle = cardEl.querySelector('.story-subtitle');
        const cardBadge = cardEl.querySelector('.story-badge');
        const cardDesc = cardEl.querySelector('.story-desc');
        const cardSpecs = cardEl.querySelectorAll('.story-spec-item');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: `top+=${(chapter.start * scrollDistance).toFixed(0)} top`,
            end: `top+=${(chapter.end * scrollDistance).toFixed(0)} top`,
            scrub: 0.5,
          },
        });

        // Entrance (Fade & Rise with Clip Path)
        tl.fromTo(
          cardEl,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
            filter: 'blur(10px)',
            pointerEvents: 'none',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            pointerEvents: 'auto',
            duration: 0.3,
            ease: 'power2.out',
          }
        )
          // Hold peak
          .to(cardEl, { opacity: 1, duration: 0.4 })
          // Exit (Fade & Dissolve up)
          .to(cardEl, {
            opacity: 0,
            y: -40,
            scale: 1.05,
            filter: 'blur(8px)',
            pointerEvents: 'none',
            duration: 0.3,
            ease: 'power2.in',
          });
      });
    }, triggerRef);

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [isLoaded, scrollDistance, chapters, prefersReducedMotion]);

  // Jump to specific chapter when chapter dot clicked
  const jumpToChapter = (chapter: StoryChapter) => {
    if (!triggerRef.current) return;
    const targetScroll =
      triggerRef.current.offsetTop + chapter.start * scrollDistance;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const currentChapter = chapters[activeChapterIndex] || chapters[0];

  return (
    <div
      ref={triggerRef}
      className={`relative w-full bg-[#08080A] text-[#F8F9FA] selection:bg-[#C5A059] selection:text-[#08080A] ${className}`}
      style={{
        // Give space for pinning virtual scroll distance
        minHeight: prefersReducedMotion ? 'auto' : `${scrollDistance + 1000}px`,
      }}
    >
      {/* PINNED CONTAINER */}
      <div
        ref={containerRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center z-10"
      >
        {/* BACKGROUND VIDEO & CANVAS LAYER */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
          {!hasError ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={fallbackImage}
              playsInline
              muted={isMuted}
              className="w-full h-full object-cover transform scale-105 transition-transform duration-700 ease-out will-change-transform"
              style={{
                filter: 'brightness(0.72) contrast(1.08)',
              }}
            />
          ) : (
            <img
              src={fallbackImage}
              alt="Luxury Craftsmanship"
              className="w-full h-full object-cover filter brightness-75 scale-105"
            />
          )}

          {/* Luxury Grain & Vignette Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/90 pointer-events-none" />

          {/* Fine Grid Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#C5A059 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        {/* HEADER OVERLAY / TOP BRANDING */}
        <header className="relative z-20 w-full max-w-7xl px-6 lg:px-12 pt-8 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 flex items-center justify-center backdrop-blur-md">
              <Crown className="w-4 h-4 text-[#C5A059]" />
            </div>
            <div>
              <span className="text-xs tracking-[0.3em] font-mono text-[#C5A059] uppercase block">
                AURELIUS & CO. MAYFAIR
              </span>
              <span className="text-[10px] text-white/50 tracking-wider">
                CINEMATIC SCROLL EXPERIENCE
              </span>
            </div>
          </div>

          {/* AUDIO & CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="px-3 py-1.5 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 text-xs tracking-widest text-white/80 transition-all flex items-center gap-2 backdrop-blur-md hover:border-[#C5A059]/50"
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

            <div className="px-3 py-1.5 rounded-full border border-[#C5A059]/30 bg-black/50 text-[11px] font-mono text-[#C5A059] backdrop-blur-md">
              {(progress * 100).toFixed(0)}% SCROLLED
            </div>
          </div>
        </header>

        {/* MAIN OVERLAY STORYTELLING CARDS */}
        <main className="relative z-20 w-full max-w-7xl px-6 lg:px-12 my-auto flex items-center justify-center min-h-[420px] pointer-events-none">
          {chapters.map((chapter, index) => {
            const isLeft = chapter.alignment === 'left';
            const isRight = chapter.alignment === 'right';
            const isCenter = chapter.alignment === 'center';

            return (
              <div
                key={chapter.id}
                ref={(el) => {
                  chapterCardsRef.current[index] = el;
                }}
                className={`absolute w-full max-w-2xl px-6 py-8 sm:p-10 rounded-2xl border border-[#C5A059]/25 bg-black/60 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
                  isLeft
                    ? 'mr-auto text-left left-6 lg:left-12'
                    : isRight
                    ? 'ml-auto text-left right-6 lg:right-12'
                    : 'mx-auto text-center'
                }`}
                style={{
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 160, 89, 0.08)',
                }}
              >
                {/* Chapter Tag & Badge */}
                <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                    <Sparkles className="w-3 h-3" />
                    {chapter.tag}
                  </span>
                  {chapter.badge && (
                    <span className="text-[10px] text-white/60 tracking-wider font-mono border-l border-white/20 pl-3">
                      {chapter.badge}
                    </span>
                  )}
                </div>

                {/* Main Headline & Subtitle */}
                <h2 className="story-title text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-white font-normal mb-2 leading-tight">
                  {chapter.title}
                </h2>
                <h3 className="story-subtitle text-xs sm:text-sm tracking-[0.2em] font-mono uppercase text-[#C5A059] mb-4">
                  {chapter.subtitle}
                </h3>

                {/* Editorial Description */}
                <p className="story-desc text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6">
                  {chapter.description}
                </p>

                {/* Specs / Metrics Grid (if available) */}
                {chapter.specs && chapter.specs.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 pt-4 mb-6 border-t border-white/10">
                    {chapter.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="story-spec-item text-left bg-white/5 p-3 rounded-lg border border-white/5">
                        <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-1">
                          {spec.label}
                        </div>
                        <div className="text-sm font-semibold text-[#C5A059] font-mono">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Call To Action Button (Final Chapter) */}
                {index === chapters.length - 1 && (
                  <div className={`pt-2 flex flex-wrap gap-4 ${isCenter ? 'justify-center' : ''} pointer-events-auto`}>
                    <button
                      onClick={() => {
                        if (onCtaClick) onCtaClick();
                        else {
                          const el = document.getElementById('atelier');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#DFB56C] text-[#08080A] font-semibold text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-lg flex items-center gap-2 group"
                    >
                      <span>RESERVE PRIVATE FITTING</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </main>

        {/* FOOTER & TIMELINE CONTROLS */}
        <footer className="relative z-20 w-full max-w-7xl px-6 lg:px-12 pb-8 flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
          {/* Chapter Dots Navigation */}
          <div className="flex items-center gap-2 bg-black/60 p-2 rounded-full border border-white/10 backdrop-blur-md">
            {chapters.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  onClick={() => jumpToChapter(ch)}
                  className={`group relative px-3 py-1.5 rounded-full text-[10px] font-mono transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#C5A059] text-black font-bold shadow-md scale-105'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  title={ch.title}
                >
                  <span>0{idx + 1}</span>
                  <span className={`hidden sm:inline ${isActive ? 'inline' : 'hidden group-hover:inline'}`}>
                    {ch.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Scroll Prompt */}
          <div className="flex items-center gap-3 text-xs tracking-widest text-white/50 font-mono">
            <div className="w-5 h-8 rounded-full border border-[#C5A059]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#C5A059] animate-bounce" />
            </div>
            <span>SCROLL TO EXPLORE TIMELINE</span>
          </div>
        </footer>

        {/* BOTTOM PROGRESS TRACKING BAR */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
          <div
            className="h-full bg-gradient-to-r from-[#C5A059] via-[#E6C687] to-[#DFB56C] transition-all duration-75 ease-out shadow-[0_0_12px_#C5A059]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
