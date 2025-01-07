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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="w-full max-w-xl space-y-12">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-purple-900">Progress Indicator</h2>
          <p className="text-purple-600">A minimal and elegant circular progress visualization</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SegmentedProgress progress={progress} segments={12} className="text-purple-500" />
          <SegmentedProgress progress={progress} segments={8} className="text-pink-500 opacity-75" />
          <SegmentedProgress progress={progress} segments={16} className="text-indigo-500 opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default Index;