import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Post } from "@/types/community";
import { useEffect } from "react";
import { useToast } from "../use-toast";

export const usePosts = () => {
  const { toast } = useToast();

  const { data: posts, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      console.log('Fetching posts...');
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url,
            id
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch posts",
          variant: "destructive",
        });
        throw error;
      }

      return data.map((post): Post => ({
        id: parseInt(post.id),
        content: post.content,
        author: {
          name: post.profiles.username || 'Anonymous',
          avatar: post.profiles.avatar_url || '',
          personalityType: "Community Member",
          badges: [],
          points: 0,
        },
        likes: 0,
        comments: 0,
        timestamp: new Date(post.created_at).toLocaleString(),
      }));
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        () => {
          console.log('Posts changed, refetching...');
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return { posts: posts || [] };
};