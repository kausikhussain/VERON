import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Mail, Check, Scissors, MapPin, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128] pt-20 pb-12 relative select-none">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Top VIP Concierge Newsletter */}
        <div className="bg-[#121316] border border-[#1F2128] p-8 sm:p-12 rounded-lg flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059]">
              PRIVILEGED ATELIER INVITATIONS • INDIA & MAYFAIR
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F9FA] uppercase">
              Join the Aurelius Circle
            </h3>
            <p className="text-xs font-light text-[#EFECE6]/70 leading-relaxed">
              Receive private invitations to trunk shows in Mumbai, New Delhi, and Bengaluru, limited Vicuña drop releases, and private stylist consultations.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059] bg-[#08080A] px-4 py-3 rounded border border-[#C5A059]/40">
                <Check className="w-4 h-4" />
                <span>Admitted to the Aurelius Gazette (India Atelier).</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter private email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-4 py-3 text-xs text-[#F8F9FA] placeholder-[#EFECE6]/40 outline-none w-full lg:w-72 font-light"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-widest uppercase rounded cursor-pointer hover:bg-[#EFECE6] transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </>
            )}
          </form>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-8 border-t border-[#1F2128] text-xs font-light text-[#EFECE6]/80">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-[0.25em] text-[#F8F9FA] uppercase block">
              AURELIUS & CO.
            </span>
            <p className="text-xs text-[#EFECE6]/60 leading-relaxed max-w-sm font-light">
              Digital Flagship of Haute Couture and Bespoke Menswear. Crafted in Mayfair London, Paris Place Vendôme, and tailored for discerning clientele across India.
            </p>

            {/* Indian Market Payments & Delivery Badge */}
            <div className="p-3 bg-black/60 rounded border border-[#C5A059]/30 max-w-sm space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center gap-2 text-[#C5A059] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>INDIAN LUXURY CONCIERGE ACTIVE</span>
              </div>
              <p className="text-white/60">
                Prices in ₹ INR (incl. 12% GST). Instant UPI (Google Pay, PhonePe, Paytm, CRED), Net Banking, Cards & 25% Fitting Deposit.
              </p>
            </div>
          </div>

          {/* Col 2: Flagship Boutiques */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
              INDIAN & GLOBAL BOUTIQUES
            </p>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-[#F8F9FA] transition-colors">The Taj Mahal Palace, Mumbai</li>
              <li className="hover:text-[#F8F9FA] transition-colors">DLF Emporio, New Delhi</li>
              <li className="hover:text-[#F8F9FA] transition-colors">UB City, Bengaluru</li>
              <li className="hover:text-[#F8F9FA] transition-colors">42 Savile Row, London</li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
              ATELIER SERVICES
            </p>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-[#F8F9FA] transition-colors">Pan-India Home Fitting Trial</li>
              <li className="hover:text-[#F8F9FA] transition-colors">Private Stylist Consultation</li>
              <li className="hover:text-[#F8F9FA] transition-colors">Garment Preservation & Care</li>
              <li className="hover:text-[#F8F9FA] transition-colors">Insured White-Glove Transit</li>
            </ul>
          </div>

          {/* Col 4: Legal & Ethics */}
          <div className="space-y-3">
            <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
              LEGAL & ETHICS
            </p>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-[#F8F9FA] transition-colors">Privacy Policy</li>
              <li className="hover:text-[#F8F9FA] transition-colors">Terms of Service</li>
              <li className="hover:text-[#F8F9FA] transition-colors">Vicuña Conservation Protocol</li>
              <li className="hover:text-[#F8F9FA] transition-colors">Accessibility Standards</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1F2128] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#EFECE6]/50 gap-4">
          <p>© {new Date().getFullYear()} AURELIUS & CO. INDIA & MAYFAIR. ALL RIGHTS RESERVED.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
