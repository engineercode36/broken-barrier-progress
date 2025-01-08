import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthModal } from "./auth/AuthModal";

export const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

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
            
            <Button 
              variant="ghost" 
              className="text-blue-600"
              onClick={() => setShowAuthModal(true)}
            >
              Login
            </Button>
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