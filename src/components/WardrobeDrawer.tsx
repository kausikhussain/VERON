import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { ShoppingBag, X, Trash2, ShieldCheck, Gift, Check, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface WardrobeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onClearCart: () => void;
  currency: string;
}

export const WardrobeDrawer: React.FC<WardrobeDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onRemoveItem,
  onUpdateQuantity,
  onClearCart,
  currency,
}) => {
  const [giftBox, setGiftBox] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    JPY: { symbol: '¥', rate: 155.0 },
  };

  const curr = currencyRates[currency] || currencyRates.USD;

  const totalUSD = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const formattedTotal = `${curr.symbol}${Math.round(totalUSD * curr.rate).toLocaleString()}`;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#C5A059', '#EFECE6', '#D4AF37'],
      });
      setTimeout(() => {
        onClearCart();
      }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
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
            {checkoutComplete ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059] flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-[#C5A059]" />
                </div>
                <h4 className="font-serif text-2xl text-[#F8F9FA]">
                  Order Placed Successfully
                </h4>
                <p className="text-xs font-light text-[#EFECE6]/80 leading-relaxed">
                  Thank you for patronizing Aurelius & Co. Your bespoke garments have entered preparation at our Mayfair atelier.
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#1F2128] mx-auto" />
                <p className="text-sm font-serif text-[#EFECE6]/60">Your Atelier Bag is Empty</p>
                <p className="text-xs font-light text-[#EFECE6]/40 max-w-xs mx-auto">
                  Explore our Haute Collection or consult our AI Stylist to begin building your ensemble.
                </p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#08080A] border border-[#1F2128] rounded flex items-center justify-between gap-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded border border-[#1F2128]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 space-y-1">
                    <h4 className="font-serif text-xs text-[#F8F9FA] line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] font-mono text-[#C5A059]">
                      Size: {item.selectedSize} • Color: {item.selectedColor}
                    </p>
                    {item.monogram && (
                      <p className="text-[9px] font-mono text-[#EFECE6]/60">
                        Monogram: <span className="text-[#C5A059] font-bold">{item.monogram}</span>
                      </p>
                    )}
                    <p className="text-xs font-serif text-[#F8F9FA]">
                      {curr.symbol}
                      {Math.round(item.product.price * curr.rate).toLocaleString()}
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
          {cart.length > 0 && !checkoutComplete && (
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
                  <span>Insured Express Courier:</span>
                  <span className="text-[#C5A059]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between font-serif text-xl text-[#F8F9FA] pt-2">
                  <span>Total:</span>
                  <span className="text-[#C5A059]">{formattedTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3.5 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-[0.2em] uppercase rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#EFECE6] transition-colors disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Processing Private Order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Proceed to Secure Checkout</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
