import React from 'react';
import { Heart, Sparkles, Calendar, MapPin } from 'lucide-react';

export const LoveStory: React.FC = () => {
  const milestones = [
    {
      year: '2021',
      title: 'When Our Paths First Crossed',
      date: 'September 15, 2021',
      location: 'Colombo, Sri Lanka',
      description: 'A quiet afternoon coffee turned into hours of shared laughter, deep conversations, and the beginning of a lifetime bond.',
      imageUrl: '/media/photo-2.jpg',
    },
    {
      year: '2023',
      title: 'The Perfect Proposal',
      date: 'December 24, 2023',
      location: 'Kandy Sunset Point',
      description: 'Under a canopy of golden sunset lights and golden ocean breeze, Praveen got down on one knee and asked the question that changed our lives forever.',
      imageUrl: '/media/photo-3.jpg',
    },
    {
      year: '2025',
      title: 'Our Engagement Ceremony',
      date: 'August 18, 2025',
      location: 'Galle Face Hotel',
      description: 'Surrounded by our nearest family and dearest friends, we sealed our promise to walk life side by side forever.',
      imageUrl: '/media/photo-4.jpg',
    },
    {
      year: '2026',
      title: 'The Grand Wedding Day',
      date: 'October 24, 2026',
      location: 'The Grand Ballroom',
      description: 'The moment we say "I Do" and begin our official journey as husband and wife.',
      imageUrl: '/media/photo-5.jpg',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] text-xs font-semibold uppercase tracking-widest mb-3">
          <Sparkles size={14} /> Our Journey <Sparkles size={14} />
        </div>
        <h2 className="font-script text-5xl sm:text-6xl text-[#d4c5f7] mb-4">
          Our Love Story
        </h2>
        <p className="font-serif text-[#E7D8FF]/70 text-base sm:text-lg italic max-w-md mx-auto">
          "Every love story is beautiful, but ours is our absolute favorite."
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative border-l border-[#B8C0FF]/30 ml-4 sm:ml-32 space-y-12 sm:space-y-16">
        {milestones.map((item, index) => (
          <div key={index} className="relative group pl-8 sm:pl-12">
            {/* Timeline Heart Node */}
            <div className="absolute -left-4 top-0 w-8 h-8 rounded-full bg-[#0f0f23] border-2 border-[#B8C0FF] flex items-center justify-center text-[#B8C0FF] group-hover:bg-[#B8C0FF] group-hover:text-[#0f0f23] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Heart size={14} className="fill-current" />
            </div>

            {/* Year Badge (Desktop) */}
            <div className="hidden sm:block absolute -left-32 top-0 text-right pr-6 w-28">
              <span className="font-serif font-bold text-2xl text-[#B8C0FF]">
                {item.year}
              </span>
            </div>

            {/* Content Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-3 text-xs text-[#B8C0FF]/80 mb-2 font-serif">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {item.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} /> {item.location}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#d4c5f7] mb-3 font-semibold">
                  {item.title}
                </h3>

                <p className="text-sm text-[#a0a0c0] leading-relaxed font-sans font-light">
                  {item.description}
                </p>
              </div>

              {/* Photo Preview */}
              <div className="md:col-span-5 relative group/img overflow-hidden rounded-xl border border-[#B8C0FF]/30">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 object-cover transform group-hover/img:scale-110 transition-transform duration-700 filter brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
