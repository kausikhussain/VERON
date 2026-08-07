import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Sparkles, ArrowUpRight, Filter, Maximize2, X, Compass } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface CampaignMediaItem {
  id: string;
  title: string;
  category: 'Tailoring' | 'Timepieces' | 'Streetwear' | 'Eyewear' | 'Footwear & Leather';
  image: string;
  subtitle: string;
  photographer: string;
  location: string;
  tag: string;
}

const CAMPAIGN_MEDIA_ITEMS: CampaignMediaItem[] = [
  // Tailoring & Jackets
  {
    id: 'camp-1',
    title: 'The Sovereign Double-Breasted Masterpiece',
    category: 'Tailoring',
    image: '/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg',
    subtitle: 'Vicuña fleece & silk canvassing in obsidian grey',
    photographer: 'Jean-Luc Moreau',
    location: 'Savile Row Atelier, London',
    tag: 'HAUTE TAILORING 2026/27',
  },
  {
    id: 'camp-2',
    title: 'Black Velvet Black-Tie Tuxedo',
    category: 'Tailoring',
    image: '/assets/men/jackets/black-tuxedo-suit-for-men-3-piece-wedding-suit-groom-tuxedo-set-formal-prom-suit-slim-fit-black-dinn.jpeg',
    subtitle: 'Midnight Lyon silk velvet with satin facing',
    photographer: 'Antoine Dubois',
    location: 'Place Vendôme, Paris',
    tag: 'GALA ESSENTIAL',
  },
  {
    id: 'camp-3',
    title: 'Architectural Charcoal Double-Breasted Suit',
    category: 'Tailoring',
    image: '/assets/men/jackets/breasted-suit-men.jpeg',
    subtitle: 'Titanium-spun wool worsted flannel',
    photographer: 'Elena Rostova',
    location: 'Via Montenapoleone, Milan',
    tag: 'EXECUTIVE COLLECTION',
  },

  // Timepieces
  {
    id: 'camp-4',
    title: 'Patek Philippe Nautilus Reference 5610 1P',
    category: 'Timepieces',
    image: '/assets/men/watches/patek-philippe-nautilus-watch-ref-5610-1p-001-boodles.jpeg',
    subtitle: 'Platinum case with sunburst blue dial',
    photographer: 'Lukas Weber',
    location: 'Geneva Atelier, Switzerland',
    tag: 'HIGH HOROLOGY',
  },
  {
    id: 'camp-5',
    title: 'Black PVD Titanium Nautilus Bespoke Edition',
    category: 'Timepieces',
    image: '/assets/men/watches/black-pvd-nautilus-by-patek-philippe-luxury-watch-timepiece-raacks-raackscom.jpeg',
    subtitle: 'Stealth obsidian PVD coating with rubber strap',
    photographer: 'Lukas Weber',
    location: 'Zurich Vault',
    tag: 'LIMITED 1 OF 5',
  },
  {
    id: 'camp-6',
    title: 'Old Money Imperial Gold & Leather Dress Watch',
    category: 'Timepieces',
    image: '/assets/men/watches/luxury-black-gold-men-s-watch-premium-dress-watch-for-old-money-style-2026.jpeg',
    subtitle: '18k gold bezel with alligator hand-stitched strap',
    photographer: 'Jean-Luc Moreau',
    location: 'Mayfair Club, London',
    tag: 'OLD MONEY STYLE',
  },
  {
    id: 'camp-7',
    title: 'Garmin Marq Athlete Carbon Smartwatch',
    category: 'Timepieces',
    image: '/assets/men/watches/watch2/garmin-marq-watch-athlete-gen-2-carbon-smartwatch.jpeg',
    subtitle: 'Fused carbon fiber block case with AMOLED display',
    photographer: 'Hiroshi Tanaka',
    location: 'Tokyo Ginza Studio',
    tag: 'PERFORMANCE TECH',
  },

  // Oversized Streetwear
  {
    id: 'camp-8',
    title: 'Porsche 911 GT3 Oversized 240 GSM Tee',
    category: 'Streetwear',
    image: '/assets/men/tshirts/porche-911-gt3-oversized-t-shirt-240-gsm-premium-cotton-unisex-porsche-911-911gt3-t-shirt-oversizedtshirt-cartshirt-porsche911-aeio-porsche911-porschelife-911gtrs-carenthusiast-supercarstyle-por.jpeg',
    subtitle: 'Heavyweight Peruvian Pima cotton drop-shoulder silhouette',
    photographer: 'Kaito Yamamoto',
    location: 'Shibuya Night Drive, Tokyo',
    tag: 'COUTURE STREETWEAR',
  },
  {
    id: 'camp-9',
    title: 'Shadow Ronin Katana Japanese Streetwear Tee',
    category: 'Streetwear',
    image: '/assets/men/tshirts/shadow-ronin-katana-oversized-t-shirt-minimal-japanese-streetwear-black-graphic-tee-dm-to-buy.jpeg',
    subtitle: 'Minimal Japanese graphic print on 300 GSM cotton',
    photographer: 'Kaito Yamamoto',
    location: 'Harajuku Alleyways',
    tag: 'JAPANESE MINIMALISM',
  },
  {
    id: 'camp-10',
    title: 'Tokyo Street Style Oversized Fit',
    category: 'Streetwear',
    image: '/assets/men/tshirts/blusa-oversized-tokyo-street-style-super-estilosa.jpeg',
    subtitle: 'Relaxed boxy cut with high-density rib collar',
    photographer: 'Elena Rostova',
    location: 'Roppongi Hills',
    tag: 'STREET LUXURY',
  },

  // Eyewear
  {
    id: 'camp-11',
    title: 'Casual Summer Titanium Frame Sunglasses',
    category: 'Eyewear',
    image: '/assets/men/sunglasses/casual-summer-men-sunglasses-outfit.jpeg',
    subtitle: 'Japanese beta-titanium with ZEISS polarized lenses',
    photographer: 'Marco Rossi',
    location: 'Amalfi Coast, Italy',
    tag: 'SUMMER ATELIER',
  },
  {
    id: 'camp-12',
    title: 'Geometric Metal Frame Shades',
    category: 'Eyewear',
    image: '/assets/men/sunglasses/1pc-men-casual-style-geometric-metal-frame-fashion-sunglasses-for-outdoor-daily-life-driving-street-snap-accessories-beach-accessories-sun-glasses-sunglasses-shades.jpeg',
    subtitle: 'Anti-reflective emerald tint with 24k gold inlay',
    photographer: 'Jean-Luc Moreau',
    location: 'Monaco Harbor',
    tag: 'EYEWEAR ESSENTIAL',
  },

  // Footwear & Leather
  {
    id: 'camp-13',
    title: 'Campus Camp Clint Leather & Green Sneakers',
    category: 'Footwear & Leather',
    image: '/assets/men/shoes/campus-men-s-white-green-camp-clint-sneakers-clean-everyday-style.jpeg',
    subtitle: 'Hand-stitched nappa leather court trainers',
    photographer: 'Antoine Dubois',
    location: 'Milan Fashion Week',
    tag: 'COURT SNEAKER',
  },
  {
    id: 'camp-14',
    title: 'Vintage Luxury Shoulder Bag Collection',
    category: 'Footwear & Leather',
    image: '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
    subtitle: 'Tuscan vegetable-tanned box calfskin with 18k gold lock',
    photographer: 'Jean-Luc Moreau',
    location: 'Place Vendôme, Paris',
    tag: 'HAUTE LEATHERWARE',
  },
  {
    id: 'camp-15',
    title: 'U.S. Polo Assn. White Clean Sneakers',
    category: 'Footwear & Leather',
    image: '/assets/men/shoes/us-polo-assn-white-sneakers-for-men-casual-sneakers-outfit-ideas-everyday-stylish-shoes.jpeg',
    subtitle: 'Minimal everyday trainers with rubber cup sole',
    photographer: 'Lukas Weber',
    location: 'Mayfair Street Snap',
    tag: 'ESSENTIAL FOOTWEAR',
  },
];

export const LuxuryCampaignGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<CampaignMediaItem | null>(null);

  const categories = ['All', 'Tailoring', 'Timepieces', 'Streetwear', 'Eyewear', 'Footwear & Leather'];

  const filteredItems = selectedCategory === 'All'
    ? CAMPAIGN_MEDIA_ITEMS
    : CAMPAIGN_MEDIA_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="campaigns" className="py-28 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header Title & Storytelling Subhead */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059]">
                EDITORIAL CAMPAIGNS • GLOBAL LIFESTYLE VISUALS
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl uppercase tracking-tight text-[#F8F9FA]">
              The High-Fashion <br />
              <span className="italic text-[#C5A059] font-light lowercase font-serif pl-4">
                visual archive
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-light text-[#EFECE6]/70 leading-relaxed max-w-md">
            Explore editorial lifestyle photography, high-horology closeups, bespoke Savile Row tailoring, and street-luxury ensembles captured across Mayfair, Paris, Tokyo, and Geneva.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#1F2128] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C5A059] text-black font-bold shadow-lg scale-105'
                  : 'bg-[#121316] text-[#EFECE6]/60 hover:text-white border border-[#1F2128] hover:border-[#C5A059]/40'
              }`}
            >
              {cat === 'All' ? 'ALL CAMPAIGNS' : cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* MASONRY EDITORIAL GALLERY GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onClick={() => setActiveLightboxItem(item)}
                className="group relative bg-[#121316] border border-[#1F2128] hover:border-[#C5A059]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(197,160,89,0.15)]"
              >
                {/* Image Container with Hover Scale */}
                <div className="w-full aspect-[4/5] overflow-hidden relative bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover filter brightness-[0.82] contrast-105 group-hover:scale-110 group-hover:brightness-100 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Tag Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[9px] font-mono tracking-extra uppercase text-[#C5A059] glass-card px-3 py-1 rounded-full border border-[#C5A059]/30">
                      {item.tag}
                    </span>
                  </div>

                  {/* Top Right Expand Icon */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 rounded-full bg-black/70 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059]">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Bottom Card Content */}
                <div className="p-6 space-y-2 bg-[#121316] relative z-10 border-t border-white/5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#EFECE6]/50 uppercase tracking-widest">
                    <span>{item.location}</span>
                    <span className="text-[#C5A059]">{item.photographer}</span>
                  </div>

                  <h3 className="font-serif text-lg text-[#F8F9FA] group-hover:text-[#C5A059] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs font-light text-[#EFECE6]/70 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeLightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full bg-[#121316] border border-[#C5A059]/40 rounded-xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#C5A059] transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Left Image */}
              <div className="lg:col-span-7 bg-black flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="max-h-[75vh] w-auto object-contain rounded"
                />
              </div>

              {/* Lightbox Right Specs */}
              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6 text-left">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-extra uppercase text-[#C5A059] border border-[#C5A059]/30 px-3 py-1 rounded-full inline-block">
                    {activeLightboxItem.tag}
                  </span>

                  <h3 className="font-serif text-3xl text-[#F8F9FA]">
                    {activeLightboxItem.title}
                  </h3>

                  <p className="text-sm font-light text-[#EFECE6]/80 leading-relaxed">
                    {activeLightboxItem.subtitle}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-white/40">PHOTOGRAPHER:</span>
                      <span className="text-[#C5A059]">{activeLightboxItem.photographer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">LOCATION:</span>
                      <span className="text-white">{activeLightboxItem.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">COLLECTION:</span>
                      <span className="text-white">AW26/27 PRE-COLLECTION</span>
                    </div>
                  </div>
                </div>

                <MagneticButton
                  onClick={() => {
                    setActiveLightboxItem(null);
                    const el = document.getElementById('collection');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-4 bg-white hover:bg-[#C5A059] text-black font-bold text-xs tracking-extra uppercase transition-colors rounded flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <span>Explore Catalogue Piece</span>
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
