
export interface LeaderboardEntry {
  id: number;
  name: string;
  avatar: string;
  votes: number;
  submissionDate: string;
}

export type SortKey = 'votes' | 'recency' | 'name';
