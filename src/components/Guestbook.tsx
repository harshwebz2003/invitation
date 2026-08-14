import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Send } from 'lucide-react';
import type { GuestbookWish } from '../types/wedding';

export const Guestbook: React.FC = () => {
  const initialWishes: GuestbookWish[] = [
    {
      id: '1',
      name: 'Samantha & David',
      message: 'Wishing Praveen & Hirushi a lifetime of unconditional love, joy, and endless laughter together!',
      createdAt: 'August 10, 2026',
      likes: 12,
    },
    {
      id: '2',
      name: 'Uncle Kasun',
      message: 'May your union be blessed with happiness, prosperity, and harmony. So proud of you both!',
      createdAt: 'August 12, 2026',
      likes: 8,
    },
    {
      id: '3',
      name: 'Dilini Perera',
      message: 'You two are truly made for each other. Can’t wait to celebrate on the dance floor!',
      createdAt: 'August 14, 2026',
      likes: 15,
    },
  ];

  const [wishes, setWishes] = useState<GuestbookWish[]>(() => {
    const saved = localStorage.getItem('wedding_wishes');
    return saved ? JSON.parse(saved) : initialWishes;
  });

  const [nameInput, setNameInput] = useState('');
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    localStorage.setItem('wedding_wishes', JSON.stringify(wishes));
  }, [wishes]);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !messageInput.trim()) return;

    const newWish: GuestbookWish = {
      id: Date.now().toString(),
      name: nameInput,
      message: messageInput,
      createdAt: new Date().toLocaleDateString(),
      likes: 1,
    };

    setWishes([newWish, ...wishes]);
    setNameInput('');
    setMessageInput('');
  };

  const handleLike = (id: string) => {
    setWishes(
      wishes.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  return (
    <section id="guestbook" className="relative py-24 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] text-xs font-semibold uppercase tracking-widest mb-3">
          <MessageCircle size={14} /> Blessings & Love
        </div>
        <h2 className="font-script text-5xl sm:text-6xl text-[#d4c5f7] mb-4">
          Guestbook & Wishes
        </h2>
        <p className="font-serif text-[#E7D8FF]/70 text-base sm:text-lg italic max-w-md mx-auto">
          "Leave your heartfelt blessings for Praveen & Hirushi."
        </p>
      </div>

      {/* Write a Wish Form */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto border border-[#B8C0FF]/30 mb-12 shadow-xl">
        <h3 className="font-serif text-2xl text-[#d4c5f7] mb-4 font-semibold text-center">
          Write A Love Note
        </h3>

        <form onSubmit={handleAddWish} className="space-y-4">
          <div>
            <input
              type="text"
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your Name"
              className="w-full bg-[#0f0f23]/70 border border-[#B8C0FF]/30 rounded-xl py-3 px-4 text-sm text-[#E7D8FF] placeholder-neutral-500 focus:outline-none focus:border-[#B8C0FF] font-sans"
            />
          </div>

          <div>
            <textarea
              rows={3}
              required
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Write your wishes for the couple..."
              className="w-full bg-[#0f0f23]/70 border border-[#B8C0FF]/30 rounded-xl py-3 px-4 text-sm text-[#E7D8FF] placeholder-neutral-500 focus:outline-none focus:border-[#B8C0FF] font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl gold-gradient-bg text-[#0f0f23] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Send size={14} /> Send Blessing
          </button>
        </form>
      </div>

      {/* Wishes Feed Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-[#B8C0FF]/20 hover:border-[#B8C0FF]/50"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#B8C0FF]/20 border border-[#B8C0FF]/40 flex items-center justify-center text-[#B8C0FF] font-serif font-bold text-xs">
                  {wish.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#d4c5f7]">
                    {wish.name}
                  </h4>
                  <span className="text-[10px] text-[#8888aa] block">
                    {wish.createdAt}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#a0a0c0] font-sans leading-relaxed italic mb-4">
                "{wish.message}"
              </p>
            </div>

            <button
              onClick={() => handleLike(wish.id)}
              className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B8C0FF]/10 hover:bg-[#B8C0FF]/20 border border-[#B8C0FF]/30 text-[#B8C0FF] text-xs transition-colors"
            >
              <Heart size={12} className="fill-amber-400 text-[#B8C0FF]" />
              <span>{wish.likes}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
