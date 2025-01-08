import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StatsSection } from "@/components/stats/StatsSection";
import { GradientFeatureSection } from "@/components/GradientFeatureSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { PremiumShowcase } from "@/components/PremiumShowcase";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Target,
  Building2,
  Rocket,
  MousePointerClick,
  Share2,
  MessageSquare 
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  console.log("Rendering Index page");

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="h-[500px] bg-cover bg-center relative" style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb")',
        marginTop: '64px'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-6 text-center max-w-3xl">
            Discover Your True Personality Through Scientific Assessment
          </h1>
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            onClick={() => navigate("/questions")}
          >
            Start Your Journey
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Gradient Feature Section */}
      <GradientFeatureSection />

      {/* Services Section */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Assessment Services</h2>
            <p className="text-xl text-gray-600">Comprehensive personality analysis for personal and professional growth</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Cards */}
            <Card className="p-6 hover:shadow-lg transition-all bg-white rounded-xl">
              <CardContent className="space-y-4">
                <Target className="h-12 w-12 text-blue-600" />
                <h3 className="text-2xl font-bold">LEAD GENERATION</h3>
                <p className="text-gray-600">Attract, nurture and drive more leads through our comprehensive assessment process.</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all bg-white rounded-xl">
              <CardContent className="space-y-4">
                <Building2 className="h-12 w-12 text-blue-600" />
                <h3 className="text-2xl font-bold">B2B MARKETING</h3>
                <p className="text-gray-600">Build brand equity with professional personality insights tailored for businesses.</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all bg-white rounded-xl">
              <CardContent className="space-y-4">
                <Rocket className="h-12 w-12 text-blue-600" />
                <h3 className="text-2xl font-bold">HIGH GROWTH</h3>
                <p className="text-gray-600">Achieve rapid expansion and hyper growth with data-driven personality analytics.</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <Card className="p-6 hover:shadow-lg transition-all bg-white rounded-xl">
              <CardContent className="space-y-4">
                <MousePointerClick className="h-12 w-12 text-blue-600" />
                <h3 className="text-2xl font-bold">GOOGLE ADS</h3>
                <p className="text-gray-600">Stay ahead of the game with targeted personality-based advertising.</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all bg-white rounded-xl">
              <CardContent className="space-y-4">
                <Share2 className="h-12 w-12 text-blue-600" />
                <h3 className="text-2xl font-bold">META ADVERTISING</h3>
                <p className="text-gray-600">Leverage social media with personality-driven marketing strategies.</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all bg-white rounded-xl">
              <CardContent className="space-y-4">
                <MessageSquare className="h-12 w-12 text-blue-600" />
                <h3 className="text-2xl font-bold">SOCIAL MEDIA CONTENT</h3>
                <p className="text-gray-600">Effectively manage your social media presence with personality insights.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contact Form Section with Premium Showcase */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <PremiumShowcase />
            
            <div className="max-w-xl p-8 rounded-lg shadow-lg bg-white relative before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-r before:from-blue-400 before:to-blue-600 before:rounded-lg before:-z-10">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">We'd love to hear from you</h2>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border border-gray-300 rounded-lg form-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded-lg form-input"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg form-input"
                ></textarea>
                <Button className="w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 form-input">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
