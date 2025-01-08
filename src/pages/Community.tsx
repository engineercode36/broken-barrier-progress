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
import { usePosts, usePolls, useEvents } from "@/hooks/community";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { Loader2 } from "lucide-react";

const Community = () => {
  const [newPost, setNewPost] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();
  const { posts } = usePosts();
  const { polls } = usePolls();
  const { events } = useEvents();

  const handleSubmitPost = async () => {
    if (!newPost.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            content: newPost,
            user_id: user.id,
          }
        ]);

      if (error) throw error;

      setNewPost("");
      toast({
        title: "Success",
        description: "Your post has been published!",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReport = async (postId: number) => {
    // In a real application, you would implement report functionality
    toast({
      title: "Post reported",
      description: "Thank you for helping keep our community safe.",
    });
  };

  const handleSearch = (query: string, filters: string[]) => {
    console.log("Searching with query:", query, "and filters:", filters);
    // Implement search logic here
  };

  if (!posts || !polls || !events) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-24">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <Leaderboard users={posts.slice(0, 5).map(post => ({
                id: post.id,
                name: post.author.name,
                avatar: post.author.avatar,
                points: post.author.points,
                badges: post.author.badges,
              }))} />
              
              <EventsList events={events} />
              
              <PollsList polls={polls} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;