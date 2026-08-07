import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShoppingBag, Eye, Check, Plus, Layers, ArrowRight, ShieldCheck, Crown } from 'lucide-react';
import { Product } from '../types';

export interface CompleteTheLookProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddMultipleToCart: (products: Product[]) => void;
  currency?: string;
}

interface OutfitLook {
  id: string;
  title: string;
  subtitle: string;
  gender: 'men' | 'women';
  tag: string;
  mainImage: string;
  totalPrice: number;
  hotspots: {
    id: string;
    x: number; // percentage 0-100
    y: number; // percentage 0-100
    productId: string;
    label: string;
    category: string;
  }[];
}

const LOOKS: OutfitLook[] = [
  {
    id: 'look-mayfair-executive',
    title: 'The Mayfair Executive Sovereign Ensemble',
    subtitle: 'Chapter I • Sartorial Authority',
    gender: 'men',
    tag: 'MEN\'S BESPOKE',
    mainImage: '/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg',
    totalPrice: 11850,
    hotspots: [
      {
        id: 'hs-1',
        x: 48,
        y: 28,
        productId: 'prod-top-1',
        label: 'Vicuña Double-Breasted Jacket',
        category: 'Suits & Tailoring',
      },
      {
        id: 'hs-2',
        x: 52,
        y: 42,
        productId: 'prod-top-2',
        label: 'Sea Island Cotton 200s Shirt',
        category: 'Bespoke Shirts',
      },
      {
        id: 'hs-3',
        x: 35,
        y: 48,
        productId: 'prod-acc-1',
        label: 'Titanium Tourbillon Watch',
        category: 'Horology',
      },
      {
        id: 'hs-4',
        x: 54,
        y: 82,
        productId: 'prod-foot-1',
        label: 'Wholecut Calfskin Oxfords',
        category: 'Footwear',
      },
    ],
  },
  {
    id: 'look-women-haute',
    title: 'The Sovereign Empress Silk & Diamond Look',
    subtitle: 'Chapter II • Fluid Royalty',
    gender: 'women',
    tag: 'WOMEN\'S HAUTE COUTURE',
    mainImage: '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
    totalPrice: 23250,
    hotspots: [
      {
        id: 'hs-5',
        x: 50,
        y: 35,
        productId: 'prod-wmn-1',
        label: 'Mayfair Silk Chiffon Evening Gown',
        category: 'Dresses & Gowns',
      },
      {
        id: 'hs-6',
        x: 48,
        y: 20,
        productId: 'prod-wmn-4',
        label: '18k Rose Gold Diamond Pendant',
        category: 'Fine Jewellery',
      },
      {
        id: 'hs-7',
        x: 68,
        y: 55,
        productId: 'prod-wmn-2',
        label: 'Calfskin Structured Tote Bag',
        category: 'Handbags & Leather',
      },
      {
        id: 'hs-8',
        x: 52,
        y: 88,
        productId: 'prod-wmn-3',
        label: '105mm Nappa Leather Stilettos',
        category: 'Footwear',
      },
    ],
  },
];

export const CompleteTheLook: React.FC<CompleteTheLookProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onAddMultipleToCart,
  currency = 'USD',
}) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const currentLook = LOOKS[activeLookIndex];

  // Resolve matching product instances from products array
  const lookProducts = currentLook.hotspots
    .map((hs) => products.find((p) => p.id === hs.productId))
    .filter(Boolean) as Product[];

  const activeHotspot = currentLook.hotspots.find((h) => h.id === activeHotspotId);
  const activeProduct = activeHotspot
    ? products.find((p) => p.id === activeHotspot.productId)
    : null;

  const handleAddFullLook = () => {
    if (lookProducts.length > 0) {
      onAddMultipleToCart(lookProducts);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    }
  };

  return (
    <section className="py-24 bg-[#08080A] text-[#F8F9FA] relative overflow-hidden border-t border-white/10">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A059]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-px bg-[#C5A059]" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059]">
                CURATED EDITORIAL PAIRING
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-white">
              COMPLETE THE LOOK
            </h2>
            <p className="text-white/60 font-light max-w-xl text-sm mt-2">
              Explore interactive hotspots on our master looks to discover individual tailored garments or acquire the entire 4-piece ensemble in 1 click.
            </p>
          </div>

          {/* Men / Women Outfit Selector Tabs */}
          <div className="flex items-center gap-3 p-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
            {LOOKS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIndex(idx);
                  setActiveHotspotId(null);
                }}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  idx === activeLookIndex
                    ? 'bg-[#C5A059] text-black font-semibold shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {look.tag}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN LOOK DISPLAY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: INTERACTIVE LOOKBOOK CANVAS WITH HOTSPOTS */}
          <div className="lg:col-span-7 relative group rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl">
            <img
              src={currentLook.mainImage}
              alt={currentLook.title}
              className="w-full h-[620px] object-cover object-center filter brightness-90 contrast-105 group-hover:scale-102 transition-transform duration-1000 ease-out"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* HOTSPOTS */}
            {currentLook.hotspots.map((hs) => {
              const isSelected = hs.id === activeHotspotId;
              return (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspotId(isSelected ? null : hs.id)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#C5A059] text-black scale-110 shadow-[0_0_20px_#C5A059]'
                        : 'bg-black/70 text-white border border-[#C5A059]/50 hover:bg-[#C5A059] hover:text-black hover:scale-110 backdrop-blur-md'
                    }`}
                    title={hs.label}
                  >
                    <Plus className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-45' : ''}`} />

                    {/* Pulse Ring */}
                    <span className="absolute inset-0 rounded-full border border-[#C5A059] animate-ping opacity-40 pointer-events-none" />
                  </button>

                  {/* Hotspot Hover Tag */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-black/90 px-3 py-1 rounded text-[11px] font-mono text-[#C5A059] border border-[#C5A059]/30">
                    {hs.label}
                  </div>
                </div>
              );
            })}

            {/* Bottom Overlay Label */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="text-xs font-mono tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
                {currentLook.subtitle}
              </span>
              <h3 className="text-2xl font-serif text-white font-normal">
                {currentLook.title}
              </h3>
            </div>
          </div>

          {/* RIGHT: ENSEMBLE BREAKDOWN & HOTSPOT DETAIL CARD */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            {/* Active Hotspot Preview Card (If Selected) */}
            <AnimatePresence mode="wait">
              {activeProduct ? (
                <motion.div
                  key={activeProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 rounded-2xl border border-[#C5A059]/40 bg-white/5 backdrop-blur-xl shadow-xl relative"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      className="w-24 h-28 object-cover rounded-lg border border-white/10"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block mb-1">
                        SELECTED HOTSPOT ITEM
                      </span>
                      <h4 className="text-lg font-serif text-white leading-tight mb-1">
                        {activeProduct.name}
                      </h4>
                      <p className="text-xs text-white/60 line-clamp-2 mb-3">
                        {activeProduct.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-[#C5A059] font-mono">
                          ${activeProduct.price.toLocaleString()} {currency}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => onSelectProduct(activeProduct)}
                            className="px-3 py-1.5 rounded-lg border border-white/20 hover:border-[#C5A059] text-xs font-mono text-white transition-all"
                          >
                            <Eye className="w-3.5 h-3.5 inline mr-1" />
                            VIEW
                          </button>
                          <button
                            onClick={() => onAddToCart(activeProduct)}
                            className="px-3 py-1.5 rounded-lg bg-[#C5A059] text-black font-semibold text-xs font-mono hover:brightness-110 transition-all"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 inline mr-1" />
                            ADD
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-center py-10">
                  <Sparkles className="w-6 h-6 text-[#C5A059] mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-mono text-white/60 tracking-wider">
                    CLICK ANY HOTSPOT ON THE LOOKBOOK TO EXPLORE INDIVIDUAL PIECES
                  </p>
                </div>
              )}
            </AnimatePresence>

            {/* Full 4-Piece Ensemble Summary */}
            <div className="p-6 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl">
              <h4 className="text-xs font-mono tracking-[0.2em] text-[#C5A059] uppercase mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                ENSEMBLE SPECIFICATION ({lookProducts.length} ITEMS)
              </h4>

              <div className="space-y-3 mb-6">
                {lookProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => onSelectProduct(prod)}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-10 h-10 object-cover rounded border border-white/10"
                      />
                      <div>
                        <div className="text-xs font-serif text-white group-hover:text-[#C5A059] transition-colors">
                          {prod.name}
                        </div>
                        <div className="text-[10px] font-mono text-white/50">
                          {prod.fabric}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-[#C5A059]">
                      ${prod.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Price & 1-Click Buy Full Look */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                    TOTAL ENSEMBLE PRICE
                  </span>
                  <span className="text-2xl font-serif text-[#C5A059] font-bold">
                    ${currentLook.totalPrice.toLocaleString()} {currency}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  COMPLIMENTARY MAYFAIR FITTING
                </span>
              </div>

              <button
                onClick={handleAddFullLook}
                className={`w-full py-4 rounded-xl font-semibold text-xs font-mono uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl ${
                  addedSuccess
                    ? 'bg-emerald-500 text-black'
                    : 'bg-gradient-to-r from-[#C5A059] via-[#DFB56C] to-[#C5A059] text-black hover:brightness-110'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED COMPLETE LOOK TO WARDROBE!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD COMPLETE 4-PIECE LOOK (${currentLook.totalPrice.toLocaleString()})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
