import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface PracticeTimerProps {
  timeRemaining: number | null;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const PracticeTimer = ({ timeRemaining, isPaused, onTogglePause }: PracticeTimerProps) => {
  if (timeRemaining === null) return null;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="mb-8 text-center flex items-center justify-center gap-3">
      <div className="font-cursive text-3xl gradient-text">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onTogglePause}
        className="rounded-full bg-white"
      >
        {isPaused ? (
          <Play className="h-4 w-4" />
        ) : (
          <Pause className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};