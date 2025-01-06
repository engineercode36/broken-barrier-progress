import React from 'react';
import { cn } from "@/lib/utils";

interface SegmentedProgressProps {
  progress: number;
  segments?: number;
  showLabel?: boolean;
  className?: string;
}

const SegmentedProgress = ({
  progress,
  segments = 10,
  showLabel = true,
  className
}: SegmentedProgressProps) => {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  const segmentWidth = 100 / segments;
  
  return (
    <div className={cn("w-full max-w-xl mx-auto", className)}>
      <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="flex absolute inset-0">
          {Array.from({ length: segments }).map((_, index) => (
            <div
              key={index}
              className="flex-1 mx-px first:ml-0 last:mr-0"
              style={{
                width: `${segmentWidth}%`,
              }}
            >
              <div
                className={cn(
                  "h-full transition-all duration-500 ease-out rounded-sm",
                  (index + 1) * segmentWidth <= normalizedProgress
                    ? "bg-gray-900 animate-scale-in"
                    : "bg-transparent"
                )}
              />
            </div>
          ))}
        </div>
      </div>
      {showLabel && (
        <div className="mt-2 text-sm text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {normalizedProgress}%
        </div>
      )}
    </div>
  );
};

export default SegmentedProgress;