export interface Challenge {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  status: 'active' | 'upcoming' | 'archived';
  type?: string;
  category: string[];
  organizer: string;
  prizePool: number;
  currency: string;
  totalParticipants: number;
  totalViews: number;
  totalSubmissions: number;
  startDate: string;
  endDate: string;
  imageUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  location?: string;
  overview: {
    brief: string;
    deliverables: string[];
    criteria: { title: string; weight: number; description: string }[];
    schedule: { phase: string; date: string }[];
  };
  rules: string[];
  assets: {
    name: string;
    type: 'pdf' | 'zip' | 'fig' | 'img';
    url: string;
    size: string;
  }[];
}
