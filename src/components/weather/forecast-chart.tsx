"use client";

import * as React from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, Cell } from "recharts";
import { DailyForecast } from "@/types/weather";
import { format } from "date-fns";

interface ForecastChartProps {
  data: DailyForecast[];
}

export function ForecastChart({ data }: ForecastChartProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = data.map((day) => ({
    name: format(new Date(day.date), "EEE"),
    fullDate: format(new Date(day.date), "MMM d, yyyy"),
    tempMax: Math.round(day.temp_max),
    tempMin: Math.round(day.temp_min),
  }));

  return (
    <section className="card-monocle p-6 space-y-6 h-full min-h-[300px]">
      <div className="flex justify-between items-center">
        <h3 className="text-sm uppercase tracking-monocle-caps font-semibold text-muted-foreground">Temperature Curve</h3>
        <span className="text-xs text-muted-foreground italic">Dynamic visual representation</span>
      </div>
      <div className="h-48 w-full relative pt-4 min-h-0">
        {mounted && (
          <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'currentColor', opacity: 0.5, fontSize: 10, textAnchor: 'middle' }} 
              dy={10} 
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border p-2 shadow-sm text-xs">
                      <p className="font-bold tracking-monocle-caps mb-1">{payload[0].payload.fullDate}</p>
                      <p className="text-accent font-serif-display text-lg">{payload[0].value}°</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="tempMax" radius={[0, 0, 0, 0]}>
              {chartData.map((entry, index) => {
                const maxTempInDataset = Math.max(...chartData.map(d => d.tempMax));
                const minTempInDataset = Math.min(...chartData.map(d => d.tempMax));
                // Calculate opacity based on temperature relative to dataset min/max (0.3 to 1.0)
                const opacity = minTempInDataset === maxTempInDataset 
                  ? 0.8 
                  : 0.3 + (0.7 * ((entry.tempMax - minTempInDataset) / (maxTempInDataset - minTempInDataset)));
                
                return <Cell key={`cell-${index}`} fill={`var(--accent)`} fillOpacity={opacity} />;
              })}
            </Bar>
          </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
