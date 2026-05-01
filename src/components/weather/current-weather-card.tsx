import * as React from "react";
import { CurrentWeather } from "@/types/weather";
import { formatTemp, getWeatherIcon } from "@/lib/weather-utils";
import { MapPin, Wind, Droplets, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
}

export function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
  const isNight = weather.weather[0].icon.includes("n");

  return (
    <Card className="glass-panel-heavy border-0 overflow-hidden relative group">
      {/* Dynamic Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 opacity-50 pointer-events-none" />
      
      <CardContent className="p-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-muted-foreground font-medium mb-1 tracking-wide uppercase text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{weather.name}, {weather.sys.country}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground capitalize">
              {weather.weather[0].description}
            </h2>
            
            <div className="flex items-center gap-4 mt-6">
              <span className="text-7xl sm:text-8xl font-bold tracking-tighter">
                {formatTemp(weather.main.temp)}
              </span>
              {React.createElement(getWeatherIcon(weather.weather[0].id, isNight), { 
                className: "h-20 w-20 sm:h-24 sm:w-24 text-primary drop-shadow-lg",
                "aria-label": weather.weather[0].description,
                role: "img"
              })}
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-row md:flex-col gap-4 sm:gap-6 justify-between border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
                <Wind className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Wind</p>
                <p className="font-semibold text-lg">{weather.wind.speed} m/s</p>
              </div>
            </div>
            
            <Separator className="hidden md:block bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-cyan-500/10 text-cyan-500">
                <Droplets className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Humidity</p>
                <p className="font-semibold text-lg">{weather.main.humidity}%</p>
              </div>
            </div>
            
            <Separator className="hidden md:block bg-white/10" />
            
            <div className="flex items-center gap-3 hidden sm:flex">
              <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-500">
                <Eye className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Visibility</p>
                <p className="font-semibold text-lg">{(weather.visibility / 1000).toFixed(1)} km</p>
              </div>
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  );
}
