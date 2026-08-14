import React, { useState } from 'react';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EnvelopeProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  groomName,
  brideName,
  weddingDate,
  onOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    
    // Launch gold & ivory celebration sparkles
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#B8C0FF', '#E7D8FF', '#ffffff', '#9BA8FF']
    });

    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 transition-all duration-700">
      <div 
        className="relative w-full max-w-lg perspective-1000 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpenEnvelope}
      >
        {/* Floating Particles around Envelope */}
        <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 text-[#B8C0FF]/80 animate-pulse text-[10px] sm:text-sm tracking-widest uppercase font-serif whitespace-nowrap">
          <Sparkles size={12} className="sm:w-4 sm:h-4" /> Tap Seal To Open <Sparkles size={12} className="sm:w-4 sm:h-4" />
        </div>

        {/* Envelope Container */}
        <div className={`relative bg-[#161630] border border-[#B8C0FF]/30 rounded-2xl shadow-2xl p-8 transition-all duration-700 overflow-hidden transform ${
          isOpen ? 'scale-95 opacity-0 rotate-x-12' : isHovered ? 'scale-102 border-[#B8C0FF]/60 shadow-[0_0_50px_rgba(212,175,55,0.25)]' : 'scale-100'
        }`}>
          {/* Subtle Linen / Gold Foil Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a3e]/80 via-[#0f0f23] to-black pointer-events-none" />

          {/* Golden Corner Accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#B8C0FF]/60" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#B8C0FF]/60" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#B8C0FF]/60" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#B8C0FF]/60" />

          {/* Invitation Card Front Preview */}
          <div className="relative z-10 text-center py-6 px-4">
            <div className="inline-block mb-3 px-4 py-1 rounded-full border border-[#B8C0FF]/30 bg-[#B8C0FF]/10 text-[#B8C0FF] text-xs font-semibold tracking-widest uppercase">
              Exclusive Wedding Invitation
            </div>

            <h3 className="font-script text-4xl sm:text-5xl text-[#d4c5f7] mb-2 drop-shadow-md">
              {groomName} <span className="text-[#B8C0FF] font-serif text-3xl">&</span> {brideName}
            </h3>

            <p className="font-serif text-sm tracking-widest text-[#E7D8FF]/70 uppercase mb-8">
              {weddingDate}
            </p>

            {/* Interactive Gold Wax Seal */}
            <div className="relative inline-flex items-center justify-center group my-2">
              <div className="absolute -inset-3 rounded-full bg-[#B8C0FF]/20 blur-md group-hover:bg-[#B8C0FF]/40 transition-all duration-500" />
              
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#9BA8FF] via-[#B8C0FF] to-[#E7D8FF] border-2 border-[#E7D8FF] shadow-xl flex flex-col items-center justify-center text-[#0f0f23] transform group-hover:scale-110 transition-transform duration-300">
                <span className="font-serif font-bold text-[10px] sm:text-xs tracking-tighter">H & P</span>
                <Heart size={14} className="text-[#0f0f23] fill-[#0f0f23] my-0.5 animate-pulse sm:w-4 sm:h-4" />
                <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold">OPEN</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#d4c5f7]/60 font-serif italic">
              <MailOpen size={14} /> Click to unseal & reveal details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
