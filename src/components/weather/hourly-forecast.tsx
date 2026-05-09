import * as React from "react";
import { ForecastItem } from "@/types/weather";
import { formatTime, getWeatherIcon } from "@/lib/weather-utils";

interface HourlyForecastProps {
  list: ForecastItem[];
  timezoneOffset: number;
}

export function HourlyForecast({ list, timezoneOffset }: HourlyForecastProps) {
  // Only show next 24 hours (8 items, since each is 3 hours)
  const hourlyData = list.slice(0, 12);
  
  // Format current date
  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

  return (
    <section className="card-monocle p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm uppercase tracking-monocle-caps font-semibold text-muted-foreground">Today's Forecast</h3>
        <span className="text-[10px] uppercase tracking-monocle-caps text-muted-foreground italic">{today}</span>
      </div>
      
      <div className="flex overflow-x-auto gap-2 pb-4 scroll-hide">
        {hourlyData.map((item, i) => {
          const isNight = item.sys.pod === "n";
          const WeatherIcon = getWeatherIcon(item.weather[0].id, isNight);
          const isNow = i === 0;
          
          return (
            <div 
              key={item.dt} 
              className={`flex-none w-20 flex flex-col items-center py-4 bg-background border ${isNow ? 'border-border/40 ring-1 ring-accent/20' : 'border-border/40'}`}
            >
              <span className={`text-[10px] uppercase tracking-monocle-caps mb-3 ${isNow ? 'text-accent font-bold' : 'text-muted-foreground'}`}>
                {isNow ? "Now" : formatTime(item.dt, timezoneOffset)}
              </span>
              
              <WeatherIcon 
                className={`w-5 h-5 mb-2 ${isNow ? 'text-accent' : 'text-foreground'}`} 
                aria-label={item.weather[0].description}
                role="img"
              />
              
              <span className="text-lg font-serif-display">
                {Math.round(item.main.temp)}°
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
