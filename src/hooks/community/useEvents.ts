import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Event } from "@/types/community";
import { useEffect } from "react";
import { useToast } from "../use-toast";

export const useEvents = () => {
  const { toast } = useToast();

  const { data: events, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      console.log('Fetching events...');
      const { data, error } = await supabase
        .from('community_events')
        .select(`
          *,
          profiles:created_by (
            username
          )
        `)
        .eq('status', 'approved')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error",
          description: "Failed to fetch events",
          variant: "destructive",
        });
        throw error;
      }

      return data.map((event): Event => ({
        id: event.id,
        title: event.title,
        date: new Date(event.date).toISOString(),
        host: event.profiles?.username || 'Anonymous',
        participants: 0,
      }));
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_events'
        },
        () => {
          console.log('Events changed, refetching...');
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return { events: events || [] };
};