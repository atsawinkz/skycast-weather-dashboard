import * as React from "react";
import { ForecastItem } from "@/types/weather";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatTime, getWeatherIcon } from "@/lib/weather-utils";

interface HourlyForecastProps {
  list: ForecastItem[];
  timezoneOffset: number;
}

export function HourlyForecast({ list, timezoneOffset }: HourlyForecastProps) {
  // Only show next 24 hours (8 items, since each is 3 hours)
  const hourlyData = list.slice(0, 8);

  return (
    <Card className="glass-panel border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Today&apos;s Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-4 p-1">
            {hourlyData.map((item, i) => {
              const isNight = item.sys.pod === "n";
              const WeatherIcon = getWeatherIcon(item.weather[0].id, isNight);
              
              return (
                <div 
                  key={item.dt} 
                  className="flex flex-col items-center justify-center p-4 rounded-2xl glass-card min-w-[100px]"
                >
                  <span className="text-sm font-medium text-muted-foreground mb-3">
                    {i === 0 ? "Now" : formatTime(item.dt, timezoneOffset)}
                  </span>
                  
                  <WeatherIcon className="h-8 w-8 mb-3 text-foreground" />
                  
                  <span className="text-lg font-bold">
                    {Math.round(item.main.temp)}°
                  </span>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="hidden sm:flex" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
