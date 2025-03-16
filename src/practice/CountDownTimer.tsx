import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  durationInSeconds: number;
  onComplete: () => void;
  isActive: boolean;
  className?: string;
}

const CountdownTimer = ({ 
  durationInSeconds, 
  onComplete, 
  isActive, 
  className 
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeLeft(durationInSeconds);
  }, [durationInSeconds]);

  useEffect(() => {
    if (!isActive || isPaused) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive, isPaused, onComplete, durationInSeconds]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("inline-flex items-center justify-center p-2 bg-white border border-green-500 rounded-full max-w-min debug", className)}>
      <span 
        className="font-mono text-sm text-green-500"
        style={{ textShadow: "0 0 4px rgba(16,185,129,1)" }}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default CountdownTimer;
