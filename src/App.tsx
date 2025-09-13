import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginForm } from "@/components/LoginForm";
import { FarmerDataForm } from "@/components/FarmerDataForm";
import { Dashboard } from "@/components/Dashboard";

const queryClient = new QueryClient();

interface FarmerData {
  plotSize: string;
  soilType: string;
  location: string;
  cropType: string;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);

  const handleLogin = (username: string, password: string) => {
    // In a real app, this would authenticate with a backend
    console.log("Login attempt:", username, password);
    setIsLoggedIn(true);
  };

  const handleFarmerDataSubmit = (data: FarmerData) => {
    setFarmerData(data);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFarmerData(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!isLoggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : !farmerData ? (
          <FarmerDataForm onSubmit={handleFarmerDataSubmit} />
        ) : (
          <Dashboard farmerData={farmerData} onLogout={handleLogout} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
