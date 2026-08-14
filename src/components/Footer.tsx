import React from 'react';
import { Heart, QrCode } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { WeddingDetails } from '../types/wedding';

interface FooterProps {
  details: WeddingDetails;
  onOpenRsvp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ details, onOpenRsvp }) => {
  const { ref: footerRef, isVisible } = useScrollAnimation();

  return (
    <footer ref={footerRef} className="relative py-12 sm:py-16 px-3 sm:px-4 text-center z-10 border-t border-[#B8C0FF]/20 glass-panel mt-12 sm:mt-20">
      <div className={`max-w-4xl mx-auto space-y-5 sm:space-y-6 anim-base anim-fade-up ${isVisible ? 'anim-visible' : ''}`}>
        {/* Monogram Badge */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#9BA8FF] via-[#B8C0FF] to-[#E7D8FF] mx-auto flex items-center justify-center text-[#0f0f23] font-serif font-bold text-lg sm:text-xl shadow-[0_0_25px_rgba(184,192,255,0.4)]">
          H & P
        </div>

        <h3 className="font-script text-3xl sm:text-4xl md:text-5xl animated-title-text animate-text-glow">
          {details.brideName} <span className="font-serif text-xl sm:text-2xl text-[#B8C0FF]">&</span> {details.groomName}
        </h3>

        <p className="text-xs sm:text-sm font-serif italic text-[#E7D8FF]/70 tracking-wider max-w-md mx-auto">
          "Two souls with but a single thought, two hearts that beat as one."
        </p>

        {/* QR Code Section */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-[#B8C0FF] uppercase tracking-widest font-serif">
            <QrCode size={12} className="sm:w-[14px] sm:h-[14px]" /> Scan to Connect
          </div>
          <div className="w-28 h-28 sm:w-32 sm:h-32 p-1.5 bg-white rounded-xl shadow-lg border-2 border-[#B8C0FF]/40">
            <img
              src="/media/qr-code.jpg"
              alt="Wedding QR Code"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs uppercase tracking-widest text-[#B8C0FF]/80 font-serif pt-2 sm:pt-4">
          <a href="#schedule" className="hover:text-[#d4c5f7] transition-colors">Schedule</a>
          <span className="text-[#B8C0FF]/30">•</span>
          <a href="#gallery" className="hover:text-[#d4c5f7] transition-colors">Gallery</a>
          <span className="text-[#B8C0FF]/30">•</span>
          <button onClick={onOpenRsvp} className="hover:text-[#d4c5f7] transition-colors cursor-pointer">RSVP</button>
        </div>

        {/* Hashtag Pill */}
        <div className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full glass-panel-light border border-[#B8C0FF]/30 text-[#B8C0FF] font-mono text-[10px] sm:text-xs tracking-wider">
          {details.hashtag}
        </div>

        <div className="text-[10px] sm:text-[11px] text-[#7070a0] font-sans pt-4 sm:pt-6">
          Created with <Heart size={10} className="inline text-rose-400 fill-rose-400 mx-0.5 sm:w-3 sm:h-3" /> for Hirushi & Praveen's Wedding
        </div>
      </div>
    </footer>
  );
};
