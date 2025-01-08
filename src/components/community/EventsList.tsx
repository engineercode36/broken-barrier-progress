import { Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/community";

interface EventsListProps {
  events: Event[];
}

export const EventsList = ({ events }: EventsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-500" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border-b pb-4 last:border-0 last:pb-0">
            <h3 className="font-medium">{event.title}</h3>
            <p className="text-sm text-gray-500">Host: {event.host}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-500">
                {new Date(event.date).toLocaleDateString()} at{" "}
                {new Date(event.date).toLocaleTimeString()}
              </span>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {event.participants}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};