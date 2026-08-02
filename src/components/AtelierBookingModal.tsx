import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scissors, X, Calendar, MapPin, Check, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AtelierBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AtelierBookingModal: React.FC<AtelierBookingModalProps> = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState('Mayfair, London (42 Savile Row)');
  const [date, setDate] = useState('2026-08-15');
  const [time, setTime] = useState('14:00');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tailor, setTailor] = useState('Lord David Sterling (Master Cutter)');
  const [beverage, setBeverage] = useState('Dom Pérignon Vintage Champagne');
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(generatedId);
    setConfirmed(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#C5A059', '#EFECE6'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08080A]/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#121316] border border-[#C5A059]/40 rounded-lg max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8 text-[#F8F9FA] space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#EFECE6]/60 hover:text-[#F8F9FA] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[#1F2128] pb-4">
          <div className="p-2 bg-[#C5A059]/10 border border-[#C5A059]/40 rounded">
            <Scissors className="w-5 h-5 text-[#C5A059]" />
          </div>
          <div>
            <h3 className="font-serif text-2xl uppercase text-[#F8F9FA]">
              RESERVE PRIVATE FITTING
            </h3>
            <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
              BESPOKE ATELIER TAILORING SESSION
            </p>
          </div>
        </div>

        {confirmed ? (
          <div className="py-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 border border-[#C5A059] flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-[#C5A059]" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest">
                BOOKING CONFIRMED • APPOINTMENT #{bookingId}
              </span>
              <h4 className="font-serif text-2xl text-[#F8F9FA]">
                We Look Forward to Receiving You
              </h4>
              <p className="text-xs font-light text-[#EFECE6]/80 max-w-md mx-auto leading-relaxed">
                A confirmation has been sent to <span className="text-[#C5A059]">{email || 'your email'}</span>. Your private suite and master tailor have been reserved.
              </p>
            </div>

            <div className="p-4 bg-[#08080A] border border-[#1F2128] rounded text-left text-xs font-mono space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#C5A059]">Boutique:</span>
                <span>{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C5A059]">Date & Time:</span>
                <span>{date} @ {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C5A059]">Master Cutter:</span>
                <span>{tailor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#C5A059]">Hospitality:</span>
                <span>{beverage}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-widest uppercase rounded cursor-pointer hover:bg-[#EFECE6] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleBook} className="space-y-4 text-xs font-light">
            {/* Flagship Location */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block">
                FLAGSHIP BOUTIQUE LOCATION
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none font-mono"
              >
                <option>Mayfair, London (42 Savile Row)</option>
                <option>Place Vendôme, Paris (12 Place Vendôme)</option>
                <option>5th Avenue, New York (740 5th Ave)</option>
                <option>Ginza, Tokyo (6-Chome Ginza)</option>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block">
                  FITTING DATE
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block">
                  PREFERRED TIME
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none font-mono"
                >
                  <option>10:00 AM</option>
                  <option>12:00 PM</option>
                  <option>14:00 PM</option>
                  <option>16:00 PM</option>
                  <option>18:00 PM (Private Evening Suite)</option>
                </select>
              </div>
            </div>

            {/* Master Tailor Selection */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block">
                PREFERRED MASTER CUTTER
              </label>
              <select
                value={tailor}
                onChange={(e) => setTailor(e.target.value)}
                className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none font-mono"
              >
                <option>Lord David Sterling (Master Cutter - Savile Row)</option>
                <option>Jean-Paul de Marceau (Haute Tailor - Paris)</option>
                <option>Kenji Sato (Precision Artisan - Tokyo)</option>
              </select>
            </div>

            {/* Beverage Service */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block">
                COMPLIMENTARY SUITE REFRESHMENT
              </label>
              <select
                value={beverage}
                onChange={(e) => setBeverage(e.target.value)}
                className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none font-mono"
              >
                <option>Dom Pérignon Vintage Champagne</option>
                <option>Royal Salute 21 Year Old Scotch</option>
                <option>Sparkling Botanical Elixir & White Tea</option>
              </select>
            </div>

            {/* User Info Inputs */}
            <div className="space-y-3 pt-2">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  required
                  placeholder="Private Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Direct Phone / WhatsApp"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs text-[#F8F9FA] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-[0.2em] uppercase rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#EFECE6] transition-colors mt-4"
            >
              <Scissors className="w-4 h-4" />
              <span>Confirm Atelier Reservation</span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};
