import { Progress } from "@/components/ui/progress";

interface BudgetProgressProps {
  category: string;
  spent: number;
  total: number;
}

export const BudgetProgress = ({ category, spent, total }: BudgetProgressProps) => {
  const percentage = (spent / total) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-primary-dark">{category}</span>
        <span className="text-primary-gray">
          ${spent.toLocaleString()} / ${total.toLocaleString()}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};