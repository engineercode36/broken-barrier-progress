import { Check } from "lucide-react";

export const GradientFeatureSection = () => {
  const features = [
    "Comprehensive personality analysis",
    "Detailed trait breakdown",
    "Career compatibility insights",
    "Relationship dynamics assessment",
    "Personal growth recommendations"
  ];

  return (
    <div className="h-[400px] flex items-center bg-gradient-to-br from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Discover Your True Potential with Our Premium Features
            </h2>
            <p className="text-gray-600 text-lg">
              Unlock deep insights into your personality and transform your life with our comprehensive analysis tools.
            </p>
          </div>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="text-blue-500 h-6 w-6" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};