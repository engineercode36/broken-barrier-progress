import { PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Poll } from "@/types/community";

interface PollsListProps {
  polls: Poll[];
}

export const PollsList = ({ polls }: PollsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-purple-500" />
          Active Polls
        </CardTitle>
      </CardHeader>
      <CardContent>
        {polls.map((poll) => (
          <div key={poll.id}>
            <h3 className="font-medium mb-3">{poll.question}</h3>
            <div className="space-y-2">
              {poll.options.map((option, index) => {
                const totalVotes = poll.votes.reduce((a, b) => a + b, 0);
                const percentage = Math.round((poll.votes[index] / totalVotes) * 100);
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{option}</span>
                      <span className="text-gray-500">{percentage}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-sm text-gray-500 mt-2 text-right">
              Total votes: {poll.votes.reduce((a, b) => a + b, 0)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};