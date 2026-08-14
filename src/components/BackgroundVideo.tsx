import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface BackgroundVideoProps {
  videoSrc?: string;
  overlayOpacity?: number; // 0 to 1
  blurAmount?: string; // e.g. 'blur-md', 'blur-sm', 'blur-none'
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  videoSrc = '/media/bg-video.mp4',
  overlayOpacity = 0.45,
  blurAmount = 'backdrop-blur-none',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log('Autoplay prevented or video error:', err);
        setIsPlaying(false);
      });
    }
  }, [videoSrc]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none transform-gpu">
      {!videoError ? (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover scale-105 filter brightness-90 transition-opacity duration-500 will-change-transform transform-gpu"
        />
      ) : (
        /* Fallback ambient gradient if video error */
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-black" />
      )}

      {/* Dark Overlay with GPU acceleration */}
      <div 
        className={`absolute inset-0 transition-all duration-300 transform-gpu ${blurAmount}`}
        style={{
          backgroundColor: `rgba(15, 15, 35, ${overlayOpacity})`,
        }}
      />

      {/* Floating Control Hub (Interactive element overlay) */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-auto flex items-center gap-2">
        <button
          onClick={toggleMute}
          title={isMuted ? "Unmute Background Audio" : "Mute Background Audio"}
          className="p-2.5 rounded-full glass-panel-light text-[#E7D8FF]/80 hover:text-[#B8C0FF] hover:border-[#B8C0FF]/50 transition-all duration-300 transform hover:scale-105"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-[#B8C0FF] animate-pulse" />}
        </button>

        <button
          onClick={togglePlay}
          title={isPlaying ? "Pause Video" : "Play Video"}
          className="p-2.5 rounded-full glass-panel-light text-[#E7D8FF]/80 hover:text-[#B8C0FF] hover:border-[#B8C0FF]/50 transition-all duration-300 transform hover:scale-105"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    </div>
  );
};
