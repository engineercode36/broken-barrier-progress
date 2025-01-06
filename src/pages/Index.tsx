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
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-white">
      <div className="w-full max-w-xl space-y-12">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-medium tracking-tight">Progress Indicator</h2>
          <p className="text-gray-500">A minimal and elegant circular progress visualization</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SegmentedProgress progress={progress} segments={12} />
          <SegmentedProgress progress={progress} segments={8} className="opacity-75" />
          <SegmentedProgress progress={progress} segments={16} className="opacity-50" />
        </div>
      </div>
    </div>
  );
};

export default Index;