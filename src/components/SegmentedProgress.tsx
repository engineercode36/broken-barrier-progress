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
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / segments;
  const dashArray = `${segmentLength - 2} ${2}`;
  const progressOffset = circumference - (normalizedProgress / 100) * circumference;

  return (
    <div className={cn("relative w-32 h-32 mx-auto group", className)}>
      {/* Background circle */}
      <svg className="w-full h-full -rotate-90">
        <circle
          className="stroke-gray-100 fill-none"
          strokeWidth="8"
          r={radius}
          cx="64"
          cy="64"
          strokeDasharray={dashArray}
        />
        {/* Progress circle */}
        <circle
          className="stroke-gray-900 fill-none transition-all duration-500 ease-out"
          strokeWidth="8"
          r={radius}
          cx="64"
          cy="64"
          strokeDasharray={dashArray}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm text-gray-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {normalizedProgress}%
          </span>
        </div>
      )}
    </div>
  );
};

export default SegmentedProgress;