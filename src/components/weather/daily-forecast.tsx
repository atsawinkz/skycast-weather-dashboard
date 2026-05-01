import * as React from "react";
import { DailyForecast } from "@/types/weather";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeatherIcon } from "@/lib/weather-utils";
import { Separator } from "@/components/ui/separator";

interface DailyForecastProps {
  data: DailyForecast[];
}

export function DailyForecastList({ data }: DailyForecastProps) {
  // Find global min/max across all 5 days for the progress bar scaling
  const allMins = data.map(d => d.temp_min);
  const allMaxs = data.map(d => d.temp_max);
  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);
  const range = globalMax - globalMin;

  return (
    <Card className="glass-panel border-0 h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-primary" />
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 pb-6">
        {data.map((day, i) => {
          const isToday = i === 0;
          const dayName = isToday ? "Today" : format(new Date(day.date), "EEE");
          const WeatherIcon = getWeatherIcon(day.weather.id);
          
          // Calculate positions for the temperature bar
          const leftPercent = ((day.temp_min - globalMin) / range) * 100;
          const widthPercent = ((day.temp_max - day.temp_min) / range) * 100;

          return (
            <React.Fragment key={day.date}>
              <div className="flex items-center justify-between py-3">
                <span className="w-12 font-medium text-sm md:text-base">
                  {dayName}
                </span>
                
                <div className="flex items-center gap-2 w-16 md:w-24 justify-center">
                  <WeatherIcon 
                    className="h-5 w-5 text-muted-foreground" 
                    aria-label={day.weather.description}
                    role="img"
                  />
                  <span className="text-xs text-muted-foreground hidden md:inline-block">
                    {Math.round(day.weather.id/100)*10}% {/* Mock POP as it's not in daily grouping simply */}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 flex-1 justify-end max-w-[200px]">
                  <span className="text-sm font-semibold w-6 text-right opacity-70">
                    {Math.round(day.temp_min)}°
                  </span>
                  
                  {/* Temperature Range Bar */}
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden relative min-w-[60px]">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                      style={{ 
                        left: `${leftPercent}%`, 
                        width: `${Math.max(widthPercent, 10)}%` // min 10% width for visibility 
                      }} 
                    />
                  </div>
                  
                  <span className="text-sm font-bold w-6 text-right">
                    {Math.round(day.temp_max)}°
                  </span>
                </div>
              </div>
              {i < data.length - 1 && <Separator className="bg-white/10" />}
            </React.Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
}
