import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-full h-24 -mt-8 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)'
          }}
        >
          <h2 className="text-white text-2xl font-bold text-center mt-12 font-cursive">Personality Arc</h2>
        </div>
        
        <div className="relative pt-16">
          {!showForgotPassword ? (
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SignInForm onForgotPassword={() => setShowForgotPassword(true)} />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          ) : (
            <div>
              <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Button 
              variant="outline"
              onClick={() => {
                navigate('/practice');
                onClose();
              }}
              className="w-full transition-all duration-300 hover:bg-blue-50 hover:border-blue-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              Go to Practice Page
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};