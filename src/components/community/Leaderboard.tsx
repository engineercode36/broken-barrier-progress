import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
  badges: string[];
}

interface LeaderboardProps {
  users: LeaderboardUser[];
}

export const Leaderboard = ({ users }: LeaderboardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {users.map((user, index) => (
          <div key={user.id} className="flex items-center gap-3">
            <span className="text-sm font-medium w-6">{index + 1}.</span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="font-medium text-sm">{user.name}</div>
              <div className="text-xs text-gray-500">{user.points} points</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};