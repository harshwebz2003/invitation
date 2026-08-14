import React, { useState } from 'react';
import { X, Heart, Sparkles, CheckCircle2, User, Users, Music, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { RsvpSubmission } from '../types/wedding';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (submission: RsvpSubmission) => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [guestName, setGuestName] = useState('');
  const [email] = useState('');
  const [attending, setAttending] = useState<boolean>(true);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [dietaryRestrictions] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const newSubmission: RsvpSubmission = {
      id: Date.now().toString(),
      guestName,
      email,
      attending,
      guestCount: attending ? guestCount : 0,
      dietaryRestrictions,
      songRequest,
      wishMessage,
      createdAt: new Date().toLocaleDateString(),
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    localStorage.setItem('wedding_rsvps', JSON.stringify([...existing, newSubmission]));

    setIsSubmitted(true);
    onSubmitSuccess(newSubmission);

    // Launch celebratory confetti fireworks
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#d4af37', '#fcf6ba', '#ffffff', '#e6c667', '#f43f5e']
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-[#B8C0FF]/30 shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel-light text-[#d4c5f7]/70 hover:text-white hover:border-[#B8C0FF]/50 transition-all"
        >
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] text-xs font-semibold uppercase tracking-widest mb-2">
                <Sparkles size={13} /> Respond By September 15th <Sparkles size={13} />
              </div>
              <h3 className="font-script text-4xl sm:text-5xl text-[#d4c5f7]">
                Confirm Your RSVP
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a0c0] font-serif italic mt-1">
                Please let Hirushi & Praveen know if you will be joining their celebration. RSVP: Praveen - 076 1158000 | Hirushi - 078 8547881
              </p>
            </div>

            {/* RSVP Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-semibold text-[#d4c5f7] uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8C0FF]/60" />
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Honorable Guest"
                    className="w-full bg-[#0f0f23]/70 border border-[#B8C0FF]/30 rounded-xl py-3 pl-10 pr-4 text-sm text-[#E7D8FF] placeholder-neutral-500 focus:outline-none focus:border-[#B8C0FF]"
                  />
                </div>
              </div>

              {/* Attendance Choice Buttons */}
              <div>
                <label className="block text-xs font-semibold text-[#d4c5f7] uppercase tracking-wider mb-1.5">
                  Will You Attend? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border ${
                      attending
                        ? 'gold-gradient-bg text-[#0f0f23] border-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'glass-panel-light text-[#a0a0c0] border-[#B8C0FF]/20 hover:border-[#B8C0FF]/40'
                    }`}
                  >
                    <Heart size={14} className={attending ? 'fill-neutral-950' : ''} />
                    Joyfully Accepts
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border ${
                      !attending
                        ? 'bg-rose-900/60 text-rose-200 border-rose-500/50 shadow-md'
                        : 'glass-panel-light text-[#a0a0c0] border-[#B8C0FF]/20 hover:border-[#B8C0FF]/40'
                    }`}
                  >
                    Regretfully Declines
                  </button>
                </div>
              </div>

              {attending && (
                <>
                  {/* Guest Count */}
                  <div>
                    <label className="block text-xs font-semibold text-[#d4c5f7] uppercase tracking-wider mb-1.5">
                      Number of Guests (Including You)
                    </label>
                    <div className="relative">
                      <Users size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8C0FF]/60" />
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-[#0f0f23]/70 border border-[#B8C0FF]/30 rounded-xl py-3 pl-10 pr-4 text-sm text-[#E7D8FF] focus:outline-none focus:border-[#B8C0FF]"
                      >
                        <option value={1}>1 Guest (Just Me)</option>
                        <option value={2}>2 Guests (+1 Partner)</option>
                        <option value={3}>3 Guests (Family)</option>
                        <option value={4}>4 Guests (Family Group)</option>
                      </select>
                    </div>
                  </div>

                  {/* Song Request */}
                  <div>
                    <label className="block text-xs font-semibold text-[#d4c5f7] uppercase tracking-wider mb-1.5">
                      Song Request For The Dancefloor
                    </label>
                    <div className="relative">
                      <Music size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B8C0FF]/60" />
                      <input
                        type="text"
                        value={songRequest}
                        onChange={(e) => setSongRequest(e.target.value)}
                        placeholder="Song title & artist"
                        className="w-full bg-[#0f0f23]/70 border border-[#B8C0FF]/30 rounded-xl py-3 pl-10 pr-4 text-sm text-[#E7D8FF] placeholder-neutral-500 focus:outline-none focus:border-[#B8C0FF]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Wish Message */}
              <div>
                <label className="block text-xs font-semibold text-[#d4c5f7] uppercase tracking-wider mb-1.5">
                  Blessings & Wishes For Praveen & Hirushi
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-[#B8C0FF]/60" />
                  <textarea
                    rows={3}
                    value={wishMessage}
                    onChange={(e) => setWishMessage(e.target.value)}
                    placeholder="Write a sweet message..."
                    className="w-full bg-[#0f0f23]/70 border border-[#B8C0FF]/30 rounded-xl py-2.5 pl-10 pr-4 text-sm text-[#E7D8FF] placeholder-neutral-500 focus:outline-none focus:border-[#B8C0FF]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl gold-gradient-bg text-[#0f0f23] font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-300 mt-2"
              >
                Submit RSVP Confirmation
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div className="text-center py-8">
            <CheckCircle2 size={56} className="text-[#B8C0FF] mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-3xl text-[#d4c5f7] mb-2 font-semibold">
              Thank You, {guestName}!
            </h3>
            <p className="text-sm text-[#a0a0c0] font-sans max-w-xs mx-auto mb-6">
              {attending
                ? "Your RSVP has been confirmed! We cannot wait to celebrate our big day with you."
                : "We are sad you cannot join us, but we truly appreciate your heartfelt wishes!"}
            </p>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full gold-gradient-bg text-[#0f0f23] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              Back To Invitation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
