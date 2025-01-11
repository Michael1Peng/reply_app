export interface SalesScript {
  id: string;
  question: string;
  answer: string;
  category?: string;
  isFavorite?: boolean;
  useCount?: number;
}

export type SalesScripts = SalesScript[];

export interface SearchHistory {
  query: string;
  timestamp: number;
}
