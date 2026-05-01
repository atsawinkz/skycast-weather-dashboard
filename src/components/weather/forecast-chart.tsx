"use client";

import * as React from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DailyForecast } from "@/types/weather";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarRange } from "lucide-react";

interface ForecastChartProps {
  data: DailyForecast[];
}

export function ForecastChart({ data }: ForecastChartProps) {
  const chartData = data.map((day) => ({
    name: format(new Date(day.date), "EEE"),
    fullDate: format(new Date(day.date), "MMM d, yyyy"),
    tempMax: Math.round(day.temp_max),
    tempMin: Math.round(day.temp_min),
  }));

  return (
    <Card className="glass-panel border-0 h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarRange className="h-5 w-5 text-primary" />
          5-Day Temperature Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[250px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTempMax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTempMin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }} 
                dy={10} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 12 }} 
                domain={['dataMin - 5', 'dataMax + 5']} 
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-panel p-3 rounded-lg border border-white/20 shadow-lg !bg-background/90 text-sm">
                        <p className="font-semibold mb-2">{payload[0].payload.fullDate}</p>
                        <p className="text-red-400 font-medium">High: {payload[0].value}°C</p>
                        <p className="text-blue-400 font-medium">Low: {payload[1].value}°C</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="tempMax" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTempMax)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Area 
                type="monotone" 
                dataKey="tempMin" 
                stroke="#3b82f6" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorTempMin)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
