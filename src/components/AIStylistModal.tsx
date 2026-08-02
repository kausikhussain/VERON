import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AIStylistResult } from '../types';
import { Sparkles, X, Send, Layers, Check, RefreshCw, Scissors } from 'lucide-react';

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
  const [occasion, setOccasion] = useState('Business Executive');
  const [weather, setWeather] = useState('Autumn Temperate');
  const [stylePreference, setStylePreference] = useState('Monochromatic Minimalist');
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIStylistResult | null>(null);

  const presets = [
    { label: 'Business Executive', weather: 'Autum Temperate', style: 'Peak Lapel Monochromatic' },
    { label: 'Wedding Black Tie', weather: 'Formal Evening', style: 'Midnight Velvet & Silk' },
    { label: 'Weekend Riviera', weather: 'Warm Coastal', style: 'Unstructured Linen & Loafers' },
    { label: 'Luxury Evening Wear', weather: 'Gala Opera', style: 'Sovereign Vicuña & Gold' },
    { label: 'Travel Essentials', weather: 'Alpine Expedition', style: 'Layered Cashmere & Holdall' },
  ];

  const handleGenerateOutfit = async (overridePrompt?: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          weather,
          stylePreference,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08080A]/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#121316] border border-[#C5A059]/40 rounded-lg max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl my-8 text-[#F8F9FA] space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1F2128] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C5A059]/10 border border-[#C5A059]/40 rounded">
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl uppercase text-[#F8F9FA]">
                AURELIUS AI STYLIST
              </h3>
              <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                POWERED BY GEMINI 3.6 FLASH • MAYFAIR ATELIER INTELLIGENCE
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

        {/* Presets Grid */}
        <div className="space-y-3">
          <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
            CHOOSE CURATED OCCASION PRESET
          </p>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setOccasion(p.label);
                  setWeather(p.weather);
                  setStylePreference(p.style);
                  handleGenerateOutfit(`Assemble a ${p.label} outfit for ${p.weather} with ${p.style}`);
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  occasion === p.label
                    ? 'bg-[#C5A059] text-[#08080A] font-medium'
                    : 'bg-[#1F2128] text-[#EFECE6]/70 hover:text-[#F8F9FA] hover:bg-[#1F2128]/80'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block">
            OR SPECIFY CUSTOM EVENT & BESPOKE PREFERENCE
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="e.g. 'Private yacht dinner in Monaco with tropical autumn breeze...'"
              className="flex-1 bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-4 py-2.5 text-xs text-[#F8F9FA] placeholder-[#EFECE6]/40 outline-none font-light"
            />
            <button
              onClick={() => handleGenerateOutfit()}
              disabled={loading}
              className="px-5 py-2.5 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-widest uppercase rounded flex items-center gap-2 cursor-pointer hover:bg-[#EFECE6] transition-colors disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Curate</span>
            </button>
          </div>
        </div>

        {/* Results Showcase */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-4 border border-[#1F2128] rounded bg-[#08080A]">
            <RefreshCw className="w-8 h-8 text-[#C5A059] animate-spin" />
            <p className="text-xs font-mono tracking-widest text-[#C5A059] uppercase">
              Curating Haute Ensemble with Gemini 3.6...
            </p>
          </div>
        ) : (
          result && (
            <div className="space-y-6 bg-[#08080A] border border-[#1F2128] p-6 rounded text-xs space-y-4">
              <div>
                <span className="text-[10px] font-mono text-[#C5A059] uppercase">
                  RECOMMENDED ENSEMBLE
                </span>
                <h4 className="font-serif text-2xl text-[#F8F9FA] mt-1">
                  {result.title}
                </h4>
                <p className="text-xs font-light text-[#EFECE6]/80 mt-2 leading-relaxed">
                  {result.concept}
                </p>
              </div>

              {/* Color Palette */}
              {result.palette && (
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase">COLOR HARMONY:</span>
                  <div className="flex gap-2">
                    {result.palette.map((col, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#1F2128] border border-[#1F2128] rounded text-[10px] font-mono text-[#EFECE6]"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Items Breakdown */}
              <div className="space-y-3 pt-2">
                <p className="text-[10px] font-mono text-[#C5A059] uppercase">GARMENT BREAKDOWN</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-[#121316] border border-[#1F2128] rounded space-y-1"
                    >
                      <span className="text-[9px] font-mono text-[#C5A059] uppercase">
                        {item.category}
                      </span>
                      <p className="font-serif text-sm text-[#F8F9FA] font-medium">{item.name}</p>
                      <p className="text-[10px] font-mono text-[#EFECE6]/60">{item.fabric}</p>
                      <p className="text-[10px] text-[#EFECE6]/80 italic mt-1">{item.stylingNotes}</p>
                      <p className="text-xs font-serif text-[#C5A059] pt-1">${item.price?.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grooming & Atelier Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-[#121316] border border-[#1F2128] rounded">
                  <p className="text-[9px] font-mono text-[#C5A059] uppercase">FRAGRANCE & GROOMING</p>
                  <p className="text-xs text-[#EFECE6] mt-1">{result.groomingAndFragrance}</p>
                </div>

                <div className="p-3 bg-[#121316] border border-[#1F2128] rounded">
                  <p className="text-[9px] font-mono text-[#C5A059] uppercase">ATELIER TAILORING NOTE</p>
                  <p className="text-xs text-[#EFECE6] mt-1">{result.atelierNote}</p>
                </div>
              </div>

              {/* Transfer CTA */}
              <button
                onClick={() => {
                  onTransferToOutfitBuilder(result);
                  onClose();
                }}
                className="w-full py-3 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-[0.2em] uppercase rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#EFECE6] transition-colors"
              >
                <Layers className="w-4 h-4" />
                <span>Load Ensemble into Outfit Builder</span>
              </button>
            </div>
          )
        )}
      </motion.div>
    </div>
  );
};
