import SegmentedProgress from "@/components/SegmentedProgress";
import { useState, useEffect } from "react";

const Index = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-200 via-pink-200 to-indigo-200">
      <div className="w-full max-w-xl space-y-12">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-medium tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Progress Indicator
          </h2>
          <p className="text-indigo-700">A minimal and elegant circular progress visualization</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <SegmentedProgress progress={progress} segments={12} className="text-purple-600" />
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <SegmentedProgress progress={progress} segments={8} className="text-pink-500" />
          </div>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <SegmentedProgress progress={progress} segments={16} className="text-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;