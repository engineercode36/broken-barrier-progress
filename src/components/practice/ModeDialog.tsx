import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Timer, Zap, Hand, Clock, BookOpen } from "lucide-react";
import { useState } from "react";

interface ModeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetMode: (mode: string) => void;
}

const ModeDialog = ({ open, onOpenChange, onSetMode }: ModeDialogProps) => {
  const [selectedTab, setSelectedTab] = useState("timer");
  const [minutes, setMinutes] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");

  const handleSubmit = () => {
    switch (selectedTab) {
      case "timer":
        onSetMode(`Timer Mode (${minutes} minutes)`);
        break;
      case "level":
        onSetMode(`Level Mode (${difficulty})`);
        break;
      case "manual":
        onSetMode("Manual Mode");
        break;
      case "pomodoro":
        onSetMode("Pomodoro Mode");
        break;
      case "exam":
        onSetMode("Exam Mode");
        break;
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Practice Mode</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="timer" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-[#7FFFD4]" />
              Timer
            </TabsTrigger>
            <TabsTrigger value="level" className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#7FFFD4]" />
              Level
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Hand className="h-4 w-4 text-[#7FFFD4]" />
              Manual
            </TabsTrigger>
            <TabsTrigger value="pomodoro" className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#7FFFD4]" />
              Pomodoro
            </TabsTrigger>
            <TabsTrigger value="exam" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-[#7FFFD4]" />
              Exam
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timer" className="mt-4">
            <Input
              type="number"
              placeholder="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              min="1"
              className="rounded-xl"
            />
          </TabsContent>

          <TabsContent value="level" className="mt-4">
            <RadioGroup value={difficulty} onValueChange={setDifficulty}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="difficult" id="difficult" />
                  <Label htmlFor="difficult">Difficult</Label>
                </div>
              </div>
            </RadioGroup>
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <p className="text-sm text-gray-600">
              Manual mode allows you to practice at your own pace without any time or difficulty constraints.
            </p>
          </TabsContent>

          <TabsContent value="pomodoro" className="mt-4">
            <p className="text-sm text-gray-600">
              Practice with focused intervals and short breaks to maintain productivity.
            </p>
          </TabsContent>

          <TabsContent value="exam" className="mt-4">
            <p className="text-sm text-gray-600">
              Simulates real exam conditions with strict timing and no breaks.
            </p>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSubmit}
            className="rounded-xl bg-[#7FFFD4] text-gray-800 hover:bg-[#70E0C0]"
          >
            Set Mode
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModeDialog;