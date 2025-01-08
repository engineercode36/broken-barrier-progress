import { StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Questions from "./pages/Questions";
import Personalities from "./pages/Personalities";
import PersonalityDetail from "./pages/PersonalityDetail";
import About from "./pages/About";
import Community from "./pages/Community";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route 
                path="/questions" 
                element={
                  <ProtectedRoute>
                    <Questions />
                  </ProtectedRoute>
                } 
              />
              <Route path="/personalities" element={<Personalities />} />
              <Route 
                path="/personalities/:id" 
                element={
                  <ProtectedRoute>
                    <PersonalityDetail />
                  </ProtectedRoute>
                } 
              />
              <Route path="/about" element={<About />} />
              <Route 
                path="/community" 
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);

export default App;