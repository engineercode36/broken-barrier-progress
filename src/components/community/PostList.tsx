import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageSquare, Flag, Trophy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: number;
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

interface PostListProps {
  posts: Post[];
  onReport: (postId: number) => void;
}

export const PostList = ({ posts, onReport }: PostListProps) => {
  const { toast } = useToast();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <div className="font-semibold">{post.author.name}</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                {post.author.personalityType} • {post.timestamp}
                <div className="flex gap-1">
                  {post.author.badges.map((badge, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{post.author.points} pts</span>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{post.content}</p>
          
          <div className="flex items-center gap-4 text-gray-500">
            <button 
              className={`flex items-center gap-1 hover:text-blue-600 ${
                likedPosts.includes(post.id) ? 'text-blue-600' : ''
              }`}
              onClick={() => handleLike(post.id)}
            >
              <Heart className="h-5 w-5" />
              <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600">
              <MessageSquare className="h-5 w-5" />
              <span>{post.comments}</span>
            </button>
            <button 
              className={`flex items-center gap-1 hover:text-red-600 ${
                post.isReported ? 'text-red-600' : ''
              }`}
              onClick={() => {
                onReport(post.id);
                toast({
                  title: "Post reported",
                  description: "Thank you for helping keep our community safe.",
                });
              }}
              disabled={post.isReported}
            >
              <Flag className="h-5 w-5" />
              <span>{post.isReported ? 'Reported' : 'Report'}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};