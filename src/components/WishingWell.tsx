import React, { useState } from 'react';
import { Gift, Copy, Check, CreditCard, QrCode, Maximize2, X, Download } from 'lucide-react';
import type { WeddingDetails } from '../types/wedding';

interface WishingWellProps {
  bankDetails: WeddingDetails['bankDetails'];
  qrCodeUrl?: string;
}

export const WishingWell: React.FC<WishingWellProps> = ({
  bankDetails,
  qrCodeUrl = '/media/qr-code.jpg',
}) => {
  const [copied, setCopied] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="wishing-well" className="relative py-20 px-4 sm:px-6 max-w-5xl mx-auto z-10">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center relative border border-[#B8C0FF]/30 overflow-hidden shadow-2xl">
        {/* Background glow accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#B8C0FF]/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Icon Header */}
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] mb-4">
          <Gift size={28} />
        </div>

        <h2 className="font-script text-5xl sm:text-6xl text-[#d4c5f7] mb-3">
          Wishing Well & Gift Registry
        </h2>

        <p className="font-serif text-[#E7D8FF]/80 text-base sm:text-lg italic max-w-xl mx-auto mb-10">
          "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, a contribution towards our dream honeymoon fund would be warmly appreciated."
        </p>

        {/* Grid layout: Bank Details + QR Code */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
          {/* Bank Transfer Card */}
          <div className="glass-card rounded-2xl p-6 border border-[#B8C0FF]/30 flex flex-col justify-between relative group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-[#B8C0FF] font-serif font-semibold">
                  <CreditCard size={18} />
                  <span>Bank Transfer</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] font-serif">
                  Direct Gift
                </span>
              </div>

              <div className="space-y-3 text-sm text-neutral-200 font-serif">
                <div>
                  <span className="text-xs text-[#B8C0FF]/70 block uppercase">Account Name:</span>
                  <span className="font-semibold text-[#E7D8FF]">{bankDetails.accountName}</span>
                </div>

                <div>
                  <span className="text-xs text-[#B8C0FF]/70 block uppercase">Bank & Branch:</span>
                  <span className="font-semibold text-[#E7D8FF]">{bankDetails.bankName} ({bankDetails.branch})</span>
                </div>

                <div className="pt-2 border-t border-[#B8C0FF]/20">
                  <span className="text-xs text-[#B8C0FF]/70 block uppercase">Account Number:</span>
                  <span className="font-mono text-base font-bold text-[#B8C0FF] tracking-wider">
                    {bankDetails.accountNumber}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyAccount}
              className="mt-6 w-full py-2.5 px-4 rounded-xl glass-panel-light text-[#B8C0FF] hover:text-white border border-[#B8C0FF]/30 hover:border-[#B8C0FF]/60 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-400" />
                  <span className="text-emerald-400">Account Number Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Account Number</span>
                </>
              )}
            </button>
          </div>

          {/* QR Code Card */}
          <div className="glass-card rounded-2xl p-6 border border-[#B8C0FF]/30 flex flex-col items-center justify-between text-center relative group">
            <div className="w-full">
              <div className="flex items-center justify-between mb-4 w-full text-left">
                <div className="flex items-center gap-2 text-[#B8C0FF] font-serif font-semibold">
                  <QrCode size={18} />
                  <span>Digital QR Payment</span>
                </div>
                <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#B8C0FF]/10 border border-[#B8C0FF]/30 text-[#B8C0FF] font-serif">
                  Scan & Pay
                </span>
              </div>

              {/* QR Image Frame */}
              <div
                onClick={() => setIsQrModalOpen(true)}
                className="relative w-44 h-44 mx-auto p-2 bg-white rounded-xl shadow-xl border-2 border-[#B8C0FF]/60 cursor-pointer group/qr overflow-hidden"
              >
                <img
                  src={qrCodeUrl}
                  alt="Wishing Well Payment QR Code"
                  className="w-full h-full object-contain transform group-hover/qr:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/qr:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-semibold gap-1">
                  <Maximize2 size={16} /> Expand QR
                </div>
              </div>

              <p className="text-xs text-[#a0a0c0] font-serif italic mt-3">
                Scan with any banking or wallet app to send your blessings.
              </p>
            </div>

            <button
              onClick={() => setIsQrModalOpen(true)}
              className="mt-4 w-full py-2.5 px-4 rounded-xl glass-panel-light text-[#B8C0FF] hover:text-white border border-[#B8C0FF]/30 hover:border-[#B8C0FF]/60 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
            >
              <Maximize2 size={14} /> View Fullscreen QR Code
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen QR Code Modal */}
      {isQrModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
          onClick={() => setIsQrModalOpen(false)}
        >
          <div
            className="relative max-w-sm w-full glass-panel rounded-3xl p-6 text-center border border-[#B8C0FF]/50 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full glass-panel-light text-[#d4c5f7]/70 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="inline-flex items-center gap-2 text-[#B8C0FF] font-serif font-semibold text-lg mb-4">
              <QrCode size={20} />
              <span>Honeymoon Fund QR Code</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border-2 border-[#B8C0FF] shadow-inner inline-block mb-4">
              <img
                src={qrCodeUrl}
                alt="Full QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>

            <p className="text-xs text-[#a0a0c0] font-serif italic mb-4">
              Praveen & Hirushi's Wedding Fund
            </p>

            <a
              href={qrCodeUrl}
              download="Praveen_Hirushi_Wedding_QR.jpg"
              className="w-full py-3 rounded-xl gold-gradient-bg text-[#0f0f23] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:scale-102 transition-all"
            >
              <Download size={16} /> Save QR Image
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
