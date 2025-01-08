import { useParams } from "react-router-dom";
import { PersonalityDetail } from "@/components/PersonalityDetail";

// This would typically come from an API or database
const personalityData = {
  name: "The Visionary",
  description: "Visionaries are innovative and strategic thinkers who excel at developing long-term plans and systems. They combine creativity with analytical skills to solve complex problems and implement transformative solutions.",
  type: "Strategic Innovator",
  traits: [
    "Highly analytical and systematic in approach",
    "Natural leaders with a clear vision",
    "Excellent at long-term strategic planning",
    "Independent and decisive in decision-making",
    "Strong drive for continuous improvement",
    "Values intellectual growth and competence"
  ]
};

const PersonalityDetailPage = () => {
  const { id } = useParams();
  console.log("Viewing personality with ID:", id);

  return (
    <PersonalityDetail {...personalityData} />
  );
};

export default PersonalityDetailPage;