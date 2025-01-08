import { Button } from "@/components/ui/button";
import { Book, Target, Brain, Menu, ArrowUp } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PracticeHeaderProps {
  onOpenObjective: () => void;
  onOpenMode: () => void;
  onToggleSidebar: () => void;
  selectedChapter: string;
  setSelectedChapter: (chapter: string) => void;
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
}

export const PracticeHeader = ({
  onOpenObjective,
  onOpenMode,
  onToggleSidebar,
  selectedChapter,
  setSelectedChapter,
  selectedMode,
  setSelectedMode
}: PracticeHeaderProps) => {
  const chapters = ["Chapter 1", "Chapter 2", "Chapter 3"];
  const modes = ["Timer Mode", "Pomodoro Mode", "Exam Mode", "Level Mode"];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-cursive text-2xl gradient-text">
            Academic Arc
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-full"
              >
                <Book className="h-4 w-4 mr-2" />
                {selectedChapter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {chapters.map((chapter) => (
                <DropdownMenuItem 
                  key={chapter}
                  onClick={() => setSelectedChapter(chapter)}
                >
                  {chapter}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenObjective}
            className="h-8 rounded-full"
          >
            <Target className="h-4 w-4 mr-2" />
            Set Objectives
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 rounded-full"
              >
                <Brain className="h-4 w-4 mr-2" />
                {selectedMode}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {modes.map((mode) => (
                <DropdownMenuItem 
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                >
                  {mode}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1 border rounded-full px-3 py-1 text-sm">
            <span>Rank: #1</span>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </div>
        </div>
      </div>
    </header>
  );
};