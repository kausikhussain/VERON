import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Radio, Sparkles, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AmbientSoundscape: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(0.2); // 20% default soft level
  const [showPanel, setShowPanel] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const startSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Lowpass Filter for warm, deep analog tone
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.Q.setValueAtTime(2, ctx.currentTime);
      filter.connect(masterGain);

      // Warm ambient frequencies (Low-frequency Mayfair lounge harmonics: C2, G2, E3, B3)
      const freqs = [65.41, 98.0, 164.81, 246.94];
      const newOscs: OscillatorNode[] = [];

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Soft sine & triangle blend
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Individual volume balance
        oscGain.gain.setValueAtTime(0.12 - i * 0.02, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        newOscs.push(osc);
      });

      // LFO for gentle breathing filter modulation (mimics ambient tape shimmer)
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // 0.15 Hz slow breath
      lfoGain.gain.setValueAtTime(80, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;

      oscillatorsRef.current = newOscs;
      setIsPlaying(true);
    } catch (err) {
      console.error('AudioContext start error:', err);
    }
  };

  const stopSoundscape = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      // Smooth fade out
      gainNodeRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.8);
      setTimeout(() => {
        oscillatorsRef.current.forEach((o) => {
          try { o.stop(); o.disconnect(); } catch {}
        });
        if (lfoRef.current) {
          try { lfoRef.current.stop(); lfoRef.current.disconnect(); } catch {}
        }
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
        oscillatorsRef.current = [];
        audioCtxRef.current = null;
        gainNodeRef.current = null;
        setIsPlaying(false);
      }, 850);
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSoundscape = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    return () => {
      stopSoundscape();
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 glass-card p-4 rounded-xl border border-[#C5A059]/40 bg-[#08080A]/95 shadow-2xl backdrop-blur-xl w-64 space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                  ATELIER ATMOSPHERE
                </span>
              </div>
              <span className="text-[9px] font-mono text-white/40">ANALOG SYNTH</span>
            </div>

            <p className="text-[11px] font-light text-white/70 leading-snug">
              Low-frequency warm atmospheric soundscape tailored for Mayfair flagship immersion.
            </p>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[10px] font-mono text-white/60">
                <span>INTENSITY</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.5"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-[#C5A059] cursor-pointer h-1 bg-white/10 rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleSoundscape}
          data-cursor-text={isPlaying ? 'MUTE' : 'SOUND'}
          className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-card border transition-all duration-300 shadow-xl cursor-pointer ${
            isPlaying
              ? 'border-[#C5A059] text-[#C5A059] bg-[#C5A059]/10 shadow-[#C5A059]/10'
              : 'border-white/10 hover:border-[#C5A059]/40 text-white/70 hover:text-white'
          }`}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-[#C5A059] animate-pulse" />
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 bg-[#C5A059] h-full animate-[bounce_1s_infinite_100ms]" />
                <span className="w-0.5 bg-[#C5A059] h-2 animate-[bounce_1s_infinite_300ms]" />
                <span className="w-0.5 bg-[#C5A059] h-full animate-[bounce_1s_infinite_200ms]" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase hidden sm:inline">
                SOUNDSCAPE ON
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-white/50" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 hidden sm:inline">
                AMBIENT SOUND
              </span>
            </>
          )}
        </button>

        <button
          onClick={() => setShowPanel(!showPanel)}
          className="p-2 rounded-full glass-card border border-white/10 hover:border-[#C5A059]/40 text-white/60 hover:text-[#C5A059] transition-colors cursor-pointer"
          title="Audio Controls"
        >
          <Radio className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
