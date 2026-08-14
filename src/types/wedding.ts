export interface WeddingDetails {
  groomName: string;
  brideName: string;
  weddingDate: string; // ISO String or YYYY-MM-DD format
  displayDate: string;
  dayOfWeek: string;
  ceremonyTime: string;
  ceremonyVenue: string;
  ceremonyAddress: string;
  ceremonyMapUrl: string;
  receptionTime: string;
  receptionVenue: string;
  receptionAddress: string;
  receptionMapUrl: string;
  dressCode: string;
  hashtag: string;
  bankDetails: {
    accountName: string;
    bankName: string;
    accountNumber: string;
    branch: string;
    swiftCode?: string;
  };
}

export interface RsvpSubmission {
  id: string;
  guestName: string;
  email?: string;
  phone?: string;
  attending: boolean;
  guestCount: number;
  dietaryRestrictions?: string;
  songRequest?: string;
  wishMessage?: string;
  createdAt: string;
}

export interface GuestbookWish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  likes: number;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  caption?: string;
}

export type ThemePalette = 'champagne' | 'rose' | 'sapphire' | 'emerald';

export interface ThemeConfig {
  id: ThemePalette;
  name: string;
  primary: string;
  accent: string;
  border: string;
  textGold: string;
  bgGradient: string;
}
