import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // High quality royalty-free wedding instrumental audio stream
  const audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-violin-112678.mp3";

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio playback allowed after interaction:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={audioSrc} loop />

      <button
        onClick={toggleAudio}
        className="group relative flex items-center gap-3 px-4 py-3 rounded-full glass-panel border border-[#B8C0FF]/40 text-[#d4c5f7] shadow-2xl hover:border-[#B8C0FF] transition-all duration-300 transform hover:scale-105"
      >
        <div className="relative w-8 h-8 rounded-full bg-[#B8C0FF]/20 flex items-center justify-center text-[#B8C0FF]">
          {isPlaying ? (
            <Pause size={16} />
          ) : (
            <Play size={16} className="ml-0.5" />
          )}
        </div>

        {/* Animated Equalizer Visualizer Bars when playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-4 px-1">
            <span className="w-1 bg-amber-300 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
            <span className="w-1 bg-[#B8C0FF] rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-4" />
            <span className="w-1 bg-amber-200 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-2" />
            <span className="w-1 bg-amber-300 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s] h-4" />
          </div>
        )}

        <span className="text-xs font-serif tracking-wider text-[#E7D8FF] hidden sm:inline">
          {isPlaying ? 'Wedding Melody' : 'Play Music'}
        </span>
      </button>
    </div>
  );
};
