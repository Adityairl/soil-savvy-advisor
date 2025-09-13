import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, Droplets, Wind, Thermometer, Eye, Gauge } from "lucide-react";

interface WeatherData {
  temperature: string;
  humidity: string;
  windSpeed: string;
  condition: string;
  visibility: string;
  pressure: string;
  uvIndex: string;
}

interface WeatherWidgetProps {
  location: string;
  weatherData?: WeatherData;
}

export function WeatherWidget({ location, weatherData }: WeatherWidgetProps) {
  const defaultWeather: WeatherData = {
    temperature: "22°C",
    humidity: "65%",
    windSpeed: "12 km/h",
    condition: "Partly Cloudy",
    visibility: "10 km",
    pressure: "1013 hPa",
    uvIndex: "6"
  };

  const weather = weatherData || defaultWeather;

  const getWeatherIcon = (condition: string) => {
    if (condition.toLowerCase().includes('sunny') || condition.toLowerCase().includes('clear')) {
      return <Sun className="w-8 h-8 text-yellow-500" />;
    }
    return <Cloud className="w-8 h-8 text-blue-500" />;
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gradient-to-br from-sky-blue/10 to-primary/5 pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          {getWeatherIcon(weather.condition)}
          Weather Forecast
        </CardTitle>
        <CardDescription className="text-sm font-medium">
          {location}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Main temperature display */}
        <div className="text-center mb-4 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
          <div className="text-3xl font-bold text-primary mb-1">
            {weather.temperature}
          </div>
          <div className="text-sm text-muted-foreground">
            {weather.condition}
          </div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
            <Droplets className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">Humidity</div>
              <div className="text-sm font-semibold">{weather.humidity}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
            <Wind className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">Wind Speed</div>
              <div className="text-sm font-semibold">{weather.windSpeed}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
            <Eye className="w-4 h-4 text-green-500 flex-shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">Visibility</div>
              <div className="text-sm font-semibold">{weather.visibility}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
            <Gauge className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <div>
              <div className="text-xs text-muted-foreground">Pressure</div>
              <div className="text-sm font-semibold">{weather.pressure}</div>
            </div>
          </div>
        </div>

        {/* Farming advice based on weather */}
        <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
          <div className="text-xs font-medium text-secondary-foreground mb-1">
            Farming Advice
          </div>
          <div className="text-xs text-muted-foreground">
            Good weather for field activities. Monitor soil moisture levels.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}