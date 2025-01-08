import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post, Event, Poll } from "@/types/community";

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select(`
          *,
          user:profiles(
            id,
            username,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      // Transform the data to match our Post type
      const posts: Post[] = postsData.map((post) => ({
        id: post.id,
        content: post.content,
        author: {
          name: post.user?.username || "Anonymous",
          avatar: post.user?.avatar_url || "",
          personalityType: "Member",
          badges: ["New"],
          points: 0,
        },
        likes: 0,
        comments: 0,
        timestamp: new Date(post.created_at).toLocaleDateString(),
      }));

      return posts;
    },
  });
};

export const usePolls = () => {
  return useQuery({
    queryKey: ["polls"],
    queryFn: async () => {
      const { data: pollsData, error: pollsError } = await supabase
        .from("polls")
        .select("*")
        .order("created_at", { ascending: false });

      if (pollsError) throw pollsError;

      const polls: Poll[] = pollsData.map((poll) => ({
        id: poll.id,
        question: poll.question,
        options: (poll.options as { options: string[] }).options || [],
        votes: Array((poll.options as { options: string[] }).options?.length || 0).fill(0),
      }));

      return polls;
    },
  });
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data: eventsData, error: eventsError } = await supabase
        .from("community_events")
        .select("*")
        .order("date", { ascending: true });

      if (eventsError) throw eventsError;

      const events: Event[] = eventsData.map((event) => ({
        id: event.id,
        title: event.title,
        date: event.date,
        host: "Community Team",
        participants: 0,
      }));

      return events;
    },
  });
};