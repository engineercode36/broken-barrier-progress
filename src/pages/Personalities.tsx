import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PersonalityCard } from "@/components/PersonalityCard";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Personalities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rarityFilter, setRarityFilter] = useState("all");

  const { data: personalities, isLoading } = useQuery({
    queryKey: ['personalities'],
    queryFn: async () => {
      console.log('Fetching personalities from Supabase...');
      const { data, error } = await supabase
        .from('personality_types')
        .select('*')
        .order('id');
      
      if (error) {
        console.error('Error fetching personalities:', error);
        throw error;
      }
      
      console.log('Fetched personalities:', data);
      return data;
    }
  });

  const filteredPersonalities = personalities?.filter((personality) => {
    const matchesSearch = personality.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    if (rarityFilter === "all") return matchesSearch;
    if (rarityFilter === "common") return matchesSearch && personality.rarity <= 33;
    if (rarityFilter === "rare") return matchesSearch && personality.rarity > 33 && personality.rarity <= 66;
    if (rarityFilter === "legendary") return matchesSearch && personality.rarity > 66;
    
    return matchesSearch;
  }) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Personality Profiles
        </h1>
        
        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search personalities..."
              className="pl-10 w-full rounded-full border-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={20} />
            <select
              className="w-48 px-4 py-2 rounded-lg border border-gray-200 bg-white"
              value={rarityFilter}
              onChange={(e) => setRarityFilter(e.target.value)}
            >
              <option value="all">All Rarities</option>
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPersonalities.map((personality) => (
              <PersonalityCard
                key={personality.id}
                id={personality.id}
                name={personality.name}
                description={personality.description}
                rarity={personality.rarity}
                avatar={personality.avatar}
                strength={personality.strength}
                weakness={personality.weakness}
                unique={personality.unique_score}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Personalities;