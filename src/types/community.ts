export interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    personalityType: string;
    badges: string[];
    points: number;
  };
  likes: number;
  comments: number;
  timestamp: string;
  isReported?: boolean;
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
  options: string[];  // This remains as string[] since we'll handle the conversion
  votes: number[];
}