
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  detailedDescription?: string;
  image: string;
  gallery?: string[];
  caseStudy?: string;
  tags: string[];
  externalLink?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  insight: string;
  image: string;
  gradient: string;
  link?: string;
}

export interface Prompt {
  id: string;
  title: string;
  category: 'Marketing' | 'Strategy' | 'Data' | 'Career';
  content: string;
  description: string;
  createdAt: number;
}

export interface ToeicVocab {
  word: string;
  meaning: string;
  example: string;
  category: 'Business' | 'Finance' | 'Law' | 'Mkt';
}
