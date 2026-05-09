import * as React from "react";
import { DailyForecast } from "@/types/weather";
import { format } from "date-fns";
import { getWeatherIcon } from "@/lib/weather-utils";

interface DailyForecastProps {
  data: DailyForecast[];
}

export function DailyForecastList({ data }: DailyForecastProps) {
  // Find global min/max across all days for the progress bar scaling
  const allMins = data.map(d => d.temp_min);
  const allMaxs = data.map(d => d.temp_max);
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const range = globalMax - globalMin;

  return (
    <section className="card-monocle p-6">
      <h3 className="text-sm uppercase tracking-monocle-caps font-semibold text-muted-foreground mb-6">5-Day Forecast</h3>
      <div className="space-y-0">
        {data.map((day, i) => {
          const isToday = i === 0;
          const dayName = isToday ? "Today" : format(new Date(day.date), "EEE");
          const WeatherIcon = getWeatherIcon(day.weather.id);
          
          // Calculate positions for the temperature bar
          const leftPercent = ((day.temp_min - globalMin) / range) * 100;
          const widthPercent = ((day.temp_max - day.temp_min) / range) * 100;

          return (
            <div key={day.date} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <span className="w-12 font-medium">
                {dayName}
              </span>
              
              <div className="flex items-center gap-4 flex-1 px-4">
                <WeatherIcon 
                  className={`w-4 h-4 ${isToday ? 'text-accent' : 'text-muted-foreground'}`} 
                  aria-label={day.weather.description}
                  role="img"
                />
                
                {/* Temperature Range Bar */}
                <div className="flex-1 h-1 bg-border relative">
                  <div 
                    className="absolute h-full bg-accent"
                    style={{ 
                      left: `${leftPercent}%`, 
                      width: `${Math.max(widthPercent, 10)}%` // min 10% width for visibility 
                    }} 
                  />
                </div>
              </div>
              
              <span className="w-16 text-right font-bold font-serif-display">
                {Math.round(day.temp_max)} / <span className="text-muted-foreground">{Math.round(day.temp_min)}</span>
              </span>
            </div>
          );
        })}
      </div>
      <button className="w-full mt-6 py-3 border border-border text-[10px] tracking-monocle-caps font-bold hover:bg-foreground hover:text-background transition-all">
        Full Extended Report
      </button>
    </section>
  );
}
