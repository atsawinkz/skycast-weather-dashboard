import * as React from "react";
import { CurrentWeather } from "@/types/weather";
import { formatTime } from "@/lib/weather-utils";
import { Sunrise, Sunset, Thermometer, Gauge, Cloud, Droplets, Wind, Eye } from "lucide-react";

interface WeatherDetailsGridProps {
  weather: CurrentWeather;
}

export function WeatherDetailsGrid({ weather }: WeatherDetailsGridProps) {
  const details = [
    {
      title: "Wind",
      value: `${weather.wind.speed}`,
      unit: "m/s",
      icon: Wind,
      description: `Direction: ${weather.wind.deg}°`,
      progress: Math.min((weather.wind.speed / 20) * 100, 100) // Rough max of 20m/s for scale
    },
    {
      title: "Humidity",
      value: `${weather.main.humidity}`,
      unit: "%",
      icon: Droplets,
      description: "Current relative humidity",
      progress: weather.main.humidity
    },
    {
      title: "Feels Like",
      value: `${Math.round(weather.main.feels_like)}`,
      unit: "°",
      icon: Thermometer,
      description: "Apparent temperature",
      progress: Math.min((Math.max(weather.main.feels_like, 0) / 40) * 100, 100)
    },
    {
      title: "Cloud Cover",
      value: `${weather.clouds.all}`,
      unit: "%",
      icon: Cloud,
      description: "Sky cloudiness",
      progress: weather.clouds.all
    },
    {
      title: "Pressure",
      value: `${weather.main.pressure}`,
      unit: "hPa",
      icon: Gauge,
      description: "Atmospheric pressure"
    },
    {
      title: "Visibility",
      value: `${(weather.visibility / 1000).toFixed(1)}`,
      unit: "km",
      icon: Eye,
      description: "Clear viewing distance",
      progress: (weather.visibility / 10000) * 100
    },
    {
      title: "Sunrise",
      value: weather.sys.sunrise ? formatTime(weather.sys.sunrise, weather.timezone) : "N/A",
      unit: "",
      icon: Sunrise,
      description: "Local sunrise time"
    },
    {
      title: "Sunset",
      value: weather.sys.sunset ? formatTime(weather.sys.sunset, weather.timezone) : "N/A",
      unit: "",
      icon: Sunset,
      description: "Local sunset time"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {details.map((detail, index) => {
        const Icon = detail.icon;
        return (
          <div key={index} className="card-monocle p-4 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon className="h-3 w-3" role="img" aria-label={detail.title} />
              <span className="text-[10px] uppercase tracking-monocle-caps font-semibold">{detail.title}</span>
            </div>
            <p className="text-2xl font-serif-display">
              {detail.value} <span className="text-sm font-sans text-muted-foreground">{detail.unit}</span>
            </p>
            {detail.progress !== undefined ? (
              <div className="h-1 bg-border mt-2">
                <div className="h-full bg-accent" style={{ width: `${detail.progress}%` }}></div>
              </div>
            ) : (
              <p className="text-[10px] text-muted-foreground italic mt-2">{detail.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
