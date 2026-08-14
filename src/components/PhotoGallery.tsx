import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import type { GalleryItem } from '../types/wedding';

export const PhotoGallery: React.FC = () => {
  const galleryItems: GalleryItem[] = [
    { id: '1', url: '/media/photo-1.jpg', title: 'Praveen & Hirushi', caption: 'Pre-wedding moments filled with genuine smiles' },
    { id: '2', url: '/media/photo-2.jpg', title: 'Golden Hour Serenade', caption: 'Basking under gentle sunset light' },
    { id: '3', url: '/media/photo-3.jpg', title: 'A Promise of Forever', caption: 'Holding hands into eternity' },
    { id: '4', url: '/media/photo-4.jpg', title: 'Joyful Laughter', caption: 'Shared happiness and precious memories' },
    { id: '5', url: '/media/photo-5.jpg', title: 'Classic Elegance', caption: 'Wrapped in love and formal grace' },
    { id: '6', url: '/media/photo-6.jpg', title: 'Cherished Embrace', caption: 'Together side by side' },
    { id: '7', url: '/media/photo-7.jpg', title: 'Unconditional Love', caption: 'Eyes looking toward the future' },
    { id: '8', url: '/media/photo-8.jpg', title: 'Forever & Always', caption: 'Counting down to our special day' },
  ];

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveItemIndex(index);
  };

  const closeLightbox = () => {
    setActiveItemIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex + 1) % galleryItems.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((activeItemIndex - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-24 px-3 sm:px-6 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div ref={headerRef} className={`text-center mb-10 sm:mb-16 anim-base anim-fade-up ${headerVisible ? 'anim-visible' : ''}`}>
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-3">
          <Camera size={12} className="sm:w-[14px] sm:h-[14px]" /> Memories & Moments
        </div>
        <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#d4c5f7] mb-3 sm:mb-4">
          Photo Gallery
        </h2>
        <p className="font-serif text-[#E7D8FF]/70 text-sm sm:text-base md:text-lg italic max-w-md mx-auto">
          "Capturing the timeless glimpses of our romantic journey."
        </p>
      </div>

      {/* Masonry / Grid Gallery */}
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className={`group relative h-48 sm:h-64 md:h-72 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden glass-card cursor-pointer border border-[#B8C0FF]/20 hover:border-[#B8C0FF]/60 transition-all duration-500 anim-base anim-scale ${gridVisible ? 'anim-visible' : ''}`}
            style={{ transitionDelay: `${index * 0.08}s` }}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover filter brightness-95 group-hover:brightness-110 group-hover:scale-110 transition-all duration-700"
            />

            {/* Dark Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
              <span className="inline-flex items-center gap-1 text-[10px] text-[#B8C0FF] uppercase tracking-widest font-serif mb-1">
                <Maximize2 size={12} /> Click To View
              </span>
              <h4 className="font-serif text-lg text-[#E7D8FF] font-semibold leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-[#a0a0c0] line-clamp-1 font-sans mt-0.5">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItemIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 select-none"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#161630]/80 border border-[#B8C0FF]/40 text-[#d4c5f7] hover:text-white hover:border-[#B8C0FF] transition-all z-50"
          >
            <X size={24} />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-[#161630]/80 border border-[#B8C0FF]/40 text-[#d4c5f7] hover:text-white hover:border-[#B8C0FF] transition-all z-50"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-[#161630]/80 border border-[#B8C0FF]/40 text-[#d4c5f7] hover:text-white hover:border-[#B8C0FF] transition-all z-50"
          >
            <ChevronRight size={28} />
          </button>

          {/* Active Image Container */}
          <div 
            className="relative max-w-4xl max-h-[85vh] rounded-xl sm:rounded-2xl overflow-hidden border border-[#B8C0FF]/40 shadow-2xl glass-panel p-1 sm:p-2 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[activeItemIndex].url}
              alt={galleryItems[activeItemIndex].title}
              className="max-h-[70vh] w-auto object-contain rounded-xl"
            />
            
            <div className="text-center mt-4 pb-2 px-4">
              <h3 className="font-serif text-2xl text-[#d4c5f7] font-semibold">
                {galleryItems[activeItemIndex].title}
              </h3>
              <p className="text-xs text-[#a0a0c0] font-sans mt-1">
                {galleryItems[activeItemIndex].caption}
              </p>
              <div className="text-[10px] text-[#B8C0FF]/80 uppercase tracking-widest mt-2">
                {activeItemIndex + 1} of {galleryItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
