import { useState, useEffect } from "react";
import { ArrowLeft, Settings, Eye, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

type TimerMode = "focus" | "break";

export const PomodoroTimer = () => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [isPaused, setIsPaused] = useState(true);
  const [timeLeft, setTimeLeft] = useState(mode === "focus" ? 1500 : 300); // 25min or 5min
  const [sessions, setSessions] = useState(3);

  const percentage = mode === "focus" 
    ? ((1500 - timeLeft) / 1500) * 100
    : ((300 - timeLeft) / 300) * 100;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 0) {
            setMode(mode === "focus" ? "break" : "focus");
            return mode === "focus" ? 300 : 1500;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPaused, mode]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="relative aspect-square">
          {/* Progress Ring */}
          <svg className="w-full h-full -rotate-90 drop-shadow-lg">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className="fill-none stroke-[#333] stroke-[4]"
            />
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              className={cn(
                "fill-none stroke-[4] transition-all duration-200",
                mode === "focus" 
                  ? "stroke-[url(#focusGradient)]" 
                  : "stroke-[url(#breakGradient)]"
              )}
              strokeDasharray={`${2 * Math.PI * 45} ${2 * Math.PI * 45}`}
              strokeDashoffset={`${(2 * Math.PI * 45 * (100 - percentage)) / 100}`}
            />
            <defs>
              <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF4500" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
              <linearGradient id="breakGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00CED1" />
                <stop offset="100%" stopColor="#87CEEB" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timer Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-white mb-2">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-[#D3D3D3] text-sm tracking-widest">
              {mode === "focus" ? "FOCUS" : "SHORT BREAK"}
            </div>
            <div className="flex gap-1 mt-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    i === 0
                      ? mode === "focus"
                        ? "bg-[#FFA500]"
                        : "bg-[#00CED1]"
                      : "bg-[#6C6C6C]"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between px-4">
          <button 
            className="p-3 text-[#D3D3D3] hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-8 py-3 bg-[#333333] text-white rounded-full font-medium tracking-wide hover:bg-[#404040] transition-colors duration-200 shadow-lg"
          >
            {isPaused ? "START" : "PAUSE"}
          </button>
          
          <button 
            className="p-3 text-[#D3D3D3] hover:text-white transition-colors duration-200"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Mode Indicator */}
        <div className="mt-8 flex justify-center">
          {mode === "focus" ? (
            <Eye className="w-6 h-6 text-[#D3D3D3]" />
          ) : (
            <Coffee className="w-6 h-6 text-[#D3D3D3]" />
          )}
        </div>
      </div>
    </div>
  );
};