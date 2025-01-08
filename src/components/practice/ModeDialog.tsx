import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
    if (selectedTab === "timer") {
      onSetMode(`Timer Mode (${minutes} minutes)`);
    } else if (selectedTab === "level") {
      onSetMode(`Level Mode (${difficulty})`);
    } else {
      onSetMode("Manual Mode");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Practice Mode</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="timer" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="timer">Timer</TabsTrigger>
            <TabsTrigger value="level">Level</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
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
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSubmit}
            className="rounded-xl transition-all duration-300 hover:bg-purple-50 hover:border-purple-200 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)]"
          >
            Set Mode
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModeDialog;