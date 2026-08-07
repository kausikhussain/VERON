import React, { useEffect, useRef } from 'react';
import { Award, Feather, ShieldCheck, Clock } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered text entrance animation
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Advanced Velocity-Sensitive Parallax Effect on Image & Background Frame
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -15, scale: 1.15 },
          {
            yPercent: 15,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              onUpdate: (self) => {
                // Dynamically adjust scale & skew based on scroll velocity
                const velocity = Math.min(Math.abs(self.getVelocity() / 300), 5);
                gsap.to(imageRef.current, {
                  scale: 1.1 + velocity * 0.02,
                  rotateZ: (self.getVelocity() > 0 ? 1 : -1) * velocity * 0.15,
                  duration: 0.3,
                  overwrite: 'auto',
                });
              },
            },
          }
        );
      }

      // Narrative text stagger
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Stats pillars stagger
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div ref={titleRef}>
            <span className="text-xs font-mono tracking-extra uppercase text-[#C5A059] block">
              HERITAGE & PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#F8F9FA] mt-2 font-normal">
              The Architecture <br />
              <span className="italic font-light text-[#C5A059] font-serif">of Pure Perfection</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-light text-[#EFECE6]/70 max-w-md leading-relaxed">
            Founded on Mayfair’s legendary Savile Row in 1846, Aurelius & Co. operates as a digital haute couture house where traditional Italian canvassing meets Japanese technical precision.
          </p>
        </div>

        {/* Editorial 2-Column Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column with Frame Effect & GSAP Parallax */}
          <div className="lg:col-span-5 relative group" data-cursor-text="MAYFAIR">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded border border-white/10 shadow-2xl">
              <img
                ref={imageRef}
                src="/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg"
                alt="Bespoke Tailoring Craftsmanship"
                className="w-full h-full object-cover filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 glass-card border border-[#C5A059]/30 rounded">
                <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                  ATELIER INSIGHT • MAYFAIR
                </p>
                <p className="text-xs text-[#EFECE6] font-light mt-1">
                  "Every garment is sculpted by hand over 120 hours, passing through 42 master craftsman checks."
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#C5A059]/40 pointer-events-none" />
          </div>

          {/* Right Narrative Column */}
          <div className="lg:col-span-7 space-y-12">
            <div ref={narrativeRef} className="space-y-6 text-sm font-light text-[#EFECE6]/80 leading-relaxed">
              <h3 className="font-serif text-2xl text-[#F8F9FA] uppercase tracking-wide">
                Uncompromising Material Excellence
              </h3>
              <p>
                We source only the rarest raw fibers on Earth. Our Andean Vicuña fleece is harvested under official international wildlife conservation protection, yielding fibers measuring a ethereal 12.5 microns — softer than cashmere and lighter than air.
              </p>
              <p>
                Each suit jacket features full floating horsehair canvas construction, allowing the fabric to breathe, drape, and mold seamlessly to the owner's posture over a lifetime.
              </p>
            </div>

            {/* 4 Architectural Pillars Grid */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              <div className="space-y-2 glass-card p-4 rounded border border-white/5">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <Clock className="w-4 h-4" />
                  <span className="font-serif text-2xl font-normal text-[#F8F9FA]">180</span>
                </div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#EFECE6]/60">
                  Years Heritage
                </p>
              </div>

              <div className="space-y-2 glass-card p-4 rounded border border-white/5">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <Feather className="w-4 h-4" />
                  <span className="font-serif text-2xl font-normal text-[#F8F9FA]">12.5µ</span>
                </div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#EFECE6]/60">
                  Vicuña Micron
                </p>
              </div>

              <div className="space-y-2 glass-card p-4 rounded border border-white/5">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <Award className="w-4 h-4" />
                  <span className="font-serif text-2xl font-normal text-[#F8F9FA]">120h</span>
                </div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#EFECE6]/60">
                  Crafting Time
                </p>
              </div>

              <div className="space-y-2 glass-card p-4 rounded border border-white/5">
                <div className="flex items-center gap-2 text-[#C5A059]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-serif text-2xl font-normal text-[#F8F9FA]">100%</span>
                </div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-[#EFECE6]/60">
                  Traceable Origin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
