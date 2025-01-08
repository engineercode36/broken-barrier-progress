import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ObjectiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetObjective: (value: { type: "questions" | "time"; value: number }) => void;
}

const ObjectiveModal = ({ open, onOpenChange, onSetObjective }: ObjectiveModalProps) => {
  const [objectiveType, setObjectiveType] = useState<"questions" | "time">("questions");
  const [value, setValue] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Set Your Practice Objective</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="questions" onValueChange={(v) => setObjectiveType(v as "questions" | "time")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="time">Time</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="mt-4">
            <Input
              type="number"
              placeholder="Number of questions"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min="1"
              className="rounded-xl"
            />
          </TabsContent>

          <TabsContent value="time" className="mt-4">
            <Input
              type="number"
              placeholder="Minutes"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              min="1"
              className="rounded-xl"
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button
            onClick={() => onSetObjective({ 
              type: objectiveType, 
              value: parseInt(value) || 0 
            })}
            className="rounded-xl transition-all duration-300 hover:bg-blue-50 hover:border-blue-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
          >
            Set Objective
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ObjectiveModal;