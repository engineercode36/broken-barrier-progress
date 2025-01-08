import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronLeft, HelpCircle } from "lucide-react";
import { QuestionChoice } from "@/components/QuestionChoice";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

const questions = [
  {
    id: 1,
    quote: "Understanding yourself is the beginning of all wisdom.",
    text: "I find myself easily getting frustrated when dealing with people who don't share my level of understanding.",
    explanation: "This question helps identify your tolerance levels and how you interact with others who may not share your knowledge or understanding."
  },
  {
    id: 2,
    quote: "The only true wisdom is in knowing you know nothing.",
    text: "I prefer to work independently rather than in group settings.",
    explanation: "This question helps assess your work style preferences and collaboration tendencies."
  },
  {
    id: 3,
    quote: "Know thyself.",
    text: "I often find myself taking charge in group situations.",
    explanation: "This question evaluates your leadership tendencies and comfort with taking initiative."
  },
  {
    id: 4,
    quote: "Life is not a problem to be solved, but a reality to be experienced.",
    text: "I tend to analyze situations thoroughly before making decisions.",
    explanation: "This question helps understand your decision-making process and analytical tendencies."
  },
  {
    id: 5,
    quote: "Change is the only constant in life.",
    text: "I adapt easily to new situations and environments.",
    explanation: "This question assesses your adaptability and comfort with change."
  }
];

const Questions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  
  const handleChoice = async (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 500);
    } else {
      // This is the last question, save results
      try {
        // For now, assign a random personality type (1-3)
        const randomPersonalityType = Math.floor(Math.random() * 3) + 1;
        
        const { error } = await supabase
          .from('quiz_results')
          .insert({
            user_id: user?.id,
            personality_type_id: randomPersonalityType,
            answers: newAnswers
          });

        if (error) throw error;

        toast({
          title: "Quiz completed!",
          description: "Your results have been saved. Redirecting to your personality type...",
        });

        // Redirect to personality detail page
        setTimeout(() => {
          navigate(`/personalities/${randomPersonalityType}`);
        }, 1500);

      } catch (error) {
        console.error('Error saving quiz results:', error);
        toast({
          title: "Error",
          description: "Failed to save your quiz results. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  // Generate a random gradient for the question container
  const gradients = [
    "from-blue-400 to-purple-500",
    "from-green-400 to-blue-500",
    "from-purple-400 to-pink-500",
    "from-yellow-400 to-orange-500",
    "from-pink-400 to-red-500"
  ];
  
  const randomGradient = gradients[currentQuestion % gradients.length];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Keep the header from Index page */}
      <header className="fixed top-0 left-0 right-0 h-[64px] bg-white shadow-md z-50 flex items-center px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-xl font-semibold text-blue-600">Personality Arc</h2>
          
          <Button variant="ghost" className="text-blue-600" onClick={() => navigate("/")}>
            Exit Assessment
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Quote */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`quote-${currentQuestion}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-12"
            >
              <p className="text-xl text-gray-700 italic">"{questions[currentQuestion].quote}"</p>
            </motion.div>
          </AnimatePresence>

          {/* Question and Choices */}
          <div className="relative p-[2px] rounded-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-8">
            <div className="bg-white rounded-lg p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`question-${currentQuestion}`}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <h3 className="text-2xl font-semibold mb-8 text-center text-gray-800">
                    {questions[currentQuestion].text}
                  </h3>
                  
                  <div className="space-y-4 rounded-lg p-6">
                    <QuestionChoice
                      onSelect={handleChoice}
                      selectedValue={answers[currentQuestion]}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
          </div>
        </div>

        {/* Expandable Help Section */}
        <div className="fixed right-4 top-24">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white animate-pulse"
              >
                <HelpCircle className="h-6 w-6" />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="w-80 mt-2">
              <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500">
                <h4 className="font-semibold mb-2 text-blue-600">Need Help?</h4>
                <p className="text-sm text-gray-600">
                  {questions[currentQuestion].explanation}
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>
    </div>
  );
};

export default Questions;