import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Poll } from "@/types/community";
import { useEffect } from "react";
import { useToast } from "../use-toast";

export const usePolls = () => {
  const { toast } = useToast();

  const { data: polls, refetch } = useQuery({
    queryKey: ['polls'],
    queryFn: async () => {
      console.log('Fetching polls...');
      const { data, error } = await supabase
        .from('polls')
        .select(`
          *,
          poll_votes (
            option_index
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching polls:', error);
        toast({
          title: "Error",
          description: "Failed to fetch polls",
          variant: "destructive",
        });
        throw error;
      }

      return data.map((poll): Poll => {
        // Safely cast the options from Json to string[]
        const options = Array.isArray(poll.options) ? poll.options as string[] : [];
        
        return {
          id: poll.id,
          question: poll.question,
          options,
          votes: Array(options.length).fill(0).map((_, index) => 
            poll.poll_votes?.filter(vote => vote.option_index === index).length || 0
          ),
        };
      });
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('polls-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'polls'
        },
        () => {
          console.log('Polls changed, refetching...');
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return { polls: polls || [] };
};