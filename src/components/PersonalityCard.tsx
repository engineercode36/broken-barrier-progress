import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Hash } from "lucide-react";

interface PersonalityCardProps {
  id?: number;
  name: string;
  description: string;
  rarity: number;
  avatar: string;
  strength: number;
  weakness: number;
  unique: number;
}

export const PersonalityCard = ({ 
  id = 1,
  name, 
  description, 
  rarity, 
  avatar,
  strength,
  weakness,
  unique 
}: PersonalityCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="p-6 bg-white border border-gray-200 shadow-md rounded-lg group relative transition-all duration-300 hover:shadow-xl cursor-pointer hover:border-blue-400 hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50"
      onClick={() => navigate(`/personalities/${id}`)}
    >
      <div className="absolute top-4 right-4 flex items-center gap-1 text-gray-600">
        <Hash className="w-4 h-4" />
        <span className="font-semibold">#{id}</span>
      </div>
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" 
           style={{
             background: 'linear-gradient(90deg, hsla(213, 58%, 95%, 1) 0%, hsla(213, 41%, 89%, 1) 100%)'
           }}
      />
      
      <div className="flex flex-col items-center space-y-4 relative z-10 group-hover:text-gray-800 transition-colors duration-300">
        <img
          src={avatar}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
        />
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 text-center line-clamp-3">{description}</p>
        
        {/* Stats Bars */}
        <div className="w-full space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-16">Strength</span>
            <div className="flex-1 h-2 bg-gray-100 rounded">
              <div 
                className="h-full bg-red-500 rounded transition-all duration-300" 
                style={{ width: `${strength}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-12">{strength}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-16">Weakness</span>
            <div className="flex-1 h-2 bg-gray-100 rounded">
              <div 
                className="h-full bg-yellow-400 rounded transition-all duration-300" 
                style={{ width: `${weakness}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-12">{weakness}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-16">Unique</span>
            <div className="flex-1 h-2 bg-gray-100 rounded">
              <div 
                className="h-full bg-blue-500 rounded transition-all duration-300" 
                style={{ width: `${unique}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-12">{unique}%</span>
          </div>
        </div>

        <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
          {rarity.toFixed(1)}% Rarity
        </span>
      </div>
    </Card>
  );
};