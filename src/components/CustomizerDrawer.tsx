import React, { useState } from 'react';
import { Settings, X, Sliders, Palette, Calendar, MapPin, Video } from 'lucide-react';
import type { WeddingDetails, ThemePalette } from '../types/wedding';

interface CustomizerDrawerProps {
  details: WeddingDetails;
  onUpdateDetails: (updated: WeddingDetails) => void;
  selectedTheme: ThemePalette;
  onSelectTheme: (theme: ThemePalette) => void;
  blurAmount: string;
  onChangeBlur: (blur: string) => void;
}

export const CustomizerDrawer: React.FC<CustomizerDrawerProps> = ({
  details,
  onUpdateDetails,
  selectedTheme,
  onSelectTheme,
  blurAmount,
  onChangeBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions: { id: ThemePalette; name: string; color: string }[] = [
    { id: 'champagne', name: 'Champagne Gold', color: 'bg-[#B8C0FF]' },
    { id: 'rose', name: 'Rose Gold Blush', color: 'bg-rose-400' },
    { id: 'sapphire', name: 'Midnight Sapphire', color: 'bg-sky-400' },
    { id: 'emerald', name: 'Emerald Forest', color: 'bg-emerald-400' },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-24 left-6 z-40 p-3 rounded-full glass-panel border border-[#B8C0FF]/40 text-[#B8C0FF] shadow-2xl hover:border-[#B8C0FF] hover:scale-110 transition-all duration-300 group"
        title="Customize Wedding Details & Theme"
      >
        <Sliders size={20} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-start"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md h-full glass-panel border-r border-[#B8C0FF]/30 p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#B8C0FF]/20 mb-6">
              <div className="flex items-center gap-2 text-[#B8C0FF] font-serif font-semibold text-lg">
                <Settings size={20} />
                <span>Live Customizer Panel</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full glass-panel-light text-[#d4c5f7]/70 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Editable Couple Names */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-semibold text-[#B8C0FF] uppercase tracking-widest font-serif flex items-center gap-1.5">
                <Sliders size={14} /> Edit Couple Names
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#8888aa] uppercase block mb-1">Groom Name</label>
                  <input
                    type="text"
                    value={details.groomName}
                    onChange={(e) => onUpdateDetails({ ...details, groomName: e.target.value })}
                    className="w-full bg-[#0f0f23]/80 border border-[#B8C0FF]/30 rounded-lg py-2 px-3 text-xs text-[#E7D8FF] focus:outline-none focus:border-[#B8C0FF]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#8888aa] uppercase block mb-1">Bride Name</label>
                  <input
                    type="text"
                    value={details.brideName}
                    onChange={(e) => onUpdateDetails({ ...details, brideName: e.target.value })}
                    className="w-full bg-[#0f0f23]/80 border border-[#B8C0FF]/30 rounded-lg py-2 px-3 text-xs text-[#E7D8FF] focus:outline-none focus:border-[#B8C0FF]"
                  />
                </div>
              </div>
            </div>

            {/* Editable Wedding Date */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-semibold text-[#B8C0FF] uppercase tracking-widest font-serif flex items-center gap-1.5">
                <Calendar size={14} /> Wedding Date
              </h4>
              <input
                type="date"
                value={details.weddingDate}
                onChange={(e) => onUpdateDetails({ ...details, weddingDate: e.target.value })}
                className="w-full bg-[#0f0f23]/80 border border-[#B8C0FF]/30 rounded-lg py-2 px-3 text-xs text-[#E7D8FF] focus:outline-none focus:border-[#B8C0FF]"
              />
            </div>

            {/* Editable Venue */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs font-semibold text-[#B8C0FF] uppercase tracking-widest font-serif flex items-center gap-1.5">
                <MapPin size={14} /> Primary Venue
              </h4>
              <input
                type="text"
                value={details.ceremonyVenue}
                onChange={(e) => onUpdateDetails({ ...details, ceremonyVenue: e.target.value })}
                className="w-full bg-[#0f0f23]/80 border border-[#B8C0FF]/30 rounded-lg py-2 px-3 text-xs text-[#E7D8FF] focus:outline-none focus:border-[#B8C0FF]"
              />
            </div>

            {/* Video Blur Controls */}
            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-semibold text-[#B8C0FF] uppercase tracking-widest font-serif flex items-center gap-1.5">
                <Video size={14} /> Background Video Blur
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Clear', value: 'backdrop-blur-none' },
                  { label: 'Subtle', value: 'backdrop-blur-sm' },
                  { label: 'Heavy', value: 'backdrop-blur-md' },
                ].map((b) => (
                  <button
                    key={b.value}
                    onClick={() => onChangeBlur(b.value)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                      blurAmount === b.value
                        ? 'gold-gradient-bg text-[#0f0f23] border-amber-300 font-bold'
                        : 'glass-panel-light text-[#a0a0c0] border-[#B8C0FF]/20'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Palette Controls */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-[#B8C0FF] uppercase tracking-widest font-serif flex items-center gap-1.5">
                <Palette size={14} /> Color Palette Accent
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {themeOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onSelectTheme(t.id)}
                    className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-medium transition-all ${
                      selectedTheme === t.id
                        ? 'border-[#B8C0FF] bg-[#B8C0FF]/20 text-[#d4c5f7]'
                        : 'border-[#B8C0FF]/20 glass-panel-light text-[#8888aa]'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${t.color}`} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
