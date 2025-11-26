export type ChallengeStatus = 'active' | 'upcoming' | 'archived';

export type ChallengeCategory = 
  | 'Graphic Design' 
  | 'UI/UX Design' 
  | 'Brand Identity' 
  | 'Illustration'
  | 'Typography'
  | 'Motion Design'
  | 'Product Design'
  | 'Web Design';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  status: ChallengeStatus;
  category: ChallengeCategory[];
  organizer: string;
  organizerLogo?: string;
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
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
  rank: number;
  score: number;
  submissions: number;
  country?: string;
}

export interface Leaderboard {
  challengeId: string;
  participants: Participant[];
  lastUpdated: string;
}
