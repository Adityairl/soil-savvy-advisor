import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cloud, MessageCircle, Send, User, Bot, LogOut, Sun, Droplets, Wind, Thermometer } from "lucide-react";

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

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Based on your ${farmerData.soilType} soil and ${farmerData.cropType} crop, I recommend monitoring soil moisture levels closely. Would you like specific irrigation advice?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Farm AI Advisor</h1>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* Farm Info Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Farm Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Plot Size</p>
                <Badge variant="secondary">{farmerData.plotSize} acres</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Soil Type</p>
                <Badge variant="secondary">{farmerData.soilType}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <Badge variant="secondary">{farmerData.location}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Crop</p>
                <Badge variant="secondary">{farmerData.cropType}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Weather Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Cloud className="w-5 h-5" />
                Weather
              </CardTitle>
              <CardDescription>{farmerData.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span className="text-sm">{weatherData.temperature}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span className="text-sm">{weatherData.humidity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{weatherData.windSpeed}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">{weatherData.condition}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                AI Farming Assistant
              </CardTitle>
              <CardDescription>
                Get personalized advice for your farm
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                        }`}>
                          {message.sender === 'user' ? (
                            <User className="w-4 h-4 text-primary-foreground" />
                          ) : (
                            <Bot className="w-4 h-4 text-secondary-foreground" />
                          )}
                        </div>
                        <div className={`rounded-lg px-4 py-2 ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-foreground'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Ask about your crops, soil, weather..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}