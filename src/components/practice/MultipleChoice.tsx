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
    { id: "a", label: "A", text: "Option AA" },
    { id: "b", label: "B", text: "Option B" },
    { id: "c", label: "C", text: "Option C" },
    { id: "d", label: "D", text: "Option D" }
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
            className={`w-full h-12 text-base relative rounded-lg transition-transform duration-200
              ${selectedValue === choice.id
                ? isCorrect
                  ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                  : "bg-gradient-to-r from-red-400 to-red-600 text-white"
                : "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-2 border-white-500"
              }
              ${selectedValue === choice.id ? "" : "hover:shadow-lg hover:shadow-gray-500/50"}
            `}
            variant="ghost"
            onClick={() => onSelect(choice.id)}
          >
            <span className="inline-block w-8 h-8 mr-2 text-center rounded-full text-black">
              {choice.label}
            </span>
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
