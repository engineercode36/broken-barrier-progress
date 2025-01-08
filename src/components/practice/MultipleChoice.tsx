import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface MultipleChoiceProps {
  onSelect: (value: string) => void;
  selectedValue: string | null;
  isCorrect: boolean | null;
}

export const MultipleChoice = ({ onSelect, selectedValue, isCorrect }: MultipleChoiceProps) => {
  const choices = [
    { id: "a", text: "Option A" },
    { id: "b", text: "Option B" },
    { id: "c", text: "Option C" },
    { id: "d", text: "Option D" }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {choices.map((choice) => (
        <motion.div
          key={choice.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            className={`w-full h-16 text-lg relative ${
              selectedValue === choice.id
                ? isCorrect
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                  : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                : "bg-white text-gray-800 border-2"
            }`}
            variant="ghost"
            onClick={() => onSelect(choice.id)}
          >
            {choice.text}
            {selectedValue === choice.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-4"
              >
                {isCorrect ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <X className="h-6 w-6" />
                )}
              </motion.div>
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};