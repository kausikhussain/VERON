import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AIStylistResult } from '../types';
import { Sparkles, X, Send, Layers, RefreshCw, Palette, DollarSign, Calendar, Sun, ShieldCheck } from 'lucide-react';

interface AIStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTransferToOutfitBuilder: (result: AIStylistResult) => void;
}

export const AIStylistModal: React.FC<AIStylistModalProps> = ({
  isOpen,
  onClose,
  onTransferToOutfitBuilder,
}) => {
  const [occasion, setOccasion] = useState('Business');
  const [season, setSeason] = useState('Autumn / Winter');
  const [budget, setBudget] = useState('Haute Couture ($5,000+)');
  const [colorScheme, setColorScheme] = useState('Monochromatic OLED Black & Gold');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIStylistResult | null>(null);

  const occasionsList = [
    'Business',
    'Office',
    'College',
    'Date Night',
    'Wedding',
    'Casual',
    'Gym',
    'Airport Look',
    'Vacation',
    'Winter',
    'Summer',
  ];

  const budgetList = [
    'Essential ($1,000 - $2,500)',
    'Executive ($2,500 - $5,000)',
    'Haute Couture ($5,000+)',
    'Unconstrained Bespoke',
  ];

  const colorPalettes = [
    'Monochromatic OLED Black & Gold',
    'Graphite, Charcoal & Titanium',
    'Champagne, Camel & Pearl White',
    'Deep Midnight Navy & Amber',
    'Earth Tones & Olive Bronze',
  ];

  const handleGenerateOutfit = async (overridePrompt?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          season,
          budget,
          colorScheme,
          prompt: overridePrompt || customPrompt,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08080A]/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#121316] border border-[#C5A059]/40 rounded-lg max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl my-8 text-[#F8F9FA] space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F2128] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C5A059]/10 border border-[#C5A059]/40 rounded">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl uppercase tracking-wider text-[#F8F9FA]">
                AURELIUS MEN'S AI STYLIST
              </h3>
              <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                COMPLETE MALE ENSEMBLE CURATION • GEMINI 3.6 INTELLIGENCE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#EFECE6]/60 hover:text-[#F8F9FA] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Occasion */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Occasion:
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none font-mono"
            >
              {occasionsList.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>

          {/* Season */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest flex items-center gap-1">
              <Sun className="w-3 h-3" /> Season / Climate:
            </label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none font-mono"
            >
              <option value="Autumn / Winter">Autumn / Winter</option>
              <option value="Spring / Summer">Spring / Summer</option>
              <option value="Alpine Cold">Alpine Cold</option>
              <option value="Tropical Coastal">Tropical Coastal</option>
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> Budget Range:
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none font-mono"
            >
              {budgetList.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Color Scheme */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest flex items-center gap-1">
              <Palette className="w-3 h-3" /> Color Matching:
            </label>
            <select
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value)}
              className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none font-mono truncate"
            >
              {colorPalettes.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block">
            CUSTOM BESPOKE REQUEST (OPTIONAL)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. 'Airport look for first-class London to Tokyo flight with oversized hoodie & luggage...'"
              className="flex-1 bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-4 py-2.5 text-xs text-[#F8F9FA] placeholder-[#EFECE6]/40 outline-none font-light"
            />
            <button
              onClick={() => handleGenerateOutfit()}
              disabled={loading}
              className="px-6 py-2.5 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-widest uppercase rounded flex items-center gap-2 cursor-pointer hover:bg-[#EFECE6] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Curate Look</span>
            </button>
          </div>
        </div>

        {/* Quick Presets Buttons */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-[#1F2128]">
          <span className="text-[10px] font-mono text-[#EFECE6]/50 uppercase tracking-widest my-auto mr-2">
            Quick Curations:
          </span>
          {['Office Executive', 'Date Night Riviera', 'Wedding Guest Black-Tie', 'Gym & Athleisure', 'College Streetwear'].map(
            (preset) => (
              <button
                key={preset}
                onClick={() => {
                  setOccasion(preset.split(' ')[0]);
                  handleGenerateOutfit(`Curate a complete ${preset} ensemble for men`);
                }}
                className="px-3 py-1 bg-[#1F2128] hover:bg-[#C5A059]/20 hover:text-[#C5A059] text-[#EFECE6]/70 rounded text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                {preset}
              </button>
            )
          )}
        </div>

        {/* Results Showcase */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-4 border border-[#1F2128] rounded bg-[#08080A]">
            <RefreshCw className="w-8 h-8 text-[#C5A059] animate-spin" />
            <p className="text-xs font-mono tracking-widest text-[#C5A059] uppercase">
              Curating Complete Gentleman's Ensemble with Gemini 3.6...
            </p>
            <p className="text-[10px] font-mono text-[#EFECE6]/50">
              Matching Shirts, Pants, Shoes, Watch, Sunglasses, Belt, Wallet, Perfume & Accessories
            </p>
          </div>
        ) : (
          result && (
            <div className="space-y-6 bg-[#08080A] border border-[#1F2128] p-6 rounded text-xs space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase">
                    CURATED MENSWEAR LOOK • {result.occasion || occasion}
                  </span>
                  <span className="text-[10px] font-mono text-[#EFECE6]/50">
                    BUDGET: {result.budgetRange || budget}
                  </span>
                </div>
                <h4 className="font-serif text-2xl text-[#F8F9FA] mt-1">
                  {result.title}
                </h4>
                <p className="text-xs font-light text-[#EFECE6]/80 mt-2 leading-relaxed">
                  {result.concept}
                </p>
              </div>

              {/* Color Palette & Matching Notes */}
              {result.palette && (
                <div className="flex flex-wrap items-center gap-3 p-3 bg-[#121316] border border-[#1F2128] rounded">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase">COLOR HARMONY:</span>
                  <div className="flex flex-wrap gap-2">
                    {result.palette.map((col, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#08080A] border border-[#1F2128] rounded text-[10px] font-mono text-[#EFECE6]"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete Items Breakdown (Shirt, Pants, Shoes, Watch, Sunglasses, Belt, Wallet, Perfume, Accessories) */}
              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest">
                  COMPLETE ENSEMBLE BREAKDOWN (9 HEAD-TO-TOE ESSENTIALS)
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {result.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#121316] border border-[#1F2128] hover:border-[#C5A059]/40 rounded space-y-1 transition-colors"
                    >
                      <span className="text-[9px] font-mono text-[#C5A059] uppercase tracking-wider block font-bold">
                        {item.category}
                      </span>
                      <p className="font-serif text-sm text-[#F8F9FA] font-medium leading-snug">{item.name}</p>
                      <p className="text-[10px] font-mono text-[#EFECE6]/60">{item.fabric}</p>
                      <p className="text-[10px] text-[#EFECE6]/80 italic mt-1 leading-relaxed">{item.stylingNotes}</p>
                      <p className="text-xs font-serif text-[#C5A059] pt-1">${item.price?.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grooming & Atelier Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-[#121316] border border-[#1F2128] rounded">
                  <p className="text-[9px] font-mono text-[#C5A059] uppercase tracking-wider">MALE GROOMING & PERFUME SIGNATURE</p>
                  <p className="text-xs text-[#EFECE6] mt-1 leading-relaxed">{result.groomingAndFragrance}</p>
                </div>

                <div className="p-3.5 bg-[#121316] border border-[#1F2128] rounded">
                  <p className="text-[9px] font-mono text-[#C5A059] uppercase tracking-wider">MAYFAIR ATELIER FIT NOTE</p>
                  <p className="text-xs text-[#EFECE6] mt-1 leading-relaxed">{result.atelierNote}</p>
                </div>
              </div>

              {/* Transfer CTA */}
              <button
                onClick={() => {
                  onTransferToOutfitBuilder(result);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#C5A059] text-[#08080A] font-bold text-xs tracking-[0.2em] uppercase rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#EFECE6] transition-colors shadow-lg"
              >
                <Layers className="w-4 h-4" />
                <span>Load Look into Interactive Outfit Builder</span>
              </button>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};
