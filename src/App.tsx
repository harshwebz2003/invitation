import { useState } from 'react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Envelope } from './components/Envelope';
import { Hero } from './components/Hero';
import { AudioPlayer } from './components/AudioPlayer';
import { EventSchedule } from './components/EventSchedule';
import { PhotoGallery } from './components/PhotoGallery';
import { ContactRsvp } from './components/ContactRsvp';
import { RsvpModal } from './components/RsvpModal';
import { Footer } from './components/Footer';
import type { WeddingDetails, ThemePalette, RsvpSubmission } from './types/wedding';

export function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);


  // Hirushi & Praveen Wedding Details State
  const [weddingDetails, setWeddingDetails] = useState<WeddingDetails>({
    groomName: 'Praveen',
    brideName: 'Hirushi',
    weddingDate: '2026-09-23',
    displayDate: 'Wednesday, September 23, 2026',
    dayOfWeek: 'Wednesday',
    ceremonyTime: '09:00 AM - 04:30 PM (Poruwa Ceremony at 11:02 AM)',
    ceremonyVenue: 'Yunora Reception Hall',
    ceremonyAddress: 'Imaduwa, Galle, Sri Lanka',
    ceremonyMapUrl: 'https://maps.app.goo.gl/9xwTfaP7QqNCt1YWA',
    receptionTime: '09:00 AM - 04:30 PM',
    receptionVenue: 'Yunora Reception Hall',
    receptionAddress: 'Imaduwa, Galle, Sri Lanka',
    receptionMapUrl: 'https://maps.app.goo.gl/9xwTfaP7QqNCt1YWA',
    dressCode: 'Elegant Traditional & Formal Attire',
    hashtag: '#HirushiWedsPraveen',
    bankDetails: {
      accountName: 'Hirushi & Praveen Wedding Fund',
      bankName: 'Commercial Bank of Ceylon',
      accountNumber: '800-459-2031-01',
      branch: 'Galle Branch',
    },
  });

  const handleRsvpSubmitted = (submission: RsvpSubmission) => {
    console.log('RSVP Submitted:', submission);
  };

  return (
    <div className="min-h-screen text-[#f0eaff] relative selection:bg-[#B8C0FF] selection:text-[#0f0f23] font-sans">
      {/* Interactive Unsealing Envelope Modal (Initial Gate) */}
      {!isEnvelopeOpen && (
        <Envelope
          groomName={weddingDetails.groomName}
          brideName={weddingDetails.brideName}
          weddingDate={weddingDetails.displayDate}
          onOpen={() => setIsEnvelopeOpen(true)}
        />
      )}

      {/* Full Screen Looping Background Video */}
      <BackgroundVideo
        videoSrc="/media/bg-video.mp4"
        overlayOpacity={0.45}
        blurAmount="backdrop-blur-none"
      />

      {/* Main Content Area */}
      <main className="relative z-10">
        <Hero
          details={weddingDetails}
          onOpenRsvp={() => setIsRsvpOpen(true)}
          portraitUrl="/media/photo-1.jpg"
        />


        <EventSchedule details={weddingDetails} />

        <PhotoGallery />

        <ContactRsvp />
      </main>

      {/* Floating Audio Controller */}
      <AudioPlayer />


      {/* RSVP Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSubmitSuccess={handleRsvpSubmitted}
      />

      {/* Footer */}
      <Footer
        details={weddingDetails}
        onOpenRsvp={() => setIsRsvpOpen(true)}
      />
    </div>
  );
}

export default App;
