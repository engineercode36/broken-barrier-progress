import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuestionChoiceProps {
  onSelect: (value: number) => void;
  selectedValue?: number;
}

export const QuestionChoice = ({ onSelect, selectedValue }: QuestionChoiceProps) => {
  const choices = [
    { value: 1, label: "Strongly Disagree", text: "I completely disagree with this statement" },
    { value: 2, label: "Disagree", text: "I disagree with this statement" },
    { value: 3, label: "Slightly Disagree", text: "I somewhat disagree with this statement" },
    { value: 4, label: "Neutral", text: "I neither agree nor disagree" },
    { value: 5, label: "Slightly Agree", text: "I somewhat agree with this statement" },
    { value: 6, label: "Agree", text: "I agree with this statement" },
    { value: 7, label: "Strongly Agree", text: "I completely agree with this statement" }
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
                className={`w-16 h-16 rounded-full border flex items-center justify-center
                  ${selectedValue === choice.value
                    ? `bg-[#7FFFD4] border-transparent shadow-lg`
                    : `border-[#7FFFD4] border-[1px] hover:border-[#7FFFD4] hover:shadow-md`
                  }`}
                animate={selectedValue === choice.value ? 
                  { scale: [1, 1.2, 1], rotate: [0, 360] } : 
                  {}
                }
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm font-medium text-gray-800">
                  {choice.value}
                </span>
              </motion.div>
            </div>
            <span className="text-sm font-medium text-gray-800">{choice.label}</span>
            <span className="text-xs text-gray-600 text-center">{choice.text}</span>
          </label>
        </motion.div>
      ))}
    </RadioGroup>
  );
};