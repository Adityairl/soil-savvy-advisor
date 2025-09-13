import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Ruler, Sprout } from "lucide-react";

interface FarmerData {
  plotSize: string;
  soilType: string;
  location: string;
  cropType: string;
}

interface FarmerDataFormProps {
  onSubmit: (data: FarmerData) => void;
}

export function FarmerDataForm({ onSubmit }: FarmerDataFormProps) {
  const [formData, setFormData] = useState<FarmerData>({
    plotSize: "",
    soilType: "",
    location: "",
    cropType: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const soilTypes = [
    "Clay",
    "Sandy",
    "Loamy",
    "Silty",
    "Peaty",
    "Chalky"
  ];

  const cropTypes = [
    "Wheat",
    "Rice",
    "Corn",
    "Soybeans",
    "Cotton",
    "Tomatoes",
    "Potatoes",
    "Onions",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sprout className="w-6 h-6 text-primary" />
              Farm Information
            </CardTitle>
            <CardDescription>
              Tell us about your farm to get personalized AI recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plotSize" className="flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Plot Size (acres)
                  </Label>
                  <Input
                    id="plotSize"
                    type="number"
                    placeholder="e.g., 10"
                    value={formData.plotSize}
                    onChange={(e) => setFormData({...formData, plotSize: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="City, State/Province"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil} value={soil.toLowerCase()}>
                          {soil}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type</Label>
                  <Select value={formData.cropType} onValueChange={(value) => setFormData({...formData, cropType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cropTypes.map((crop) => (
                        <SelectItem key={crop} value={crop.toLowerCase()}>
                          {crop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Continue to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}