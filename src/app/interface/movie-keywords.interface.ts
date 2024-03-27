export interface MovieKeywords {
  id: number;
  keywords: Keyword[];
}

interface Keyword {
  id: number;
  name: string;
}