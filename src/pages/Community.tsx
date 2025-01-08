import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SearchBar } from "@/components/community/SearchBar";
import { Leaderboard } from "@/components/community/Leaderboard";
import { EventsList } from "@/components/community/EventsList";
import { PollsList } from "@/components/community/PollsList";
import { PostList } from "@/components/community/PostList";
import { Post, Event, Poll } from "@/types/community";

const MOCK_POSTS: Post[] = [
  {
    id: 1,
    content: "I've found that understanding my personality type has helped me tremendously in my career. Anyone else had similar experiences?",
    author: {
      name: "Sarah Johnson",
      avatar: "https://source.unsplash.com/random/100x100?portrait=1",
      personalityType: "The Visionary",
      badges: ["Top Contributor", "Insightful Thinker"],
      points: 1250,
    },
    likes: 24,
    comments: 5,
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    content: "Looking for advice on how to better communicate with opposite personality types in my team. Any tips?",
    author: {
      name: "Michael Chen",
      avatar: "https://source.unsplash.com/random/100x100?portrait=2",
      personalityType: "The Mediator",
      badges: ["Rising Star"],
      points: 850,
    },
    likes: 15,
    comments: 8,
    timestamp: "4 hours ago",
  },
];

const UPCOMING_EVENTS: Event[] = [
  {
    id: "1",
    title: "Understanding Different Personality Types in the Workplace",
    date: "2024-04-15T15:00:00",
    host: "Dr. Emily Watson",
    participants: 156,
  },
  {
    id: "2",
    title: "Personality Type and Career Choice Workshop",
    date: "2024-04-20T18:30:00",
    host: "Career Coach Mark Stevens",
    participants: 89,
  },
];

const ACTIVE_POLLS: Poll[] = [
  {
    id: "1",
    question: "Which personality type do you think is the most creative?",
    options: ["The Visionary", "The Artist", "The Innovator", "The Dreamer"],
    votes: [45, 32, 28, 19],
  },
];

const Community = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();

  const handleSubmitPost = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: posts.length + 1,
      content: newPost,
      author: {
        name: "Current User",
        avatar: "https://source.unsplash.com/random/100x100?portrait=0",
        personalityType: "Guest",
        badges: [],
        points: 0,
      },
      likes: 0,
      comments: 0,
      timestamp: "Just now",
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "Post created",
      description: "Your post has been published successfully!",
    });
  };

  const handleReport = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isReported: true }
        : post
    ));
  };

  const handleSearch = (query: string, filters: string[]) => {
    console.log("Searching with query:", query, "and filters:", filters);
    // Implement search logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-12">Community Ideas</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-grow space-y-8">
              {/* Search Bar */}
              <SearchBar onSearch={handleSearch} />

              {/* New Post Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <Textarea
                  placeholder="Share your thoughts with the community..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="mb-4"
                />
                <Button 
                  onClick={handleSubmitPost}
                  className="w-full md:w-auto"
                >
                  Share Post
                </Button>
              </div>

              {/* Posts List */}
              <PostList posts={posts} onReport={handleReport} />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              <Leaderboard users={MOCK_POSTS.map(post => ({
                id: post.id.toString(),
                name: post.author.name,
                avatar: post.author.avatar,
                points: post.author.points,
                badges: post.author.badges,
              }))} />
              
              <EventsList events={UPCOMING_EVENTS} />
              
              <PollsList polls={ACTIVE_POLLS} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;