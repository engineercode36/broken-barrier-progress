import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuestionChoiceProps {
  onSelect: (value: number) => void;
  selectedValue?: number;
}

export const QuestionChoice = ({ onSelect, selectedValue }: QuestionChoiceProps) => {
  const choices = [
    { value: 1, label: "Strongly Disagree", color: "from-red-600 to-red-500", borderColor: "border-red-600" },
    { value: 2, label: "Disagree", color: "from-red-500 to-red-400", borderColor: "border-red-500" },
    { value: 3, label: "Slightly Disagree", color: "from-red-400 to-red-300", borderColor: "border-red-400" },
    { value: 4, label: "Neutral", color: "from-gray-400 to-gray-300", borderColor: "border-gray-400" },
    { value: 5, label: "Slightly Agree", color: "from-green-300 to-green-400", borderColor: "border-green-400" },
    { value: 6, label: "Agree", color: "from-green-400 to-green-500", borderColor: "border-green-500" },
    { value: 7, label: "Strongly Agree", color: "from-green-500 to-green-600", borderColor: "border-green-600" }
  ];

  return (
    <RadioGroup
      className="grid grid-cols-1 md:grid-cols-7 gap-4 w-full items-center justify-items-center"
      value={selectedValue?.toString()}
      onValueChange={(value) => onSelect(parseInt(value))}
    >
      {choices.map((choice) => (
        <motion.div
          key={choice.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex flex-col items-center"
        >
          <label className="flex flex-col items-center gap-2 cursor-pointer w-full">
            <div className="relative flex items-center justify-center">
              <RadioGroupItem
                value={choice.value.toString()}
                className="sr-only"
              />
              <motion.div
                className={`w-16 h-16 rounded-full border-2 flex items-center justify-center
                  ${selectedValue === choice.value
                    ? `bg-gradient-to-r ${choice.color} border-transparent`
                    : `${choice.borderColor} hover:border-blue-300`
                  }`}
                animate={selectedValue === choice.value ? { scale: [1, 1.2, 1] } : {}}
              >
                {selectedValue === choice.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${choice.color}`}
                  />
                )}
              </motion.div>
            </div>
            <span className="text-sm text-gray-600 text-center">{choice.label}</span>
          </label>
        </motion.div>
      ))}
    </RadioGroup>
  );
};