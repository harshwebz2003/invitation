import React, { useState } from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Sparkles, Shirt, Music, Camera, X } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { WeddingDetails } from '../types/wedding';

interface EventScheduleProps {
  details: WeddingDetails;
}

export const EventSchedule: React.FC<EventScheduleProps> = ({ details }) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();
  const { ref: venueRef, isVisible: venueVisible } = useScrollAnimation();
  const { ref: dressRef, isVisible: dressVisible } = useScrollAnimation();

  const [activeVenueImg, setActiveVenueImg] = useState<string | null>(null);

  const venueImages = [
    { url: '/media/venue-1.jpg', title: 'Grand Banquet Setup', caption: 'Elegant table arrangements at Yunora Reception Hall' },
    { url: '/media/venue-2.jpg', title: 'Sacred Settee Stage', caption: 'Floral decorated stage for Sri Lankan Poruwa rituals' },
    { url: '/media/venue-3.jpg', title: 'Yunora Reception Entrance', caption: 'Warm welcome area and spacious hall layout' },
    { url: '/media/venue-4.jpg', title: 'Dining & Celebration Area', caption: 'Golden table decor and comfortable guest seating' },
  ];

  const events = [
    {
      title: 'Poruwa Ceremony',
      time: '11:02 AM (Auspicious Time)',
      venue: details.ceremonyVenue,
      address: details.ceremonyAddress,
      mapUrl: details.ceremonyMapUrl,
      icon: <Sparkles className="text-[#B8C0FF]" size={20} />,
      badge: 'Sacred Rituals',
      description: 'The traditional Sri Lankan Poruwa ceremony — a beautiful sacred union with rituals of blessings, tying of fingers, breaking the coconut, and lighting the oil lamp.',
    },
    {
      title: 'Wedding Reception & Celebration',
      time: details.receptionTime,
      venue: details.receptionVenue,
      address: details.receptionAddress,
      mapUrl: details.receptionMapUrl,
      icon: <Music className="text-[#B8C0FF]" size={20} />,
      badge: 'Feast & Celebration',
      description: 'Join us for a grand celebration with a traditional Sri Lankan feast, cake cutting, joyous dances, and unforgettable memories.',
    },
  ];

  return (
    <section id="schedule" className="relative py-16 sm:py-24 px-3 sm:px-6 max-w-6xl mx-auto z-10">
      {/* Section Header */}
      <div ref={headerRef} className={`text-center mb-10 sm:mb-16 anim-base anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-3">
          <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" /> Schedule & Location
        </div>
        <h2 className="font-script text-4xl sm:text-5xl md:text-6xl animated-title-text animate-text-glow mb-3 sm:mb-4">
          Events & Celebrations
        </h2>
        <p className="font-serif text-[#E7D8FF]/70 text-sm sm:text-base md:text-lg italic max-w-lg mx-auto">
          "Join us as we write the first chapter of our happily ever after."
        </p>
      </div>

      {/* Events Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-16">
        {events.map((event, idx) => (
          <div
            key={idx}
            className={`glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative flex flex-col justify-between border border-[#B8C0FF]/20 group hover:border-[#B8C0FF]/50 anim-base ${idx === 0 ? 'anim-fade-left' : 'anim-fade-right'} ${gridVisible ? 'anim-visible' : ''}`}
            style={{ transitionDelay: `${idx * 0.2}s` }}
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl glass-panel-light border border-[#B8C0FF]/30">
                  {event.icon}
                </div>
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] text-[10px] sm:text-xs font-serif tracking-wider uppercase">
                  {event.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#d4c5f7] mb-2 sm:mb-3 font-semibold">
                {event.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#a0a0c0] mb-4 sm:mb-6 font-sans font-light leading-relaxed">
                {event.description}
              </p>

              {/* Event Metadata */}
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-xs sm:text-sm font-serif text-[#E7D8FF]/90">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock size={14} className="text-[#B8C0FF] shrink-0 sm:w-4 sm:h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin size={14} className="text-[#B8C0FF] shrink-0 mt-0.5 sm:w-4 sm:h-4" />
                  <div>
                    <div className="font-semibold text-[#d4c5f7]">{event.venue}</div>
                    <div className="text-[10px] sm:text-xs text-[#8888aa]">{event.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Button */}
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl glass-panel-light hover:bg-[#B8C0FF]/20 border border-[#B8C0FF]/30 text-[#B8C0FF] font-semibold text-[10px] sm:text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300"
            >
              <span>Get Directions to Yunora Reception Hall</span>
              <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
            </a>
          </div>
        ))}
      </div>

      {/* Yunora Reception Hall Showcase */}
      <div ref={venueRef} className={`glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-12 sm:mb-16 border border-[#B8C0FF]/25 anim-base anim-fade-up ${venueVisible ? 'anim-visible' : ''}`}>
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-2">
            <Camera size={12} className="sm:w-[14px] sm:h-[14px]" /> Venue Preview
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#d4c5f7] font-semibold mb-1">
            Yunora Reception Hall, Imaduwa
          </h3>
          <p className="text-xs sm:text-sm text-[#a0a0c0] font-sans">
            Take a look at where our special day will unfold
          </p>
        </div>

        {/* 4 Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6">
          {venueImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveVenueImg(img.url)}
              className="group relative h-40 sm:h-52 rounded-xl overflow-hidden glass-card cursor-pointer border border-[#B8C0FF]/20 hover:border-[#B8C0FF]/60 transition-all duration-500"
            >
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover filter brightness-95 group-hover:brightness-110 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                <h5 className="font-serif text-xs sm:text-sm text-[#E7D8FF] font-semibold leading-tight">
                  {img.title}
                </h5>
              </div>
            </div>
          ))}
        </div>

        {/* Action button to open directions */}
        <div className="text-center">
          <a
            href={details.ceremonyMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gold-gradient-bg text-[#0f0f23] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg hover:shadow-[0_0_25px_rgba(184,192,255,0.5)] transform hover:-translate-y-0.5 transition-all duration-300"
          >
            <MapPin size={16} />
            <span>Open Directions on Google Maps</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Lightbox Modal for Venue Image Preview */}
      {activeVenueImg && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 select-none"
          onClick={() => setActiveVenueImg(null)}
        >
          <button
            onClick={() => setActiveVenueImg(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#161630]/80 border border-[#B8C0FF]/40 text-[#d4c5f7] hover:text-white transition-all z-50"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-[#B8C0FF]/40 shadow-2xl glass-panel p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeVenueImg}
              alt="Yunora Reception Hall"
              className="max-h-[75vh] w-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Dress Code Card */}
      <div ref={dressRef} className={`glass-panel rounded-xl sm:rounded-2xl p-5 sm:p-8 max-w-3xl mx-auto text-center border border-[#B8C0FF]/25 anim-base anim-fade-up ${dressVisible ? 'anim-visible' : ''}`}>
        <div className="inline-flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] mb-3 sm:mb-4">
          <Shirt size={18} className="sm:w-5 sm:h-5" />
        </div>
        <h4 className="font-serif text-base sm:text-xl text-[#d4c5f7] mb-2 font-semibold uppercase tracking-wider">
          Dress Code: {details.dressCode}
        </h4>
        <p className="text-[10px] sm:text-sm text-[#a0a0c0] font-sans max-w-lg mx-auto leading-relaxed">
          We invite our guests to dress in elegant formal attire. Soft pastel or periwinkle accents are warmly encouraged!
        </p>
      </div>
    </section>
  );
};
