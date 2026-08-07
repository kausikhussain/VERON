import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { ShoppingBag, X, Trash2, ShieldCheck, Gift, Check, ArrowRight } from 'lucide-react';
import { formatINR } from '../utils/formatCurrency';
import { IndianLuxuryCheckoutModal } from './IndianLuxuryCheckoutModal';

interface WardrobeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onClearCart: () => void;
  currency?: string;
}

export const WardrobeDrawer: React.FC<WardrobeDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  currency = 'INR',
}) => {
  const [giftBox, setGiftBox] = useState(true);
  const [showIndianCheckout, setShowIndianCheckout] = useState(false);

  const totalInr = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const formattedTotal = formatINR(totalInr);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-[#08080A]/80 backdrop-blur-sm" onClick={onClose} />

        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-[#121316] border-l border-[#1F2128] text-[#F8F9FA] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#1F2128] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
                <div>
                  <h3 className="font-serif text-lg uppercase text-[#F8F9FA]">
                    YOUR ATELIER BAG
                  </h3>
                  <span className="text-[9px] font-mono text-[#C5A059] uppercase">
                    {cart.length} ITEMS IN RESERVATION
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-[#EFECE6]/60 hover:text-[#F8F9FA] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[#C5A059]/40 mx-auto" />
                  <p className="text-sm font-serif italic text-[#EFECE6]/60">
                    Your luxury atelier bag is currently empty.
                  </p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-3 bg-[#08080A] rounded border border-[#1F2128] items-center"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded border border-[#1F2128]"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="font-serif text-sm font-medium leading-tight">
                        {item.product.name}
                      </div>
                      <div className="text-[10px] text-[#C5A059] font-mono">
                        COLOR: {item.selectedColor} | SIZE: {item.selectedSize}
                      </div>
                      {item.monogram && (
                        <div className="text-[9px] text-[#C5A059] font-mono border-l border-[#C5A059] pl-1.5">
                          MONOGRAM: "{item.monogram}"
                        </div>
                      )}
                      <p className="text-xs font-serif text-[#F8F9FA]">
                        {formatINR(item.product.price)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-red-400 hover:text-red-300 cursor-pointer p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="flex items-center gap-2 border border-[#1F2128] rounded px-2 py-0.5 bg-[#121316] text-xs font-mono">
                        <button onClick={() => onUpdateQuantity(idx, -1)} className="hover:text-[#C5A059]">
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(idx, 1)} className="hover:text-[#C5A059]">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer & Checkout Action */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-[#1F2128] space-y-4 bg-[#08080A]">
                {/* Gift Packaging Check */}
                <label className="flex items-center gap-2 text-xs font-mono text-[#EFECE6]/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftBox}
                    onChange={(e) => setGiftBox(e.target.checked)}
                    className="accent-[#C5A059]"
                  />
                  <Gift className="w-4 h-4 text-[#C5A059]" />
                  <span>Signature Mayfair Gift Packaging (Complimentary)</span>
                </label>

                {/* Total Summary */}
                <div className="space-y-1 pt-2 border-t border-[#1F2128]">
                  <div className="flex justify-between text-xs text-[#EFECE6]/70">
                    <span>Subtotal:</span>
                    <span>{formattedTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#EFECE6]/70">
                    <span>Insured Express Courier (India):</span>
                    <span className="text-[#C5A059]">COMPLIMENTARY</span>
                  </div>
                  <div className="flex justify-between font-serif text-xl text-[#F8F9FA] pt-2">
                    <span>Total:</span>
                    <span className="text-[#C5A059]">{formattedTotal}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={() => setShowIndianCheckout(true)}
                  className="w-full py-3.5 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-[0.2em] uppercase rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#EFECE6] transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>PROCEED TO ATELIER CHECKOUT (UPI / CARDS)</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Indian Luxury Payment Modal */}
      <IndianLuxuryCheckoutModal
        isOpen={showIndianCheckout}
        onClose={() => setShowIndianCheckout(false)}
        cart={cart}
        onSuccess={() => {
          onClearCart();
          onClose();
        }}
      />
    </>
  );
};
