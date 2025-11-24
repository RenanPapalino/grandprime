export enum ViewState {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  NEWS = 'NEWS',
  ABOUT = 'ABOUT',
  CLIENT_AREA = 'CLIENT_AREA'
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  imageUrl: string;
  readTime: string;
  source?: string; // IOB, Econet, Portal Contábeis
  aiProcessed?: boolean; // Flag to show AI badge
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  isPopular?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isThinking?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}