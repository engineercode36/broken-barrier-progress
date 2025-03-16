import { Moon, Sun, Heart, Music } from "lucide-react";
import { CategoryCard } from "./CategoryCard";

export const Categories = () => {
  const categories = [
    {
      title: "Sleep Stories",
      description: "Drift off with calming bedtime stories",
      icon: Moon,
    },
    {
      title: "Meditation",
      description: "Guided sessions for inner peace",
      icon: Sun,
    },
    {
      title: "Relaxation",
      description: "Unwind with peaceful techniques",
      icon: Heart,
    },
    {
      title: "Ambient Sounds",
      description: "Soothing background melodies",
      icon: Music,
    },
  ];

  return (
    <div className="py-16 px-4 bg-meditation-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-meditation-primary mb-8 text-center">
          Begin Your Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};