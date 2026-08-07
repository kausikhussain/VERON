import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, QrCode, CreditCard, Landmark, Sparkles, Building, Lock } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR } from '../utils/formatCurrency';
import confetti from 'canvas-confetti';

interface IndianLuxuryCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onSuccess: () => void;
}

type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'deposit';

export const IndianLuxuryCheckoutModal: React.FC<IndianLuxuryCheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'cred'>('gpay');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const gstAmount = Math.round(subtotal * 0.12); // 12% Indian Luxury Fashion GST
  const grandTotal = subtotal + gstAmount;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#C5A059', '#EFECE6', '#D4AF37'],
      });

      setTimeout(() => {
        onSuccess();
        onClose();
        setIsSuccess(false);
      }, 3500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08080A]/90 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#121316] border border-[#C5A059]/40 rounded-xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8 text-[#F8F9FA] space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-white/50 hover:text-white cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#C5A059]/10 border-2 border-[#C5A059] flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-10 h-10 text-[#C5A059]" />
            </div>
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase">
                TRANSACTION CONFIRMED • MAYFAIR INDIA ATELIER
              </span>
              <h3 className="font-serif text-3xl text-white">
                Reservation Successful
              </h3>
              <p className="text-sm font-light text-white/70 max-w-md mx-auto">
                Your order of <span className="text-[#C5A059] font-medium">{formatINR(grandTotal)}</span> has been confirmed. Our Concierge will contact you within 2 hours for white-glove insured delivery across India.
              </p>
            </div>
            <div className="inline-block glass-card px-6 py-3 rounded-full text-xs font-mono text-[#C5A059]">
              ORDER REF: VERON-IN-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-white/10 pb-4 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] tracking-widest uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>SECURE INDIAN LUXURY CHECKOUT</span>
              </div>
              <h2 className="font-serif text-2xl uppercase tracking-wide">
                Complete Your Atelier Reservation
              </h2>
            </div>

            {/* Order Summary Box */}
            <div className="bg-[#08080A] p-4 rounded-lg border border-white/10 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-white/70">
                <span>Subtotal ({cart.length} items):</span>
                <span className="text-white font-medium">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>GST (12% Indian Luxury Garment Standard):</span>
                <span className="text-white font-medium">{formatINR(gstAmount)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Insured Express Shipping (Pan India):</span>
                <span className="text-[#C5A059]">COMPLIMENTARY</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-sm font-bold text-[#C5A059]">
                <span>Total Amount Payable:</span>
                <span>{formatINR(grandTotal)}</span>
              </div>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-white/60 tracking-wider uppercase">
                SELECT PAYMENT METHOD
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    selectedMethod === 'upi'
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                      : 'border-white/10 bg-black/40 text-white/60 hover:border-white/30'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#C5A059] mb-2" />
                  <span className="text-xs font-mono font-bold">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    selectedMethod === 'card'
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                      : 'border-white/10 bg-black/40 text-white/60 hover:border-white/30'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#C5A059] mb-2" />
                  <span className="text-xs font-mono font-bold">Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('netbanking')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    selectedMethod === 'netbanking'
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                      : 'border-white/10 bg-black/40 text-white/60 hover:border-white/30'
                  }`}
                >
                  <Landmark className="w-5 h-5 text-[#C5A059] mb-2" />
                  <span className="text-xs font-mono font-bold">Net Banking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('deposit')}
                  className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    selectedMethod === 'deposit'
                      ? 'border-[#C5A059] bg-[#C5A059]/10 text-white'
                      : 'border-white/10 bg-black/40 text-white/60 hover:border-white/30'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-[#C5A059] mb-2" />
                  <span className="text-xs font-mono font-bold">25% Deposit</span>
                </button>
              </div>
            </div>

            {/* Dynamic Payment Form */}
            <form onSubmit={handlePay} className="space-y-4">
              {selectedMethod === 'upi' && (
                <div className="space-y-4 p-4 bg-black/40 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between text-xs font-mono text-white/70">
                    <span>Instant UPI Apps</span>
                    <span className="text-[#C5A059]">Zero Convenience Fee</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'gpay', label: 'Google Pay' },
                      { id: 'phonepe', label: 'PhonePe' },
                      { id: 'paytm', label: 'Paytm' },
                      { id: 'cred', label: 'CRED UPI' },
                    ].map((app) => (
                      <button
                        key={app.id}
                        type="button"
                        onClick={() => setUpiApp(app.id as any)}
                        className={`py-2 px-1 rounded border text-[11px] font-mono transition-all cursor-pointer ${
                          upiApp === app.id
                            ? 'border-[#C5A059] bg-[#C5A059]/20 text-[#C5A059] font-bold'
                            : 'border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {app.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                      Enter VPA / UPI ID (e.g., username@okaxis)
                    </label>
                    <input
                      type="text"
                      required
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile-number@upi"
                      className="w-full bg-[#08080A] border border-white/15 focus:border-[#C5A059] rounded px-3 py-2 text-sm text-white font-mono outline-none"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'card' && (
                <div className="space-y-3 p-4 bg-black/40 rounded-lg border border-white/10">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-white/60 uppercase">Card Number</label>
                    <input
                      type="text"
                      required
                      placeholder="4532 •••• •••• 8901"
                      className="w-full bg-[#08080A] border border-white/15 focus:border-[#C5A059] rounded px-3 py-2 text-sm text-white font-mono outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-white/60 uppercase">Expiry Date</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        className="w-full bg-[#08080A] border border-white/15 focus:border-[#C5A059] rounded px-3 py-2 text-sm text-white font-mono outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-white/60 uppercase">CVV / CVC</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="•••"
                        className="w-full bg-[#08080A] border border-white/15 focus:border-[#C5A059] rounded px-3 py-2 text-sm text-white font-mono outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'netbanking' && (
                <div className="space-y-3 p-4 bg-black/40 rounded-lg border border-white/10">
                  <label className="text-[10px] font-mono text-white/60 uppercase">Select Bank</label>
                  <select className="w-full bg-[#08080A] border border-white/15 focus:border-[#C5A059] rounded px-3 py-2 text-sm text-white font-mono outline-none">
                    <option>HDFC Bank (Preferred)</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>State Bank of India (SBI)</option>
                    <option>Kotak Mahindra Bank</option>
                    <option>IndusInd Bank</option>
                  </select>
                </div>
              )}

              {selectedMethod === 'deposit' && (
                <div className="p-4 bg-black/40 rounded-lg border border-[#C5A059]/40 space-y-2 text-xs font-mono text-white/80">
                  <div className="text-[#C5A059] font-bold uppercase">Bespoke 25% Advance Fitting Deposit</div>
                  <p className="text-[11px] leading-relaxed text-white/70">
                    Pay only <span className="text-white font-bold">{formatINR(Math.round(grandTotal * 0.25))}</span> today to lock in your custom order. Our master tailor will visit your residence with fabric swatches. Balance of <span className="text-[#C5A059]">{formatINR(Math.round(grandTotal * 0.75))}</span> due upon final trial fitting.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-white hover:bg-[#C5A059] text-black font-mono font-bold text-xs uppercase tracking-[0.2em] transition-colors rounded shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessing
                    ? 'AUTHORIZING TRANSACTION...'
                    : `PAY ${formatINR(
                        selectedMethod === 'deposit' ? Math.round(grandTotal * 0.25) : grandTotal
                      )} VIA ${selectedMethod.toUpperCase()}`}
                </span>
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
