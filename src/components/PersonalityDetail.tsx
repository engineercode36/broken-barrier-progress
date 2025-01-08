import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface PersonalityDetailProps {
  name: string;
  description: string;
  type: string;
  traits: string[];
}

export const PersonalityDetail = ({ name, description, type, traits }: PersonalityDetailProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden mt-16">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
            opacity: 0.9
          }}
        />
        <div className="absolute inset-0 bg-black/20">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
            <Button
              variant="ghost"
              className="text-white mb-8 w-fit"
              onClick={() => navigate("/personalities")}
            >
              <ArrowLeft className="mr-2" />
              Back to Personalities
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{name}</h1>
            <p className="text-xl text-white/90">{type}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Overview</h2>
          <p className="text-gray-700 text-lg mb-8">{description}</p>

          <h3 className="text-2xl font-bold mb-4">Key Traits</h3>
          <ul className="list-disc list-inside space-y-2 mb-12">
            {traits.map((trait, index) => (
              <li key={index} className="text-gray-700">{trait}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Premium Feature Section */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Unlock Premium Features
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Get detailed insights, personalized recommendations, and exclusive content
            </p>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-2xl font-bold mb-2">€9.99/month</p>
              <p className="text-gray-600 mb-6">Cancel anytime</p>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 text-lg hover:opacity-90 transition-opacity"
                onClick={() => navigate("/checkout")}
              >
                Get Premium Access
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-xl bg-white shadow-lg">
                <h3 className="font-bold text-xl mb-3">Detailed Analysis</h3>
                <p className="text-gray-600">Get comprehensive insights into your personality type</p>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-lg">
                <h3 className="font-bold text-xl mb-3">Expert Guidance</h3>
                <p className="text-gray-600">Access to professional development resources</p>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-lg">
                <h3 className="font-bold text-xl mb-3">Community Access</h3>
                <p className="text-gray-600">Connect with others who share your personality type</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
