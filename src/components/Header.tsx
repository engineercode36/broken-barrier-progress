import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthModal } from "./auth/AuthModal";
import { useAuth } from "./auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-[64px] bg-white shadow-md z-50 flex items-center px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-blue-600">
            Personality Arc
          </Link>
          
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/personalities" className="text-gray-600 hover:text-blue-600 transition-colors">Personalities</Link>
              <Link to="/premium" className="text-gray-600 hover:text-blue-600 transition-colors">Premium</Link>
              <Link to="/community" className="text-gray-600 hover:text-blue-600 transition-colors">Community</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors">
                  Resources <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Documentation</DropdownMenuItem>
                  <DropdownMenuItem>Tutorials</DropdownMenuItem>
                  <DropdownMenuItem>FAQ</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.username} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                className="text-blue-600"
                onClick={() => setShowAuthModal(true)}
              >
                <LogIn className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};