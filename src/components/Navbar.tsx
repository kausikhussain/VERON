import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Sparkles, Compass, Scissors, Menu, X, Globe, Layers } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAIStylist: () => void;
  onOpenOutfitBuilder: () => void;
  onOpenBookingModal: () => void;
  currency: string;
  onCurrencyChange: (curr: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAIStylist,
  onOpenOutfitBuilder,
  onOpenBookingModal,
  currency,
  onCurrencyChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'JPY', symbol: '¥' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#08080A]/90 backdrop-blur-md border-b border-[#1F2128] py-4 shadow-2xl'
          : 'bg-gradient-to-b from-[#08080A]/80 via-[#08080A]/40 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Identity / Logo */}
        <a
          href="#"
          className="group flex flex-col items-start gap-0.5 select-none focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-[#F8F9FA] uppercase group-hover:text-[#C5A059] transition-colors duration-300">
            Aurelius & Co.
          </span>
          <span className="text-[9px] tracking-[0.35em] text-[#C5A059] uppercase font-mono">
            London • Mayfair
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-light tracking-[0.2em] uppercase text-[#EFECE6]/80">
          <button
            onClick={() => scrollToSection('collection')}
            className="hover:text-[#C5A059] transition-colors cursor-pointer py-1"
          >
            Collection
          </button>
          <button
            onClick={() => scrollToSection('3d-experience')}
            className="hover:text-[#C5A059] transition-colors cursor-pointer py-1 flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
            3D Atelier
          </button>
          <button
            onClick={() => scrollToSection('craftsmanship')}
            className="hover:text-[#C5A059] transition-colors cursor-pointer py-1"
          >
            Craftsmanship
          </button>
          <button
            onClick={() => scrollToSection('lookbook')}
            className="hover:text-[#C5A059] transition-colors cursor-pointer py-1"
          >
            Lookbook
          </button>
          
          <button
            onClick={onOpenOutfitBuilder}
            className="text-[#EFECE6] hover:text-[#C5A059] transition-colors cursor-pointer py-1 flex items-center gap-1.5 border-b border-transparent hover:border-[#C5A059]"
          >
            <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
            Outfit Builder
          </button>

          <button
            onClick={onOpenAIStylist}
            className="relative group px-3 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#08080A] transition-all duration-300 flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:text-[#08080A]" />
            <span>AI Stylist</span>
          </button>
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Currency Switcher Dropdown */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 text-xs font-mono text-[#EFECE6]/70 hover:text-[#C5A059] transition-colors px-2 py-1 border border-[#1F2128] rounded bg-[#08080A]/60 cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#C5A059]" />
              <span>{currency}</span>
            </button>

            <AnimatePresence>
              {currencyDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-24 bg-[#121316] border border-[#1F2128] rounded shadow-2xl py-1 z-50"
                >
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-mono transition-colors flex items-center justify-between ${
                        currency === c.code
                          ? 'text-[#C5A059] bg-[#1F2128]/50'
                          : 'text-[#EFECE6]/70 hover:text-[#F8F9FA] hover:bg-[#1F2128]/30'
                      }`}
                    >
                      <span>{c.code}</span>
                      <span>{c.symbol}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reserve Fitting CTA */}
          <button
            onClick={onOpenBookingModal}
            className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-light text-[#F8F9FA] bg-[#121316] hover:bg-[#1F2128] border border-[#C5A059]/40 hover:border-[#C5A059] px-4 py-2 rounded transition-all duration-300 cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Private Fitting</span>
          </button>

          {/* Wardrobe Bag Drawer Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-[#F8F9FA] hover:text-[#C5A059] transition-colors cursor-pointer group"
            aria-label="Wardrobe Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[#08080A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F8F9FA] hover:text-[#C5A059] transition-colors cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#08080A] border-b border-[#1F2128] px-6 py-8 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.2em] font-light text-[#EFECE6]">
              <button
                onClick={() => scrollToSection('collection')}
                className="text-left hover:text-[#C5A059]"
              >
                Collection
              </button>
              <button
                onClick={() => scrollToSection('3d-experience')}
                className="text-left hover:text-[#C5A059] flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#C5A059]" />
                3D Atelier
              </button>
              <button
                onClick={() => scrollToSection('craftsmanship')}
                className="text-left hover:text-[#C5A059]"
              >
                Craftsmanship
              </button>
              <button
                onClick={() => scrollToSection('lookbook')}
                className="text-left hover:text-[#C5A059]"
              >
                Lookbook
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOutfitBuilder();
                }}
                className="text-left text-[#C5A059] flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                Outfit Builder
              </button>
            </div>

            <div className="pt-4 border-t border-[#1F2128] flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAIStylist();
                }}
                className="w-full py-3 bg-[#C5A059] text-[#08080A] font-medium text-xs uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch AI Stylist</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-3 bg-[#121316] border border-[#C5A059]/40 text-[#F8F9FA] font-light text-xs uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2"
              >
                <Scissors className="w-4 h-4 text-[#C5A059]" />
                <span>Book Private Fitting</span>
              </button>

              {/* Currency Selector for Mobile */}
              <div className="flex items-center justify-between text-xs font-mono text-[#EFECE6]/70 pt-2">
                <span>Select Currency:</span>
                <div className="flex gap-2">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => onCurrencyChange(c.code)}
                      className={`px-2 py-1 border rounded ${
                        currency === c.code
                          ? 'border-[#C5A059] text-[#C5A059]'
                          : 'border-[#1F2128] text-[#EFECE6]/50'
                      }`}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
