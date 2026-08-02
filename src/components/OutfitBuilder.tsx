import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product, OutfitSlot, AIStylistResult } from '../types';
import { Layers, Plus, Trash2, ShoppingBag, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OutfitBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddMultipleToCart: (items: Product[]) => void;
  currency: string;
  initialStylistResult?: AIStylistResult | null;
}

export const OutfitBuilder: React.FC<OutfitBuilderProps> = ({
  isOpen,
  onClose,
  products,
  onAddMultipleToCart,
  currency,
  initialStylistResult,
}) => {
  // Pre-fill initial slot choices with flagship men's items
  const [slots, setSlots] = useState<OutfitSlot[]>([
    {
      id: 'jacket',
      name: 'Suit Jacket / Blazer / Outerwear',
      product: products.find((p) => p.subcategory === 'Suits' || p.subcategory === 'Blazers' || p.category === 'Top Wear'),
    },
    {
      id: 'shirt',
      name: 'Shirt / Polo / Knitwear',
      product: products.find((p) => p.subcategory === 'Shirts' || p.subcategory === 'Polo Shirts'),
    },
    {
      id: 'trousers',
      name: 'Trousers / Chinos / Denim',
      product: products.find((p) => p.category === 'Bottom Wear'),
    },
    {
      id: 'footwear',
      name: 'Shoes / Oxfords / Boots',
      product: products.find((p) => p.category === 'Footwear'),
    },
    {
      id: 'accessory',
      name: 'Watch / Leather Accessories',
      product: products.find((p) => p.category === 'Accessories'),
    },
  ]);

  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);

  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    JPY: { symbol: '¥', rate: 155.0 },
  };

  const curr = currencyRates[currency] || currencyRates.USD;

  const totalPriceUSD = slots.reduce((acc, slot) => acc + (slot.product ? slot.product.price : 0), 0);
  const formattedTotal = `${curr.symbol}${Math.round(totalPriceUSD * curr.rate).toLocaleString()}`;

  const handleSelectProductForSlot = (product: Product) => {
    if (!activeSlotId) return;
    setSlots((prev) =>
      prev.map((s) => (s.id === activeSlotId ? { ...s, product } : s))
    );
    setActiveSlotId(null);
  };

  const handleRemoveFromSlot = (slotId: string) => {
    setSlots((prev) =>
      prev.map((s) => (s.id === slotId ? { ...s, product: undefined } : s))
    );
  };

  const handleAddEnsembleToBag = () => {
    const selectedProducts = slots.map((s) => s.product).filter(Boolean) as Product[];
    if (selectedProducts.length === 0) return;

    onAddMultipleToCart(selectedProducts);

    // Confetti Celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C5A059', '#EFECE6', '#D4AF37'],
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08080A]/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#121316] border border-[#C5A059]/40 rounded-lg max-w-5xl w-full p-6 sm:p-8 relative shadow-2xl my-8 text-[#F8F9FA] space-y-6"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#1F2128] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C5A059]/10 border border-[#C5A059]/40 rounded">
              <Layers className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h3 className="font-serif text-2xl uppercase text-[#F8F9FA]">
                MENSWEAR BESPOKE OUTFIT BUILDER
              </h3>
              <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                5-SLOT HEAD-TO-TOE ENSEMBLE COMPOSITOR
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

        {/* 2-Column Grid: Outfit Preview Canvas & Slot Picker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Canvas: Slots Stack */}
          <div className="lg:col-span-7 space-y-3">
            <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
              ASSEMBLED ENSEMBLE SLOTS
            </p>

            <div className="space-y-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-4 rounded border transition-all flex items-center justify-between gap-4 ${
                    activeSlotId === slot.id
                      ? 'bg-[#1F2128] border-[#C5A059]'
                      : 'bg-[#08080A] border-[#1F2128]'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {slot.product ? (
                      <img
                        src={slot.product.image}
                        alt={slot.product.name}
                        className="w-14 h-14 object-cover rounded border border-[#1F2128]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded border border-dashed border-[#1F2128] flex items-center justify-center text-[#EFECE6]/30">
                        <Plus className="w-5 h-5" />
                      </div>
                    )}

                    <div>
                      <span className="text-[9px] font-mono text-[#C5A059] uppercase">
                        {slot.name}
                      </span>
                      {slot.product ? (
                        <>
                          <h4 className="font-serif text-sm text-[#F8F9FA]">{slot.product.name}</h4>
                          <p className="text-xs font-mono text-[#EFECE6]/70">
                            {curr.symbol}
                            {Math.round(slot.product.price * curr.rate).toLocaleString()}
                          </p>
                        </>
                      ) : (
                        <p className="text-xs font-light text-[#EFECE6]/40 italic">Empty Slot</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSlotId(slot.id)}
                      className="px-3 py-1.5 bg-[#1F2128] hover:bg-[#C5A059] text-[#EFECE6] hover:text-[#08080A] text-[10px] font-mono uppercase rounded transition-colors cursor-pointer"
                    >
                      {slot.product ? 'Change' : 'Select'}
                    </button>

                    {slot.product && (
                      <button
                        onClick={() => handleRemoveFromSlot(slot.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Catalog Selection Drawer */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-[#08080A] p-4 rounded border border-[#1F2128]">
            {activeSlotId ? (
              <div className="space-y-3">
                <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase flex items-center justify-between">
                  <span>SELECT ITEM FOR {slots.find((s) => s.id === activeSlotId)?.name}</span>
                  <button
                    onClick={() => setActiveSlotId(null)}
                    className="text-[#EFECE6]/50 hover:text-[#F8F9FA]"
                  >
                    Cancel
                  </button>
                </p>

                <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1 no-scrollbar">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProductForSlot(prod)}
                      className="p-2.5 bg-[#121316] hover:bg-[#1F2128] border border-[#1F2128] hover:border-[#C5A059]/40 rounded flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="font-serif text-xs text-[#F8F9FA] line-clamp-1">{prod.name}</p>
                          <p className="text-[10px] font-mono text-[#C5A059]">
                            {curr.symbol}
                            {Math.round(prod.price * curr.rate).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-[#C5A059]" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                  ENSEMBLE VALUATION & SERVICES
                </p>

                <div className="p-4 bg-[#121316] border border-[#1F2128] rounded space-y-3">
                  <div className="flex justify-between text-xs text-[#EFECE6]/70">
                    <span>Selected Items:</span>
                    <span>{slots.filter((s) => s.product).length} / 5</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#EFECE6]/70">
                    <span>Complimentary Express Delivery:</span>
                    <span className="text-[#C5A059]">INCLUDED</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#EFECE6]/70">
                    <span>Mayfair Monogramming:</span>
                    <span className="text-[#C5A059]">COMPLIMENTARY</span>
                  </div>

                  <div className="pt-3 border-t border-[#1F2128] flex items-center justify-between font-serif text-2xl text-[#F8F9FA]">
                    <span>Total Valuation:</span>
                    <span className="text-[#C5A059]">{formattedTotal}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Add Complete Outfit CTA */}
            <button
              onClick={handleAddEnsembleToBag}
              disabled={slots.filter((s) => s.product).length === 0}
              className="w-full py-3.5 bg-[#C5A059] text-[#08080A] font-bold text-xs tracking-[0.2em] uppercase rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#EFECE6] transition-colors disabled:opacity-40"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add Entire Outfit to Bag ({formattedTotal})</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
