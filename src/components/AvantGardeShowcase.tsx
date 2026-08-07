import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ShoppingBag, Eye, Sparkles, Filter, Search, X, ArrowUpRight, Crown, Layers, Compass } from 'lucide-react';
import { formatINR } from '../utils/formatCurrency';
import { MagneticButton } from './MagneticButton';

interface AvantGardeShowcaseProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onAddToOutfitBuilder: (p: Product) => void;
  currency?: string;
}

interface CategoryShowroomTheme {
  id: string;
  name: string;
  heroBadge: string;
  headline: string;
  highlightText: string;
  description: string;
  bgGradient: string;
  accentColor: string;
  heroImage: string;
  quote: string;
}

const SHOWROOM_THEMES: Record<string, CategoryShowroomTheme> = {
  All: {
    id: 'all',
    name: 'All Couture',
    heroBadge: 'AUTUMN / WINTER 2026/27 • FLAGSHIP EXHIBITION',
    headline: 'The Sovereign Collection',
    highlightText: 'Sovereign',
    description: 'An architectural anthology of haute tailoring, high horology, fine leatherware, and couture streetwear crafted in Mayfair, Paris, and Florence.',
    bgGradient: 'from-[#08080A] via-[#121316] to-[#08080A]',
    accentColor: '#C5A059',
    heroImage: '/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg',
    quote: 'Architecture in motion, sculpted for those who command quiet authority.',
  },
  'Suits & Tailoring': {
    id: 'suits',
    name: 'Suits & Tailoring',
    heroBadge: 'SAVILE ROW EST. 1846 • BESPOKE SUITE',
    headline: 'Monolithic Vicuña & Silk Canvassing',
    highlightText: 'Monolithic',
    description: 'Hand-padded silk canvassing, natural horn hardware, and 12.5 micron Andean Vicuña fleece engineered for executive posture.',
    bgGradient: 'from-[#0A0908] via-[#161412] to-[#08080A]',
    accentColor: '#DFB56C',
    heroImage: '/assets/men/jackets/black-tuxedo-suit-for-men-3-piece-wedding-suit-groom-tuxedo-set-formal-prom-suit-slim-fit-black-dinn.jpeg',
    quote: 'A suit is not a garment; it is a declaration of presence.',
  },
  'Top Wear': {
    id: 'tops',
    name: 'Tops & Shirts',
    heroBadge: 'WEST INDIAN SEA ISLAND COTTON & SILK',
    headline: 'Subtle Tactile Perfection',
    highlightText: 'Tactile',
    description: 'Spun from certified 200s Poplin Sea Island cotton and silk-merino knits with Australian mother-of-pearl buttons.',
    bgGradient: 'from-[#08090A] via-[#121518] to-[#08080A]',
    accentColor: '#E6C687',
    heroImage: '/assets/men/shirts/clean-beige-shirt-outfit-for-everyday-style.jpeg',
    quote: 'The unspoken luxury of zero friction against skin.',
  },
  BottomWear: {
    id: 'bottoms',
    name: 'Trousers & Denim',
    heroBadge: 'WORSTED FLANNEL & OKAYAMA SELVEDGE',
    headline: 'Pleated Architectural Drape',
    highlightText: 'Drape',
    description: 'Double forward pleats, solid brass side waist cinchers, and Okayama shuttle loom indigo selvedge denim.',
    bgGradient: 'from-[#08080A] via-[#141416] to-[#08080A]',
    accentColor: '#C5A059',
    heroImage: '/assets/men/jeans/cargo-style-denim-jeans.jpeg',
    quote: 'Balance defined from waist line to foot break.',
  },
  Footwear: {
    id: 'footwear',
    name: 'Footwear & Loafers',
    heroBadge: 'FLORENTINE HAND-PATINATED CALFSKIN',
    headline: 'Wholecut French Box Calfskin',
    highlightText: 'Wholecut',
    description: 'Cut from a single piece of French leather with Goodyear-welted oak-bark soles and hand-stitched nappa court trainers.',
    bgGradient: 'from-[#0A0808] via-[#1A1212] to-[#08080A]',
    accentColor: '#D4AF37',
    heroImage: '/assets/men/shoes/campus-men-s-white-green-camp-clint-sneakers-clean-everyday-style.jpeg',
    quote: 'Every step is grounded in centuries of cobbling artistry.',
  },
  Accessories: {
    id: 'accessories',
    name: 'High Horology & Eyewear',
    heroBadge: 'GENEVA TOURBILLON & JAPAN BETA-TITANIUM',
    headline: 'Flying Tourbillon & Titanium Optics',
    highlightText: 'Tourbillon',
    description: 'Flying tourbillon movement with 72-hour power reserve, grade 5 titanium cases, and ZEISS anti-reflective polarized lenses.',
    bgGradient: 'from-[#080A0A] via-[#121818] to-[#08080A]',
    accentColor: '#C5A059',
    heroImage: '/assets/men/watches/patek-philippe-nautilus-watch-ref-5610-1p-001-boodles.jpeg',
    quote: 'Time measured in micro-mechanics and pure light.',
  },
  'Handbags & Leather': {
    id: 'bags',
    name: 'Haute Leatherware & Bags',
    heroBadge: 'TUSCAN VEGETABLE-TANNED CALFSKIN',
    headline: '18k Gold Turn-Lock Holdalls',
    highlightText: 'Holdalls',
    description: 'Full-grain Tuscan box calfskin with hand-painted lacquer edges, suede lining, and solid champagne-gold brass locks.',
    bgGradient: 'from-[#0A0907] via-[#1A1610] to-[#08080A]',
    accentColor: '#EFECE6',
    heroImage: '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
    quote: 'Vessels of endurance, crafted for lifetimes of transit.',
  },
};

export const AvantGardeShowcase: React.FC<AvantGardeShowcaseProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onAddToOutfitBuilder,
  currency = 'INR',
}) => {
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [selectedCollection, setSelectedCollection] = useState<string>('All Collections');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const mainCategories = [
    'All',
    'Suits & Tailoring',
    'Top Wear',
    'Bottom Wear',
    'Footwear',
    'Accessories',
    'Handbags & Leather',
    'Dresses & Gowns',
    'Fine Jewellery',
    'Grooming & Perfumes',
  ];

  const collectionsList = [
    'All Collections',
    'New Arrivals',
    'Featured Collection',
    'Business Collection',
    'Streetwear Collection',
    'Sneakers Collection',
    'Watches Collection',
    'Wedding Collection',
    'Editor\'s Picks',
    'Trending This Week',
  ];

  // Dynamic subcategories calculation
  const getSubcategories = () => {
    const subs = new Set<string>();
    if (selectedMainCategory === 'All') {
      products.forEach((p) => {
        if (p.subcategory) subs.add(p.subcategory);
      });
    } else {
      products.forEach((p) => {
        if (p.category === selectedMainCategory && p.subcategory) {
          subs.add(p.subcategory);
        }
      });
    }
    return Array.from(subs);
  };

  const currentSubcategories = getSubcategories();
  const currentTheme = SHOWROOM_THEMES[selectedMainCategory] || SHOWROOM_THEMES.All;

  // Filter logic with strict category isolation
  const filteredProducts = products.filter((p) => {
    if (selectedGender !== 'all') {
      if (p.gender && p.gender !== selectedGender) return false;
      if (!p.gender && selectedGender === 'women') return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (selectedMainCategory !== 'All') {
      if (selectedMainCategory === 'Suits & Tailoring') {
        if (p.subcategory !== 'Suits' && p.subcategory !== 'Blazers' && !p.isBespoke) return false;
      } else if (p.category !== selectedMainCategory) {
        return false;
      }
    }

    if (selectedSubcategory !== 'All') {
      if (p.subcategory !== selectedSubcategory) return false;
    }

    if (selectedCollection !== 'All Collections') {
      if (!p.collections || !p.collections.includes(selectedCollection)) return false;
    }

    return true;
  });

  return (
    <section id="collection" className="py-28 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128] select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* DYNAMIC CATEGORY SHOWROOM HERO BANNER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className={`relative w-full rounded-2xl overflow-hidden border border-[#C5A059]/30 bg-gradient-to-r ${currentTheme.bgGradient} p-8 sm:p-14 shadow-2xl min-h-[380px] flex flex-col justify-between`}
          >
            {/* Background Editorial Visual with Subtle Vignette */}
            <div className="absolute inset-0 z-0 opacity-25">
              <img
                src={currentTheme.heroImage}
                alt={currentTheme.name}
                className="w-full h-full object-cover filter brightness-75 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-[#08080A]" />
            </div>

            {/* Top Badge & Collection Ref */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-ping" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A059] glass-card px-4 py-1.5 rounded-full border border-[#C5A059]/30">
                  {currentTheme.heroBadge}
                </span>
              </div>
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                {filteredProducts.length} ATELIER PIECES AVAILABLE
              </span>
            </div>

            {/* Center Monolithic Headline & Description */}
            <div className="relative z-10 space-y-4 my-auto py-6 max-w-3xl">
              <h2 className="font-serif text-4xl sm:text-6xl uppercase tracking-tight text-[#F8F9FA] leading-none">
                {currentTheme.headline.split(currentTheme.highlightText)[0]}
                {currentTheme.highlightText && (
                  <span className="italic text-[#C5A059] font-light lowercase font-serif pl-3 block sm:inline">
                    {currentTheme.highlightText}
                  </span>
                )}
                {currentTheme.headline.split(currentTheme.highlightText)[1]}
              </h2>

              <p className="text-xs sm:text-sm font-light text-[#EFECE6]/80 leading-relaxed max-w-xl">
                {currentTheme.description}
              </p>
            </div>

            {/* Bottom Quote Stamp */}
            <div className="relative z-10 border-t border-white/10 pt-4 flex justify-between items-center text-[11px] font-mono text-white/50">
              <span className="italic text-[#C5A059]">"{currentTheme.quote}"</span>
              <span className="hidden sm:inline">MAYFAIR • PARIS • FLORENCE</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* NAVIGATION & FILTERING TOOLBAR */}
        <div className="space-y-6">
          {/* Top Gender & Search Control Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#1F2128]">
            {/* Gender Pills */}
            <div className="flex items-center gap-2 bg-[#121316] p-1.5 rounded-full border border-[#1F2128]">
              {(['all', 'men', 'women'] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    selectedGender === g
                      ? 'bg-[#C5A059] text-black font-bold shadow-md scale-105'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {g === 'all' ? 'ALL GENDERS' : `${g.toUpperCase()}'S`}
                </button>
              ))}
            </div>

            {/* Collection Dropdown & Search Input */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="bg-[#121316] border border-[#1F2128] focus:border-[#C5A059] rounded-full px-4 py-2 text-xs font-mono text-[#F8F9FA] outline-none cursor-pointer"
              >
                {collectionsList.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Vicuña, Oxfords, Nautilus..."
                  className="w-full bg-[#121316] border border-[#1F2128] focus:border-[#C5A059] rounded-full px-4 py-2 pl-9 text-xs text-[#F8F9FA] placeholder-white/40 outline-none"
                />
                <Search className="w-3.5 h-3.5 text-[#C5A059] absolute left-3.5 top-3" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-white/50 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Category Tabs Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 no-scrollbar">
            {mainCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedMainCategory(cat);
                  setSelectedSubcategory('All');
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  selectedMainCategory === cat
                    ? 'bg-[#C5A059] text-black font-bold shadow-lg scale-105'
                    : 'bg-[#121316] text-white/70 hover:text-white hover:bg-[#1F2128] border border-[#1F2128]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Subcategory Instant Quick Pills */}
          {currentSubcategories.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest mr-2 flex items-center gap-1">
                <Filter className="w-3 h-3" /> INSTANT FILTER:
              </span>
              <button
                onClick={() => setSelectedSubcategory('All')}
                className={`px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedSubcategory === 'All'
                    ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059] font-bold'
                    : 'bg-black/40 text-white/50 hover:text-white border border-white/10'
                }`}
              >
                ALL SUBCATEGORIES
              </button>
              {currentSubcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    selectedSubcategory === sub
                      ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059] font-bold'
                      : 'bg-black/40 text-white/50 hover:text-white border border-white/10'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ASYMMETRICAL EDITORIAL MAGAZINE PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4 glass-card rounded-2xl border border-white/10 max-w-xl mx-auto p-12">
            <Compass className="w-12 h-12 text-[#C5A059]/40 mx-auto" />
            <h3 className="font-serif text-2xl uppercase text-white">No Pieces Found</h3>
            <p className="text-xs font-light text-white/60">
              No bespoke garments match your selected criteria. Reset filters to explore the full Mayfair catalogue.
            </p>
            <button
              onClick={() => {
                setSelectedMainCategory('All');
                setSelectedSubcategory('All');
                setSelectedGender('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#C5A059] text-black font-mono text-xs font-bold uppercase rounded hover:bg-white transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence>
              {filteredProducts.map((product, pIdx) => {
                const isFeaturedCard = pIdx % 5 === 0;
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: (pIdx % 6) * 0.05 }}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                    className={`group relative bg-[#121316] border border-[#1F2128] hover:border-[#C5A059]/60 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_35px_rgba(197,160,89,0.18)] ${
                      isFeaturedCard ? 'lg:col-span-2 md:col-span-2' : ''
                    }`}
                  >
                    {/* Media Frame Container */}
                    <div
                      className={`w-full relative overflow-hidden bg-black ${
                        isFeaturedCard ? 'aspect-[16/9]' : 'aspect-[4/5]'
                      }`}
                    >
                      <img
                        src={
                          hoveredProductId === product.id && product.additionalImages?.[0]
                            ? product.additionalImages[0]
                            : product.image
                        }
                        alt={product.name}
                        className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-108 group-hover:brightness-100 transition-all duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                        {product.isBespoke && (
                          <span className="text-[9px] font-mono tracking-extra uppercase text-[#C5A059] bg-[#08080A]/90 px-3 py-1 rounded border border-[#C5A059]/40 backdrop-blur-md">
                            MAYFAIR BESPOKE
                          </span>
                        )}
                        {product.isEditorPick && (
                          <span className="text-[9px] font-mono tracking-extra uppercase text-white bg-black/80 px-3 py-1 rounded border border-white/20 backdrop-blur-md">
                            EDITOR'S PICK
                          </span>
                        )}
                      </div>

                      {/* Quick View Hover Button */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="px-5 py-2.5 bg-white text-black font-mono font-bold text-[10px] tracking-extra uppercase hover:bg-[#C5A059] transition-colors rounded shadow-2xl flex items-center gap-2 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick View</span>
                        </button>

                        <button
                          onClick={() => onAddToCart(product)}
                          className="px-5 py-2.5 bg-[#08080A] border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black font-mono font-bold text-[10px] tracking-extra uppercase transition-all rounded flex items-center gap-2 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Reserve</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Footer Info */}
                    <div className="p-6 space-y-3 bg-[#121316] relative z-10 border-t border-white/5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-white/50 uppercase tracking-widest">
                        <span>{product.subcategory}</span>
                        <span className="text-[#C5A059]">{product.origin}</span>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-serif text-xl text-[#F8F9FA] group-hover:text-[#C5A059] transition-colors leading-tight font-normal">
                          {product.name}
                        </h3>
                        <div className="text-right">
                          <span className="font-serif text-lg text-[#C5A059] font-normal block">
                            {formatINR(product.price)}
                          </span>
                          <span className="text-[9px] font-mono text-white/40 uppercase">INCL. GST</span>
                        </div>
                      </div>

                      <p className="text-xs font-light text-[#EFECE6]/70 leading-relaxed line-clamp-2">
                        {product.description}
                      </p>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/50">
                        <span className="text-white/70">FABRIC: {product.fabric}</span>
                        <div className="flex items-center gap-1.5 text-[#C5A059]">
                          <Crown className="w-3 h-3" />
                          <span>ATELIER</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
