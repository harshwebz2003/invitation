import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Heart, Sparkles, ChevronDown } from 'lucide-react';
import type { WeddingDetails } from '../types/wedding';

interface HeroProps {
  details: WeddingDetails;
  onOpenRsvp: () => void;
  portraitUrl?: string;
}

export const Hero: React.FC<HeroProps> = ({
  details,
  onOpenRsvp,
  portraitUrl = '/media/photo-1.jpg',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  useEffect(() => {
    const targetDate = new Date(details.weddingDate).getTime();

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, [details.weddingDate]);

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${details.groomName} & ${details.brideName}'s Wedding`);
    const detailsText = encodeURIComponent(`We invite you to celebrate our special wedding day!`);
    const location = encodeURIComponent(details.ceremonyVenue);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${detailsText}&location=${location}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 sm:pt-20 pb-12 sm:pb-16 px-3 sm:px-4 text-center z-10">
      {/* Subtle Glow background aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-[#B8C0FF]/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Glassmorphic Hero Container */}
      <div className={`relative w-full max-w-4xl glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 border border-[#B8C0FF]/25 shadow-2xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Top Tagline */}
        <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-5 sm:mb-8 anim-base anim-fade-down ${isLoaded ? 'anim-visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
          <Sparkles size={12} className="text-[#B8C0FF] sm:w-[14px] sm:h-[14px]" />
          The Wedding Celebration
          <Sparkles size={12} className="text-[#B8C0FF] sm:w-[14px] sm:h-[14px]" />
        </div>

        {/* Couple Portrait Avatar */}
        <div className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mx-auto mb-5 sm:mb-8 rounded-full p-1 sm:p-1.5 bg-gradient-to-tr from-[#9BA8FF] via-[#B8C0FF] to-[#E7D8FF] shadow-[0_0_40px_rgba(184,192,255,0.3)] group cursor-pointer overflow-hidden anim-base anim-scale ${isLoaded ? 'anim-visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
          <img
            src={portraitUrl}
            alt={`${details.groomName} & ${details.brideName}`}
            className="w-full h-full object-cover rounded-full filter brightness-105 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 rounded-full bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
        </div>

        {/* Couple Names — Animated */}
        <h1 className={`font-script text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#d4c5f7] mb-3 sm:mb-4 tracking-wide drop-shadow-lg anim-base anim-blur-in ${isLoaded ? 'anim-visible' : ''}`} style={{ transitionDelay: '0.7s' }}>
          {details.groomName} <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#B8C0FF] italic">&</span> {details.brideName}
        </h1>

        <p className={`font-serif text-sm sm:text-lg md:text-xl text-[#E7D8FF]/90 italic tracking-wider mb-2 sm:mb-3 max-w-xl mx-auto leading-relaxed anim-base anim-fade-up ${isLoaded ? 'anim-visible' : ''}`} style={{ transitionDelay: '0.9s' }}>
          "Loving daughter of Mr. & Mrs. Niroshan together with loving son of Mr. & Mrs. Perera warmly request the honour of your presence to celebrate the marriage of their children."
        </p>
        <p className={`font-sans text-[10px] sm:text-xs text-[#B8C0FF]/80 tracking-wider mb-6 sm:mb-8 anim-base anim-fade-up ${isLoaded ? 'anim-visible' : ''}`} style={{ transitionDelay: '1s' }}>
          RSVP: Praveen — 076 1158000 &nbsp;|&nbsp; Hirushi — 078 8547881
        </p>

        {/* Date & Location Pill */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-serif text-[#d4c5f7]/90 mb-8 sm:mb-10 anim-base anim-fade-up ${isLoaded ? 'anim-visible' : ''}`} style={{ transitionDelay: '1.1s' }}>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl glass-panel-light border border-[#B8C0FF]/20 w-full sm:w-auto justify-center">
            <Calendar size={14} className="text-[#B8C0FF] sm:w-4 sm:h-4" />
            <span>{details.displayDate}</span>
          </div>
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl glass-panel-light border border-[#B8C0FF]/20 w-full sm:w-auto justify-center">
            <MapPin size={14} className="text-[#B8C0FF] sm:w-4 sm:h-4" />
            <span>{details.ceremonyVenue}</span>
          </div>
        </div>

        {/* Live Countdown Timer Grid */}
        <div className={`mb-8 sm:mb-10 anim-base anim-fade-up ${isLoaded ? 'anim-visible' : ''}`} style={{ transitionDelay: '1.3s' }}>
          <h4 className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#B8C0FF]/80 uppercase mb-3 sm:mb-4 font-serif">
            Counting Down To Our Forever
          </h4>
          
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 max-w-lg mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Mins', value: timeLeft.minutes },
              { label: 'Secs', value: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-2 sm:p-4 rounded-xl sm:rounded-2xl glass-card border border-[#B8C0FF]/20"
              >
                <span className="font-serif font-bold text-xl sm:text-3xl md:text-4xl text-[#d4c5f7] tracking-tight tabular-nums">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[8px] sm:text-xs text-[#B8C0FF]/70 font-sans uppercase tracking-wider mt-0.5 sm:mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 anim-base anim-fade-up ${isLoaded ? 'anim-visible' : ''}`} style={{ transitionDelay: '1.5s' }}>
          <button
            onClick={onOpenRsvp}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full gold-gradient-bg text-[#0f0f23] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-[0_0_30px_rgba(184,192,255,0.6)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Heart size={16} className="fill-[#0f0f23] sm:w-[18px] sm:h-[18px]" />
            Confirm RSVP
          </button>

          <button
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-4 rounded-full glass-panel-light text-[#d4c5f7] hover:text-white border border-[#B8C0FF]/30 hover:border-[#B8C0FF]/60 font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
            Save The Date
          </button>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className={`mt-8 sm:mt-12 text-[#B8C0FF]/60 animate-bounce flex flex-col items-center gap-1 anim-base anim-fade-up ${isLoaded ? 'anim-visible' : ''}`} style={{ transitionDelay: '1.8s' }}>
        <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-serif">Scroll to Explore</span>
        <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px]" />
      </div>
    </section>
  );
};
