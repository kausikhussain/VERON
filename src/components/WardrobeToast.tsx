import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Check, Sparkles, X } from 'lucide-react';
import { Product } from '../types';

export interface ToastMessage {
  id: string;
  title: string;
  subtitle: string;
  product?: Product;
}

interface WardrobeToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const WardrobeToast: React.FC<WardrobeToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed top-20 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="pointer-events-auto glass-card bg-[#08080A]/95 border border-[#C5A059] p-4 rounded-xl shadow-[0_10px_30px_rgba(197,160,89,0.25)] flex items-start gap-3 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Ambient Gold Accent Bar */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-[#8A6D3B] via-[#C5A059] to-[#F8F9FA]" />

            <div className="p-2.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#C5A059] shrink-0">
              <Check className="w-4 h-4" />
            </div>

            <div className="flex-grow min-w-0 pr-4">
              <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-extra text-[#C5A059] uppercase">
                <Sparkles className="w-3 h-3" />
                <span>WARDROBE UPDATED</span>
              </div>
              <h4 className="font-serif text-sm font-semibold text-[#F8F9FA] truncate mt-0.5">
                {toast.title}
              </h4>
              <p className="text-xs font-light text-white/70 truncate mt-0.5">
                {toast.subtitle}
              </p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
