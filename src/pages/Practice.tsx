import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import ObjectiveModal from "@/components/practice/ObjectiveModal";
import { PracticeHeader } from "@/components/practice/PracticeHeader";
import { QuestionTabs } from "@/components/practice/QuestionTabs";
import { QuestionNavigation } from "@/components/practice/QuestionNavigation";
import { PracticeTimer } from "@/components/practice/PracticeTimer";
import { QuestionActions } from "@/components/practice/QuestionActions";
import { MultipleChoice } from "@/components/practice/MultipleChoice";
import { Sidebar } from "@/components/practice/Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Practice = () => {
  const [showObjectiveModal, setShowObjectiveModal] = useState(false);
  const [showModeDialog, setShowModeDialog] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(1500); // 25 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [goToQuestion, setGoToQuestion] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [progress, setProgress] = useState(75);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("Chapter 1");
  const [selectedMode, setSelectedMode] = useState("Timer Mode");

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setIsCorrect(answerId === "a"); // Example: assuming 'a' is correct
    setTimeout(() => {
      setSelectedAnswer(null);
      setIsCorrect(null);
    }, 2000);
  };

  return (
    <div className="flex min-h-screen w-full">
      {showSidebar && <Sidebar onClose={() => setShowSidebar(false)} />}
      
      <div className="flex-1">
        <PracticeHeader
          onOpenObjective={() => setShowObjectiveModal(true)}
          onOpenMode={() => setShowModeDialog(true)}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
          selectedChapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
        />

        <main className="container mx-auto px-4 pt-8 pb-12">
          <PracticeTimer
            timeRemaining={timeRemaining}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused(!isPaused)}
          />

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-end text-sm text-gray-600 mt-1">
              <span>Objective Progress: {progress}%</span>
            </div>
          </div>

          <QuestionActions />
          
          <QuestionTabs />

          {/* Answer Choices */}
          <div className="mt-8">
            <MultipleChoice
              onSelect={(value) => handleAnswerSelect(value.toString())}
              selectedValue={selectedAnswer}
              isCorrect={isCorrect}
            />
          </div>

          <QuestionNavigation
            onPrevious={() => console.log('Previous')}
            onNext={() => console.log('Next')}
            goToQuestion={goToQuestion}
            onGoToQuestionChange={setGoToQuestion}
            onGoToQuestion={() => console.log('Go to question:', goToQuestion)}
          />
        </main>

        <ObjectiveModal 
          open={showObjectiveModal} 
          onOpenChange={setShowObjectiveModal}
          onSetObjective={(value) => {
            console.log("Objective set:", value);
            setShowObjectiveModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default Practice;