export interface Post {
  id: number;
  content: string;
  author: Author;
  likes: number;
  comments: number;
  timestamp: string;
  isReported?: boolean;
}

export interface Author {
  name: string;
  avatar: string;
  personalityType: string;
  badges: string[];
  points: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  host: string;
  participants: number;
}

export interface Poll {
  id: string;
  question: string;
  options: string[];
  votes: number[];
}