import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const ContactRsvp: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const contacts = [
    { name: 'Praveen', number: '076 1158000', tel: '+94761158000' },
    { name: 'Hirushi', number: '078 8547881', tel: '+94788547881' },
  ];

  return (
    <section ref={ref} className="relative py-12 sm:py-20 px-3 sm:px-6 max-w-3xl mx-auto z-10">
      <div className={`glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-10 border border-[#B8C0FF]/25 text-center anim-base anim-fade-up ${isVisible ? 'anim-visible' : ''}`}>
        {/* Section Header */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-6">
          <Phone size={12} className="sm:w-[14px] sm:h-[14px]" /> RSVP
        </div>

        <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#d4c5f7] mb-2 sm:mb-3">
          Contact Us
        </h2>
        <p className="font-serif text-xs sm:text-sm text-[#E7D8FF]/70 italic tracking-wider mb-6 sm:mb-8 max-w-md mx-auto">
          Please confirm your attendance by reaching out to us directly
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 mb-6 sm:mb-8">
          {contacts.map((contact, idx) => (
            <div
              key={idx}
              className={`glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#B8C0FF]/20 hover:border-[#B8C0FF]/50 transition-all duration-300 anim-base ${idx === 0 ? 'anim-fade-left' : 'anim-fade-right'} ${isVisible ? 'anim-visible' : ''}`}
              style={{ transitionDelay: `${0.3 + idx * 0.2}s` }}
            >
              {/* Name */}
              <h3 className="font-serif text-lg sm:text-xl text-[#d4c5f7] font-semibold mb-1">
                {contact.name}
              </h3>
              {/* Number */}
              <p className="font-mono text-base sm:text-lg text-[#B8C0FF] tracking-wider mb-3 sm:mb-4">
                {contact.number}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <a
                  href={`tel:${contact.tel}`}
                  className="flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-[#B8C0FF]/15 hover:bg-[#B8C0FF]/25 border border-[#B8C0FF]/30 text-[#B8C0FF] text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300"
                >
                  <Phone size={12} className="sm:w-[14px] sm:h-[14px]" />
                  Call
                </a>
                <a
                  href={`https://wa.me/${contact.tel.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300"
                >
                  <MessageCircle size={12} className="sm:w-[14px] sm:h-[14px]" />
                  WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Note */}
        <p className="text-[9px] sm:text-[10px] text-[#7070a0] font-sans tracking-wider uppercase">
          We look forward to celebrating with you ✨
        </p>
      </div>
    </section>
  );
};
