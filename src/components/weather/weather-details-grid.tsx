import * as React from "react";
import { CurrentWeather } from "@/types/weather";
import { formatTime } from "@/lib/weather-utils";
import { Card, CardContent } from "@/components/ui/card";
import { Sunrise, Sunset, Thermometer, Gauge, Cloud } from "lucide-react";

interface WeatherDetailsGridProps {
  weather: CurrentWeather;
}

export function WeatherDetailsGrid({ weather }: WeatherDetailsGridProps) {
  const details = [
    {
      title: "Feels Like",
      value: `${Math.round(weather.main.feels_like)}°`,
      icon: Thermometer,
      description: "Feels like temperature",
    },
    {
      title: "Pressure",
      value: `${weather.main.pressure} hPa`,
      icon: Gauge,
      description: "Atmospheric pressure",
    },
    {
      title: "Cloud Cover",
      value: `${weather.clouds.all}%`,
      icon: Cloud,
      description: "Cloudiness percentage",
    },
    {
      title: "Sunrise",
      value: weather.sys.sunrise ? formatTime(weather.sys.sunrise, weather.timezone) : "N/A",
      icon: Sunrise,
      description: "Local sunrise time",
    },
    {
      title: "Sunset",
      value: weather.sys.sunset ? formatTime(weather.sys.sunset, weather.timezone) : "N/A",
      icon: Sunset,
      description: "Local sunset time",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {details.map((detail, index) => {
        const Icon = detail.icon;
        return (
          <Card key={index} className="glass-card border-0">
            <CardContent className="p-4 flex flex-col items-start gap-4">
              <div className="flex items-center gap-2 text-muted-foreground w-full">
                <Icon className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider font-semibold truncate">{detail.title}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{detail.value}</p>
                <p className="text-xs text-muted-foreground mt-1 truncate">{detail.description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
