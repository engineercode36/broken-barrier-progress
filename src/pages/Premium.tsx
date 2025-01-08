import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";

const Premium = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      name: "Monthly Premium",
      price: "$9.99",
      interval: "month",
      features: [
        "Full personality analysis",
        "Detailed trait breakdown",
        "Career compatibility insights",
        "Relationship dynamics assessment",
        "Personal growth recommendations"
      ]
    },
    {
      name: "Annual Premium",
      price: "$99.99",
      interval: "year",
      features: [
        "All Monthly Premium features",
        "Priority support",
        "Advanced analytics",
        "Exclusive content",
        "2 months free"
      ]
    }
  ];

  const handleCheckout = async (planType: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a premium plan",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { planType }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Unlock Your Full Potential
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              Get deeper insights into your personality and discover how to leverage your unique traits
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto py-20 px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className="relative overflow-hidden border-2 hover:border-blue-500 transition-all">
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500">/{plan.interval}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handleCheckout(plan.interval)}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : `Subscribe ${plan.price}/${plan.interval}`}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Premium;