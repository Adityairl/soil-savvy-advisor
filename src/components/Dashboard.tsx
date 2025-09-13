import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, User, Bot, LogOut, Sparkles, Brain, TrendingUp } from "lucide-react";
import { WeatherWidget } from "@/components/WeatherWidget";
import { GovernmentPolicies } from "@/components/GovernmentPolicies";

interface FarmerData {
  plotSize: string;
  soilType: string;
  location: string;
  cropType: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface DashboardProps {
  farmerData: FarmerData;
  onLogout: () => void;
}

export function Dashboard({ farmerData, onLogout }: DashboardProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Welcome! I see you have a ${farmerData.plotSize} acre ${farmerData.soilType} soil farm in ${farmerData.location} growing ${farmerData.cropType}. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Mock weather data - would be replaced with actual API
  const weatherData = {
    temperature: "22°C",
    humidity: "65%",
    windSpeed: "12 km/h",
    condition: "Partly Cloudy"
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Enhanced AI responses with more knowledge
    const getEnhancedResponse = (message: string) => {
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('irrigation') || lowerMessage.includes('water')) {
        return `For ${farmerData.cropType} in ${farmerData.soilType} soil, I recommend drip irrigation to maintain 60-70% soil moisture. Monitor using soil moisture sensors at 6-inch depth.`;
      }
      if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrients')) {
        return `Based on your soil type (${farmerData.soilType}), consider NPK ratio 4:2:1 for ${farmerData.cropType}. Apply organic compost 2 weeks before planting for better soil health.`;
      }
      if (lowerMessage.includes('pest') || lowerMessage.includes('disease')) {
        return `Common pests for ${farmerData.cropType}: Monitor for aphids and caterpillars. Use neem oil spray (2ml/L) as organic pesticide. Install yellow sticky traps.`;
      }
      if (lowerMessage.includes('yield') || lowerMessage.includes('production')) {
        return `To maximize ${farmerData.cropType} yield on ${farmerData.plotSize} acres: Maintain proper plant spacing, ensure adequate nutrition, and harvest at optimal maturity.`;
      }
      if (lowerMessage.includes('weather') || lowerMessage.includes('climate')) {
        return `Current weather is suitable for ${farmerData.cropType}. Watch for temperature drops below 15°C. Consider protective measures during extreme weather.`;
      }
      
      return `I understand you're asking about ${farmerData.cropType} farming. For your ${farmerData.plotSize} acre ${farmerData.soilType} soil farm in ${farmerData.location}, I recommend regular soil testing and crop rotation. What specific aspect would you like to explore?`;
    };

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getEnhancedResponse(newMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Modern Header */}
      <header className="bg-gradient-to-r from-card to-card/80 backdrop-blur-sm border-b shadow-sm px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Farm AI Advisor
              </h1>
              <p className="text-xs text-muted-foreground">Intelligent Agricultural Assistant</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout} className="shadow-sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
        {/* Enhanced Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Farm Details Card */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Farm Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs font-medium text-primary">Plot Size</p>
                <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-primary/20">
                  {farmerData.plotSize} acres
                </Badge>
              </div>
              <div className="p-3 bg-secondary/5 rounded-lg border border-secondary/10">
                <p className="text-xs font-medium text-secondary-foreground">Soil Type</p>
                <Badge variant="secondary" className="mt-1 bg-secondary/10 text-secondary-foreground border-secondary/20">
                  {farmerData.soilType}
                </Badge>
              </div>
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                <p className="text-xs font-medium text-accent-foreground">Location</p>
                <Badge variant="secondary" className="mt-1 bg-accent/10 text-accent-foreground border-accent/20">
                  {farmerData.location}
                </Badge>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs font-medium text-primary">Crop Type</p>
                <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary border-primary/20">
                  {farmerData.cropType}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Weather Widget */}
          <WeatherWidget location={farmerData.location} />

          {/* Video Section */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="text-lg">Farm Guide</CardTitle>
              <CardDescription>Educational farming content</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <video 
                className="w-full rounded-lg shadow-md" 
                controls 
                poster="/placeholder.svg"
              >
                <source src="/assets/farmer_1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Enhanced AI Chat */}
          <Card className="h-[500px] flex flex-col shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    AI Farming Assistant
                  </span>
                  <p className="text-xs text-muted-foreground font-normal">
                    Powered by advanced agricultural knowledge
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-3 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-br from-primary to-primary/80' 
                            : 'bg-gradient-to-br from-secondary to-secondary/80'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-5 h-5 text-primary-foreground" />
                          ) : (
                            <Bot className="w-5 h-5 text-secondary-foreground" />
                          )}
                        </div>
                        <div className={`rounded-xl px-4 py-3 shadow-sm ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground' 
                            : 'bg-gradient-to-br from-muted to-muted/80 text-foreground border'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2 mt-4 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                <Input
                  placeholder="Ask about crops, irrigation, fertilizers, pest control..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-background/50 backdrop-blur-sm border-primary/20"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-md"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Government Policies Sidebar */}
        <div className="lg:col-span-1">
          <GovernmentPolicies />
        </div>
      </div>
    </div>
  );
}